// src/pages/ChatPage.tsx
import React from 'react'
import { ChatContainer } from '@/components/Chat/Chatbubble' // ← tu ruta real
import { sendChatMessageEcho } from '@/lib/api'

type Msg = { text: string; isUser: boolean }

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Msg[]>([])
  const [sending, setSending] = React.useState(false)

  const onSendMessage = async (message: string) => {
    const text = message.trim()
    if (!text) return

    // 1) pinta el mensaje del usuario
    setMessages((prev) => [...prev, { text, isUser: true }])
    setSending(true)

    try {
      // 2) llama a la API de Python (echo)
      const reply = await sendChatMessageEcho(text)

      // 3) pinta la respuesta del bot
      setMessages((prev) => [...prev, { text: reply || '…', isUser: false }])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        { text: 'No pude conectar con el servidor. Inténtalo de nuevo.', isUser: false },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <ChatContainer messages={messages} onSendMessage={onSendMessage} />
        {sending && (
          <div className="mt-2 text-xs text-purple-200/90">Trupy está escribiendo…</div>
        )}
      </div>
    </div>
  )
}
