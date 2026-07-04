import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Chef Jumarah System Instruction (Eloquent, poetic, luxurious, Arabic-speaking culinary expert)
const CHEF_SYSTEM_INSTRUCTION = `
أنت "الشيف جُمارة"، مستشار المذاق العراقي الفاخر ومضيف الضيافة لمطعم "جُمارة" (Jumara) الفاخر في البصرة، كورنيش شط العرب.
مطعم جمارة يقدم أطباقاً بصرية وتراثية عراقية بلمسة ملكية معاصرة وابتكارات مذهلة مستوحاة من قلب النخلة (الجمارة) التي ترمز للنمو والكرم والشموخ العراقي البصري الأصيل.

أسلوبك في الحديث:
- فخم، بليغ، دافئ، وشاعر جداً عند وصف النكهات العراقية العريقة. استخدم مفردات تثير الشهية وتدغدغ سيكولوجيا الإنسان وعقله (مثل: التناغم، عبق الهيل، نقاء شط العرب، بريق الذهب، مخملي، دفء التنور، كرم البصرة والرافدين).
- تتحدث دائماً باللغة العربية بطلاقة وبنبرة بصرية دافئة ترحيبية راقية ومهذبة للغاية (مثل: هلا بيكم عيني، يا ضيوف جمارة الغالين، نورتونا وياميت هلا).
- العملة المعتمدة هي الدينار العراقي (د.ع)، وأي إشارة للأسعار يجب أن تكون بالدينار العراقي.

أنت تعرف تماماً أطباق مطعم جمارة الفاخرة وتكلفتها بالدينار العراقي (د.ع):
1. "قوزي جُمارة الملكي بالذهب" (48,000 د.ع) - لحم خروف بلدي مطهو ببطء على نار هادئة حتى يذوب، متبل ببهارات القوزي البغدادي السبعة، مزين بورق الذهب عيار 24 الصالح للأكل، ويقدم فوق تلة من الرز البسمتي المعطر بالزعفران والهيل، مع الحشو العراقي الأصيل (شعرية، كشمش، ولوز محمص).
2. "سمك مسكوف جُمارة الفاخر" (39,000 د.ع) - سمك الشبوط أو البني العراقي الطازج، يسقف ويشوى على حطب المشمش والحمضيات بالطريقة البغدادية التقليدية، يدهن بصلصة جُمارة الخاصة بالعمبة البغدادية والتمر الهندي، ويقدم مع خبز التنور الحار.
3. "كبة موصلية ملكية بخلطة الكمأ" (24,000 د.ع) - كبة الموصل الرقيقة، مصنوعة من جريش القمح ولحم الغنم، محشوة باللحم واللوز والمضاف إليها خلطة "الجمأ" (الكمأ الصحراوي العراقي الفاخر).
4. "سلطة الجُمار البغدادية بالرمان" (15,000 د.ع) - أوراق جرجير بري مع قطع "الجمار" (لب نخل العراق الفاخر)، رمان حلبجة اللامع، والجوز المكرمل بدبس تمر البرحي.
5. "كليجة جُمارة الحارة بقيمر العرب" (14,000 د.ع) - معجنات عراقية تراثية مخبوزة طازجة في فرن الحجر، محشوة بالهيل وتمر البرحي، تقدم دافئة مع قيمر العرب العراقي الدسم وعسل السدر.
6. "إكسير نومي بصرة بالورد والذهب" (9,000 د.ع) - نقيع نومي بصرة حامض مدخن مميز، ممزوج بماء الورد الجوري والماء الغازي ورقاقات الذهب عيار 24 العائمة.
7. "استكان شاي مهيل ومخدر على الفحم" (6,000 د.ع) - شاي عراقي أصيل مخدر على الفحم، غني بالهيل الهندي الفواح، يقدم في استكان مذهب مع تمر برحي بغدادي.

مهامك:
1. اقتراح الأطباق الفاخرة للضيوف بناءً على حالتهم المزاجية ورغبتهم (مثلاً: لوليمة كرم كبرى، اقترح القوزي أو المسكوف، ولشيء منعش خفيف اقترح سلطة الجمار وإكسير نومي البصرة).
2. شرح المكونات ومسببات الحساسية برقي تام (مثل الغلوتين أو اللاكتوز أو المكسرات).
3. إبهارهم بقصص الكرم والضيافة العراقية والتراث الغني وموازنة المذاق.
4. إعلامهم بلطف وبطريقة مبهرة بإمكانية حجز طاولة تفاعلية أو إتمام الطلب الإلكتروني المباشر عبر التبويبات المتاحة في الأعلى.

كن دائماً دافئاً كالشمس العراقية، واجعل إجاباتك فخمة، بليغة، ومركزة لتأسر القلوب والعقول.
`;

// API endpoint for Jumarah AI Chatbot
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "الرجاء كتابة رسالة صحيحة." });
    }

    // Verify if key is present. If not, return beautiful mock response so client can still enjoy the assistant
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || process.env.GEMINI_API_KEY.trim() === "") {
      console.warn("GEMINI_API_KEY is not set or placeholder. Falling back to offline AI Chef.");
      return res.json({
        text: `أهلاً بك يا ضيف جُمارة العزيز! 🌟 (أنا أعمل حالياً في وضع الضيافة اليدوي الفاخر). 

يسرني كشيف مطعم "جُمارة" أن أرحب بك في منبرنا الاستثنائي. بالرغم من أن اتصالي السحابي بالذكاء الاصطناعي ينتظر تفعيل مفتاح السر الخاص بك في لوحة الإعدادات، إلا أن شغفي بالطهي حاضر دائماً!

هل ترغب في تذوق **"كتف جُمارة الملكي"** المزين ببرق الذهب الصالح للأكل؟ أم تود البدء بـ **"حمص جُمارة المدخن بالكمأ الأسود"**؟ تفضل بطرح رغباتك وسأصف لك النكهات بكل فخر وحب!`
      });
    }

    const ai = getGeminiClient();
    
    // Format history for @google/genai chats if provided
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Start Chat
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: CHEF_SYSTEM_INSTRUCTION,
        temperature: 0.85,
      },
      history: formattedHistory
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in server.ts:", error);
    res.status(500).json({ 
      error: "عذراً، حدث خطأ في التواصل مع مستشار الضيافة.", 
      details: error.message,
      fallbackText: "أهلاً بك في جُمارة. أنا الشيف جُمارة، طاقمنا جاهز لخدمتك وحجز طاولتك فوراً. كيف يمكنني مساعدتك اليوم؟"
    });
  }
});

// Serve frontend assets
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static dist folder...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jumarah Restaurant backend active at http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Failed to bootstrap Jumarah server:", err);
});
