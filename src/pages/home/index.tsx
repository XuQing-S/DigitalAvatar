import { useState, useCallback, useRef, useEffect } from 'react'
import { Image } from '@tarojs/components'
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

const Home = () => {
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

  // 组件卸载时中止请求
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* 个人信息区 */}
      <div className="flex flex-col items-center px-6 py-12">
        {/* 头像 */}
        <Image
          src="https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_16fd34f8-8bcc-4f4b-989f-842768b41d28.jpg"
          mode="aspectFill"
          className="w-32 h-32 rounded-full mb-6"
        />
        
        {/* 名字 */}
        <h1 className="text-4xl font-bold text-foreground mb-2">许卿</h1>
        
        {/* 一句话介绍 */}
        <p className="text-2xl text-muted-foreground mb-12">深度学习研究者</p>
        
        {/* 个人信息卡片 */}
        <div className="w-full border border-border rounded-sm bg-card px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row">
              <span className="text-xl text-muted-foreground w-32">身份</span>
              <span className="text-xl text-foreground flex-1">硕士研究生</span>
            </div>
            <div className="flex flex-row">
              <span className="text-xl text-muted-foreground w-32">目前在做</span>
              <span className="text-xl text-foreground flex-1">深度学习、VibeCoding</span>
            </div>
            <div className="flex flex-row">
              <span className="text-xl text-muted-foreground w-32">兴趣方向</span>
              <span className="text-xl text-foreground flex-1">深度学习、AI应用、古诗词</span>
            </div>
            <div className="flex flex-row">
              <span className="text-xl text-muted-foreground w-32">个人特点</span>
              <span className="text-xl text-foreground flex-1">脾气超级好</span>
            </div>
          </div>
        </div>
      </div>

      {/* 聊天区 - 80px 留白分隔 */}
      <div className="px-6 pb-32" style={{ marginTop: '80px' }}>
        {/* 区域标题 */}
        <h2 className="text-3xl font-bold text-foreground mb-6">和我的数字分身聊聊</h2>
        
        {/* 预设问题 */}
        {messages.length === 0 && (
          <div className="flex flex-col gap-3 mb-6">
            {PRESET_QUESTIONS.map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handlePresetClick(question)}
                className="px-4 py-3 border border-primary rounded-lg text-xl text-primary flex items-center justify-center leading-none transition-transform active:scale-96"
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        )}
        
        {/* 聊天记录 */}
        <div ref={scrollViewRef} className="mb-6">
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
              <div className="px-4 py-3 bg-card border border-border rounded-lg text-xl text-foreground">
                正在思考中_
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 输入框区域 - 固定在底部 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-4">
        <div className="flex flex-row gap-3 items-center">
          <div className="flex-1 border border-input rounded-lg px-4 py-3 bg-card overflow-hidden">
            <input
              type="text"
              value={inputValue}
              onInput={handleInput}
              placeholder="输入你的问题..."
              maxLength={200}
              disabled={isLoading}
              className="w-full text-xl text-foreground bg-transparent outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`px-6 py-3 rounded-lg text-xl flex items-center justify-center leading-none transition-transform ${
              inputValue.trim() && !isLoading
                ? 'bg-secondary text-secondary-foreground active:scale-96'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <div className="i-mdi-send text-2xl" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
