import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Info, ChevronRight } from "lucide-react";

interface KnowYourSushiProps {
  isDarkMode: boolean;
}

type SushiTypeId = "nigiri" | "maki" | "uramaki" | "temaki";

interface SushiTypeData {
  id: SushiTypeId;
  name: string;
  japanese: string;
  phonetic: string;
  translation: string;
  masterDesc: string;
  howToEat: string[];
  facts: string[];
  sakuraItems: string[];
}

const SUSHI_TYPES: Record<SushiTypeId, SushiTypeData> = {
  nigiri: {
    id: "nigiri",
    name: "Nigiri",
    japanese: "握り寿司",
    phonetic: "nee-ghee-ree",
    translation: "Hand-Pressed Sushi",
    masterDesc: "The ultimate test of a sushi chef's craft. Nigiri consists of a single visual slice of pristine fish (Neta) pressed meticulously over a warm cushion of vinegar-seasoned rice (Shari) with a delicate swipe of wasabi hidden between them.",
    howToEat: [
      "Pick it up using either your clean fingers or chopsticks—both are highly traditional.",
      "Flip the nigiri slightly so you can dip only the fish edge lightly into the soy sauce. Never submerge the rice!",
      "Place it on your tongue fish-side down to let the rich flavors make immediate contact first.",
      "Eat it in a single mouthful to preserve the perfect architectural balance of temperature and seasoning."
    ],
    facts: [
      "Traditional masters shape the rice cushion to contain a tiny air pocket inside so it melts instantly in the mouth.",
      "The warmth of the rice should match standard human body temperature (~37°C) to complement the cool fish slice."
    ],
    sakuraItems: ["Salmon Nigiri", "Tuna Nigiri", "Prawn Nigiri", "Sweet Tofu Pocket (Inari)", "Avocado Nigiri"]
  },
  maki: {
    id: "maki",
    name: "Maki",
    japanese: "巻き寿司",
    phonetic: "mah-kee",
    translation: "Rolled Sushi",
    masterDesc: "Classic, elegant cylinders combining simplicity and structure. Fillings and seasoned rice are placed systematically on a sheet of sun-dried nori seaweed, then rolled skillfully using a traditional bamboo mat (makisu) and sliced into bite-sized segments.",
    howToEat: [
      "Use chopsticks to secure the roll segment firmly by its sides.",
      "Dip the flat seaweed rim or fish filling very lightly into the soy sauce—never soak the entire roll.",
      "Pop the maki roll cleanly into your mouth in one bite to enjoy the combined flavor profile.",
      "Refresh your palate between rolls with a thin slice of sweet pickled ginger (gari)."
    ],
    facts: [
      "The bamboo rolling mat must be cleaned and dried meticulously, as any trace moisture would ruin the crispy nori.",
      "Maki ranges from Hosomaki (thin rolls, single filling) to Futomaki (thick rolls with multiple ingredients)."
    ],
    sakuraItems: ["Salmon Maki", "Tuna Maki", "Cucumber Maki (V)", "Avocado Maki (V)"]
  },
  uramaki: {
    id: "uramaki",
    name: "Uramaki",
    japanese: "裏巻き",
    phonetic: "oo-rah-mah-kee",
    translation: "Inside-Out Roll",
    masterDesc: "A creative Western-inspired evolution of the traditional maki. The rice is layered on the outside—often coated with toasted sesame seeds, vibrant flying fish roe (tobiko), or special sauces—with the dark nori wrap and fillings tucked securely inside.",
    howToEat: [
      "Use chopsticks carefully to lift the slide segment as the exterior rice can be delicate.",
      "Apply any supplementary wasabi or soy sauce extremely sparingly; Uramaki is typically pre-seasoned.",
      "Eat in one bite, allowing the roasted crunch of the sesame or pop of the roe to blend with the interior fillings.",
      "Never rub your wooden chopsticks together, as it hints to the chef that the tableware might be cheap."
    ],
    facts: [
      "Uramaki was developed in California during the 1960s to hide the dark seaweed inside, as raw nori was unfamiliar to Western diners.",
      "Toasted sesame seeds on the outside aren't just for decoration; they release nutty aromatics that balance the cool vinegar."
    ],
    sakuraItems: ["California Roll (with Crabmeat & Avocado)", "Spicy Tuna Roll", "Chicken Katsu Roll", "Sakura Special Roll", "Dragon Roll"]
  },
  temaki: {
    id: "temaki",
    name: "Temaki",
    japanese: "手巻き",
    phonetic: "teh-mah-kee",
    translation: "Hand-Rolled Cone",
    masterDesc: "An artistic, large hand-rolled cone of crisp nori overflowing with custom ingredients and vinegared rice. This informal style is perfect for casual dining and must be prepared and eaten immediately to preserve the seaweed's pristine crunch.",
    howToEat: [
      "Always pick up and eat Temaki using your hands—chopsticks are never used for this style.",
      "Hold it like an ice cream cone and dip the very top corner of the fish/veggie filling into your soy sauce.",
      "Bite directly into the open top cone, enjoying the distinct crackle of the freshly toasted nori.",
      "Eat it swiftly! Within minutes, the moisture of the warm rice will start softening the crisp seaweed wrapper."
    ],
    facts: [
      "High-end sushi kitchens flash-toast nori sheets over high-grade charcoal right before rolling to maximize the crisp sound.",
      "Temaki represents a fun, collaborative dining tradition in Japan, where families assemble cones with custom fillings at home."
    ],
    sakuraItems: ["Salmon & Avocado Hand Roll", "Spicy Tuna Hand Roll", "Cucumber & Yellow Radish Hand Roll (V)"]
  }
};

