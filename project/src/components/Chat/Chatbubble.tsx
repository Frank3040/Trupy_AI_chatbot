import React from 'react'
// Agregar import de la imagen
import TrupyLogo from '@/assets/img/Trupy_1_preview_rev_1.png'
import BotAvatar from '@/assets/img/qq.png'  // 👈 tu imagen local


// Imágenes dummy para los avatares (pueden ser reemplazadas por imágenes reales después)
const BOT_AVATAR = BotAvatar
const USER_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'

interface ChatbubbleProps {
  message: string
  isUser?: boolean
}

const Chatbubble: React.FC<ChatbubbleProps> = ({ message, isUser = false }) => {
  return (
    <div className={`flex items-end gap-2 my-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <img
        src={isUser ? USER_AVATAR : BOT_AVATAR}
        alt={isUser ? 'User Avatar' : 'Bot Avatar'}
        className="w-8 h-8 rounded-full border-2 border-purple-400/20 bg-white p-0.5"
      />
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl bg-white text-gray-900
        ${isUser ? 'border-2 border-purple-400/30 shadow-md' : 'border border-purple-400/20 shadow-sm'}`}
      >
        {message}
      </div>
    </div>
  )
}

interface ChatContainerProps {
  messages: { text: string; isUser: boolean }[]
  onSendMessage: (message: string) => void
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white/5 backdrop-blur-sm rounded-lg border border-purple-400/20">
      {/* Header — más claro y con “burbuja” blanca para el logo */}
      <div className="flex items-center gap-4 p-4 border-b border-purple-400/20 bg-white/20 backdrop-blur-sm rounded-t-lg">
        <div className="p-1 rounded-full bg-white border border-purple-400/20 shadow-sm">
          <img
            src={TrupyLogo}
            alt="Trupy AI Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <h2 className="text-lg font-medium text-purple-100">A listening Ear, Always there.</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Chatbubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-purple-400/20 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm text-purple-100 border border-purple-400/20 rounded-lg 
            focus:outline-none focus:border-purple-500 placeholder-purple-300/50"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600/90 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export { ChatContainer, Chatbubble }
