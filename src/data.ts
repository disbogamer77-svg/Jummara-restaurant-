import { MenuItem, Table, Testimonial } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "قوزي جُمارة الملكي بالذهب",
    englishName: "Jumara Royal Lamb Quzi with Gold",
    description: "قوزي عراقي ملكي فاخر، لحم خروف بلدي مطهو ببطء شديد على نار هادئة حتى يذوب، متبل ببهارات القوزي البغدادي العريقة السبعة، يزين بورق الذهب عيار 24 النقي الصالح للأكل، ويقدم فوق تلة من الرز البسمتي المعطر بالزعفران والهيل، مع الحشو العراقي الأصيل (شعرية، كشمش، ولوز محمص).",
    price: 48000,
    category: "mains",
    image: "/src/assets/images/jumara_lamb_signature_1783178647578.jpg",
    rating: 4.9,
    calories: 1240,
    ingredients: ["لحم خروف بلدي عراقي", "ذهب صالح للأكل عيار 24", "حشو عراقي (شعرية وكشمش)", "لوز وفستق محمص", "بهارات القوزي البغدادية"],
    allergens: ["المكسرات"],
    preparationTime: "25-30 دقيقة",
    featured: true,
    layers: [
      { name: "بريق الذهب البغدادي الملكي", description: "رقائق ذهبية نقية عيار 24 تضفي طابعاً ملكياً مبهراً", offset: -40, color: "from-yellow-400 to-amber-300" },
      { name: "لحم القوزي المذوب بالتنور", description: "لحم خروف بلدي مندى غني ببهارات بغداد السبعة", offset: -15, color: "from-amber-800 to-amber-950" },
      { name: "تلة الرز المعطر بالهيل والزعفران", description: "رز بسمتي مميز بنكهة الهيل العراقي والقرنفل الصافي", offset: 15, color: "from-yellow-100 to-yellow-200" },
      { name: "حشو جمارة التقليدي والمكسرات", description: "شعرية ذهبية محمرة مع الكشمش واللوز المقرمش", offset: 40, color: "from-amber-400 to-yellow-600" }
    ]
  },
  {
    id: "m2",
    name: "سمك مسكوف جُمارة الفاخر",
    englishName: "Jumara Premium Masgouf Fish",
    description: "سمك الشبوط أو البني العراقي الطازج، يسقف ويشوى على الحطب (خشب أشجار المشمش والحمضيات) بالطريقة البغدادية التقليدية العريقة على نار هادئة، يدهن بصلصة جُمارة الخاصة بالعمبة البغدادية الفاخرة والتمر الهندي، ويقدم مع مخللات البصل والليمون العراقي وخبز التنور الساخن.",
    price: 39000,
    category: "mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000",
    rating: 4.9,
    calories: 820,
    ingredients: ["سمك دجلة الطازج", "صلصة التمر الهندي والعمبة", "ثوم وليمون عراقي", "بهارات مسكوف خاصة", "دخان خشب المشمش"],
    allergens: [],
    preparationTime: "30-35 دقيقة",
    featured: true,
    layers: [
      { name: "تتبيلة دجلة الخاصة", description: "مزيج خفيف من التمر الهندي والليمون يعطي حموضة متوازنة", offset: -25, color: "from-orange-800 to-neutral-900" },
      { name: "اللحم الأبيض المشوي على الحطب", description: "دهن السمك اللذيذ يذوب برائحة حطب الحمضيات", offset: 0, color: "from-amber-600 to-yellow-500" },
      { name: "البصل والمخللات والليمون البصرة", description: "إضافات تقليدية تضفي على المسكوف نكهته الأصيلة كاملة", offset: 25, color: "from-yellow-500 to-yellow-600" }
    ]
  },
  {
    id: "a1",
    name: "كبة موصلية ملكية بخلطة الكمأ",
    englishName: "Royal Mosul Kibbeh with Desert Truffles",
    description: "كبة الموصل التراثية الرقيقة والعملاقة، مصنوعة من جريش القمح الفاخر ولحم الغنم المفروم يدوياً، محشوة باللحم والبصل المكرمل ولوز صنوبري، مضاف إليها خلطة 'الجمأ' (الكمأ الصحراوي العراقي الفاخر) ذو النكهة الأرضية المذهلة، تسلق وتقدم دافئة.",
    price: 24000,
    category: "appetizers",
    image: "/src/assets/images/jumara_truffle_hummus_1783178661565.jpg",
    rating: 4.8,
    calories: 540,
    ingredients: ["جريش القمح الموصلي", "لحم غنم بلدي مفروم", "الجمأ (الكمأ العراقي الصحراوي)", "بصل محمر ومكسرات", "بهارات الكبة السحرية"],
    allergens: ["المكسرات", "الغلوتين"],
    preparationTime: "15-20 دقيقة",
    featured: true,
    layers: [
      { name: "شرائح الكمأ الصحراوي المعتق", description: "كمأ عراقي بري أصيل مفروم بعناية داخل الحشوة", offset: -30, color: "from-stone-800 to-black" },
      { name: "عجينة الجريش الموصلية الرقيقة", description: "طبقة خارجية رقيقة ومتماسكة مخبوزة بإتقان شديد", offset: 0, color: "from-yellow-50 to-orange-100" },
      { name: "حشوة اللحم الصنوبري والبهارات", description: "لحم غنم مع القرنفل وجوزة الطيب والمكسرات المحمصة", offset: 30, color: "from-emerald-400 to-lime-500" }
    ]
  },
  {
    id: "a2",
    name: "سلطة الجُمار البغدادية بالرمان",
    englishName: "Baghdadi Palm Heart Salad with Pomegranate",
    description: "أوراق الجرجير البري المنعشة مع قطع 'الجمار' (لب نخل العراق الفاخر المقرمش والشهير)، مضافاً إليها حبات رمان حلبجة المضيئة، الجوز المقرمش المكرمل بصلصة التمر العراقي الطبيعي، ورشات جبن الماعز المعتق.",
    price: 15000,
    category: "appetizers",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
    rating: 4.7,
    calories: 280,
    ingredients: ["جمار نخل عراقي طازج", "جرجير بري", "رمان حلبجة اليقظ", "جوز مكرمل بدبس التمر", "جبن ماعز معتق", "دبس تمر البرحي البغدادي"],
    allergens: ["المكسرات", "اللاكتوز"],
    preparationTime: "10 دقائق",
    featured: false,
    layers: [
      { name: "جبن الماعز المكرمل بالدبس", description: "دوائر جبن كريمية غنية محلاة بدبس تمر البرحي الساحر", offset: -25, color: "from-stone-100 to-stone-200" },
      { name: "لب النخيل العراقي الهش (الجمار)", description: "لب النخيل الأبيض عالي الجودة والفوائد المستخرج من قلب النخلة", offset: 0, color: "from-yellow-50 to-emerald-50" },
      { name: "الجرجير البري ورمان حلبجة اللامع", description: "قاعدة خضراء مكللة بنكهة حامضة وحلوة تثير الحواس", offset: 25, color: "from-emerald-600 to-red-500" }
    ]
  },
  {
    id: "d1",
    name: "كليجة جُمارة الحارة بقيمر العرب",
    englishName: "Hot Kleicha with Arab Kahi Cream",
    description: "المعجنات العراقية التراثية الأكثر شهرة (الكليجة البغدادية)، مخبوزة طازجة في فرن الحجر، محشوة بالهيل وتمر البرحي الفاخر والجوز المطحون، تقدم دافئة ومزينة برشة هيل ناعمة، إلى جانب مغرفة من 'قيمر العرب' العراقي الدسم والفاخر والعسل الطبيعي.",
    price: 14000,
    category: "desserts",
    image: "/src/assets/images/jumara_kunafa_modern_1783178675124.jpg",
    rating: 4.9,
    calories: 590,
    ingredients: ["طحين فاخر وسمن بلدي", "تمر البرحي الفاخر والجوز", "هيل عراقي مطحون فريش", "قيمر العرب العراقي الدسم", "عسل سدر طبيعي"],
    allergens: ["اللاكتوز", "المكسرات", "الغلوتين"],
    preparationTime: "12 دقيقة",
    featured: true,
    layers: [
      { name: "قيمر العرب الدسم والعسل", description: "طبقة غنية وكثيفة من قيمر الجاموس العراقي الصافي والعسل الملكي", offset: -35, color: "from-emerald-500 to-green-700" },
      { name: "الكليجة البغدادية الحارة بالهيل", description: "عجينة هشة تذوب في الفم غنية بنكهة الهيل الأصيل والسمن", offset: -10, color: "from-amber-400 to-amber-600" },
      { name: "حشوة تمر البرحي والسمسم", description: "تمر ناعم كالحرير مطبوخ بالهيل والسمسم المحمص", offset: 15, color: "from-neutral-50 to-stone-100" },
      { name: "رذاذ ماء الورد وماء الهيل", description: "رشات خفيفة تعطي رائحة الكرم العراقي التقليدية في الأعياد", offset: 40, color: "from-yellow-300 to-amber-400" }
    ]
  },
  {
    id: "dr1",
    name: "إكسير نومي بصرة بالورد والذهب",
    englishName: "Royal Sparkling Noomi Basra with Gold",
    description: "مشروب الضيافة العراقي التراثي المحضّر يدوياً في جُمارة. نقيع الليمون الأسود المجفف (نومي بصرة) ذو الطعم الحامض المدخن المميز، ممزوج بماء الورد الجوري العطر والماء الغازي الفوار، يعلوه النعناع الطازج ورقاقات من الذهب عيار 24 تسبح فيه بجمال ساحر ومضيء.",
    price: 9000,
    category: "drinks",
    image: "/src/assets/images/jumara_pomegranate_elixir_1783178689947.jpg",
    rating: 4.9,
    calories: 110,
    ingredients: ["نومي بصرة عراقي ممتاز", "ماء ورد جوري طبيعي", "ماء غازي نقي", "نعناع طازج", "رقائق ذهب برّاقة عيار 24"],
    allergens: [],
    preparationTime: "5 دقائق",
    featured: true,
    layers: [
      { name: "بريق الذهب العائم", description: "لمسة من الغبار الذهبي تلمع تحت الضوء وتحرك الروح", offset: -30, color: "from-yellow-300 to-amber-200" },
      { name: "إكسير نومي البصرة المركز", description: "نقيع ليمون البصرة الغني بلون قهوائي ياقوتي مذهل ومضاد للأكسدة", offset: 0, color: "from-red-600 to-rose-900" },
      { name: "فقاعات غازية منعشة وثلج", description: "مياه فوارة تعطي شعور الانتعاش البارد الفوري في لهيب الصيف", offset: 30, color: "from-cyan-100 to-emerald-400" }
    ]
  },
  {
    id: "dr2",
    name: "استكان شاي مهيل ومخدر على الفحم",
    englishName: "Traditional Charcoal-Brewed Cardamom Tea",
    description: "الشاي العراقي الأصيل (المهيل والمخدر على الفحم)، محضر بأجود أنواع أوراق الشاي السيلاني، مخدر ببطء على رماد الفحم المشتعل مع حبات الهيل الهندية الفواحة، يقدم في 'استكان' زجاجي عراقي كلاسيكي على قاعدة مذهبة مع حبات من تمر البرحي العراقي الأصيل.",
    price: 6000,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000",
    rating: 4.8,
    calories: 10,
    ingredients: ["شاي سيلاني أصيل فاخر", "هيل هندي أخضر وفير", "مخدر على جمر الفحم الطبيعي", "تمر برحي بغدادي جانبي"],
    allergens: [],
    preparationTime: "8 دقائق",
    featured: false,
    layers: [
      { name: "بخار عبير الهيل البغدادي", description: "رائحة الهيل الفواحة التي تملأ الأرجاء وتعيد ذكريات الطفولة", offset: -25, color: "from-yellow-100 to-neutral-200" },
      { name: "الشاي العراقي الثقيل المخدر", description: "لون ياقوتي داكن (دم الغزال) ذو طعم مرر وحلو متوازن جداً", offset: 0, color: "from-amber-500 to-yellow-600" },
      { name: "مرافقة تمر البرحي الذهبي", description: "حلاوة التمر الطبيعي تعوض السكر وتجعل الرشفة غاية في الكمال واللذة", offset: 25, color: "from-yellow-400 to-orange-500" }
    ]
  }
];

