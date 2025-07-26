import { useState } from "react";

const MessageInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-1 rounded-lg border px-4 py-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe tu situación emocional"
      />
      <button type="submit" className="bg-purple-500 text-white px-1 py-2 rounded-lg">
        Enviar
      </button>
    </form>
  );
};

export default MessageInput;
