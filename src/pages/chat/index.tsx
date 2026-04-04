import { useState, useCallback, useRef, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { sendChatStream } from 'miaoda-taro-utils/chatStream'
import ChatBubble from '@/components/ChatBubble'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const SYSTEM_PROMPT = '你是许卿的数字分身。你是一名硕士研究生,目前主要在做深度学习和VibeCoding研究。你的兴趣包括深度学习、AI应用、古诗词。你的性格特点是脾气超级好。请以许卿的口吻回答问题,回答要简洁友好。'

const PRESET_QUESTIONS = [
  '你现在在做什么?',
  '你有哪些作品?',
  '怎么联系你?'
]

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const abortRef = useRef<(() => void) | null>(null)
  const scrollViewRef = useRef<HTMLDivElement>(null)

  // 滚动到底部
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight
      }
    }, 100)
  }, [])

  // 发送消息
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: content.trim() }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setStreamingContent('')
    scrollToBottom()

    try {
      const supabaseUrl = process.env.TARO_APP_SUPABASE_URL
      let fullContent = ''

      // 构建完整的 messages 数组
      const allMessages: Message[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
        userMessage
      ]

      const { abort } = sendChatStream({
        endpoint: `${supabaseUrl}/functions/v1/chat-with-digital-twin`,
        appId: '',
        messages: allMessages,
        onUpdate: (rawData: string) => {
          try {
            if (rawData !== '[DONE]') {
              const data = JSON.parse(rawData)
              const content = data.choices?.[0]?.delta?.content || ''
              fullContent += content
              setStreamingContent(fullContent)
              scrollToBottom()
            }
          } catch (e) {
            console.error('解析流数据失败:', e)
          }
        },
        onComplete: () => {
          setMessages(prev => [...prev, { role: 'assistant', content: fullContent }])
          setStreamingContent('')
          setIsLoading(false)
          scrollToBottom()
        },
        onError: (error: Error) => {
          console.error('AI回复出错:', error)
          Taro.showToast({
            title: '数字分身暂时走神了,请稍后再试',
            icon: 'none',
            duration: 2000
          })
          setIsLoading(false)
          setStreamingContent('')
        }
      })

      abortRef.current = abort
    } catch (error) {
      console.error('发送消息失败:', error)
      Taro.showToast({
        title: '数字分身暂时走神了,请稍后再试',
        icon: 'none',
        duration: 2000
      })
      setIsLoading(false)
      setStreamingContent('')
    }
  }, [messages, isLoading, scrollToBottom])

  // 点击预设问题
  const handlePresetClick = useCallback((question: string) => {
    sendMessage(question)
  }, [sendMessage])

  // 输入框变化
  const handleInput = useCallback((e: any) => {
    const ev = e as any
    const value = ev.detail?.value ?? ev.target?.value ?? ''
    // 限制最多200字
    if (value.length <= 200) {
      setInputValue(value)
    }
  }, [])

  // 发送按钮点击
  const handleSend = useCallback(() => {
    sendMessage(inputValue)
  }, [inputValue, sendMessage])

  // 返回主页
  const handleBack = useCallback(() => {
    Taro.navigateBack()
  }, [])

  // 组件卸载时中止请求
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-500/30 flex flex-col">
      {/* 顶部导航栏 - 带有回退按钮 */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center shadow-sm">
        <button 
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-600"
        >
          <div className="i-mdi-arrow-left text-2xl" />
        </button>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-bold text-slate-800 tracking-wide">AI Avatar</h1>
          <p className="text-xs text-cyan-600 font-mono">Online</p>
        </div>
      </div>

      {/* 聊天区 */}
      <div className="flex-1 px-4 md:px-6 pt-6 pb-32 overflow-y-auto max-w-3xl mx-auto w-full" ref={scrollViewRef}>
        {/* 预设问题 */}
        {messages.length === 0 && (
          <div className="flex flex-col gap-3 mb-8 mt-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 border border-cyan-100 shadow-sm mb-3">
                <div className="i-mdi-robot-outline text-3xl text-cyan-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">你好，我是许卿的数字分身</h2>
              <p className="text-sm text-slate-500">你可以问我关于他的任何问题</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {PRESET_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePresetClick(question)}
                  className="px-5 py-3.5 border border-slate-200 rounded-2xl text-base text-cyan-700 bg-white/70 backdrop-blur-sm shadow-sm hover:bg-white hover:border-cyan-300 hover:shadow-md active:scale-[0.98] transition-all text-left flex items-center justify-between group"
                  disabled={isLoading}
                >
                  <span>{question}</span>
                  <div className="i-mdi-arrow-right text-slate-300 group-hover:text-cyan-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* 聊天记录 */}
        <div className="mb-6">
          {messages.map((msg, index) => (
            msg.role !== 'system' && (
              <ChatBubble key={index} messageRole={msg.role} content={msg.content} />
            )
          ))}
          
          {/* 流式输出中的消息 */}
          {isLoading && streamingContent && (
            <ChatBubble messageRole="assistant" content={streamingContent} />
          )}
          
          {/* 加载状态 */}
          {isLoading && !streamingContent && (
            <div className="flex justify-start mb-4">
              <div className="px-5 py-3.5 bg-white/80 border border-slate-200 rounded-2xl rounded-tl-sm text-base text-slate-500 backdrop-blur-sm shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 输入框区域 - 固定在底部 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-4 md:px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-3xl mx-auto w-full flex flex-row gap-3 items-center">
          <div className="flex-1 border border-slate-200 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 rounded-2xl px-5 py-3.5 bg-slate-50/80 transition-all">
            <input
              type="text"
              value={inputValue}
              onInput={handleInput}
              placeholder="输入你的问题..."
              maxLength={200}
              disabled={isLoading}
              className="w-full text-base md:text-lg text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
              inputValue.trim() && !isLoading
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-md active:scale-95'
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}
          >
            <div className="i-mdi-send text-2xl ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
