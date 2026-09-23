"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Loader2, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

type toolUsed = {
  name: string
  input: string
}

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage() {
    const message = input.trim();
    if (!message || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = (await response.json()) as { response?: string };
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response ?? "I'm sorry, I'm not sure what you mean.",
      };

      setMessages([...nextMessages, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <Card className="mx-auto flex h-[calc(100vh-140px)] w-full max-w-3xl flex-col overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="size-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Agent Chat</CardTitle>
            <CardDescription>Chat with the agent</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 overflow-y-auto py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <Sparkles className="size-8" />
            <p className="text-sm">
              No messages yet, start by typing a message below.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm",
                  message.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted",
                )}
              >
                {message.content}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-4 py-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              The agent is thinking...
            </div>
          </div>
        )}
        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <div className="flex w-full items-end gap-2 rounded-2xl border bg-background p-2 focus-within:ring-2 focus-within:ring-ring">
          <textarea
            className="max-h-40 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none"
            placeholder="Ask the agent what you want!"
            value={input}
            rows={1}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="rounded-full"
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
