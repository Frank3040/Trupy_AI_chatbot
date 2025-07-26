import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import trupyImg from "../img/Trupy_1_preview_rev_1.png";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage: Message = { id: Date.now(), text, isUser: true, timestamp };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.bot,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-white">
      {/* Área de mensajes */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mb-3">
              <img src={trupyImg} alt="Trupy Bot" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">¡Hola! Soy Trupy</h2>
            <p className="text-gray-600 text-sm px-4 leading-relaxed">
              Estoy aquí para escucharte y apoyarte. Cuéntame cómo te sientes hoy.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        )}
      </div>
      {/* Caja de entrada fija al fondo */}
      <div className="p-3 border-t shrink-0">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatArea;
