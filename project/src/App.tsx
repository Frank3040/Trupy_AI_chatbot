import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const generateTrupyResponse = (userMessage: string): string => {
    const responses = [
      "Entiendo cómo te sientes. Es completamente normal experimentar estas emociones.",
      "Gracias por compartir esto conmigo. ¿Puedes contarme más sobre lo que te está pasando?",
      "Me parece muy valiente de tu parte hablar sobre esto. ¿Qué te gustaría que trabajemos juntos?",
      "Reconozco que esto debe ser difícil para ti. Estoy aquí para apoyarte en este proceso.",
      "Es importante que sepas que tus sentimientos son válidos. ¿Cómo puedo ayudarte mejor?",
      "Aprecio tu confianza al compartir esto. ¿Hay algo específico que te preocupa más?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (messageText: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: formatTime(new Date()),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate Trupy's response after a delay
    setTimeout(() => {
      const trupyMessage: Message = {
        id: Date.now() + 1,
        text: generateTrupyResponse(messageText),
        isUser: false,
        timestamp: formatTime(new Date()),
      };
      setMessages(prev => [...prev, trupyMessage]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm sm:w-[400px] h-[600px] flex flex-col overflow-hidden">
        <Header />
        <div 
          ref={chatAreaRef}
          className="flex-1 overflow-y-auto"
        >
          <ChatArea messages={messages} />
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;