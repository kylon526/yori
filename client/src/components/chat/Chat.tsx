"use client";
import { useState, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import Button from "../ui/primitive/buttons/Button";
import styles from "./Chat.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

interface ChatProps {
  initialMessage?: string;
}

export default function Chat({
  initialMessage = "I can tell you anything you want to know about Kylon's professional experience. What do you want to know?",
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  async function sendMessage(message: string) {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message,
    };
    const aiMessage: Message = { id: Date.now() + 1, sender: "ai", text: "" };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.body) {
      setLoading(false);
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let partial = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      partial += chunk;

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, text: partial } : msg,
        ),
      );
    }

    setLoading(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        <h2>Hey! I&apos;m YoriAI</h2>
        <p>{initialMessage}</p>
        <div style={{ width: "100%" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${msg.sender === "user" ? styles.user : styles.ai}`}
            >
              {msg.sender === "user" ? <PersonIcon /> : <SmartToyIcon />}

              {msg.sender === "ai" ? (
                <div className={`${styles.aiMessageContainer}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                  {/* {msg.text} */}
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          ))}
          {loading && <p className={styles.streaming}>Yori is typing...</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className={styles.input}
        />
        <Button disabled={loading} className={styles.sendButton}>
          Send
        </Button>
      </form>
    </div>
  );
}
