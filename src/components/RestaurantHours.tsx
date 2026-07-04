import { useState } from "react";
import { REST_HOURS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Sunrise, Sun, Music, Coffee, Flame, Heart, Sparkles, Moon } from "lucide-react";

export default function RestaurantHours() {
  const [activeCycle, setActiveCycle] = useState<number>(2); // Default to night

  const cycles = [
    {
      id: 0,
      name: "نسمة الصباح",
      time: "7:00 ص - 11:30 ص",
      days: "الجمعة والسبت",
      icon: Sunrise,
      vibe: "أجواء دافئة هادئة مع بخار القهوة الطازجة ونسمات الرياح الباردة.",
      music: "فيروزيات كلاسيكية هادئة تعيد توازن النفس والروح.",
      color: "from-amber-100 via-rose-100 to-amber-200 text-stone-900 border-amber-200/50",
      bgStyle: "bg-gradient-to-tr from-amber-500/10 via-rose-500/5 to-transparent",
      recs: ["قهوة جمارة الذهبية", "سلطة الجمارة المخملية", "خبز منفوخ دافئ بالزعتر"]
    },
    {
      id: 1,
      name: "غداء الملوك والصفوة",
      time: "12:00 م - 5:00 م",
      days: "طوال أيام الأسبوع",
      icon: Sun,
      vibe: "أشعة شمس منكسرة عبر النخيل الزجاجي، وإيقاع ضيافة نابض بالفخامة.",
      music: "تقاسيم عود هادئة دون صخب تناسب اجتماعات العمل العائلية الهامة.",
      color: "from-amber-400 via-yellow-200 to-amber-500 text-neutral-950 border-amber-400/40",
      bgStyle: "bg-gradient-to-tr from-amber-500/10 via-yellow-500/5 to-transparent",
      recs: ["ريش جمارة بالهيل", "حمص الكمأ المدخن", "إكسير الرمان المنعش"]
    },
    {
      id: 2,
      name: "ليالي جُمارة الكبرى",
      time: "6:00 م - 12:30 ص",
      days: "طوال أيام الأسبوع",
      icon: Moon,
      vibe: "إضاءة خافتة، لهب شموع، صوت شلال هادئ، ومذاق غني يفوق الخيال.",
      music: "عزف حي متكامل على العود والقانون لمقامات الطرب العربي الأصيل.",
      color: "from-indigo-900 via-amber-500 to-purple-900 text-amber-400 border-amber-500/30",
      bgStyle: "bg-gradient-to-tr from-indigo-950/40 via-amber-950/20 to-transparent",
      recs: ["كتف جمارة الملكي بالذهب", "برج الكنافة الذهبية", "إكسير الرمان الساحر"]
    }
  ];

  const active = cycles[activeCycle];

  return (
    <div className="py-16 px-4 md:px-8 bg-[#0b0b0b] relative border-t border-neutral-900">
      {/* Visual Starry / Glow backdrop */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-amber-400 font-medium text-xs md:text-sm uppercase tracking-wider block mb-2 font-sans">
            أوقات العمل والضيافة
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-white">
            أوقات استقبال <span className="gold-gradient-text font-extrabold">ضيوفنا</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base font-sans mt-2">
            نستقبلكم طوال أيام الأسبوع لنقدم لكم أشهى المأكولات العراقية الأصيلة والحلويات الفاخرة وسط أجواء بصرية ساحرة وطربية حية.
          </p>
        </div>

        {/* Circular Celestial/Timeline Toggle Controls */}
        <div className="flex flex-col md:flex-row gap-8 items-center bg-neutral-900/30 border border-neutral-800/80 p-8 rounded-3xl relative overflow-hidden">
          {/* Timeline Selectors (Right) */}
          <div className="w-full md:w-2/5 flex flex-col gap-4 font-sans order-2 md:order-1">
            {cycles.map((cycle, index) => {
              const CycleIcon = cycle.icon;
              const isSelected = activeCycle === index;

              return (
                <button
                  key={cycle.id}
                  onClick={() => setActiveCycle(index)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 border-amber-400 text-neutral-950 shadow-lg shadow-amber-500/10 scale-102"
                      : "bg-neutral-950/60 border-neutral-800/80 text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CycleIcon className={`w-5 h-5 ${isSelected ? "text-neutral-950" : "text-amber-500"}`} />
                  </div>
                  <div className="flex-1 pr-3">
                    <p className={`text-sm font-bold ${isSelected ? "text-neutral-950" : "text-white"}`}>{cycle.name}</p>
                    <p className={`text-[11px] ${isSelected ? "text-neutral-900" : "text-neutral-500"}`}>{cycle.time}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Cycle Details Viewer (Left) */}
          <div className="w-full md:w-3/5 order-1 md:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCycle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className={`p-6 md:p-8 rounded-2xl border bg-neutral-950/90 text-right ${active.bgStyle} border-neutral-800 relative`}
              >
                {/* Visual badge top */}
                <div className="absolute top-4 left-4 p-2 bg-amber-500/10 text-amber-500 rounded-full">
                  <active.icon className="w-6 h-6" />
                </div>

                <span className="text-[10px] text-amber-400 font-bold block uppercase mb-1 font-sans tracking-widest">
                  {active.days}
                </span>
                <h3 className="text-2xl font-bold font-serif text-white mb-2">{active.name}</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">{active.vibe}</p>

                {/* Live Music Specs */}
                <div className="flex items-center gap-3 justify-end text-xs text-amber-400 font-sans mb-5 pb-3 border-b border-neutral-900">
                  <span>المعزوفة: {active.music}</span>
                  <Music className="w-4 h-4 text-amber-500" />
                </div>

                {/* Recommendations */}
                <div className="mb-5">
                  <p className="text-[11px] text-neutral-500 font-sans mb-2 font-bold uppercase">الترشيحات الطهوية المثالية للمزاج الحالي:</p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {active.recs.map((rec, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 py-1 px-3 rounded-lg flex items-center gap-1 font-sans"
                      >
                        {rec}
                        <Sparkles className="w-3 h-3 text-amber-400" />
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
