import { useState } from "react";
import { MenuItem } from "../types";
import { MENU_ITEMS } from "../data";
import { Search, Flame, Clock, Star, ShieldAlert, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VisualMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function VisualMenu({ onAddToCart }: VisualMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "كل النكهات" },
    { id: "mains", name: "الأطباق الرئيسية" },
    { id: "appetizers", name: "المقبلات الفاخرة" },
    { id: "desserts", name: "الحلويات المعاصرة" },
    { id: "drinks", name: "المشروبات والإكسيرات" },
  ];

  // Filter logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const cleanSearch = searchQuery.trim().toLowerCase();
    const matchesSearch =
      cleanSearch === "" ||
      item.name.toLowerCase().includes(cleanSearch) ||
      item.englishName.toLowerCase().includes(cleanSearch) ||
      item.description.toLowerCase().includes(cleanSearch) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(cleanSearch));
    return matchesCategory && matchesSearch;
  });

  const handleCartAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1500);
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-[#0b0b0b] relative">
      {/* Visual background accents */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-emerald-500/3 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div className="text-right">
            <span className="text-amber-400 font-medium text-xs md:text-sm uppercase tracking-wider block mb-2 font-sans">
              قائمة طعام استثنائية
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white">
              منيو <span className="gold-gradient-text font-extrabold text-glowing-dynamic">جُمارة</span> الملكي
            </h2>
          </div>

          {/* Smart Search Bar */}
          <div className="relative w-full md:w-80 font-sans">
            <input
              type="text"
              placeholder="ابحث عن طبق أو مكون سرّي..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pr-11 pl-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-500 focus:outline-none text-sm text-neutral-200 transition-colors text-right"
            />
            <Search className="absolute right-4 top-3.5 w-4 h-4 text-neutral-500" />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex overflow-x-auto pb-4 gap-2 border-b border-neutral-900 mb-10 no-scrollbar font-sans">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`py-2.5 px-6 rounded-full text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? "glowing-shifting-gradient text-neutral-950 font-bold shadow-lg"
                  : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800/80 hover:border-amber-500/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="bg-neutral-900/45 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col group hover:-translate-y-1.5 shadow-xl shadow-black/40"
              >
                {/* Visual Thumbnail Container */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>

                  {/* Top features */}
                  {item.featured && (
                    <div className="absolute top-4 right-4 glowing-shifting-gradient text-neutral-950 text-[10px] font-bold font-sans py-1 px-3.5 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                      <Star className="w-3 h-3 fill-neutral-950" />
                      موصى به
                    </div>
                  )}

                  {/* Price sticker */}
                  <div className="absolute bottom-4 left-4 bg-neutral-900/90 backdrop-blur-md border border-amber-500/30 text-amber-400 text-lg font-bold font-sans py-1.5 px-3.5 rounded-xl shadow-lg border-glowing-dynamic">
                    {item.price.toLocaleString()} <span className="text-xs font-normal text-amber-200">د.ع</span>
                  </div>
                </div>

                {/* Content block */}
                <div className="p-6 flex-1 flex flex-col justify-between text-right">
                  <div>
                    {/* Title */}
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 text-amber-400 text-xs font-sans font-bold">
                        <span>{item.rating}</span>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </div>
                    </div>

                    <p className="text-xs text-amber-500/70 font-sans font-medium mb-3 tracking-wide block dir-ltr">
                      {item.englishName}
                    </p>

                    {/* Desc */}
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-neutral-800/40 text-neutral-400 font-sans text-xs">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span>{item.preparationTime}</span>
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <span>{item.calories} سعرة</span>
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                    </div>

                    {/* Ingredients tags */}
                    <div className="flex flex-wrap gap-1.5 justify-end mb-4 font-sans">
                      {item.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-neutral-950 text-neutral-400 border border-neutral-800/60 py-0.5 px-2 rounded-md"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Addons and Button */}
                  <div className="pt-2 flex flex-col gap-3 font-sans">
                    {/* Allergens warning */}
                    {item.allergens.length > 0 && (
                      <div className="flex items-center justify-end gap-1 text-[10px] text-amber-500/80 bg-amber-500/5 px-2.5 py-1 rounded-md border border-amber-500/10">
                        <span>مسببات الحساسية: {item.allergens.join("، ")}</span>
                        <ShieldAlert className="w-3 h-3" />
                      </div>
                    )}

                    {/* Action button */}
                    <button
                      onClick={() => handleCartAdd(item)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        addedItemId === item.id
                          ? "bg-emerald-500 text-neutral-950"
                          : "bg-neutral-950 border border-amber-500/30 hover:border-amber-400 text-amber-400 hover:bg-neutral-800/50"
                      }`}
                    >
                      {addedItemId === item.id ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          تمت الإضافة للسلة
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          أضف لطلبك الملكي
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No results message */}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-16 bg-neutral-950/20 rounded-3xl border border-neutral-900">
              <p className="text-neutral-400 font-sans text-sm mb-2">عذراً، لم نعثر على أي طبق يطابق خيار البحث.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery(" ");
                }}
                className="text-amber-400 text-xs font-bold underline font-sans cursor-pointer"
              >
                عرض كافة الأطباق الفاخرة
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
