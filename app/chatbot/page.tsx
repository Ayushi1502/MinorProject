'use client';

import { useState, useRef, useEffect } from 'react';
import { MainLayout } from '@/components/main-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizonal, Bot, Mic, CornerDownLeft, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

let recognition: any;

export default function ChatbotPage() {
  const { user, updateCredits } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleVoiceInput = () => {
    if (!recognition) {
      toast.error('Speech recognition is not supported in your browser.');
      return;
    }
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      return;
    }
    setIsRecording(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
      handleSubmit(undefined, transcript);
    };
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };
  };

  const handleSubmit = async (e?: React.FormEvent, voiceInput?: string) => {
    if (e) e.preventDefault();
    const currentInput = (voiceInput || input).trim();
    if (!currentInput || isLoading) return;

    if (user && user.credits <= 0) {
      toast.error("You don't have enough credits to use the chatbot.");
      return;
    }

    const userMessage: Message = { role: 'user', parts: [{ text: currentInput }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const historyForApi = messages;
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: historyForApi, message: currentInput }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await res.json();
      const botMessage: Message = { role: 'model', parts: [{ text: data.text }] };
      setMessages((prev) => [...prev, botMessage]);

      // Deduct credit
      const creditRes = await fetch('/api/user/credits', { method: 'POST' });
      if (creditRes.ok) {
        const { credits } = await creditRes.json();
        updateCredits(credits);
      }

    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: 'Sorry, a technical error occurred. Please try again.' }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <header className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold">PathShala AI Chat</h1>
          <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <h2 className="text-sm font-semibold text-white">Credits Left</h2>
            </div>
            <div className="bg-primary/20 text-primary-foreground font-bold rounded-full px-3 py-0.5 text-sm ml-2">
              {user?.credits}
            </div>
          </div>
        </header>

        <div ref={scrollAreaRef} className="flex-grow overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <h1 className="text-4xl font-bold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-foreground/80 text-transparent bg-clip-text">
                    Hello, {user?.name || 'User'}
                  </h1>
                  <p className="mt-4 text-2xl text-muted-foreground">Ask PathShala AI</p>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-4"
                    >
                      <Avatar className={cn("h-8 w-8", msg.role === 'user' ? 'bg-primary' : 'bg-muted-foreground')}>
                        <AvatarImage src={msg.role === 'user' ? user?.image || undefined : '/pathshala-img.jpg'} />
                        <AvatarFallback>
                          {msg.role === 'user' ? user?.name?.[0].toUpperCase() : <Bot size={20} />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="prose dark:prose-invert max-w-none">
                        <Markdown>{msg.parts[0].text}</Markdown>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 mt-8"
              >
                <Avatar className="h-8 w-8 bg-muted-foreground">
                  <Bot size={20} className="animate-pulse" />
                </Avatar>
                <div className="flex items-center space-x-2 pt-2">
                  <div className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-foreground rounded-full animate-bounce"></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <form onSubmit={handleSubmit}>
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask PathShala AI"
                  className="w-full h-14 pl-6 pr-24 rounded-full bg-muted shadow-lg text-base focus-visible:ring-primary/50"
                  disabled={isLoading}
                />
                <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleVoiceInput}
                    className={cn("rounded-full", isRecording && "bg-red-500/20 text-red-500")}
                    disabled={isLoading}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button type="submit" size="icon" className="rounded-full" disabled={isLoading || !input.trim()}>
                    <SendHorizonal className="h-5 w-5" />
                  </Button>
                </div>
              </form>
              <p className="text-xs text-muted-foreground mt-2 ml-4 flex items-center gap-1">
                <CornerDownLeft size={12} />
                <span>Press Enter to send</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
