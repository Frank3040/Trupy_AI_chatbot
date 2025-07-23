import React from 'react';
import ChatMessage from './ChatMessage';
import trupyImg from '../img/Trupy_1_preview_rev_1.png';


interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 bg-white">
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
  );
};

export default ChatArea;