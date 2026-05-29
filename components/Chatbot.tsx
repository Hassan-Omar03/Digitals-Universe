"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "@/components/StaticMotion"
import { Send, Bot, X } from "lucide-react"

interface Message {
  id: string
  role: "bot" | "user"
  content: string
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Hello! I am NexaBot, your professional AI assistant. How can I help you transform your business today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }, [messages, isTyping])

  const quickOptions = [
    "What services do you offer?",
    "How much does a website cost?",
    "Show me your previous work",
    "I want to speak to a human"
  ]

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: userText }
    
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const systemPrompt = `You are "NexaBot", a highly intelligent, conversational AI assistant for "Digital Universe", a premium digital agency based in Dubai, UAE. 
You chat just like ChatGPT—natural, helpful, and highly articulate—but your sole focus is representing Digital Universe and our digital services.

### About Digital Universe:
- Stats: 500+ Projects Completed, 300+ Happy Clients, 10+ Years Experience, 98% Success Rate.
- Contact: +971 52 274 0909 | hello@digitaluniverse.agency | Dubai, UAE.

### Core Services:
1. Web Development: Custom UI/UX, Corporate sites, E-commerce (Shopify), Booking systems, Speed Optimization.
2. Digital Marketing: SEO, Social Media, Google/Facebook/TikTok/LinkedIn Ads, Lead Generation.
3. Graphics & Branding: Logo Design, Social Media Graphics, Photo Editing.
4. Video & 3D Animation: Video Editing, Short-form content (Reels/TikToks), 3D Animation.
5. Business Consulting & Audio Production.

### Conversational Guidelines:
- Tone: Professional, enthusiastic, and human-like. Give thoughtful, detailed answers just like ChatGPT would.
- Context: Only recommend services listed above. If they ask about our past work, mention we have a Featured Projects section.
- Routing: If they ask for prices/payments, direct them to our Secure Checkout. If they want to talk to a human, tell them to use the floating WhatsApp or Call buttons.
- Formatting: Reply in plain text ONLY. Do NOT use markdown like asterisks (**bold**) or hashes (#). Use standard spacing and dashes (-) for lists if needed.`;

      // Limit history to the last 3 messages to prevent URL from getting too long
      const recentMessages = messages.slice(-3);
      const conversationHistory = recentMessages
        .map((m) => `${m.role === "bot" ? "NexaBot" : "User"}: ${m.content}`)
        .join("\n");

      const aiPrompt = `${systemPrompt}\n\nConversation History:\n${conversationHistory}\nUser: ${userText}\nNexaBot:`;

      // Use GET request, which reliably returns text data and avoids silent POST failures
      const response = await fetch(`https://text.pollinations.ai/prompt/${encodeURIComponent(aiPrompt)}`);
      
      let botReply = await response.text();
      
      // Reliably remove the API warning message by finding exactly where it ends
      if (botReply.includes("IMPORTANT NOTICE") && botReply.includes("pollinations.ai")) {
        const marker = "normally.";
        const markerIndex = botReply.indexOf(marker);
        if (markerIndex !== -1) {
          botReply = botReply.substring(markerIndex + marker.length);
        }
      }
      
      botReply = botReply.trim();
      
      // Sometimes the AI prefixes its response with its own name
      botReply = botReply.replace(/^nexabot\s*:\s*/i, "");

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botReply || "I'm here to help you navigate our digital services! How can I assist?",
      }
      
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("AI Error:", error)
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "bot", content: "I'm having a little trouble connecting right now. Please use the WhatsApp button to chat with our human experts!" }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(input)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-28 right-6 z-50 w-[90vw] max-w-[380px] h-[550px] max-h-[70vh] bg-neutral-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3d7ec7] to-[#8bbef0] flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white leading-tight tracking-wide">NexaBot</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs text-neutral-400 font-medium">Online & Ready</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors outline-none">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {messages.map((msg) => (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {msg.role === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-auto">
                    <Bot className="w-4 h-4 text-[#5a9de0]" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-[#3d7ec7] text-white rounded-br-sm" : "bg-white/10 text-neutral-200 border border-white/5 rounded-bl-sm"}`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-auto">
                  <Bot className="w-4 h-4 text-[#5a9de0]" />
                </div>
                <div className="bg-white/10 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options */}
          {messages.length < 3 && !isTyping && (
            <div className="px-5 pb-3 flex flex-wrap gap-2 border-t border-white/5 pt-3 bg-black/20">
              {quickOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(option)}
                  className="text-xs bg-white/10 hover:bg-[#3d7ec7]/80 border border-white/10 text-neutral-200 px-3 py-1.5 rounded-full transition-colors text-left outline-none"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Input Field */}
          <div className="p-4 border-t border-white/10 bg-black/40">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask NexaBot..." className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#3d7ec7]/50 focus:bg-white/10 transition-all" />
              <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-1.5 w-10 h-10 rounded-full bg-[#3d7ec7] hover:bg-[#5a9de0] disabled:bg-neutral-600 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors outline-none">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
