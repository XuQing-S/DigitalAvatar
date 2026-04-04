import { type FC } from 'react'

interface ChatBubbleProps {
  messageRole: 'user' | 'assistant'
  content: string
}

/**
 * 聊天气泡组件
 * 用户消息：青蓝色底色 + 白字，右对齐
 * AI消息：白底半透明 + 浅灰边框 + 深灰字，左对齐
 */
const ChatBubble: FC<ChatBubbleProps> = ({ messageRole, content }) => {
  const isUser = messageRole === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-base md:text-lg shadow-sm ${
          isUser
            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm'
            : 'bg-white/80 text-slate-800 border border-slate-200 backdrop-blur-sm rounded-tl-sm'
        }`}
      >
        {content}
      </div>
    </div>
  )
}

export default ChatBubble
