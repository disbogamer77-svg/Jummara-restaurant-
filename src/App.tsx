/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MenuItem, CartItem } from "./types";
import { TESTIMONIALS } from "./data";

// Component imports
import HeroSection from "./components/HeroSection";
import VisualMenu from "./components/VisualMenu";
import OnlineOrdering from "./components/OnlineOrdering";
import TableBooking from "./components/TableBooking";
import RestaurantHours from "./components/RestaurantHours";
import AICulinaryAssistant from "./components/AICulinaryAssistant";

import { motion, AnimatePresence } from "motion/react";
import {
  UtensilsCrossed,
  ShoppingBag,
  CalendarDays,
  Sparkles,
  Volume2,
  VolumeX,
  MessageSquareCode,
  Compass,
  Star,
  Flame,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "menu" | "booking" | "assistant" | "order">("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);

  // Sync scroll on tab change to guarantee polished layout
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Sound effects simulator to trigger delightful audio response on click (using web audio synth)
  const playClickSound = () => {
    if (!isSoundOn) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // high pure gold chime
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      console.warn("Audio Context blocked or not supported yet:", e);
    }
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    playClickSound();
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prev.map((c) => (c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    playClickSound();
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.menuItem.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    playClickSound();
    setCart((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigateTo = (tab: "home" | "menu" | "booking" | "assistant" | "order") => {
    playClickSound();
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0b0b0b] text-neutral-100 selection:bg-amber-500 selection:text-neutral-950 relative">
      


      {/* Floating AI Chef shortcut */}
      {activeTab !== "assistant" && (
        <div className="fixed bottom-24 right-6 z-50">
          <button
            onClick={() => navigateTo("assistant")}
            className="p-3.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-neutral-950 shadow-xl shadow-amber-500/10 flex items-center justify-center border border-amber-400 transition-all hover:scale-110 active:scale-95 cursor-pointer animate-bounce"
            title="مساعد الشيف جمارة الذكي"
          >
            <MessageSquareCode className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Grand Luxury Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-row-reverse">
          
          {/* Logo & Calligraphy Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("home")}>
            <div className="text-right">
              <span className="text-[10px] font-sans text-amber-400 font-bold block leading-none tracking-widest uppercase">
                مطعم شرقي معاصر
              </span>
              <h1 className="text-2xl md:text-3xl font-bold font-serif gold-gradient-text tracking-tight">
                جُمارة
              </h1>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-neutral-950 flex items-center justify-center shadow-lg border border-amber-400/40">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 flex-row-reverse text-sm font-semibold font-sans text-neutral-400">
            <button
              onClick={() => navigateTo("home")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "home" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "hover:text-neutral-200"}`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => navigateTo("menu")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "menu" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "hover:text-neutral-200"}`}
            >
              منيو جمارة
            </button>
            <button
              onClick={() => navigateTo("booking")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "booking" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "hover:text-neutral-200"}`}
            >
              حجز مائدة تفاعلية
            </button>
            <button
              onClick={() => navigateTo("assistant")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "assistant" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 text-amber-400" : "hover:text-neutral-200"}`}
            >
              مساعد الشيف الذكي
            </button>
          </nav>

          {/* Action Area (Cart, Book Button) */}
          <div className="flex items-center gap-3">
            {/* Online Order Cart Trigger */}
            <button
              onClick={() => navigateTo("order")}
              className={`relative p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                totalCartCount > 0
                  ? "bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/10 scale-102"
                  : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-amber-500/30"
              }`}
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 border-2 border-neutral-950 text-[10px] font-bold font-sans text-white flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Book Now Quick trigger */}
            <button
              onClick={() => navigateTo("booking")}
              className="hidden sm:flex items-center gap-1.5 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-neutral-950 font-bold text-xs font-sans shadow-md hover:shadow-lg hover:scale-103 transition-all cursor-pointer"
            >
              <CalendarDays className="w-4 h-4" />
              احجز مائدتك الآن
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* VIEW TAB SWITCHER */}
            {activeTab === "home" && (
              <>
                {/* 1. Welcoming Hero banner */}
                <HeroSection onNavigate={(tab) => navigateTo(tab)} isOpenNow={isOpenNow} />

                {/* 2. Restaurant Hours */}
                <RestaurantHours />

                {/* 3. Testimonials Board */}
                <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#0b0b0b] to-[#121212] border-t border-neutral-900">
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                      <span className="text-amber-400 font-medium text-xs md:text-sm uppercase tracking-wider block mb-2 font-sans">
                        آراء النخبة والرواد
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold font-serif text-white">
                        ماذا قالوا عن تجربة <span className="gold-gradient-text font-extrabold">جُمارة</span>؟
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {TESTIMONIALS.map((t) => (
                        <div
                          key={t.id}
                          className="p-6 bg-neutral-900/30 border border-neutral-800/80 rounded-2xl text-right font-sans flex flex-col justify-between"
                        >
                          <div>
                            {/* Stars rating */}
                            <div className="flex justify-end gap-1 mb-3">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < Math.floor(t.rating)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-neutral-700"
                                  }`}
                                />
                              ))}
                            </div>

                            <p className="text-xs text-neutral-300 leading-relaxed italic mb-4">
                              "{t.comment}"
                            </p>
                          </div>

                          <div className="flex justify-between items-center border-t border-neutral-850 pt-3">
                            <span className="text-[10px] text-neutral-500">{t.date}</span>
                            <span className="text-xs font-bold text-white">{t.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "menu" && <VisualMenu onAddToCart={handleAddToCart} />}

            {activeTab === "booking" && <TableBooking />}

            {activeTab === "assistant" && <AICulinaryAssistant />}

            {activeTab === "order" && (
              <OnlineOrdering
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onNavigate={(tab) => navigateTo(tab)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation footer for Mobile devices (Tab bar style) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-neutral-950/95 border-t border-amber-500/30 backdrop-blur-md z-40 py-3 px-4 flex justify-around items-center shadow-[0_-15px_35px_rgba(0,0,0,0.9)] font-sans text-[11px]">
        <button
          onClick={() => navigateTo("home")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 ${activeTab === "home" ? "text-amber-400 font-bold scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "text-neutral-300 hover:text-amber-400"}`}
        >
          <Compass className={`w-6 h-6 ${activeTab === "home" ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
          <span>الرئيسية</span>
        </button>

        <button
          onClick={() => navigateTo("menu")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 ${activeTab === "menu" ? "text-amber-400 font-bold scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "text-neutral-300 hover:text-amber-400"}`}
        >
          <UtensilsCrossed className={`w-6 h-6 ${activeTab === "menu" ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
          <span>المنيو</span>
        </button>

        <button
          onClick={() => navigateTo("booking")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 relative px-2.5 py-1 rounded-xl ${activeTab === "booking" ? "text-amber-400 font-bold scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "text-neutral-300 hover:text-amber-400 bg-amber-500/10 border border-amber-500/25 shadow-[0_0_10px_rgba(245,158,11,0.15)] animate-pulse"}`}
        >
          <CalendarDays className={`w-6 h-6 ${activeTab === "booking" ? "stroke-[2.5px]" : "stroke-[2px] text-amber-400"}`} />
          <span>الحجز التفاعلي</span>
        </button>

        <button
          onClick={() => navigateTo("assistant")}
          className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 relative px-2.5 py-1 rounded-xl ${activeTab === "assistant" ? "text-amber-400 font-bold scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "text-neutral-300 hover:text-amber-400 bg-amber-500/10 border border-amber-500/25 shadow-[0_0_10px_rgba(245,158,11,0.15)] animate-pulse"}`}
        >
          <MessageSquareCode className={`w-6 h-6 ${activeTab === "assistant" ? "stroke-[2.5px]" : "stroke-[2px] text-amber-400"}`} />
          <span>مستشار الذكاء</span>
        </button>

        <button
          onClick={() => navigateTo("order")}
          className={`relative flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 ${activeTab === "order" ? "text-amber-400 font-bold scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "text-neutral-300 hover:text-amber-400"}`}
        >
          <ShoppingBag className={`w-6 h-6 ${activeTab === "order" ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
          <span>السلة</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-[8px] font-bold rounded-full text-white flex items-center justify-center border border-neutral-950 shadow-md shadow-red-500/30 animate-bounce">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* Majestic Grand Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 px-4 md:px-8 pb-20 lg:pb-12 text-center md:text-right font-sans text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Column 1: Info */}
          <div className="md:col-span-5 text-center md:text-right flex flex-col items-center md:items-end gap-3">
            <h4 className="text-base font-bold text-white font-serif gold-gradient-text">مطعم جُمارة الفاخر</h4>
            <p className="leading-relaxed max-w-sm text-neutral-400">
              نهتم بنواة النخلة ولذة المذاق الفاخر. ندمج الكرم والبهارات المشرقية السبعة بأحدث أساليب الطهو المعاصر لإصدار أطباق خالدة تلامس براعم التذوق وتثري الذاكرة الإنسانية.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">الوصول السريع</h5>
            <div className="flex flex-col gap-2 text-neutral-400">
              <button onClick={() => navigateTo("home")} className="hover:text-amber-400 transition-colors text-right cursor-pointer">الرئيسية</button>
              <button onClick={() => navigateTo("menu")} className="hover:text-amber-400 transition-colors text-right cursor-pointer">قائمة المأكولات الملكية</button>
              <button onClick={() => navigateTo("booking")} className="hover:text-amber-400 transition-colors text-right cursor-pointer">حجز طاولة بجوار شلال النخل</button>
              <button onClick={() => navigateTo("assistant")} className="hover:text-amber-400 transition-colors text-right cursor-pointer">دردشة مع الشيف جمارة AI</button>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">التواصل والخدمة</h5>
            <p className="text-neutral-400">البصرة، كورنيش شط العرب، جمهورية العراق</p>
            <p className="text-neutral-400 font-sans dir-ltr">+964 770 123 4567</p>
            <p className="text-neutral-400 font-sans">contact@jumara-restaurant.com</p>
          </div>
        </div>

        {/* Copy rights and wax seal */}
        <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p>© {new Date().getFullYear()} مطعم جُمارة الفاخر. كافة الحقوق محفوظة ومحمية بموجب الكرم والضيافة المشرقية.</p>
          <div className="flex gap-2 text-neutral-400 text-[10px]">
            <span>التصميم البشري الذكي</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">عبر الذكاء الاصطناعي الفاخر لـ Google</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