const ANATOMY_DETAILS: Record<string, { title: string; japanese: string; desc: string }> = {
  shari: {
    title: "Shari (Seasoned Rice)",
    japanese: "酢飯",
    desc: "Premium short-grain Japanese rice seasoned with a delicate blend of rice vinegar, sugar, and salt. Cooked and fanned to body temperature, it is the true soul of all sushi."
  },
  nori: {
    title: "Nori (Seaweed)",
    japanese: "海苔",
    desc: "Paper-thin sheets of dried edible seaweed, toasted until crispy. It holds rolled sushi together and contributes a savory, ocean-fresh umami aroma."
  },
  neta: {
    title: "Neta (Sashimi Topping)",
    japanese: "ネタ",
    desc: "The pristine slice of fresh seafood, meat, or vegetable laid gracefully over the hand-pressed rice cushion. Selected daily for ultimate flavor."
  },
  tuna: {
    title: "Maguro (Tuna)",
    japanese: "鮪",
    desc: "Deep pink-to-red lean tuna fillet. Highly prized for its rich, clean meaty texture and elegant presence in maki and nigiri."
  },
  salmon: {
    title: "Sake (Salmon Sashimi)",
    japanese: "鮭",
    desc: "Luscious, buttery Salmon slice characterized by elegant white marbling lines of fine fat, delivering a rich and smooth taste profile."
  },
  avocado: {
    title: "Abokado (Avocado)",
    japanese: "アボカド",
    desc: "Creamy, nutrient-rich slices of perfectly ripe avocado. Adds a velvety, buttery texture that balances spicy and savory sushi accents."
  },
  cucumber: {
    title: "Kyuri (Cucumber)",
    japanese: "きゅうり",
    desc: "Crispy, refreshing julienned cucumber spears. Clears the palate with a clean crunch and cooling vegetable juices."
  },
  sauce: {
    title: "Tobiko & Spicy Mayo",
    japanese: "ソース & 飛子",
    desc: "Spicy sriracha-infused traditional mayonnaise ribbon, sprinkled with crispy orange Flying Fish Roe (Tobiko) that pops dynamically in every bite."
  },
  crabmeat: {
    title: "Kanikama (Crabmeat)",
    japanese: "蟹蒲鉾",
    desc: "Sweet, shredded snow-crab or premium Japanese surimi, carefully prepared to offer a sweet, ocean-rich base flavor inside rolls."
  }
};

