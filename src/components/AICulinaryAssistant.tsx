import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Sparkles, AlertCircle, Bot, User, ChefHat, HelpCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AICulinaryAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      content: "أهلاً بك يا ضيف جُمارة المبجل! 🌟 أنا 'الشيف جُمارة'، مستشارك الخاص ومضيفك الطهوي في هذا الصرح الاستثنائي.\n\nيسرني مساحتك لاستكشاف خبايا المطبخ العربي المعاصر وأسرار توابلنا الملكية. هل تود أن أقترح عليك وجبة تليق بمزاجك؟ أم ترغب بمعرفة تفاصيل مكونات مائدتنا وسيكولوجيا نكهاتها؟ تفضل بطرح رغباتك وسأجيبك بكل حب وشغف.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Fast suggested questions to interact instantly
  const suggestedQuestions = [
    "اقترح لي عشاء رومانسي مدهش شخصين",
    "ما هي قصة اسم مطعم جُمارة؟",
    "هل طبق حمص الكمأ يحتوي على الغلوتين؟",
    "حدثني عن بهارات كتف جمارة الملكي"
  ];

  // Send message handler
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map history for API
      const apiHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: apiHistory
        })
      });

      if (!res.ok) {
        throw new Error("فشل الاتصال بخادم الشيف.");
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: data.text || data.fallbackText || "أهلاً بك في جمارة. أنا بخدمتك دائماً.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Error communicating with chef:", err);
      setErrorText("عذراً، يبدو أن الشيف جمارة منشغل بتزيين كتف الخروف بالذهب الآن. يمكنك إعادة المحاولة بعد قليل.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-[#0b0b0b] relative">
      <div className="max-w-4xl mx-auto flex flex-col min-h-[75vh] bg-neutral-900/40 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Chat Header */}
        <div className="bg-neutral-950 border-b border-neutral-800/80 p-5 flex flex-row-reverse items-center justify-between">
          <div className="flex items-center gap-3 flex-row-reverse text-right">
            <div className="p-2.5 bg-amber-500/15 border border-amber-500/20 text-amber-500 rounded-full animate-pulse">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold font-serif text-white">الشيف جُمارة</h3>
              <p className="text-[10px] text-amber-400 font-sans font-semibold">مستشار الضيافة والذكاء الطهوي المعاصر</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-sans">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            <span>متصل ومستعد لإبهارك</span>
          </div>
        </div>

        {/* Message Container Area */}
        <div className="flex-1 p-6 overflow-y-auto max-h-[50vh] min-h-[350px] space-y-5 bg-neutral-950/20">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isModel = msg.role === "model";
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  key={msg.id}
                  className={`flex gap-3 w-full max-w-[85%] ${isModel ? "mr-0 ml-auto flex-row" : "ml-0 mr-auto flex-row-reverse"}`}
                >
                  {/* Icon profile */}
                  <div className={`p-2 rounded-full h-9 w-9 shrink-0 flex items-center justify-center border ${isModel ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-neutral-800 border-neutral-700 text-neutral-300"}`}>
                    {isModel ? <ChefHat className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>

                  {/* Bubble body */}
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed text-right font-sans shadow-md ${
                    isModel 
                      ? "bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-tr-none" 
                      : "bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-neutral-950 rounded-tl-none font-bold"
                  }`}>
                    {/* Preserve linebreaks for elegant poetry formats */}
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span className={`text-[9px] block mt-2 text-left ${isModel ? "text-neutral-500" : "text-neutral-900/70"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing state */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 w-full max-w-[80%] mr-0 ml-auto"
            >
              <div className="p-2 rounded-full h-9 w-9 bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl rounded-tr-none flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-200"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-300"></span>
              </div>
            </motion.div>
          )}

          {/* Error panel */}
          {errorText && (
            <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-400 rounded-2xl text-xs flex items-center gap-2 justify-end font-sans">
              <span>{errorText}</span>
              <AlertCircle className="w-4 h-4" />
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* Suggested prompts area */}
        <div className="px-6 py-4 border-t border-neutral-800/60 bg-neutral-950/40 text-right">
          <p className="text-[10px] text-neutral-500 font-sans mb-2 font-bold flex items-center gap-1 justify-end">
            أسئلة مقترحة لتبدأ حوارك الطهوي:
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          </p>
          <div className="flex overflow-x-auto pb-1 gap-2 no-scrollbar font-sans">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 rounded-lg shrink-0 transition-colors cursor-pointer select-none"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="p-4 bg-neutral-950 border-t border-neutral-800 flex gap-3 font-sans"
        >
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-amber-500 text-neutral-950 rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50 disabled:hover:bg-amber-500 flex items-center justify-center shrink-0 cursor-pointer shadow-lg shadow-amber-500/10"
          >
            <Send className="w-5 h-5 rotate-180" />
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اسأل الشيف جُمارة عن النكهات أو الترشيحات الملكية..."
            className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-500 focus:outline-none text-sm text-neutral-200 text-right"
          />
        </form>
      </div>
    </div>
  );
}
