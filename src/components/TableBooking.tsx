import React, { useState } from "react";
import { Table, Reservation } from "../types";
import { REST_TABLES } from "../data";
import { Calendar, Clock, Users, Gift, Info, Check, Sparkles, Map, Receipt, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function TableBooking() {
  const [tables, setTables] = useState<Table[]>(REST_TABLES);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  
  // Booking Form State
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [occasion, setOccasion] = useState("");
  const [reservationSuccess, setReservationSuccess] = useState<Reservation | null>(null);

  // Time Slots
  const timeSlots = [
    { value: "12:30 م", label: "غداء هادئ (12:30 م)" },
    { value: "3:00 م", label: "بعد الظهيرة المريحة (3:00 م)" },
    { value: "6:00 م", label: "شروق المساء الذهبي (6:00 م)" },
    { value: "8:30 م", label: "أمسية العود الفاخرة (8:30 م)" },
    { value: "10:30 م", label: "نسيم ليالي جُمارة (10:30 م)" },
  ];

  const occasions = [
    { value: "birthday", label: "ذكرى ميلاد سعيدة 🎂" },
    { value: "anniversary", label: "ذكرى زواج غالية 💍" },
    { value: "romance", label: "عشاء رومانسي خالص 🕯️" },
    { value: "business", label: "غداء عمل رفيع المستوى 💼" },
    { value: "none", label: "ضيافة عادية ممتعة ✨" },
  ];

  // Handle table selection on the map
  const handleTableClick = (table: Table) => {
    if (table.status === "reserved") return;
    
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === table.id) {
          return { ...t, status: t.status === "selected" ? "available" : "selected" };
        }
        return { ...t, status: t.status === "selected" ? "available" : t.status };
      })
    );

    setSelectedTable((prev) => (prev?.id === table.id ? null : table));
  };

  // Submit Booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      alert("الرجاء اختيار طاولتك المفضلة من خريطة الصالة التفاعلية أولاً.");
      return;
    }
    if (!bookingDate || !bookingTime || !guestName || !guestPhone) {
      alert("الرجاء إكمال كافة البيانات المطلوبة لإصدار تذكرة الحجز.");
      return;
    }

    const reservationNum = "RES-" + Math.floor(10000 + Math.random() * 90000);
    const newReservation: Reservation = {
      id: reservationNum,
      date: bookingDate,
      time: bookingTime,
      guests: guestsCount,
      tableId: selectedTable.id,
      guestName,
      guestEmail,
      guestPhone,
      notes,
      occasion: occasions.find(occ => occ.value === occasion)?.label || "ضيافة عادية"
    };

    setReservationSuccess(newReservation);
    
    // Simulate updating table status to reserved
    setTables((prev) =>
      prev.map((t) => (t.id === selectedTable.id ? { ...t, status: "reserved" } : t))
    );
  };

  const handleResetBooking = () => {
    setReservationSuccess(null);
    setSelectedTable(null);
    setBookingDate("");
    setBookingTime("");
    setGuestsCount(2);
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setNotes("");
    setOccasion("");
    // Refresh tables available state
    setTables(REST_TABLES);
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#121212] to-[#0b0b0b] border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-amber-400 font-medium text-xs md:text-sm uppercase tracking-wider block mb-2 font-sans">
            الحجز المسبق والضيافة المضمونة
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-white">
            نظام حجز الطاولات <span className="gold-gradient-text font-extrabold">التفاعلي</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base font-sans mt-2">
            تمتع بحرية اختيار موقع جلوسك بدقة. اختر طاولة بجوار شلال النخل أو داخل المقصورة الملكية الخاصة من الخريطة المباشرة أدناه.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!reservationSuccess ? (
            /* BOOKING FLOW */
            <motion.div
              key="booking-flow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-right"
            >
              {/* Left Column: Seating Interactive Map */}
              <div className="lg:col-span-7 bg-neutral-900/40 border border-neutral-800 p-6 md:p-8 rounded-3xl flex flex-col items-center select-none w-full order-2 lg:order-1">
                <div className="flex justify-between items-center w-full mb-6 border-b border-neutral-800/60 pb-3 font-sans">
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-amber-500" />
                    انقر على أي طاولة خضراء لتحديدها
                  </span>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    خريطة صالة جُمارة التفاعلية
                    <Map className="w-4 h-4 text-amber-500" />
                  </h4>
                </div>

                {/* Seating Stage Floor Layout Visual Representation */}
                <div className="relative w-full aspect-[4/3] bg-neutral-950/80 border border-neutral-800/50 rounded-2xl p-4 overflow-hidden shadow-inner flex justify-center items-center">
                  {/* Decorative Stage/Oud player area */}
                  <div className="absolute top-0 inset-x-0 bg-neutral-900/90 border-b border-amber-500/10 py-2.5 text-center text-[10px] font-sans font-bold uppercase text-amber-400 tracking-widest">
                    🎶 منصة الموسيقى الحية وعازف العود المعتق
                  </div>

                  {/* Decorative Waterfall view representation on the right border */}
                  <div className="absolute right-0 top-1/4 bottom-1/4 w-3 bg-gradient-to-b from-cyan-600 via-sky-400 to-cyan-700 flex items-center justify-center rounded-l-md shadow-[0_0_15px_rgba(34,142,192,0.6)]">
                    <span className="text-[7px] text-neutral-950 font-sans font-bold -rotate-90 block tracking-widest whitespace-nowrap">
                      شلال المياه العذبة الكبرى
                    </span>
                  </div>

                  {/* Decorative Outer Terrace representation on the left border */}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-3 bg-gradient-to-b from-emerald-800 via-green-600 to-emerald-950 flex items-center justify-center rounded-r-md">
                    <span className="text-[7px] text-neutral-100 font-sans font-bold rotate-90 block tracking-widest whitespace-nowrap">
                      التراس الخارجي المفتوح
                    </span>
                  </div>

                  {/* Table Nodes Plotting */}
                  {tables.map((table) => {
                    const isSelected = table.status === "selected";
                    const isReserved = table.status === "reserved";

                    return (
                      <button
                        key={table.id}
                        onClick={() => handleTableClick(table)}
                        disabled={isReserved}
                        className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full border-2 transition-all duration-300 flex flex-col justify-center items-center text-center font-sans z-10 ${
                          isReserved
                            ? "bg-red-500/15 border-red-500/50 text-red-400 cursor-not-allowed shadow-[inset_0_0_8px_rgba(239,68,68,0.3)]"
                            : isSelected
                            ? "bg-amber-500 border-amber-300 text-neutral-950 font-bold scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-pointer"
                            : "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 hover:scale-105 cursor-pointer shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]"
                        }`}
                        style={{
                          left: `${table.x}%`,
                          top: `${table.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <span className="text-[10px] md:text-xs block font-bold">
                          طاولة {table.number}
                        </span>
                        <span className="text-[8px] md:text-[10px] opacity-85 block">
                          ({table.capacity} مقاعد)
                        </span>

                        {/* Tiny seat pins representation */}
                        <div className="absolute -inset-1 border border-dashed rounded-full border-neutral-700/60 -z-10 group-hover:border-amber-400/50"></div>
                      </button>
                    );
                  })}

                  {/* Map legends */}
                  <div className="absolute bottom-4 left-4 bg-neutral-900/90 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-1.5 text-[10px] font-sans">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span>متاحة للحجز</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/60"></span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span>محجوزة مسبقاً</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/60"></span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span>اختيارك الحالي</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-300"></span>
                    </div>
                  </div>
                </div>

                {/* Table details readout box */}
                <div className="w-full mt-6 p-4 bg-neutral-950/60 border border-neutral-800 rounded-xl font-sans text-xs">
                  {selectedTable ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-1 text-right"
                    >
                      <p className="font-bold text-amber-400 text-sm">
                        لقد اخترت: {selectedTable.typeName} (طاولة رقم {selectedTable.number})
                      </p>
                      <p className="text-neutral-300 leading-relaxed mt-1">
                        {selectedTable.description}
                      </p>
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        السعة القصوى: {selectedTable.capacity} أشخاص بكل أريحية.
                      </span>
                    </motion.div>
                  ) : (
                    <p className="text-neutral-400 text-center py-2 font-medium">
                      💡 يرجى الضغط على الطاولة التي تناسب ذوقك وتفضيلك العائلي من الخريطة لتفاصيل أكثر وحجزها.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Booking Details Form */}
              <div className="lg:col-span-5 bg-neutral-900/40 border border-neutral-800 p-6 md:p-8 rounded-3xl w-full order-1 lg:order-2 font-sans">
                <h3 className="text-xl font-bold text-white mb-2 font-serif">بطاقة بيانات الحجز الفاخرة</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  املأ البيانات لإرسال حجزك المباشر. سنتأكد من إعداد طاولتك المحددة وتهيئتها بالورود وتجهيز المضيفين للترحيب بكم.
                </p>

                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  {/* Date and Time slots */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-2 font-semibold flex items-center gap-1 justify-end">
                        التاريخ المفضل:
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-500 focus:outline-none text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-2 font-semibold flex items-center gap-1 justify-end">
                        فترة الضيافة:
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      </label>
                      <select
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-500 focus:outline-none text-right"
                      >
                        <option value="">اختر التوقيت...</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests and Occasion */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-2 font-semibold flex items-center gap-1 justify-end">
                        عدد الضيوف الكرام:
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-500 focus:outline-none text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-2 font-semibold flex items-center gap-1 justify-end">
                        المناسبة السعيدة:
                        <Gift className="w-3.5 h-3.5 text-amber-500" />
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-500 focus:outline-none text-right"
                      >
                        <option value="">اختر المناسبة...</option>
                        {occasions.map((occ) => (
                          <option key={occ.value} value={occ.value}>
                            {occ.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Personal details */}
                  <div className="pt-2 border-t border-neutral-800/40">
                    <label className="block text-xs text-neutral-400 mb-1.5 font-semibold">الاسم الكامل للضيف الأساسي:</label>
                    <input
                      type="text"
                      required
                      placeholder="الأستاذ فيصل الخالدي"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-500 focus:outline-none text-right"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1.5 font-semibold">رقم الجوال للتأكيد:</label>
                      <input
                        type="tel"
                        required
                        placeholder="077xxxxxxxxx"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-500 focus:outline-none text-right font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1.5 font-semibold">البريد الإلكتروني للإيصال:</label>
                      <input
                        type="email"
                        placeholder="guest@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-500 focus:outline-none text-right font-sans"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1.5 font-semibold">توصيات أو تجهيزات مخصصة (اختياري):</label>
                    <textarea
                      placeholder="مثال: يرجى كتابة عبارة مبروك على الكعكة، أريد طاولة هادئة جداً، أحضر باقة زهور حمراء..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs focus:border-amber-500 focus:outline-none text-right"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
                  >
                    حجز الطاولة وإصدار التذكرة
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* BOOKING CONFIRMED TICKET STUB REPRESENTATION */
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto bg-neutral-900/40 border border-amber-500/20 rounded-3xl p-6 md:p-10 text-center relative overflow-hidden border-glowing-dynamic"
            >
              {/* Gold borders */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>

              {/* Status Graphic */}
              <div className="p-3 bg-amber-500/15 text-amber-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-2">تم تأكيد حجزك الملكي!</h3>
              <p className="text-xs text-neutral-400 mb-8">نشكر ثقتكم الفاخرة، طاولتكم في انتظار قدومكم البهي.</p>

              {/* Classic Golden Ticket layout with tear notch circles */}
              <div className="relative bg-neutral-950 border border-amber-500/25 p-6 rounded-2xl text-right font-sans shadow-2xl mb-8 overflow-hidden">
                {/* Notch left */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#121212] border-r border-amber-500/25"></div>
                {/* Notch right */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#121212] border-l border-amber-500/25"></div>

                {/* Content */}
                <div className="flex justify-between items-start border-b border-dashed border-amber-500/20 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">رقم الحجز المرجعي</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">{reservationSuccess.id}</span>
                  </div>
                  <h4 className="text-lg font-bold font-serif text-white flex items-center gap-1.5">
                    تذكرة مائدة جُمارة
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs text-neutral-400">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">التاريخ المعتمد</span>
                    <span className="font-bold text-neutral-200">{reservationSuccess.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">وقت الترحيب</span>
                    <span className="font-bold text-neutral-200">{reservationSuccess.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">اسم الضيف الكريم</span>
                    <span className="font-bold text-neutral-200">{reservationSuccess.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">عدد المقاعد المحجوزة</span>
                    <span className="font-bold text-neutral-200">{reservationSuccess.guests} ضيوف</span>
                  </div>
                  {reservationSuccess.occasion && (
                    <div className="col-span-2 border-t border-neutral-900/60 pt-2">
                      <span className="text-[10px] text-neutral-500 block">المناسبة المحتفى بها</span>
                      <span className="font-bold text-amber-400">{reservationSuccess.occasion}</span>
                    </div>
                  )}
                  {reservationSuccess.notes && (
                    <div className="col-span-2 border-t border-neutral-900/60 pt-2">
                      <span className="text-[10px] text-neutral-500 block">توصيات خاصة بالضيافة</span>
                      <span className="text-neutral-300 italic">{reservationSuccess.notes}</span>
                    </div>
                  )}
                </div>

                {/* Wax seal simulation */}
                <div className="flex justify-center mt-6 pt-4 border-t border-neutral-900">
                  <div className="w-10 h-10 rounded-full bg-amber-600/30 border border-amber-500/40 flex items-center justify-center font-bold text-amber-400 text-xs shadow-inner shadow-amber-600 animate-pulse">
                    جُمارة
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center font-sans">
                <button
                  onClick={() => window.print()}
                  className="py-3 px-6 bg-neutral-950 border border-amber-500/30 text-amber-400 font-bold text-sm rounded-xl hover:bg-neutral-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Receipt className="w-4 h-4" />
                  طباعة تذكرة الحجز
                </button>
                <button
                  onClick={handleResetBooking}
                  className="py-3 px-8 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                >
                  القيام بحجز مائدة جديدة
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
