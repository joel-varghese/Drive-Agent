"use client";

import { useState } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [
            ...messages,
            { role: "user", content: input },
        ];

        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await res.join();

            setMessages([
                ...newMessages,
                { role: "assistant", content: data.reply.content },
            ]);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
    <div className="flex flex-col h-[500px] border rounded-lg p-4 bg-background">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-md text-sm ${
              m.role === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-muted"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <div className="text-sm">Thinking...</div>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your agent..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}