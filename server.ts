import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is required");
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

  // Mascots descriptions & context for prompt guidance matching their individual personas
  const MASCOTS_PROMPTS: Record<string, { name: string; theme: string; tone: string; example: string }> = {
    maki: {
      name: "Chibi-Maki",
      theme: "traditional Japanese sushi architecture, sushi-making techniques, rice seasoning (shari), historical Japanese sushi culture, or proper sushi etiquette",
      tone: "passionate, energetic, focusing on absolute craft and fun food history",
      example: "Did you know? Sushi rice was originally used solely to preserve raw fish and thrown away! 🍣"
    },
    usagi: {
      name: "Mochi-Usagi",
      theme: "mochi-pounding traditions, high-quality matcha/sencha green tea, traditional Japanese wagashi sweets, sakura blossoms, or ichigo daifuku recipes",
      tone: "super-cute, sweet, playful, and delighted to share delicious treats",
      example: "Hello! Did you know mochi rice is pounded over 500 times to get its super-squishy texture? 🍡"
    },
    kuma: {
      name: "Wasabi-Kuma",
      theme: "real wasabi stream roots (Wasabia japonica), Nepalese bento heritage, Himalayan spices (black salt, Timur szechuan pepper), Momo history, or the scientific heat of spices",
      tone: "wise but fiery, cool, slightly adventurous, and loves flavor chemistry",
      example: "True wasabi loses its spicy aroma within 15 minutes of grating! That's why chefs grate it fresh! 🌿"
    }
  };

  // AI-powered fact generator endpoint
  app.post("/api/mascots/fact", async (req, res) => {
    try {
      const { mascotId } = req.body;
      const mascotInfo = MASCOTS_PROMPTS[mascotId];
      if (!mascotInfo) {
        return res.status(400).json({ error: "Invalid mascotId specified" });
      }

      // Check if API key is provided
      if (!process.env.GEMINI_API_KEY) {
        // Safe graceful fallback with dynamic flavor
        const staticFallbacks: Record<string, string[]> = {
          maki: [
            "Ginger (Gari) is eaten between different sushi pieces to cleanse your palate! 🌿",
            "In Japan, it is completely traditional and polite to eat Nigiri sushi with your hands! 🙌",
            "The dark green seaweed sheet called Nori is packed with key vitamins, iodine, and minerals! 🌊",
            "Centuries ago, Japanese sushi chefs would keep their rice recipe closely guarded family secrets! 🤫"
          ],
          usagi: [
            "Wagashi sweets are designed to complement the slight bitterness of fresh matcha green tea! 🍵",
            "Salted cherry blossom leaves add a subtle floral and sweet aroma to spring mochi! 🌸",
            "Did you know? Traditional red bean paste (Anko) can be smooth (Koshian) or chunky (Tsubuan)! 🫘",
            "Traditional Japanese tea bowls are held with both hands as a deep sign of respect and warmth! 🤲"
          ],
          kuma: [
            "The specific spicy kick of wasabi travels to your nose instead of your tongue because of volatile allyl isothiocyanate molecules! 🧪",
            "Timur pepper has a citrus punch that temporarily numbs your taste buds for a unique flavor sensation! 🌶️",
            "Traditional Nepalese Momo dumplings were cooked under steam created by roaring direct fire! 🔥",
            "The pure mineral Himalayan pink salt gets its beautiful color from rich iron deposits! 🏔️"
          ]
        };
        const pool = staticFallbacks[mascotId] || ["Sushi is best enjoyed fresh and made with care! ✨"];
        const fallbackFact = pool[Math.floor(Math.random() * pool.length)];
        return res.json({ fact: `[Fallback Trivia] ${fallbackFact}` });
      }

      const client = getGeminiClient();
      const prompt = `You are playing the role of ${mascotInfo.name}, a cute, animated mascot for "Sakura Everest Sushi & Bento" restaurant in Coventry.
Your mascot's core theme is: ${mascotInfo.theme}.
Your mascot's tone is: ${mascotInfo.tone}.

Generate exactly ONE fun, authentic, educational, and surprising trivia fact about your theme.
Keep it strictly under 180 characters, and end it with 1 or 2 relevant emoji. Do NOT include any intro or outro, and do not say "Here is your fact:". Just output the final fact as the mascot speaking to the diner.

Examples:
- "${mascotInfo.example}"

Generate your unique, fresh fact now:`;

      const result = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.85,
        }
      });

      const generatedFact = result.text?.trim() || "";
      res.json({ fact: generatedFact });
    } catch (error: any) {
      console.error("Gemini Fact Generation Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate dynamic food fact" });
    }
  });

  // Vite development middleware vs Static Production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
