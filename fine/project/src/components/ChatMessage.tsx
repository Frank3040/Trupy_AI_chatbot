import React from "react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-1 py-4 rounded-lg shadow ${
          isUser ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <p>{message}</p>
        <span className="block text-xs text-gray-500 mt-1">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
