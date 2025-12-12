import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendChatMessage, type ChatContext, type ChatMessage as ApiChatMessage } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { FARMS_DATA } from "@/lib/mock-data";

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export function AgroChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'assistant', 
      content: "Olá, produtor! 🌱 Sou o AgroGPT, sua IA Agrícola. Posso ajudar com análises de clima, cotações de mercado, recomendações de plantio e muito mais. Como posso ajudar?" 
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedFarmId } = useAppStore();
  const selectedFarm = FARMS_DATA.find(f => f.id === selectedFarmId) || FARMS_DATA[0];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    const userMsg: Message = { id: Date.now(), role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Build context from current farm data
      const context: ChatContext = {
        farmName: selectedFarm.name,
        farmLocation: selectedFarm.location,
        activeCrops: selectedFarm.activeCrops.map(c => c.name),
        weather: {
          temp: selectedFarm.weather.temp,
          condition: selectedFarm.weather.condition,
          humidity: selectedFarm.weather.humidity,
        },
      };

      // Build history from previous messages (last 10)
      const history: ApiChatMessage[] = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendChatMessage(userMessage, context, history);
      
      const aiMsg: Message = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        content: response.content
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Desculpe, houve um erro ao processar sua mensagem. Por favor, tente novamente."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 md:right-8 w-[350px] md:w-[400px] z-50"
          >
            <Card className="h-[500px] flex flex-col shadow-2xl border-primary/20 overflow-hidden">
              <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold font-outfit">AgroGPT</h3>
                    <p className="text-xs opacity-80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      {selectedFarm.name}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/20 text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4 bg-background" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-sm whitespace-pre-wrap ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-muted text-foreground rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground rounded-2xl rounded-tl-none p-3 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Faça uma pergunta..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button size="icon" onClick={handleSend} disabled={!input.trim() || isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