export const KnowYourSushi: React.FC<KnowYourSushiProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<SushiTypeId>("nigiri");
  const [hoveredAnatomy, setHoveredAnatomy] = useState<string | null>(null);

  const activeSushi = SUSHI_TYPES[activeTab];

  // SVG Renderer with interactive hover/click points
  const renderInteractiveSushiSvg = () => {
    switch (activeTab) {
      case "maki":
        return (
          <svg viewBox="0 0 320 220" className="w-full h-full max-w-[240px] md:max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="makiNori" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E221E" />
                <stop offset="100%" stopColor="#0B100B" />
              </linearGradient>
              <linearGradient id="tunaCore" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E94560" />
                <stop offset="100%" stopColor="#9B1B30" />
              </linearGradient>
              <linearGradient id="avocadoCore" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A8E6CF" />
                <stop offset="100%" stopColor="#6CBA7D" />
              </linearGradient>
            </defs>

            {/* Ambient drop shadow under the roll */}
            <ellipse cx="160" cy="180" rx="72" ry="14" fill="rgba(0,0,0,0.45)" filter="blur(6px)" />

            {/* NORI WRAP (Outer Roll) */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("nori")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "nori" ? null : "nori")}
              className="cursor-pointer group"
            >
              {/* Invisible touch-pad border wrapper for easy touch on mobile */}
              <path 
                d="M 100,100 L 100,160 A 60,24 0 0,0 220,160 L 220,100 Z" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="16" 
                className="cursor-pointer"
              />
              
              {/* Solid 3D Cylinder Body with smooth brightness and shadow pulse transition */}
              <path 
                d="M 100,100 L 100,160 A 60,24 0 0,0 220,160 L 220,100 Z" 
                fill="url(#makiNori)" 
                stroke="#020502"
                strokeWidth="1.5"
                className="origin-center transition-all duration-300 select-none cursor-pointer"
              />
              
              <ellipse 
                cx="160" 
                cy="100" 
                rx="60" 
                ry="24" 
                fill="url(#makiNori)" 
                stroke="#020502" 
                strokeWidth="1.5"
                className="origin-center transition-all duration-300 select-none cursor-pointer"
              />
            </g>

            {/* SHARI (Seasoned Vinegared Rice Core) */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("shari")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "shari" ? null : "shari")}
              className="cursor-pointer group"
            >
              {/* Invisible larger click/touch pad ellipse */}
              <ellipse cx="160" cy="100" rx="60" ry="24" fill="transparent" className="cursor-pointer" />
              
              {/* Top Face Opening, pulses bright white/glow on hover */}
              <ellipse 
                cx="160" 
                cy="100" 
                rx="60" 
                ry="24" 
                stroke="#0B100B" 
                strokeWidth="1.5"
                fill={hoveredAnatomy === "shari" ? "#FFFFFF" : "#FCF9F5"}
                className="origin-center transition-all duration-300 select-none cursor-pointer"
              />
              
              {/* Tiny hand-drawn rice grain textures */}
              <g opacity="0.3" className="pointer-events-none">
                <ellipse cx="120" cy="100" rx="3" ry="1.5" transform="rotate(25, 120, 100)" fill="#B5AFA1" />
                <ellipse cx="135" cy="92" rx="3.5" ry="1.8" transform="rotate(-15, 135, 92)" fill="#B5AFA1" />
                <ellipse cx="185" cy="96" rx="3.2" ry="1.6" transform="rotate(45, 185, 96)" fill="#B5AFA1" />
                <ellipse cx="140" cy="110" rx="2.8" ry="1.4" transform="rotate(10, 140, 110)" fill="#B5AFA1" />
                <ellipse cx="170" cy="108" rx="3.4" ry="1.7" transform="rotate(-30, 170, 108)" fill="#B5AFA1" />
                <ellipse cx="200" cy="102" rx="3" ry="1.5" transform="rotate(15, 200, 102)" fill="#B5AFA1" />
              </g>

              {hoveredAnatomy === "shari" && (
                <ellipse cx="160" cy="100" rx="60" ry="24" fill="none" stroke="#10B981" strokeWidth="2.5" className="pointer-events-none" />
              )}
            </g>

            {/* NEW NETA / INGREDIENT FILLINGS */}
            {/* Tuna Core */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("tuna")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "tuna" ? null : "tuna")}
              className="cursor-pointer group"
            >
              {/* Generous touch targets for tiny ingredients on mobile */}
              <circle cx="151" cy="92" r="14" fill="transparent" className="cursor-pointer" />
              
              <path 
                d="M 144,92 C 144,82 158,82 158,92 C 158,102 144,102 144,92 Z" 
                fill="url(#tunaCore)" 
                stroke="#6B0C1E" 
                strokeWidth="1"
                className="origin-center select-none cursor-pointer"
              />
              <path d="M 148,88 Q 152,86 153,90" stroke="#FFF" strokeWidth="0.75" fill="none" opacity="0.4" className="pointer-events-none" />

              {hoveredAnatomy === "tuna" && (
                <path 
                  d="M 144,92 C 144,82 158,82 158,92 C 158,102 144,102 144,92 Z" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="1.5" 
                  className="pointer-events-none"
                />
              )}
            </g>

            {/* Avocado Core */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("avocado")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "avocado" ? null : "avocado")}
              className="cursor-pointer group"
            >
              {/* Generous touch targets for tiny ingredients on mobile */}
              <circle cx="169" cy="94" r="14" fill="transparent" className="cursor-pointer" />

              <path 
                d="M 162,94 C 162,84 176,86 176,96 C 176,106 162,104 162,94 Z" 
                fill="url(#avocadoCore)" 
                stroke="#3E7245" 
                strokeWidth="1"
                className="origin-center select-none cursor-pointer"
              />
              <path d="M 166,90 Q 170,90 172,93" stroke="#FFF" strokeWidth="0.75" fill="none" opacity="0.4" className="pointer-events-none" />

              {hoveredAnatomy === "avocado" && (
                <path 
                  d="M 162,94 C 162,84 176,86 176,96 C 176,106 162,104 162,94 Z" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="1.5" 
                  className="pointer-events-none"
                />
              )}
            </g>

            {/* Cucumber Core */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("cucumber")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "cucumber" ? null : "cucumber")}
              className="cursor-pointer group"
            >
              {/* Generous touch targets for tiny ingredients on mobile */}
              <circle cx="157" cy="107" r="14" fill="transparent" className="cursor-pointer" />

              <rect 
                x="151" 
                y="102" 
                width="12" 
                height="10" 
                rx="2" 
                fill="#4CDF7F" 
                stroke="#1B5E20" 
                strokeWidth="1" 
                className="origin-center select-none cursor-pointer"
              />
              <circle cx="157" cy="107" r="1.5" fill="#C8F2D5" className="pointer-events-none" />

              {hoveredAnatomy === "cucumber" && (
                <rect 
                  x="151" 
                  y="102" 
                  width="12" 
                  height="10" 
                  rx="2" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="1.5" 
                  className="pointer-events-none"
                />
              )}
            </g>

            {/* Guide Anatomy Overlay Text Lines if hovered */}
            <AnimatePresence>
              {hoveredAnatomy === "nori" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="210" y1="130" x2="255" y2="135" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="210" cy="130" r="3" fill="#10B981" />
                  <rect x="255" y="125" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="282.5" y="138" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NORI</text>
                </motion.g>
              )}
              {hoveredAnatomy === "shari" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="120" y1="95" x2="70" y2="90" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="120" cy="95" r="3" fill="#10B981" />
                  <rect x="15" y="80" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="42.5" y="93" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SHARI</text>
                </motion.g>
              )}
              {hoveredAnatomy === "tuna" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="148" y1="92" x2="80" y2="70" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="148" cy="92" r="3" fill="#10B981" />
                  <rect x="25" y="60" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="52.5" y="73" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TUNA</text>
                </motion.g>
              )}
              {hoveredAnatomy === "avocado" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="172" y1="94" x2="235" y2="78" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="172" cy="94" r="3" fill="#10B981" />
                  <rect x="235" y="68" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="262.5" y="81" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AVOCADO</text>
                </motion.g>
              )}
              {hoveredAnatomy === "cucumber" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="157" y1="110" x2="157" y2="152" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="157" cy="110" r="3" fill="#10B981" />
                  <rect x="127" y="152" width="60" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="157" y="165" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CUCUMBER</text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        );

      case "uramaki":
        return (
          <svg viewBox="0 0 320 220" className="w-full h-full max-w-[240px] md:max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="spicyMayo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA07A" />
                <stop offset="100%" stopColor="#FF5722" />
              </linearGradient>
              <linearGradient id="crabmeat" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFCDD2" />
                <stop offset="100%" stopColor="#E53935" />
              </linearGradient>
            </defs>

            {/* Ambient drop shadow */}
            <ellipse cx="160" cy="180" rx="72" ry="14" fill="rgba(0,0,0,0.45)" filter="blur(6px)" />

            {/* SHARI (Outer Rice Cylindrical Wall) */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("shari")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "shari" ? null : "shari")}
              className="cursor-pointer group"
            >
              {/* Invisible outer touch-pad borders to make outer rice wall super responsive */}
              <path 
                d="M 100,100 L 100,160 A 60,24 0 0,0 220,160 L 220,100 Z" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="16" 
                className="cursor-pointer"
              />
              <ellipse cx="160" cy="100" rx="60" ry="24" fill="transparent" className="cursor-pointer" />

              {/* Outer 3D Body with interactive float scaling and glow */}
              <path 
                d="M 100,100 L 100,160 A 60,24 0 0,0 220,160 L 220,100 Z" 
                fill={hoveredAnatomy === "shari" ? "#FFFFFF" : "#FCF9F5"} 
                stroke="#E2DDD5"
                strokeWidth="1.5"
                className="origin-center select-none cursor-pointer"
              />
              <ellipse 
                cx="160" 
                cy="100" 
                rx="60" 
                ry="24" 
                stroke="#E2DDD5" 
                strokeWidth="1.5"
                fill={hoveredAnatomy === "shari" ? "#FFFFFF" : "#FCF9F5"}
                className="origin-center select-none cursor-pointer"
              />

              {/* Toasted Sesame Seeds sprinkled - Black & Gold dots */}
              <g id="sesame-seeds" className="pointer-events-none" opacity="0.8">
                {/* Sprinkles on top rim */}
                <ellipse cx="115" cy="98" rx="1.5" ry="0.8" transform="rotate(30, 115, 98)" fill="#2C2725" />
                <ellipse cx="125" cy="93" rx="1.5" ry="0.8" transform="rotate(-40, 125, 93)" fill="#D4AF37" />
                <ellipse cx="195" cy="94" rx="1.5" ry="0.8" transform="rotate(15, 195, 94)" fill="#2C2725" />
                <ellipse cx="180" cy="104" rx="1.5" ry="0.8" transform="rotate(-20, 180, 104)" fill="#D4AF37" />
                <ellipse cx="145" cy="112" rx="1.5" ry="0.8" transform="rotate(45, 145, 112)" fill="#2C2725" />
                <ellipse cx="155" cy="114" rx="1.5" ry="0.8" transform="rotate(-60, 155, 114)" fill="#D4AF37" />
                
                {/* Sprinkles on side body */}
                <ellipse cx="110" cy="120" rx="1.5" ry="0.8" transform="rotate(10, 110, 120)" fill="#2C2725" />
                <ellipse cx="130" cy="145" rx="1.5" ry="0.8" transform="rotate(-15, 130, 145)" fill="#2C2725" />
                <ellipse cx="205" cy="135" rx="1.5" ry="0.8" transform="rotate(35, 205, 135)" fill="#D4AF37" />
                <ellipse cx="175" cy="150" rx="1.5" ry="0.8" transform="rotate(-45, 175, 150)" fill="#2C2725" />
              </g>

              {hoveredAnatomy === "shari" && (
                <ellipse cx="160" cy="100" rx="60" ry="24" fill="none" stroke="#10B981" strokeWidth="2.5" className="pointer-events-none" />
              )}
            </g>

            {/* SEAMLESS INNER NORI WRAP RING */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("nori")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "nori" ? null : "nori")}
              className="cursor-pointer group"
            >
              {/* Invisible fat-stroke overlay to allow clicking the seaweed line extremely easily on mobile */}
              <ellipse 
                cx="160" 
                cy="100" 
                rx="35" 
                ry="15" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="14" 
                className="cursor-pointer"
              />
              
              <ellipse 
                cx="160" 
                cy="100" 
                rx="35" 
                ry="15" 
                fill="none" 
                stroke={hoveredAnatomy === "nori" ? "#10B981" : "#1B221B"} 
                strokeWidth="2.5" 
                className="transition-all duration-300 select-none cursor-pointer"
              />
            </g>

            {/* INTERNAL INGREDIENT FILLINGS */}
            {/* Crabmeat */}
            <g
              onMouseEnter={() => setHoveredAnatomy("crabmeat")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "crabmeat" ? null : "crabmeat")}
              className="cursor-pointer group"
            >
              {/* Invisible touch-pad circle */}
              <circle cx="150" cy="98" r="14" fill="transparent" className="cursor-pointer" />

              <path 
                d="M 148,96 Q 160,88 160,98 Q 155,106 142,100 Z" 
                fill="url(#crabmeat)" 
                stroke="#9E2A2B" 
                strokeWidth="0.8"
                className="origin-center select-none cursor-pointer"
              />

              {hoveredAnatomy === "crabmeat" && (
                <path 
                  d="M 148,96 Q 160,88 160,98 Q 155,106 142,100 Z" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="1.5" 
                  className="pointer-events-none"
                />
              )}
            </g>

            {/* Avocado Wedge */}
            <g
              onMouseEnter={() => setHoveredAnatomy("avocado")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "avocado" ? null : "avocado")}
              className="cursor-pointer group"
            >
              {/* Invisible touch-pad circle */}
              <circle cx="166" cy="100" r="14" fill="transparent" className="cursor-pointer" />

              <path 
                d="M 164,96 Q 174,92 174,102 Q 166,108 158,102 Z" 
                fill="#99E265" 
                stroke="#2B5E2B" 
                strokeWidth="0.8"
                className="origin-center select-none cursor-pointer"
              />

              {hoveredAnatomy === "avocado" && (
                <path 
                  d="M 164,96 Q 174,92 174,102 Q 166,108 158,102 Z" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="1.5" 
                  className="pointer-events-none"
                />
              )}
            </g>

            {/* TOBIKO EGGS / SPICY SAUCE ON TOP */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("sauce")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "sauce" ? null : "sauce")}
              className="cursor-pointer group"
            >
              {/* Invisible generous touch-path for clicking the sauce ribbon on mobile */}
              <path 
                d="M 112,105 Q 124,94 135,106 Q 148,112 160,98 Q 172,92 185,104 Q 196,110 208,98" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="16" 
                className="cursor-pointer"
              />

              {/* Spicy Mayo Ribbon zig zag across the top opening */}
              <path 
                d="M 112,105 Q 124,94 135,106 Q 148,112 160,98 Q 172,92 185,104 Q 196,110 208,98" 
                fill="none" 
                stroke="url(#spicyMayo)" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                className="origin-center drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.2)] select-none cursor-pointer"
              />
              
              {/* Little glossy roe eggs (orange glowing dots) on sauce */}
              <circle cx="128" cy="99" r="2" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.5" className="select-none pointer-events-none" />
              <circle cx="132" cy="103" r="1.8" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.5" className="select-none pointer-events-none" />
              <circle cx="158" cy="96" r="2.2" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.5" className="select-none pointer-events-none" />
              <circle cx="163" cy="101" r="1.7" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.5" className="select-none pointer-events-none" />
              <circle cx="184" cy="98" r="2.1" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.5" className="select-none pointer-events-none" />

              {hoveredAnatomy === "sauce" && (
                <path 
                  d="M 112,105 Q 124,94 135,106 Q 148,112 160,98 Q 172,92 185,104 Q 196,110 208,98" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  className="pointer-events-none"
                />
              )}
            </g>

            {/* Guide Anatomy Overlay Text Lines */}
            <AnimatePresence>
              {hoveredAnatomy === "sauce" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="160" y1="95" x2="160" y2="55" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="160" cy="95" r="3" fill="#10B981" />
                  <rect x="110" y="30" width="100" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="160" y="43" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TOBIKO & SAUCE</text>
                </motion.g>
              )}
              {hoveredAnatomy === "shari" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="105" y1="130" x2="50" y2="130" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="105" cy="130" r="3" fill="#10B981" />
                  <rect x="5" y="120" width="45" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="27.5" y="133" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SHARI</text>
                </motion.g>
              )}
              {hoveredAnatomy === "nori" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="130" y1="95" x2="70" y2="85" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="130" cy="95" r="3" fill="#10B981" />
                  <rect x="15" y="75" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="42.5" y="88" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NORI</text>
                </motion.g>
              )}
              {hoveredAnatomy === "crabmeat" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="145" y1="98" x2="85" y2="110" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="145" cy="98" r="3" fill="#10B981" />
                  <rect x="25" y="100" width="60" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="55" y="113" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KANIKAMA</text>
                </motion.g>
              )}
              {hoveredAnatomy === "avocado" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="172" y1="100" x2="235" y2="115" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="172" cy="100" r="3" fill="#10B981" />
                  <rect x="235" y="105" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="262.5" y="118" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AVOCADO</text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        );

      case "temaki":
        return (
          <svg viewBox="0 0 320 220" className="w-full h-full max-w-[240px] md:max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="temakiNori" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E231F" />
                <stop offset="100%" stopColor="#080B09" />
              </linearGradient>
              <linearGradient id="salmonProtrude" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7F66" />
                <stop offset="100%" stopColor="#E03A1F" />
              </linearGradient>
            </defs>

            {/* Ambient Shadow */}
            <ellipse cx="160" cy="180" rx="60" ry="12" fill="rgba(0,0,0,0.4)" filter="blur(5px)" />

            {/* BEHIND FILLINGS - PROTRUDING RICE & INGREDIENT SPEARS */}
            <g className="transition-all duration-300">
              
              {/* SHARI (Rice clump piling out of top opening) */}
              <g
                onMouseEnter={() => setHoveredAnatomy("shari")}
                onMouseLeave={() => setHoveredAnatomy(null)}
                onClick={() => setHoveredAnatomy(hoveredAnatomy === "shari" ? null : "shari")}
                className="cursor-pointer group"
              >
                {/* Generous touch pad for Shari on mobile */}
                <ellipse cx="149" cy="86" rx="28" ry="20" fill="transparent" className="cursor-pointer" />
                
                <ellipse cx="140" cy="85" rx="22" ry="15" fill="#FAF6F0" stroke="#DDD6CC" strokeWidth="0.75" className="pointer-events-none" />
                <ellipse cx="158" cy="88" rx="18" ry="12" fill="#FAF6F0" stroke="#DDD6CC" strokeWidth="0.75" className="pointer-events-none" />

                {hoveredAnatomy === "shari" && (
                  <g className="pointer-events-none">
                    <ellipse cx="140" cy="85" rx="22" ry="15" fill="none" stroke="#10B981" strokeWidth="1.8" />
                    <ellipse cx="158" cy="88" rx="18" ry="12" fill="none" stroke="#10B981" strokeWidth="1.8" />
                  </g>
                )}
              </g>
              
              {/* Fresh cucumber spears protruding left */}
              <g
                onMouseEnter={() => setHoveredAnatomy("cucumber")}
                onMouseLeave={() => setHoveredAnatomy(null)}
                onClick={() => setHoveredAnatomy(hoveredAnatomy === "cucumber" ? null : "cucumber")}
                className="cursor-pointer group"
              >
                {/* Generous touch pad for Cucumber spears on mobile */}
                <rect x="111" y="48" width="24" height="52" rx="4" transform="rotate(-27, 115, 52)" fill="transparent" className="cursor-pointer" />

                <rect x="115" y="55" width="10" height="40" rx="2.5" transform="rotate(-30, 115, 55)" fill="#6DE674" stroke="#1B5E20" strokeWidth="0.75" className="pointer-events-none" />
                <rect x="122" y="50" width="8" height="45" rx="2" transform="rotate(-25, 122, 50)" fill="#B5FFB8" stroke="#388E3C" strokeWidth="0.75" className="pointer-events-none" />

                {hoveredAnatomy === "cucumber" && (
                  <g className="pointer-events-none">
                    <rect x="115" y="55" width="10" height="40" rx="2.5" transform="rotate(-30, 115, 55)" fill="none" stroke="#10B981" strokeWidth="1.8" />
                    <rect x="122" y="50" width="8" height="45" rx="2" transform="rotate(-25, 122, 50)" fill="none" stroke="#10B981" strokeWidth="1.8" />
                  </g>
                )}
              </g>

              {/* Juicy Salmon Sashimi spears protruding center/right */}
              <g 
                onMouseEnter={() => setHoveredAnatomy("salmon")} 
                onMouseLeave={() => setHoveredAnatomy(null)} 
                onClick={() => setHoveredAnatomy(hoveredAnatomy === "salmon" ? null : "salmon")}
                className="cursor-pointer group"
              >
                {/* Generous touch pads for Salmon spears on mobile */}
                <rect x="145" y="45" width="14" height="50" rx="4" transform="rotate(-10, 145, 45)" fill="none" stroke="transparent" strokeWidth="14" className="cursor-pointer" />
                <rect x="160" y="48" width="12" height="42" rx="3.5" transform="rotate(5, 160, 48)" fill="none" stroke="transparent" strokeWidth="14" className="cursor-pointer" />

                <rect 
                  x="145" y="45" width="14" height="50" rx="4" transform="rotate(-10, 145, 45)" 
                  fill="url(#salmonProtrude)" stroke="#9F230F" strokeWidth="0.8" 
                  className="origin-bottom select-none cursor-pointer"
                />
                {/* Fat lines */}
                <path d="M 149,49 L 142,65" stroke="#FFEAE6" strokeWidth="1" opacity="0.6" className="pointer-events-none" />
                <path d="M 153,53 L 146,69" stroke="#FFEAE6" strokeWidth="1" opacity="0.6" className="pointer-events-none" />
                <path d="M 157,58 L 150,74" stroke="#FFEAE6" strokeWidth="1" opacity="0.6" className="pointer-events-none" />
                
                <rect 
                  x="160" y="48" width="12" height="42" rx="3.5" transform="rotate(5, 160, 48)" 
                  fill="url(#salmonProtrude)" stroke="#9F230F" strokeWidth="0.8" 
                  className="origin-bottom select-none cursor-pointer"
                />

                {hoveredAnatomy === "salmon" && (
                  <g className="pointer-events-none">
                    <rect x="145" y="45" width="14" height="50" rx="4" transform="rotate(-10, 145, 45)" fill="none" stroke="#10B981" strokeWidth="1.8" />
                    <rect x="160" y="48" width="12" height="42" rx="3.5" transform="rotate(5, 160, 48)" fill="none" stroke="#10B981" strokeWidth="1.8" />
                  </g>
                )}
              </g>

              {/* Creamy Avocado slice */}
              <g
                onMouseEnter={() => setHoveredAnatomy("avocado")}
                onMouseLeave={() => setHoveredAnatomy(null)}
                onClick={() => setHoveredAnatomy(hoveredAnatomy === "avocado" ? null : "avocado")}
                className="cursor-pointer group"
              >
                {/* Generous touch pad for avocado wedge on mobile */}
                <rect x="131" y="61" width="22" height="45" rx="4" transform="rotate(-15, 135, 65)" fill="transparent" className="cursor-pointer" />

                <rect x="135" y="65" width="11" height="35" rx="3.5" transform="rotate(-15, 135, 65)" fill="#BCF58E" stroke="#5D8E2D" strokeWidth="0.75" className="pointer-events-none" />

                {hoveredAnatomy === "avocado" && (
                  <rect x="135" y="65" width="11" height="35" rx="3.5" transform="rotate(-15, 135, 65)" fill="none" stroke="#10B981" strokeWidth="1.8" className="pointer-events-none" />
                )}
              </g>
            </g>

            {/* CRISP COAL-TOASTED NORI SHEET CONE (Folded on top) */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("nori")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "nori" ? null : "nori")}
              className="cursor-pointer group"
            >
              {/* Invisible large touch boundary for easy click on mobile */}
              <path 
                d="M 160,175 L 85,85 C 105,75 185,60 215,95 Z" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="16" 
                className="cursor-pointer"
              />

              {/* Back cone layer */}
              <path 
                d="M 160,175 L 85,85 C 105,75 185,60 215,95 Z" 
                fill="url(#temakiNori)" 
                stroke="#040605"
                strokeWidth="1.2"
                className="origin-bottom select-none cursor-pointer"
              />
              {/* Overlapping folded envelope flap representing authentic manual rolling style */}
              <path 
                d="M 160,175 L 115,82 C 145,72 170,88 200,105 Z" 
                fill="#161B17" 
                stroke="#040605"
                strokeWidth="0.8"
                opacity="0.95"
                className="pointer-events-none"
              />
              
              {hoveredAnatomy === "nori" && (
                <path 
                  d="M 160,175 L 85,85 C 105,75 185,60 215,95 Z" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2.5" 
                  opacity="0.85"
                />
              )}
            </g>

            {/* Scattered bright Tobiko fish eggs on rice */}
            <g className="pointer-events-none">
              <circle cx="140" cy="80" r="1.8" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.4" />
              <circle cx="143" cy="83" r="1.8" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.4" />
              <circle cx="154" cy="82" r="1.8" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.4" />
              <circle cx="150" cy="85" r="1.8" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.4" />
              <circle cx="162" cy="87" r="1.8" fill="#FF8C00" stroke="#FF4500" strokeWidth="0.4" />
            </g>

            {/* Anatomy guide lines */}
            <AnimatePresence>
              {hoveredAnatomy === "salmon" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="150" y1="52" x2="225" y2="40" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="150" cy="52" r="3" fill="#10B981" />
                  <rect x="225" y="25" width="75" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="262.5" y="38" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SALMON NETA</text>
                </motion.g>
              )}
              {hoveredAnatomy === "shari" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="145" y1="88" x2="95" y2="92" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="145" cy="88" r="3" fill="#10B981" />
                  <rect x="40" y="82" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="67.5" y="95" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SHARI</text>
                </motion.g>
              )}
              {hoveredAnatomy === "cucumber" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="115" y1="50" x2="60" y2="40" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="115" cy="50" r="3" fill="#10B981" />
                  <rect x="5" y="30" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="32.5" y="43" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KYURI</text>
                </motion.g>
              )}
              {hoveredAnatomy === "avocado" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="135" y1="65" x2="80" y2="60" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="135" cy="65" r="3" fill="#10B981" />
                  <rect x="25" y="50" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="52.5" y="63" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AVOCADO</text>
                </motion.g>
              )}
              {hoveredAnatomy === "nori" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="110" y1="120" x2="50" y2="120" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="110" cy="120" r="3" fill="#10B981" />
                  <rect x="5" y="110" width="45" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="27.5" y="123" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NORI</text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        );

      case "nigiri":
      default:
        return (
          <svg viewBox="0 0 320 220" className="w-full h-full max-w-[240px] md:max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="salmonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA07A" />
                <stop offset="100%" stopColor="#FF5E3A" />
              </linearGradient>
              <linearGradient id="marblingWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 235, 230, 0.5)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
              </linearGradient>
            </defs>

            {/* Realistic soft fuzzy shadow beneath the rice pad */}
            <ellipse cx="160" cy="165" rx="76" ry="14" fill="rgba(0,0,0,0.5)" filter="blur(6px)" />

            {/* SHARI (The sweet vinegared hand-pressed rice bed) */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("shari")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "shari" ? null : "shari")}
              className="cursor-pointer group"
            >
              {/* Invisible large outer touch path for Shari rice on mobile */}
              <path 
                d="M 90,135 Q 100,105 160,110 Q 220,115 230,140 Q 220,165 160,165 Q 100,160 90,135 Z" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="16" 
                className="cursor-pointer"
              />

              {/* Rice bed glows and expands slightly, fanning out on hover */}
              <path 
                d="M 90,135 Q 100,105 160,110 Q 220,115 230,140 Q 220,165 160,165 Q 100,160 90,135 Z" 
                stroke="#E2DDD5" 
                strokeWidth="1.5" 
                fill={hoveredAnatomy === "shari" ? "#FFFFFF" : "#FCF9F5"}
                className="origin-center select-none cursor-pointer"
              />
              
              {/* Rice grains textured shadows */}
              <g opacity="0.25" className="pointer-events-none">
                <ellipse cx="110" cy="135" rx="4.5" ry="2.2" transform="rotate(30, 110, 135)" fill="#B5AFA1" />
                <ellipse cx="125" cy="122" rx="4" ry="2" transform="rotate(-15, 125, 122)" fill="#B5AFA1" />
                <ellipse cx="145" cy="130" rx="4.8" ry="2.4" transform="rotate(45, 145, 130)" fill="#B5AFA1" />
                <ellipse cx="165" cy="120" rx="4.2" ry="2.1" transform="rotate(-35, 165, 120)" fill="#B5AFA1" />
                <ellipse cx="185" cy="128" rx="4.5" ry="2.2" transform="rotate(10, 185, 128)" fill="#B5AFA1" />
                <ellipse cx="205" cy="140" rx="4.2" ry="2.1" transform="rotate(25, 205, 140)" fill="#B5AFA1" />
                <ellipse cx="145" cy="148" rx="4.5" ry="2.2" transform="rotate(-20, 145, 148)" fill="#B5AFA1" />
                <ellipse cx="175" cy="145" rx="4" ry="2" transform="rotate(15, 175, 145)" fill="#B5AFA1" />
                <ellipse cx="120" cy="147" rx="4.5" ry="2.2" transform="rotate(60, 120, 147)" fill="#B5AFA1" />
              </g>

              {hoveredAnatomy === "shari" && (
                <path 
                  d="M 90,135 Q 100,105 160,110 Q 220,115 230,140 Q 220,165 160,165 Q 100,160 90,135 Z" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2.5" 
                />
              )}
            </g>

            {/* SECRET WASABI LAYER (Slight chartreuse line hiding between Shari and Neta) */}
            <g
              onMouseEnter={() => setHoveredAnatomy("wasabi")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "wasabi" ? null : "wasabi")}
              className="cursor-pointer group"
            >
              {/* Large touch pad around washbi center segment */}
              <circle cx="160" cy="110" r="15" fill="transparent" className="cursor-pointer" />

              <path 
                d="M 115,115 Q 160,106 205,114" 
                fill="none" 
                stroke={hoveredAnatomy === "wasabi" ? "#10B981" : "#8EE01C"} 
                strokeWidth={hoveredAnatomy === "wasabi" ? "4.5" : "2.5"} 
                strokeLinecap="round" 
                opacity="1"
                className="select-none pointer-events-none transition-colors duration-200"
              />
            </g>

            {/* NETA (Succulent visual fresh Salmon slab on top) */}
            <g 
              onMouseEnter={() => setHoveredAnatomy("neta")}
              onMouseLeave={() => setHoveredAnatomy(null)}
              onClick={() => setHoveredAnatomy(hoveredAnatomy === "neta" ? null : "neta")}
              className="cursor-pointer group"
            >
              {/* Invisible touch pad for salmon slab on mobile */}
              <path 
                d="M 75,125 Q 82,82 158,74 Q 234,66 250,110 Q 230,140 160,136 Q 90,132 75,125 Z" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="16" 
                className="cursor-pointer"
              />

              {/* Main Flesh Slab */}
              <path 
                d="M 75,125 Q 82,82 158,74 Q 234,66 250,110 Q 230,140 160,136 Q 90,132 75,125 Z" 
                fill="url(#salmonGlow)" 
                stroke="#BC3B1E" 
                strokeWidth="1.2"
                className="origin-center select-none cursor-pointer"
              />

              {/* Handcrafted salmon fat lines (marbling) that curve gracefully */}
              <g className="pointer-events-none">
                <path d="M 100,98 Q 112,120 128,124" stroke="url(#marblingWhite)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M 130,90 Q 145,115 162,118" stroke="url(#marblingWhite)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M 160,84 Q 178,108 198,111" stroke="url(#marblingWhite)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M 190,79 Q 212,102 232,105" stroke="url(#marblingWhite)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </g>

              {/* Fresh glossary glaze lighting reflection */}
              <path 
                d="M 90,110 Q 105,92 145,86" 
                fill="none" 
                stroke="#FFF" 
                strokeWidth="2" 
                strokeLinecap="round" 
                opacity="0.45"
                className="pointer-events-none"
              />

              {hoveredAnatomy === "neta" && (
                <path 
                  d="M 75,125 Q 82,82 158,74 Q 234,66 250,110 Q 230,140 160,136 Q 90,132 75,125 Z" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="2.5" 
                  opacity="0.85"
                />
              )}
            </g>

            {/* Guide Anatomy Overlay Text Lines */}
            <AnimatePresence>
              {hoveredAnatomy === "neta" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="158" y1="74" x2="158" y2="40" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="158" cy="74" r="3" fill="#10B981" />
                  <rect x="113" y="15" width="90" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="158" y="28" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SALMON NETA</text>
                </motion.g>
              )}
              {hoveredAnatomy === "shari" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="120" y1="145" x2="60" y2="145" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="120" cy="145" r="3" fill="#10B981" />
                  <rect x="5" y="135" width="50" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="30" y="148" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SHARI</text>
                </motion.g>
              )}
              {hoveredAnatomy === "wasabi" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  <line x1="180" y1="110" x2="245" y2="125" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="180" cy="110" r="3" fill="#10B981" />
                  <rect x="245" y="115" width="55" height="20" rx="4" fill="#000" opacity="0.85" />
                  <text x="272.5" y="128" fill="#FFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">WASABI</text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        );
    }
  };

  return (
    <section id="sushi-guide" className={`py-24 px-6 md:px-4 border-t relative overflow-hidden select-none transition-colors duration-500 ${
      isDarkMode 
        ? "bg-black border-white/5" 
        : "bg-[#FAF6F0] border-neutral-200"
    }`}>
      {/* Background radial soft light gradient */}
      <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full blur-[120px] pointer-events-none z-0 ${
        isDarkMode ? "bg-sakura-red/5" : "bg-sakura-red/[0.03]"
      }`} />
      <div className={`absolute bottom-0 right-10 w-[280px] h-[280px] rounded-full blur-[100px] pointer-events-none z-0 ${
        isDarkMode ? "bg-sakura-rose/5" : "bg-sakura-rose/[0.03]"
      }`} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center justify-center gap-3 mb-16 w-full">
          <span className={`text-xs uppercase tracking-[0.4em] font-extrabold font-mono ${
            isDarkMode ? "text-emerald-400" : "text-emerald-600"
          }`}>
            Elevating Your Dining Confidence
          </span>
          <h2 className={`text-4xl md:text-5xl font-serif tracking-tight leading-none mb-1 font-bold ${
            isDarkMode ? "text-white" : "text-neutral-900"
          }`}>
            Know Your Sushi
          </h2>
          <div className="w-16 h-1 bg-emerald-500 rounded-full" />
          <p className={`font-light text-sm sm:text-base max-w-2xl mt-2 transition-colors duration-300 ${
            isDarkMode ? "text-neutral-400" : "text-neutral-600"
          }`}>
            Demystifying the rich architectural styles and traditional dining etiquettes of premium Japanese sushi. Hover or tap the vector designs to explore their anatomy!
          </p>
        </div>

        {/* Dynamic Selector Carousel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Horizontal / Circular Select Area (Left / Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-start gap-4 h-full">
            <h3 className={`text-xs font-mono uppercase tracking-widest mb-2 font-bold px-1 text-center lg:text-left ${
              isDarkMode ? "text-neutral-500" : "text-neutral-500/80"
            }`}>
              Select A Style
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3.5">
              {(Object.keys(SUSHI_TYPES) as SushiTypeId[]).map((typeId) => {
                const info = SUSHI_TYPES[typeId];
                const isActive = activeTab === typeId;
                return (
                  <button
                    key={typeId}
                    onClick={() => {
                      setActiveTab(typeId);
                      setHoveredAnatomy(null);
                    }}
                    className={`p-4 rounded-2xl border text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 transition-all duration-300 group cursor-pointer active:scale-98 ${
                      isActive 
                        ? isDarkMode 
                          ? "bg-neutral-900 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-white" 
                          : "bg-white border-emerald-500/30 shadow-md text-neutral-900"
                        : isDarkMode
                          ? "bg-black/40 hover:bg-neutral-900 border-white/5 hover:border-emerald-500/20"
                          : "bg-white hover:bg-emerald-50/[0.2] border-neutral-200 hover:border-emerald-200/50 shadow-sm"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-serif font-bold transition ${
                          isActive 
                            ? isDarkMode ? "text-white" : "text-neutral-900"
                            : isDarkMode ? "text-neutral-400 group-hover:text-white" : "text-neutral-600 group-hover:text-neutral-900"
                        }`}>
                          {info.name}
                        </span>
                        <span className={`text-[10px] border px-1.5 py-0.5 rounded-md font-mono ${
                          isDarkMode 
                            ? "bg-white/5 border-white/5 text-neutral-500" 
                            : "bg-black/5 border-black/5 text-neutral-600"
                        }`}>
                          {info.japanese}
                        </span>
                      </div>
                      <p className={`text-[10px] uppercase tracking-wider font-light mt-0.5 ${
                        isDarkMode ? "text-neutral-500" : "text-neutral-500"
                      }`}>
                        {info.translation}
                      </p>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 border ${
                      isActive 
                        ? isDarkMode 
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                          : "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm"
                        : isDarkMode 
                          ? "bg-white/5 border-white/5 text-neutral-600 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 group-hover:text-emerald-400" 
                          : "bg-black/5 border-black/5 text-neutral-400 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600"
                    }`}>
                      <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isActive ? "translate-x-0" : "group-hover:translate-x-0.5"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Quick Note Card */}
            <div className={`hidden lg:block p-5 rounded-[2rem] mt-4 space-y-3 border transition-colors duration-300 ${
              isDarkMode 
                ? "bg-black border-white/10" 
                : "bg-white/80 border-neutral-200 shadow-sm"
            }`}>
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                <Leaf className="h-4 w-4 animate-pulse" />
                <span className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isDarkMode ? "text-emerald-400" : "text-emerald-600"
                }`}>Palate Cleansing</span>
              </div>
              <p className={`text-xs leading-relaxed font-light transition-colors duration-300 ${
                isDarkMode ? "text-neutral-500" : "text-neutral-600"
              }`}>
                Did you know? Traditional pickled ginger (<span className={`italic ${
                  isDarkMode ? "text-neutral-400" : "text-neutral-800 font-medium"
                }`}>Gari</span>) is served to wash away previous oils so you experience every ingredient fresh!
              </p>
            </div>
          </div>

          {/* SVG Frame Display & Exploration Card (Center / Span 4) */}
          <div className={`lg:col-span-4 flex flex-col items-center justify-between border rounded-[2.5rem] p-6 lg:p-8 min-h-[380px] overflow-hidden relative shadow-2xl transition-all duration-300 ${
            isDarkMode 
              ? "bg-black border-white/10" 
              : "bg-white border-neutral-200 shadow-xl"
          }`}>
            <div className={`absolute top-4 left-4 flex gap-1.5 items-center px-3 py-1 rounded-full pointer-events-none border ${
              isDarkMode 
                ? "bg-black/30 border-white/5" 
                : "bg-neutral-100/80 border-neutral-200/50"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`text-[9px] font-mono tracking-widest font-bold uppercase ${
                isDarkMode ? "text-neutral-400" : "text-neutral-600"
              }`}>Anatomy Live HUD</span>
            </div>

            {/* Render selected Sushi Illustration */}
            <div className="w-full flex justify-center items-center h-full min-h-[180px] max-h-[220px] mt-4">
              {renderInteractiveSushiSvg()}
            </div>

            {/* Dynamic Anatomy Information Panel */}
            <div className="w-full mt-4 min-h-[85px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {hoveredAnatomy && ANATOMY_DETAILS[hoveredAnatomy] ? (
                  <motion.div
                    key={hoveredAnatomy}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className={`w-full p-3.5 rounded-2xl border text-center transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-neutral-900/95 border-emerald-500/20 text-neutral-200 shadow-[0_4px_20px_rgba(16,185,129,0.06)]"
                        : "bg-emerald-50/50 border-emerald-500/10 text-neutral-800 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1 flex-wrap">
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-extrabold ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                        Anatomy:
                      </span>
                      <strong className={`text-xs md:text-sm font-bold ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
                        {ANATOMY_DETAILS[hoveredAnatomy].title}
                      </strong>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/10 border border-emerald-500/20 rounded font-mono text-emerald-400">
                        {ANATOMY_DETAILS[hoveredAnatomy].japanese}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}>
                      {ANATOMY_DETAILS[hoveredAnatomy].desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="tutorial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`text-center py-2.5 px-4 rounded-2xl text-[11px] leading-normal font-sans border border-dashed flex items-center gap-2 transition-colors duration-300 ${
                      isDarkMode
                        ? "border-emerald-500/10 text-neutral-500 bg-neutral-950/20"
                        : "border-emerald-500/20 text-neutral-500 bg-neutral-50/20"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>
                      <strong className="text-emerald-500">Interactive:</strong> Hover or tap elements on the sushi to reveal their culinary secrets!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Detailed Content Display Card (Right / Span 4) */}
          <div className={`lg:col-span-4 flex flex-col justify-between border rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden lg:min-h-[380px] min-h-0 transition-all duration-300 ${
            isDarkMode 
              ? "bg-black border-white/10" 
              : "bg-white border-neutral-200 shadow-xl"
          }`}>
            {/* Soft backdrop glow */}
            <div className={`absolute top-0 right-0 w-[150px] h-[150px] rounded-full blur-[40px] pointer-events-none ${
              isDarkMode ? "bg-white/5" : "bg-emerald-500/5"
            }`} />

            <div className="space-y-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <h4 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}>
                    {activeSushi.name}
                  </h4>
                  <span className={`text-xs font-serif italic ${
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}>
                    /{activeSushi.phonetic}/
                  </span>
                </div>
                <span className={`text-[10px] uppercase font-mono tracking-widest block mt-1 ${
                  isDarkMode ? "text-neutral-400" : "text-neutral-500"
                }`}>
                  {activeSushi.translation} • {activeSushi.japanese}
                </span>
                
                <p className={`text-xs sm:text-sm mt-3 leading-relaxed font-light transition-colors duration-300 ${
                  isDarkMode ? "text-neutral-400" : "text-neutral-600"
                }`}>
                  {activeSushi.masterDesc}
                </p>
              </div>

              {/* Specific Items Available at Sakura Everest Badge Matrix */}
              <div className={`border-t border-dashed pt-4 ${
                isDarkMode ? "border-white/10" : "border-neutral-200"
              }`}>
                <span className={`text-[9px] font-mono uppercase tracking-[0.2em] font-bold block mb-2 ${
                  isDarkMode ? "text-neutral-500" : "text-neutral-400"
                }`}>
                  Order at Sakura Everest, Coventry:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSushi.sakuraItems.map((item, idx) => (
                    <span 
                      key={`sakura-badge-${idx}`}
                      className={`text-[10px] px-2.5 py-1 rounded-xl font-semibold transition-colors duration-300 border ${
                        isDarkMode 
                          ? "bg-black border-white/10 hover:border-emerald-500/30 text-neutral-300" 
                          : "bg-neutral-50 border-neutral-200 hover:border-emerald-500/30 text-neutral-700"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Fact Corner */}
            <div className={`border p-4 rounded-2xl flex items-start gap-3 mt-6 transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-black border-white/10" 
                  : "bg-neutral-50 border-neutral-200"
            }`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-white/5 border-white/10 text-neutral-400" 
                  : "bg-black/5 border-black/10 text-neutral-600"
              }`}>
                <Info className="h-4 w-4" />
              </div>
              <div>
                <span className={`text-[9px] font-mono uppercase tracking-widest font-bold block ${
                  isDarkMode ? "text-neutral-400" : "text-neutral-500"
                }`}>
                  Cuisine Fact
                </span>
                <p className={`text-[11px] leading-normal font-light mt-0.5 transition-colors duration-300 ${
                  isDarkMode ? "text-neutral-500" : "text-neutral-600"
                }`}>
                  {activeSushi.facts[0]}
                </p>
              </div>
            </div>

          </div>

        </div>




      </div>
    </section>
  );
};
