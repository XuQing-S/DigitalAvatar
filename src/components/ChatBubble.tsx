import { type FC } from 'react'

interface ChatBubbleProps {
  messageRole: 'user' | 'assistant'
  content: string
}

/**
 * 聊天气泡组件
 * 用户消息：钴蓝底色 + 白字，右对齐
 * AI消息：白底 + 深蓝边框 + 深蓝字，左对齐
 */
const ChatBubble: FC<ChatBubbleProps> = ({ messageRole, content }) => {
  const isUser = messageRole === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-lg text-xl ${
          isUser
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-card text-card-foreground border border-border'
        }`}
      >
        {content}
      </div>
    </div>
  )
}

export default ChatBubble
