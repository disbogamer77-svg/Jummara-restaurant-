import { motion } from "motion/react";
import { Clock, MapPin, Phone, Sparkles, Utensils, CalendarDays } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (tab: "menu" | "booking" | "assistant" | "order") => void;
  isOpenNow: boolean;
}

export default function HeroSection({ onNavigate, isOpenNow }: HeroSectionProps) {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden py-16 px-4">
      {/* Background Image with warm overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/jumara_hero_restaurant_1783178632142.jpg"
          alt="مطعم جمارة الفاخر"
          className="w-full h-full object-cover scale-105 filter brightness-35 contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b]/40 via-transparent to-[#0b0b0b]/40"></div>
      </div>

      {/* Decorative Gold Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-amber-500/30 rounded-tl-3xl hidden md:block"></div>
      <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-amber-500/30 rounded-tr-3xl hidden md:block"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-amber-500/30 rounded-bl-3xl hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-amber-500/30 rounded-br-3xl hidden md:block"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        {/* Subtitle / Elegant Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-amber-200 tracking-wider font-sans">
            أصالة المشرق بلمسة ذهبية معاصرة
          </span>
        </motion.div>

        {/* Grand Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold font-serif mb-6 tracking-tight leading-none"
        >
          مطعم <span className="gold-gradient-text block mt-2 md:inline md:mt-0 font-extrabold">جُمارة</span>
        </motion.h1>

        {/* Elegant Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base md:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-10 font-sans px-4"
        >
          نرحب بكم في مطعم جُمارة الفاخر بالبصرة، حيث تجتمع أصالة الضيافة العراقية مع أطباق الشواء والمسكوف الأصيل على ضفاف شط العرب.
        </motion.p>

        {/* Interactive Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 mb-12 justify-center items-center"
        >
          {/* Reserve a table */}
          <button
            onClick={() => onNavigate("booking")}
            className="w-full sm:w-52 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-neutral-950 font-bold font-sans transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <CalendarDays className="w-5 h-5" />
            حجز طاولة تفاعلية
          </button>

          {/* Online Ordering */}
          <button
            onClick={() => onNavigate("order")}
            className="w-full sm:w-52 py-4 px-6 rounded-xl bg-neutral-900/95 border border-amber-500/50 hover:border-amber-400 text-amber-400 font-bold font-sans transition-all duration-300 hover:bg-neutral-800/90 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Utensils className="w-5 h-5" />
            الطلب عبر الإنترنت
          </button>
        </motion.div>

        {/* Quick Specs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 w-full max-w-3xl font-sans"
        >
          {/* Spec 1: Hours */}
          <div className="flex items-center gap-4 text-right border-b border-neutral-800 md:border-b-0 md:border-l md:border-neutral-800 pb-4 md:pb-0 md:pl-6">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">أوقات العمل</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">12:00 م - 12:00 ص</p>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isOpenNow ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"}`}></span>
                <span className="text-[11px] text-neutral-300">{isOpenNow ? "مفتوح الآن" : "مغلق الآن"}</span>
              </div>
            </div>
          </div>

          {/* Spec 2: Location */}
          <div className="flex items-center gap-4 text-right border-b border-neutral-800 md:border-b-0 md:border-l md:border-neutral-800 pb-4 md:pb-0 md:pl-6">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">الموقع والعنوان</p>
              <p className="text-sm font-semibold">البصرة، كورنيش شط العرب</p>
            </div>
          </div>

          {/* Spec 3: Phone */}
          <div className="flex items-center gap-4 text-right">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">الحجز والاستفسار</p>
              <p className="text-sm font-semibold dir-ltr">+964 770 123 4567</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
