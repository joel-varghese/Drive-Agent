"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import ReactMarkdown from "react-markdown";

type AuthInfo = {
    provider: string;
    service: string;
    user_email: string;
    auth_url: string;
};

type Message = {
    role: "user" | "assistant";
    content: string;
    auth?: AuthInfo;
};

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, loading: authLoading } = useAuth();

    const threadId = useRef<string>(
      crypto.randomUUID()
    )

    useEffect(() => {
      if (!user) return;

      const userId = user.id;

      async function loadHistory() {
        try {
          const res = await fetch(
            `https://agentic-flows.onrender.com/history/${userId}`
          );

        const history = await res.json();
        
        setMessages(history)
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    }

    loadHistory();
    }, [user]);
    if (authLoading) {
      return <div>Loading...</div>;
    }

    console.log(user?.id);
    console.log(user?.email);
    
    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [
            ...messages,
            { role: "user", content: input },
        ];

        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("https://agentic-flows.onrender.com/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                  message: input,
                  user_id: user?.id,
                  channel: "web",
                  thread_id: threadId.current, 
                }),
            });

            const data = await res.json();

            if (data.type === "auth_required" && data.auth) {
                setMessages([
                  ...newMessages,
                  {
                    role: "assistant",
                    content: data.response || data.auth.message,
                    auth: data.auth,
                  },
                ]);
            } else {
                setMessages([
                  ...newMessages,
                  {
                    role: "assistant",
                    content: data.response || "",
                  },
                ]);
            }
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
            <ReactMarkdown>{m.content}</ReactMarkdown>

            {m.auth && (
              <div className="mt-3 border rounded-lg p-3 bg-background">
                <div className="font-medium mb-1">
                    Connect {m.auth.service}
                </div>

                <div className="text-xs text-muted-foreground mb-3">
                    Sign in with {m.auth.user_email} to give your agent access.
                </div>

                <button
                  onClick={() => {
                    window.open(
                      m.auth!.auth_url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Connect {m.auth.service}
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && <div className="text-sm">Thinking...</div>}
      </div>

      <div className="flex gap-2 items-center">
        <input
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your agent..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
          aria-label="Send"
        >
          {/* Send arrow icon (SVG) with explicit color */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="#fff" 
            className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}