"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; text: string | React.ReactNode }>>([
    { type: "output", text: "Welcome to H3l!0s_T3k Interactive Shell v2.6.0" },
    { type: "output", text: "Type 'help' to see available commands." },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "input" as const, text: `$ ${input}` }];

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = "Available commands: whoami, about, projects, skills, contact, clear";
        break;
      case "whoami":
        output = "Ismail-Benali (H3l!0s_T3k) - Cybersecurity Enthusiast & Developer";
        break;
      case "about":
        output = "Electrical Engineering student & security researcher bridging physical layers with advanced software tools.";
        break;
      case "projects":
        output = "Featured Projects: KuraiBot, InstaSneak, NatsuMacTool, InfoMagnet-X. Check out the Projects section above!";
        break;
      case "skills":
        output = "Python, Bash, Wireshark, Burp Suite, REST APIs, Linux, Git, Docker, TypeScript.";
        break;
      case "contact":
        output = "Email: ismail.benali@proton.me | GitHub: github.com/Ismail-Benali";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = `Command not found: '${cmd}'. Type 'help' for available commands.`;
    }

    setHistory([...newHistory, { type: "output", text: output }]);
    setInput("");
  };

  return (
    <Card className="bg-card/80 backdrop-blur-md border-border/80 shadow-2xl overflow-hidden font-mono text-sm">
      <div className="bg-secondary/80 px-4 py-2.5 flex items-center justify-between border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <TerminalIcon className="w-3.5 h-3.5 text-primary" />
          h3l10s@portfolio: ~
        </div>
        <div />
      </div>
      <CardContent className="p-4 sm:p-6 h-64 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          {history.map((item, idx) => (
            <div key={idx} className={item.type === "input" ? "text-primary font-semibold" : "text-muted-foreground"}>
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-border/60 pt-3">
          <span className="text-primary font-bold">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g. help)..."
            className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm placeholder:text-muted-foreground/50"
          />
          <button type="submit" className="p-1 text-primary hover:text-primary/80 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