export const REST_TABLES: Table[] = [
  { id: "t1", number: 1, capacity: 2, type: "standard", typeName: "طاولة ثنائية هادئة", status: "available", x: 15, y: 25, description: "طاولة مريحة مثالية لعشاق الخلوة والاستمتاع بكوب شاي مهيل." },
  { id: "t2", number: 2, capacity: 2, type: "standard", typeName: "طاولة ثنائية دافئة", status: "reserved", x: 15, y: 65, description: "إطلالة جانبية هادئة تحت نخلة جُمارة الكبرى." },
  { id: "t3", number: 3, capacity: 4, type: "standard", typeName: "طاولة شط العرب العائلية", status: "available", x: 45, y: 25, description: "طاولة رباعية تتوسط الصالة الرئيسية الفاخرة وممتازة لتناول المسكوف." },
  { id: "t4", number: 4, capacity: 4, type: "standard", typeName: "طاولة الفرات الطربية", status: "available", x: 45, y: 65, description: "قريبة من منصة عازفي العود والقانون لمقامات الموسيقى العراقية الأصيلة." },
  { id: "t5", number: 5, capacity: 6, type: "terrace", typeName: "تراس بابل المفتوح", status: "available", x: 75, y: 25, description: "طاولة في الهواء الطلق، مبردة برذاذ الماء العذب ونسمات الهواء العليلة." },
  { id: "t6", number: 6, capacity: 8, type: "vip", typeName: "ديوان جُمارة الملكي (VIP)", status: "available", x: 15, y: 45, description: "ديوان فاخر خاص مستوحى من فخامة شناشيل البصرة العريقة مع مضيف مخصص وخصوصية تامة للضيوف الكرام." },
  { id: "t7", number: 7, capacity: 4, type: "waterfall", typeName: "طاولة شلال النخيل الذهبي", status: "available", x: 75, y: 65, description: "طاولة مميزة جداً بجانب شلال المياه العذب الجاري والفريد." },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "ts1",
    name: "علي الخفاجي",
    rating: 5,
    comment: "تجربة طعام تحبس الأنفاس! قوزي لحم الغنم الملكي المزين بالذهب ليس مجرد وجبة طعام، بل هو تحفة تراثية راقية. اللحم يذوب بالكامل والرز بنكهة الهيل يذكرني ببيوت أهلنا القديمة.",
    date: "أمس"
  },
  {
    id: "ts2",
    name: "د. رند الجبوري",
    rating: 5,
    comment: "أبهرني تصميم الموقع وسلاسة حجز طاولة شلال النخيل. السمك المسكوف على حطب المشمش أسطوري بالفعل وحموضة صلصة التمر الهندي والعمبة متقنة لأبعد حد!",
    date: "قبل يومين"
  },
  {
    id: "ts3",
    name: "المهندس حيدر البغدادي",
    rating: 5,
    comment: "جودة المكونات مذهلة والأجواء دافئة وصوت العود والقانون يعيد إحياء ليالي بغداد الخالدة. الكليجة الحارة مع قيمر العرب شحنت حواسي بالبهجة والكرم الموصلي الحقيقي.",
    date: "قبل أسبوع"
  }
];

export const REST_HOURS = [
  { day: "السبت - الأربعاء", time: "12:00 م - 12:00 ص", state: "ليالي البصرة الدافئة", desc: "فترة الغداء والمسكوف العائلي" },
  { day: "الخميس - الجمعة", time: "1:00 م - 1:30 ص", state: "أمسيات المقامات العراقية الكبرى", desc: "سهرة طربية مباشرة لعازفي العود والقانون" },
  { day: "وجبة الإفطار (الجمعة والسبت)", time: "7:00 ص - 11:30 ص", state: "نسمة الصباح ونكهة الكاهي والقيمر", desc: "ترويدة بصرية عريقة للإفطار الطازج" },
];
