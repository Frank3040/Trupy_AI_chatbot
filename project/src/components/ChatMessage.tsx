import React from "react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-2xl px-4 py-3 shadow
          ${isUser ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-900"}
          max-w-[90%] md:max-w-[80%] lg:max-w-[70%]
          break-words whitespace-pre-wrap [overflow-wrap:anywhere] leading-relaxed`}
      >
        <p>{message}</p>
        <span
          className={`block text-[10px] mt-1
            ${isUser ? "text-white/70 text-right" : "text-gray-500 text-left"}`}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
