import React, { useState } from "react";
import { CartItem } from "../types";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, User, Phone, MapPin, Sparkles, Receipt, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OnlineOrderingProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigate: (tab: "menu" | "booking" | "assistant" | "order") => void;
}

export default function OnlineOrdering({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}: OnlineOrderingProps) {
  // Local checkout state
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "status">("cart");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [orderId, setOrderId] = useState("");
  const [deliveryProgress, setDeliveryProgress] = useState(0);

  // Custom toppings state for fun luxury element
  const [extraGold, setExtraGold] = useState<boolean>(false);
  const [extraTruffle, setExtraTruffle] = useState<boolean>(false);

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const addonCost = (extraGold ? 15000 : 0) + (extraTruffle ? 10000 : 0);
  const vat = Math.round((subtotal + addonCost) * 0.15); // 15% VAT
  const deliveryFee = subtotal > 100000 ? 0 : 5000; // Free delivery over 100,000 IQD
  const total = subtotal > 0 ? subtotal + addonCost + vat + deliveryFee : 0;

  // Handle order submission
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("الرجاء تعبئة البيانات المطلوبة لإكمال طلبكم.");
      return;
    }

    // Generate random serial number
    const serialNum = "JM-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(serialNum);
    setCheckoutStep("status");

    // Simulate progress trigger
    setDeliveryProgress(1); // Prepared
    const interval = setInterval(() => {
      setDeliveryProgress((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          return 4;
        }
        return prev + 1;
      });
    }, 4500); // Progresses every 4.5s
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutStep("cart");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setSpecialNote("");
    setExtraGold(false);
    setExtraTruffle(false);
    setDeliveryProgress(0);
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-[#0b0b0b]">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-amber-400 font-medium text-xs md:text-sm uppercase tracking-wider block mb-2 font-sans">
            الطلب السريع والتوصيل
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-white">
            الطلب الإلكتروني <span className="gold-gradient-text font-extrabold">المباشر</span>
          </h2>
        </div>

        {/* Dynamic checkout steps indicator */}
        <div className="flex justify-center items-center gap-4 mb-10 max-w-lg mx-auto font-sans text-xs md:text-sm">
          <div className="flex items-center gap-1.5">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold border ${checkoutStep === "cart" ? "bg-amber-500 border-amber-500 text-neutral-950" : "bg-neutral-900 border-neutral-800 text-neutral-400"}`}>1</span>
            <span className={checkoutStep === "cart" ? "text-amber-400 font-bold" : "text-neutral-500"}>سلة المشتريات</span>
          </div>
          <div className="w-12 h-[1px] bg-neutral-800"></div>
          <div className="flex items-center gap-1.5">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold border ${checkoutStep === "shipping" ? "bg-amber-500 border-amber-500 text-neutral-950" : "bg-neutral-900 border-neutral-800 text-neutral-400"}`}>2</span>
            <span className={checkoutStep === "shipping" ? "text-amber-400 font-bold" : "text-neutral-500"}>بيانات التوصيل</span>
          </div>
          <div className="w-12 h-[1px] bg-neutral-800"></div>
          <div className="flex items-center gap-1.5">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold border ${checkoutStep === "status" ? "bg-amber-500 border-amber-500 text-neutral-950" : "bg-neutral-900 border-neutral-800 text-neutral-400"}`}>3</span>
            <span className={checkoutStep === "status" ? "text-amber-400 font-bold" : "text-neutral-500"}>حالة الطلب</span>
          </div>
        </div>

        {/* Interactive Layout Switcher */}
        <AnimatePresence mode="wait">
          {/* STEP 1: CART DISPLAY */}
          {checkoutStep === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans"
            >
              {cart.length === 0 ? (
                /* Empty Cart */
                <div className="col-span-full text-center py-20 bg-neutral-900/30 border border-neutral-900 rounded-3xl flex flex-col items-center">
                  <div className="p-5 bg-amber-500/10 text-amber-500 rounded-full mb-4">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-serif">السلة فارغة حالياً</h3>
                  <p className="text-neutral-400 text-sm max-w-md leading-relaxed mb-8">
                    تصفح قائمة الطعام الفاخرة وأضف وجباتك المفضلة لبدء طلبك المباشر.
                  </p>
                  <button
                    onClick={() => onNavigate("menu")}
                    className="py-3 px-8 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    تصفح المنيو الآن
                  </button>
                </div>
              ) : (
                /* Cart Content */
                <>
                  {/* Cart Items list */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-2xl">
                      <div className="flex justify-between items-center pb-4 border-b border-neutral-800/60 mb-4">
                        <span className="text-xs text-neutral-400">تعديل طلب الضيافة</span>
                        <h3 className="text-sm font-bold text-white">الأطباق المختارة</h3>
                      </div>

                      <div className="flex flex-col gap-5">
                        {cart.map((item) => (
                          <div key={item.menuItem.id} className="flex gap-4 items-center justify-between pb-4 border-b border-neutral-800/30 last:border-0 last:pb-0">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800/80 p-1.5 rounded-xl">
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral-800 text-amber-500 rounded transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-sm font-bold text-neutral-200 w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                                className="p-1 hover:bg-neutral-800 text-amber-500 rounded transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Middle specs */}
                            <div className="flex-1 text-right">
                              <h4 className="text-sm font-bold text-white mb-1">{item.menuItem.name}</h4>
                              <p className="text-xs text-amber-500/80 mb-1">{(item.menuItem.price * item.quantity).toLocaleString()} د.ع</p>
                              <span className="text-[10px] text-neutral-500 block">وقت التجهيز: {item.menuItem.preparationTime}</span>
                            </div>

                            {/* Image & trash */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => onRemoveItem(item.menuItem.id)}
                                className="text-neutral-500 hover:text-red-400 p-1 rounded hover:bg-neutral-950 transition-colors cursor-pointer"
                                title="إزالة من السلة"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <img
                                src={item.menuItem.image}
                                alt={item.menuItem.name}
                                className="w-14 h-14 rounded-xl object-cover border border-neutral-800"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rich Psychological Luxury Add-ons (Gold & Truffle) */}
                    <div className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-2xl text-right border-glowing-dynamic">
                      <h4 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2 justify-end">
                        خصائص الإبهار الملكية (إضافات اختيارية)
                        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                        هل ترغب في مضاعفة هرمونات السعادة والتأثير النفسي المبهر على ضيوفك؟ يمكنك تعزيز الطلب بإضافاتنا الحصرية عيار 24 والكمأ الإيطالي.
                      </p>

                      <div className="flex flex-col gap-3">
                        <label className="flex items-center justify-between p-3 bg-neutral-950/60 border border-neutral-850 rounded-xl cursor-pointer hover:border-amber-500/30 transition-all select-none">
                          <span className="text-xs text-amber-400 font-bold font-sans">+15,000 د.ع</span>
                          <div className="flex items-center gap-3 flex-1 justify-end pl-4">
                            <div className="text-right">
                              <p className="text-xs font-bold text-white">إضافة غبار الذهب عيار 24 الصالح للأكل</p>
                              <p className="text-[10px] text-neutral-500">تزيين يدوي يعكس الهيبة والكرم الملكي العريق</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={extraGold}
                              onChange={(e) => setExtraGold(e.target.checked)}
                              className="accent-amber-500 w-4 h-4 cursor-pointer"
                            />
                          </div>
                        </label>

                        <label className="flex items-center justify-between p-3 bg-neutral-950/60 border border-neutral-850 rounded-xl cursor-pointer hover:border-amber-500/30 transition-all select-none">
                          <span className="text-xs text-amber-400 font-bold font-sans">+10,000 د.ع</span>
                          <div className="flex items-center gap-3 flex-1 justify-end pl-4">
                            <div className="text-right">
                              <p className="text-xs font-bold text-white">إضافة رقائق الكمأ الأسود الإيطالي الطازج</p>
                              <p className="text-[10px] text-neutral-500">يعزز رائحة الأطباق بترابية غنية تأسر الحواس</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={extraTruffle}
                              onChange={(e) => setExtraTruffle(e.target.checked)}
                              className="accent-amber-500 w-4 h-4 cursor-pointer"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary & Pricing */}
                  <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl text-right border-glowing-dynamic">
                    <h3 className="text-sm font-bold text-white pb-3 border-b border-neutral-800 mb-4">فاتورة المذاق الملكي</h3>

                    <div className="flex flex-col gap-3.5 text-xs text-neutral-300 pb-4 border-b border-neutral-800/60">
                      <div className="flex justify-between">
                        <span className="font-bold text-neutral-200 font-sans">{subtotal.toLocaleString()} د.ع</span>
                        <span>قيمة الأطباق</span>
                      </div>

                      {addonCost > 0 && (
                        <div className="flex justify-between">
                          <span className="font-bold text-amber-400 font-sans">+{addonCost.toLocaleString()} د.ع</span>
                          <span>إضافات الفخامة والذهب</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="font-bold text-neutral-200 font-sans">{vat.toLocaleString()} د.ع</span>
                        <span>ضريبة القيمة المضافة (15%)</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-bold text-neutral-200 font-sans">
                          {deliveryFee === 0 ? "مجاني" : `${deliveryFee.toLocaleString()} د.ع`}
                        </span>
                        <span>توصيل السائق الملكي</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-4 mb-6">
                      <span className="text-xl font-bold text-amber-400 font-sans">{total.toLocaleString()} د.ع</span>
                      <span className="text-sm font-bold text-white">المجموع الإجمالي للفاتورة</span>
                    </div>

                    <button
                      onClick={() => setCheckoutStep("shipping")}
                      className="w-full py-4 px-6 rounded-xl glowing-shifting-gradient text-neutral-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
                    >
                      متابعة تعبئة بيانات التوصيل
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="mt-4 p-3 bg-neutral-950 rounded-lg text-[10px] text-neutral-500 leading-relaxed text-center">
                      🌟 توصيل مجاني وسريع لكافة الطلبات فوق 100,000 د.ع لضمان وصول الوليمة حارة وطازجة كما في صالة مطعمنا الفخم.
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* STEP 2: SHIPPING INFO */}
          {checkoutStep === "shipping" && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-xl mx-auto bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl text-right font-sans"
            >
              <h3 className="text-xl font-bold text-white mb-2 font-serif">بوابة البيانات الملكية للتوصيل</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                يرجى تزويد سائقنا الخاص بالإحداثيات والبيانات حتى يسارع في توصيل وليمتك الدافئة وهي في ذروة نكهتها المدخنة.
              </p>

              <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
                {/* Name */}
                <div className="relative">
                  <label className="block text-xs text-neutral-400 mb-2 font-semibold">الاسم الكريم للضيف:</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="عبدالله السديري"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full py-3 pr-11 pl-4 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:outline-none text-sm text-neutral-200 text-right"
                    />
                    <User className="absolute right-4 top-3.5 w-4 h-4 text-neutral-500" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 font-semibold">رقم الجوال النشط للتنسيق:</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="05xxxxxxx"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full py-3 pr-11 pl-4 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:outline-none text-sm text-neutral-200 text-right font-sans"
                    />
                    <Phone className="absolute right-4 top-3.5 w-4 h-4 text-neutral-500" />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 font-semibold">العنوان التفصيلي بالعراق (البصرة/المحافظات):</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="البصرة، العباسية، شارع كورنيش شط العرب، قرب..."
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full py-3 pr-11 pl-4 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:outline-none text-sm text-neutral-200 text-right"
                    />
                    <MapPin className="absolute right-4 top-3.5 w-4 h-4 text-neutral-500" />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 font-semibold">ملاحظات وتحذيرات طهو مخصصة (اختياري):</label>
                  <textarea
                    placeholder="مثل: تقليل الملح، خلو من المكسرات بسبب حساسية، عدم رن الجرس وترك الطلب عند الباب بلطف..."
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    rows={3}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:outline-none text-sm text-neutral-200 text-right"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-neutral-800/40">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    إرسال الطلب واعتماده فوراً
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="py-3 px-6 rounded-xl bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 text-neutral-400 text-sm transition-all cursor-pointer"
                  >
                    العودة للسلة
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: LIVE COOKING / DELIVERY STATUS SIMULATOR */}
          {checkoutStep === "status" && (
            <motion.div
              key="status"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto bg-neutral-900/50 border border-amber-500/15 p-8 md:p-10 rounded-3xl text-center font-sans relative overflow-hidden"
            >
              {/* Soft Golden ambient sparks */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"></div>

              {/* Order Status Header */}
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Receipt className="w-7 h-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-2">طلبك الملكي قيد التجهيز</h3>
              <p className="text-xs text-neutral-400 mb-6">رقم الفاتورة المرجعي: <span className="text-amber-400 font-bold font-mono text-sm">{orderId}</span></p>

              {/* Progress Steps Diagram */}
              <div className="relative flex flex-col sm:flex-row justify-between items-center gap-8 md:gap-4 my-10 max-w-xl mx-auto text-xs font-semibold">
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${deliveryProgress >= 1 ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-[0_0_12px_#f59e0b]" : "bg-neutral-950 border-neutral-800 text-neutral-500"}`}>
                    {deliveryProgress > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                  </span>
                  <span className={deliveryProgress >= 1 ? "text-amber-400 font-bold" : "text-neutral-500"}>تأكيد المطبخ</span>
                  <p className="text-[10px] text-neutral-500 max-w-[100px]">تم اعتماد مكونات طبقك بعناية فائقة</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${deliveryProgress >= 2 ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-[0_0_12px_#f59e0b]" : "bg-neutral-950 border-neutral-800 text-neutral-500"}`}>
                    {deliveryProgress > 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                  </span>
                  <span className={deliveryProgress >= 2 ? "text-amber-400 font-bold" : "text-neutral-500"}>التشطيب والذهب</span>
                  <p className="text-[10px] text-neutral-500 max-w-[100px]">يتم تزيين أطباقك بورق الذهب والكمأ</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${deliveryProgress >= 3 ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-[0_0_12px_#f59e0b]" : "bg-neutral-950 border-neutral-800 text-neutral-500"}`}>
                    {deliveryProgress > 3 ? <CheckCircle2 className="w-5 h-5" /> : "3"}
                  </span>
                  <span className={deliveryProgress >= 3 ? "text-amber-400 font-bold" : "text-neutral-500"}>السائق الملكي</span>
                  <p className="text-[10px] text-neutral-500 max-w-[100px]">انطلق السائق بسيارة خاصة مجهزة حرارياً</p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${deliveryProgress >= 4 ? "bg-emerald-500 border-emerald-500 text-neutral-950 shadow-[0_0_12px_#10b981]" : "bg-neutral-950 border-neutral-800 text-neutral-500"}`}>
                    {deliveryProgress >= 4 ? <CheckCircle2 className="w-5 h-5" /> : "4"}
                  </span>
                  <span className={deliveryProgress >= 4 ? "text-emerald-400 font-bold" : "text-neutral-500"}>بالهناء والسرور!</span>
                  <p className="text-[10px] text-neutral-500 max-w-[100px]">وصل السائق وبانتظار تذوق أساطير النكهة</p>
                </div>
              </div>

              {/* Progress Detail Description */}
              <div className="bg-neutral-950 border border-neutral-800/80 rounded-2xl p-6 mb-8 text-right font-sans">
                <h4 className="text-sm font-bold text-white mb-2">تفاصيل الفاتورة والعنوان:</h4>
                <div className="flex flex-col gap-2.5 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span className="font-bold text-neutral-300">{customerName}</span>
                    <span>اسم الضيف:</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-neutral-300 font-sans">{customerPhone}</span>
                    <span>رقم الجوال:</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-neutral-300">{customerAddress}</span>
                    <span>عنوان التوصيل:</span>
                  </div>
                  {specialNote && (
                    <div className="flex justify-between border-t border-neutral-900 pt-2">
                      <span className="font-bold text-amber-500">{specialNote}</span>
                      <span>توصيات خاصة للمطبخ:</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-neutral-900 pt-2">
                    <span className="font-bold text-amber-400 font-sans">{total.toLocaleString()} د.ع</span>
                    <span>إجمالي الحساب (دفع عند الاستلام):</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center font-sans">
                <button
                  onClick={handleReset}
                  className="py-3 px-8 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                >
                  العودة للمتجر وطلب وليمة جديدة
                </button>
                <button
                  onClick={() => onNavigate("assistant")}
                  className="py-3 px-8 bg-neutral-950 border border-amber-500/30 text-amber-400 text-sm hover:bg-neutral-900 rounded-xl transition-all cursor-pointer"
                >
                  اسأل الشيف جمارة عن طلبك عبر الذكاء الاصطناعي
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
