import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[280px] ${isUser ? 'ml-8' : 'mr-8'}`}>
        <div className={`text-xs font-medium mb-1 ${isUser ? 'text-right text-gray-600' : 'text-left text-gray-600'}`}>
          {isUser ? 'Usuario' : 'Trupy'}
        </div>
        <div
          className={`px-3 py-2 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-[#A020F0] text-white'
              : 'bg-[#F0B3FF] text-black'
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
          <div className={`text-xs mt-1 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;