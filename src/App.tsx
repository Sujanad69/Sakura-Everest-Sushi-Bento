/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Menu as MenuIcon, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  ArrowRight,
  Download,
  X,
  Navigation,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Leaf,
  ChefHat,
  Tag,
  Sliders,
  Sparkles,
  Eye,
  Play,
  Pause,
  Maximize2,
  Copy,
  Check,
  Sun,
  Moon
} from "lucide-react";
import { ChibiMaki } from "./components/ChibiMaki";
import { KnowYourSushi } from "./components/KnowYourSushi";
import { GoogleReviews } from "./components/GoogleReviews";
import { OrderNowSection } from "./components/OrderNowSection";
import { 
  WaveChopsticksDivider, 
  ChopsticksLiftDivider, 
  FallingSushiSilverDivider 
} from "./components/SectionDividers";

const GALLERY_IMAGES = [
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/055e9571-f131-4376-b694-cb01df0a77c1.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/14e1dfc3-d747-4dcb-9a28-4d71c48dd64a.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/1751a196-38fb-4ee9-bda9-af7e100f9ee7.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/21c3f42d-a80b-413c-b9d0-ab4511ec6471.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/28b093c3-3c45-4f23-830f-cf48894272f5.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/2f853301-1581-416a-8b8f-6a1c6d1e4b73.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/7593778e-dfe2-4832-b2c3-0b03aa515b0c.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/77cfdd22-f19a-486e-a91c-b30dd60aaca9.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/84fab9dd-1796-4d17-bc1f-0842f1cebe57.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/9248420e-2dde-4cb6-9a4e-1b15220aa65d.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/95353a60-cd1d-45bd-b684-09cc0f83c206.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/a7074eb5-c6e8-4dc9-a89b-cdda6852797c.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/b13148e8-5012-4a35-9cdd-f97fb7186fcf.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/b25b6035-2d0a-43f8-9f12-9a582c188311.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/ccef5c78-c07b-4f52-8c19-528ff0b34edf.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/d19b4427-0f45-45cb-8e11-30cb4a6baf22.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/d56c7aa5-9204-4daa-a2ef-e84ba777a0e9.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/d8c1f391-1a4d-4643-accd-df59ed18995c.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/e71763d2-162e-487a-ac45-376213a58f19.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/f002c870-9e26-47a6-beba-431dc830b5a5.jfif",
  "https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/f6078d77-61f8-46a3-8fdf-b38c96483b90.jfif"
];

const GALLERY_DETAILS = [
  { title: "Signature Sakura Roll", desc: "Premium crab and buttery avocado, covered with torch-seared salmon & spicy-sweet glaze." },
  { title: "Everest Volcano Bento", desc: "An architectural heap of crunchy panko salmon roll topped with baked spicy seafood crab salad." },
  { title: "Traditional Tuna Nigiri", desc: "Locally caught dry-aged maguro tuna over seasoned warm koshihikari vinegar-infused rice." },
  { title: "Crispy Ebi Tempura", desc: "Deep-fried jumbo sweet tiger prawns coated in an incredibly light, airy Japanese batter." },
  { title: "Premium Sashimi Platter", desc: "Chef's custom selection of pristine sashimi grade seafood served over mountain ice." },
  { title: "Smoked Sake Maki", desc: "Delicate roll filled with cured wild smoked salmon, cucumber threads, and smooth cream cheese." },
  { title: "Unagi Dragon Roll", desc: "Baked sweet soy-glazed unagi eel placed beautifully on top of a soft toasted crab avocado roll." },
  { title: "Spicy Shoyu Ramen", desc: "Authentic wheat ramen noodles in a rich pork bone broth with chili bean oil & nitrite egg." },
  { title: "Himalayan Yak Soba", desc: "Wok-fried iron skillet buckwheat noodles cooked with crisp organic vegetables and sweet soy sauce." },
  { title: "Matcha Green Tea Tiramisu", desc: "Classic ladyfingers soaked in full-strength ceremonial Kyoto matcha green tea cream layers." },
  { title: "Deluxe Bento Combination", desc: "Classic lacquered lunchbox with sashimi, crispy chicken katsu, tamagoyaki, and seaweed salad." },
  { title: "Chef's Special Handroll Trio", desc: "An assortment of spicy crispy tuna, salmon bimi, and unagi avocado hand-wrapped temaki cones." },
  { title: "Chilled Sea Salt Edamame", desc: "Slightly blanched young soy beans in their shells, tossed generously in coarse mineral pink salt flakes." },
  { title: "Crispy Pork Gyoza Medley", desc: "Seared and steamed Japanese wrapper pastries stuffed with seasoned tender pork and fresh chives." },
  { title: "Golden Pumpkin Croquette", desc: "Rich panko-encrusted kabocha pumpkin smooth puree with sweet tangy fruit tonkatsu brown sauce." },
  { title: "Avocado Hosomaki", desc: "Slim nori seaweed maki roll with creamy ripe Hass avocado core and toasted white sesame seeds." },
  { title: "Premium Salmon Tataki", desc: "Seared-on-outer sashimi grade salmon medallions served over fresh grated ginger and yuzu daikon." },
  { title: "Sweet Sakura Mochi Dessert", desc: "Hand-kneaded pink glutinous rice cake wrapped in real salted pickled cherry leaf with azuki paste." },
  { title: "Golden Chicken Katsu Curry", desc: "Perfectly crisp chicken cutlet served along with our iconic spiced Japanese curry roux and rice." },
  { title: "Zesty Oshinko Pickled Radish", desc: "Traditional bright yellow quick-pickled crisp daikon radish coins with a hint of toasted sesame." },
  { title: "Chilled Matcha Ice Cream", desc: "Fragrant double-churned stone-ground Kyoto green tea premium cold dessert." }
];

const SakuraPetalsBackground = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    // Generate petals config on client side once to avoid SSR hydration mismatches
    const newPetals = Array.from({ length: 18 }).map((_, i) => {
      const size = Math.random() * 8 + 6; // 6px to 14px
      return {
        id: i,
        left: `${Math.random() * 95}%`,
        size: `${size}px`,
        delay: `${Math.random() * 12}s`,
        duration: `${Math.random() * 12 + 12}s`, // 12s to 24s
      };
    });
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}, 0s`,
            animationDuration: `${p.duration}, ${parseFloat(p.duration) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
};

const SakuraEverestHeritageIllustration = () => {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center group">
      {/* Ambient background glow - static for maximum GPU compositing performance */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full bg-sakura-red/15 blur-[130px] top-1/6 left-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-30"
      />

      {/* Living animated SVGs without a bounding box */}
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain relative z-10 select-none"
      >
        <defs>
          <linearGradient id="skyPremiumGrad" x1="400" y1="0" x2="400" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#070509" />
            <stop offset="45%" stopColor="#170c1a" />
            <stop offset="75%" stopColor="#280e1e" />
            <stop offset="100%" stopColor="#410f1a" />
          </linearGradient>
          
          {/* Japanese Precision: Rich cherry-red Sun gradient */}
          <linearGradient id="sunBloomGrad" x1="400" y1="160" x2="400" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff5a79" />
            <stop offset="35%" stopColor="#e31e24" />
            <stop offset="100%" stopColor="#5f030d" />
          </linearGradient>
          
          {/* Peak Ingredients: Pristine Glacier-Blue faceting gradients */}
          <linearGradient id="everestFacetLeft" x1="300" y1="130" x2="450" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#dbeafe" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1e1b29" />
          </linearGradient>
          <linearGradient id="everestFacetRight" x1="450" y1="130" x2="600" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="40%" stopColor="#1d4ed8" />
            <stop offset="80%" stopColor="#111827" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>
          
          <linearGradient id="deepMountainGrad" x1="400" y1="240" x2="400" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1d1524" />
            <stop offset="100%" stopColor="#08050c" />
          </linearGradient>
          
          {/* Subtle details gradients */}
          <linearGradient id="sakuraFlowerGrad" x1="0" y1="-10" x2="0" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          
          <linearGradient id="mysticCloudGrad" x1="100" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0" />
            <stop offset="50%" stopColor="#A7F3D0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          
          <linearGradient id="auroraWindGrad" x1="0" y1="200" x2="800" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#A7F3D0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Crisp static stars - completely lag-free */}
        {[
          { cx: 80, cy: 110, r: 1.2 },
          { cx: 210, cy: 60, r: 2.2 },
          { cx: 290, cy: 120, r: 1.5 },
          { cx: 550, cy: 90, r: 2.5 },
          { cx: 620, cy: 65, r: 1 },
          { cx: 740, cy: 130, r: 2 },
          { cx: 470, cy: 40, r: 1.8 },
        ].map((star, idx) => (
          <circle
            key={idx}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#ffffff"
            opacity="0.75"
          />
        ))}

        {/* The Solar Dawn (Warm Crimson Japanese Hinomaru Sun representing Precision) - static for performance */}
        <circle
          cx="400"
          cy="260"
          r="125"
          fill="url(#sunBloomGrad)"
          className="mix-blend-screen opacity-85"
        />

        {/* Gorgeous static Aurora/Wind curves - zero performance overhead */}
        <path
          d="M -100 240 Q 150 140, 400 220 T 900 180"
          stroke="url(#auroraWindGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M -50 320 Q 250 250, 500 310 T 850 240"
          stroke="url(#auroraWindGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />

        {/* Elegant glowing atmospheric cloud bands */}
        <path d="M50 210 Q 200 170 400 230 T 750 180" stroke="url(#mysticCloudGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M80 340 Q 300 280 500 350 T 720 310" stroke="url(#mysticCloudGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Mountain Ridge 1 (Deep Background Peaks representing Everest scale) */}
        <path
          d="M80 480 L290 250 L410 390 L630 220 L780 480 Z"
          fill="url(#deepMountainGrad)"
          className="opacity-45"
        />

        {/* High-End Geometric low-poly faceting for the main Mount Everest Peak */}
        {/* Combining crystal colors representing Peak Ingredients */}
        <g id="EverestSummit">
          {/* Facet Left Shadow */}
          <path d="M 260 480 L 450 130 L 410 260 L 330 380 Z" fill="#1b1c32" />
          
          {/* Facet Left Midtone highlight */}
          <path d="M 330 380 L 410 260 L 450 130 L 450 480 Z" fill="url(#everestFacetLeft)" />
          
          {/* Facet Right Shadows & Light (Warm sunset edge) */}
          <path d="M 450 130 L 550 270 L 480 340 L 450 480 Z" fill="url(#everestFacetRight)" />
          
          {/* Right outermost wing */}
          <path d="M 550 270 L 690 480 L 480 340 Z" fill="#0d111d" />

          {/* Ice Blue Crest Line & Emerald Shimmer representing pure ingredients */}
          <path
            d="M 450 130 L 410 260 L 450 480"
            stroke="#60a5fa"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-90"
          />
          <path
            d="M 450 130 L 550 270"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-65"
          />
        </g>

        {/* Everest golden ridge wind line accent (Heritage Gold) */}
        <path
          d="M450 130 L480 340"
          stroke="#f59e0b"
          strokeWidth="2"
          className="opacity-75"
        />

        {/* Mid-ground mountain chain left */}
        <path
          d="M140 480 L320 220 L410 330 L450 480 Z"
          fill="#161424"
          className="opacity-90"
        />
        <path
          d="M320 220 L345 260 L330 255 L310 230 Z"
          fill="#93c5fd"
          className="opacity-80"
        />

        {/* Ancient Japanese Pagoda (Crimson/Charcoal Heritage Icon with glowing gold details) */}
        <g className="transition-all duration-700 hover:scale-105 origin-bottom" id="heritagePagoda">
          {/* Base Platform */}
          <rect x="175" y="445" width="40" height="5" fill="#130e18" />
          {/* Base Wall */}
          <rect x="180" y="420" width="30" height="25" fill="#1e1426" />
          {/* Glowing Golden Archways representing Heritage Fusion */}
          <rect x="191" y="426" width="8" height="19" fill="#f59e0b" opacity="0.95" className="shadow-[0_0_10px_#f59e0b]" />
          <circle cx="195" cy="433" r="2" fill="#e31e24" />

          {/* Roof 1 Layer with classic upcurved eaves */}
          <path d="M166 422 C 180 412, 210 412, 224 422 L214 414 L176 414 Z" fill="#e31e24" />
          
          {/* Level 2 Walls */}
          <rect x="185" y="396" width="20" height="18" fill="#130e18" />
          <rect x="193" y="401" width="4" height="10" fill="#f59e0b" opacity="0.95" />
          
          {/* Roof 2 Layer */}
          <path d="M172 398 C 185 388, 205 388, 218 398 L209 391 L181 391 Z" fill="#e31e24" fillRule="evenodd" />

          {/* Level 3 walls */}
          <rect x="189" y="377" width="12" height="14" fill="#0c0710" />
          
          {/* Roof 3 Layer */}
          <path d="M178 379 C 188 371, 202 371, 212 379 L205 373 L185 373 Z" fill="#e31e24" />

          {/* Pagoda Spire (Bronze spire pointing to the stars) */}
          <line x1="195" y1="373" x2="195" y2="340" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="195" cy="346" r="3" fill="#fbbf24" />
          <circle cx="195" cy="354" r="2" fill="#e31e24" />
        </g>

        {/* Prayer Flag string floating gracefully over Everest slopes */}
        <g opacity="0.55">
          <path d="M210 435 Q 310 360, 390 220" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4,4" fill="none" />
          {/* Vibrant structural colors matched prayer flags */}
          <polygon points="235,410 241,415 243,405" fill="#e31e24" /> {/* Precision Red */}
          <polygon points="255,390 261,395 263,385" fill="#38bdf8" /> {/* Ingredient Blue */}
          <polygon points="275,370 281,375 283,365" fill="#f59e0b" /> {/* Heritage Gold */}
          <polygon points="295,350 301,355 303,345" fill="#ffffff" />
          <polygon points="315,330 321,335 323,325" fill="#10b981" />
          <polygon points="335,310 341,315 343,305" fill="#A7F3D0" />
        </g>

        {/* Elegant hand-sculpted Japanese Sakura branch growing from top-left */}
        <g className="origin-left">
          {/* Main calligraphic branches with tapered aesthetics */}
          <path
            d="M 30 90 C 130 110, 260 70, 380 120 C 440 140, 480 130, 520 110"
            stroke="#1c0f13"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 180 93 C 220 160, 290 170, 360 220"
            stroke="#1c0f13"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 100 102 C 120 170, 160 210, 200 240"
            stroke="#211317"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 280 90 C 320 50, 380 40, 430 35"
            stroke="#1c0f13"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sakura Blossoms Clusters with REAL 5-PETAL SHAPES (Japanese Precision) */}
          {/* Flower design templates rendered as beautiful paths instead of cheap dots */}
          {[
            { x: 140, y: 110, s: 1.4, opacity: 0.95 },
            { x: 250, y: 80, s: 1.6, opacity: 0.98 },
            { x: 330, y: 105, s: 1.5, opacity: 0.95 },
            { x: 390, y: 128, s: 1.3, opacity: 0.9 },
            { x: 310, y: 185, s: 1.4, opacity: 0.95 },
            { x: 360, y: 220, s: 1.25, opacity: 0.95 },
            { x: 180, y: 220, s: 1.3, opacity: 0.92 },
            { x: 440, y: 115, s: 1.1, opacity: 0.9 }
          ].map((flower, fidx) => (
            <g key={`flower-${fidx}`} transform={`translate(${flower.x}, ${flower.y}) scale(${flower.s})`} opacity={flower.opacity}>
              {/* Petal 5-sided group */}
              <circle cx="0" cy="0" r="10" fill="#A7F3D0" opacity="0.4" />
              {/* Complex 5-petal flower path */}
              <path 
                d="M 0,-8 C -2,-13, -7,-12, -5,-7 C -10,-9, -13,-4, -7,-3 C -10,1, -7,7, -3,5 C -2,10, 3,10, 3,5 C 7,7, 10,1, 7,-3 C 13,-4, 10,-9, 5,-7 C 7,-12, 2,-13, 0,-8 Z" 
                fill="url(#sakuraFlowerGrad)" 
              />
              {/* Pistils and golden center filaments */}
              <circle cx="0" cy="0" r="3.2" fill="#A7F3D0" />
              <circle cx="0" cy="0" r="1.5" fill="#f59e0b" />
            </g>
          ))}
 
          {/* Bud and secondary tiny petals */}
          {[
            { cx: 80, cy: 95, r: 4.5 },
            { cx: 210, cy: 110, r: 5.5 },
            { cx: 290, cy: 55, r: 6 },
            { cx: 480, cy: 105, r: 5 },
            { cx: 495, cy: 102, r: 3.5 }
          ].map((bud, bidx) => (
            <circle key={`bud-${bidx}`} cx={bud.cx} cy={bud.cy} r={bud.r} fill="#6EE7B7" stroke="#e31e24" strokeWidth="1" />
          ))}
        </g>
 
        {/* Dynamic drift cherry blossom petals & snowflakes fluttering inside the SVG coordinates */}
        {[
          { cx: 340, cy: 150, r: 4, delay: 0.5, dur: 5.5, dx: -140, dy: 380, fill: "#6EE7B7", type: 'petal' },
          { cx: 480, cy: 90, r: 2.2, delay: 2.8, dur: 7.2, dx: -220, dy: 440, fill: "#cbd5e1", type: 'snow' }, // ice snow
          { cx: 210, cy: 130, r: 3.8, delay: 4.2, dur: 8.5, dx: -150, dy: 350, fill: "#A7F3D0", type: 'petal' },
          { cx: 620, cy: 110, r: 2.0, delay: 1.1, dur: 9.0, dx: -280, dy: 400, fill: "#e0f2fe", type: 'snow' }, // crystallised snow
          { cx: 440, cy: 220, r: 3.2, delay: 5.9, dur: 6.8, dx: -200, dy: 340, fill: "#6EE7B7", type: 'petal' },
          { cx: 530, cy: 160, r: 3.5, delay: 3.4, dur: 7.9, dx: -210, dy: 370, fill: "#6EE7B7", type: 'petal' }
        ].map((p, i) => (
          p.type === 'petal' ? (
            <motion.path
              key={`in-svg-pet-${i}`}
              d="M0,0 C-4,-6 -8,-4 -5,0 C-8,4 -4,8 0,0"
              fill={p.fill}
              className="drop-shadow-sm"
              animate={{
                x: [p.cx, p.cx + p.dx],
                y: [p.cy, p.cy + p.dy],
                rotate: [0, 420],
                opacity: [0, 0.92, 0.92, 0]
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ originX: "50%", originY: "50%" }}
            />
          ) : (
            <motion.circle
              key={`in-svg-snw-${i}`}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={p.fill}
              animate={{
                x: [0, p.dx],
                y: [0, p.dy],
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )
        ))}

        {/* Elegant horizon line separator */}
        <line x1="50" y1="480" x2="750" y2="480" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Pagoda warm golden reflection lines (Heritage Gold/Red matched) */}
        <ellipse cx="195" cy="491" rx="28" ry="2" fill="#A7F3D0" opacity="0.2" />
        <ellipse cx="195" cy="494" rx="20" ry="1.5" fill="#e31e24" opacity="0.35" />
        <ellipse cx="195" cy="501" rx="14" ry="1" fill="#f59e0b" opacity="0.3" />

        {/* Everest shadow reflection lines (Glacier Ice Blue / Purple matched) */}
        <rect x="360" y="492" width="180" height="3.5" fill="rgba(96,165,250,0.22)" />
        <rect x="380" y="498" width="140" height="1.5" fill="rgba(16,185,129,0.15)" />
        <rect x="420" y="504" width="60" height="1" fill="rgba(255,255,255,0.08)" />
      </svg>

      {/* Tying the actual logo to the artwork without solid borders */}
      <div className="absolute top-0 right-0 z-20 flex items-center gap-2.5 p-1.5 pr-4 rounded-3xl bg-neutral-950/40 border border-white/5 backdrop-blur-[2px] transition-all duration-500 hover:scale-105 select-none pointer-events-none hidden sm:flex">
        <div className="w-8 h-8 rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 flex items-center justify-center p-0.5 shadow-inner">
          <img 
            src="https://raw.githubusercontent.com/Sujanad69/Pukumodel/main/IMG_3388.png" 
            alt="Sakura Everest Logo Seal" 
            className="w-full h-full object-cover rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col text-[8px] font-mono leading-none">
          <span className="font-extrabold text-[#f59e0b] tracking-wider">HERITAGE SEAL</span>
          <span className="text-white/60 text-[7px] mt-0.5 tracking-tight">COVENTRY ORIGINAL</span>
        </div>
      </div>

      {/* Floating premium details tag with animated glassmorphism */}
      <div className="absolute bottom-0 left-0 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-950/20 border border-white/5 backdrop-blur-[1px] transition-all duration-500">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sakura-red opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sakura-red shadow-[0_0_8px_#e31e24]"></span>
        </span>
        <span className="text-[9px] font-mono font-black tracking-[0.25em] uppercase text-white/95">SAKURA x EVEREST</span>
      </div>
    </div>
  );
};

const BorderSakuraBranches = () => {
  return null;
};

const SavedBorderSakuraBranchesDeactivatedPlaceholder = () => {
  return null;
  const legacyInactiveOutput = ( 
    <div className="absolute inset-x-0 top-0 h-0 pointer-events-none z-50 select-none overflow-visible">
      <motion.div 
        className="absolute top-0 left-0 origin-top-left scale-[0.65] sm:scale-90 md:scale-110 lg:scale-125"
        animate={{
          rotate: [0, 1.8, -1.2, 0.6, 0],
          y: [0, 3, -2, 1, 0]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="340" height="280" viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.98] filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)]">
          <defs>
            <linearGradient id="sakuraGradPetal" x1="0" y1="0" x2="15" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="sakuraGradPetalInner" x1="0" y1="0" x2="10" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ECFDF5" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="sakuraGradStamenCore" x1="0" y1="0" x2="3" y2="3" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="sakuraGradStamen" x1="0" y1="0" x2="0" y2="4" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Reusable Realistic Sakura Flower - Double Layered & Notched */}
            <g id="realDetailedSakuraFlower">
              {/* Ambient flower drop shadow blur */}
              <circle cx="0" cy="0" r="13" fill="#e31e24" opacity="0.14" filter="blur(2px)" />
              
              {/* Layer 1: Outer 5 petals with signature notched tip */}
              {[0, 72, 144, 216, 288].map((angle) => (
                <path
                  key={`out-${angle}`}
                  d="M 0 0 C -4.5 -10 -11 -16 -4.5 -21 L 0 -17 L 4.5 -21 C 11 -16 4.5 -10 0 0"
                  fill="url(#sakuraGradPetal)"
                  transform={`rotate(${angle})`}
                />
              ))}
              
              {/* Layer 2: Inner 5 petals (rotated 36 deg, scaled 0.8, lighter translucent pink highlights) */}
              {[36, 108, 180, 252, 324].map((angle) => (
                <path
                  key={`in-${angle}`}
                  d="M 0 0 C -3.5 -7.5 -8.5 -12 -3.5 -16 L 0 -13 L 3.5 -16 C 8.5 -12 3.5 -7.5 0 0"
                  fill="url(#sakuraGradPetalInner)"
                  transform={`rotate(${angle})`}
                />
              ))}
              
              {/* Red-gold Stamen Center Core */}
              <circle cx="0" cy="0" r="3.2" fill="#881337" opacity="0.35" />
              <circle cx="0" cy="0" r="2.2" fill="url(#sakuraGradStamenCore)" />
              
              {/* Delicate filaments & yellow pollen grains */}
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, sIdx) => {
                const len = 7.5;
                const rad = (angle * Math.PI) / 180;
                const x2 = Math.cos(rad) * len;
                const y2 = Math.sin(rad) * len;
                return (
                  <g key={`stamen-${angle}-${sIdx}`}>
                    <line x1="0" y1="0" x2={x2} y2={y2} stroke="url(#sakuraGradStamen)" strokeWidth="0.5" opacity="0.95" />
                    <circle cx={x2} cy={y2} r="0.75" fill="#fbbf24" stroke="#d97706" strokeWidth="0.2" />
                  </g>
                );
              })}
              <circle cx="0" cy="0" r="1.1" fill="#facc15" />
            </g>

            {/* High fidelity cherry blossom bud */}
            <g id="realDetailedBud">
              <path d="M-2,2 C-4,-4 0,-7 3,-5" stroke="#3d141e" strokeWidth="1.2" fill="#1c0a0f" />
              <path d="M -1 -2 C -1.5 -6 1.5 -6 1 -2 Z" fill="url(#sakuraGradPetal)" />
              <circle cx="0" cy="-4" r="2.2" fill="#A7F3D0" />
            </g>

            {/* High fidelity green-teal leaf shoot */}
            <g id="realLeaf">
              <path d="M 0 0 C -3 -4 -5 -10 0 -14 C 5 -10 3 -4 0 0" fill="#115e59" opacity="0.85" />
              <path d="M 0 0 C -2 -3 -3 -8 0 -11 C 3 -8 2 -3 0 0" fill="#14b8a6" opacity="0.75" />
            </g>
          </defs>

          {/* Gnarled, woody branches with realistic multi-layered stroke tones */}
          <path d="M-15,-15 Q40,30 110,40 T220,15 T290,-10" stroke="#14070a" strokeWidth="11" strokeLinecap="round" />
          <path d="M-15,-15 Q40,30 110,40 T220,15 T290,-10" stroke="#2a141a" strokeWidth="7" strokeLinecap="round" />
          <path d="M5,10 Q50,33 110,38" stroke="#3c2227" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          
          {/* Detailed side shoots */}
          <path d="M65,30 Q95,65 145,85 T215,95" stroke="#14070a" strokeWidth="6" strokeLinecap="round" />
          <path d="M65,30 Q95,65 145,85 T215,95" stroke="#251217" strokeWidth="3" strokeLinecap="round" />
          
          <path d="M130,38 Q175,25 210,12" stroke="#14070a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M185,55 Q225,75 255,60" stroke="#14070a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M35,16 Q65,45 85,60" stroke="#14070a" strokeWidth="4" strokeLinecap="round" />

          {/* Organic Leaf details */}
          {[
            { x: 50, y: 20, s: 0.8, r: 45 },
            { x: 95, y: 35, s: 0.9, r: -35 },
            { x: 135, y: 48, s: 0.7, r: 80 },
            { x: 180, y: 32, s: 0.85, r: 115 },
            { x: 220, y: 72, s: 0.75, r: -20 }
          ].map((lf, idx) => (
            <g key={`tl-leaf-${idx}`} transform={`translate(${lf.x}, ${lf.y}) scale(${lf.s}) rotate(${lf.r})`}>
              <use href="#realLeaf" />
            </g>
          ))}

          {/* Realistic Cherry Blossoms deployed across coordinates */}
          {[
            { x: 75, y: 32, s: 1.15, r: 15 },
            { x: 115, y: 44, s: 1.35, r: 40 },
            { x: 155, y: 36, s: 1.2, r: 80 },
            { x: 195, y: 22, s: 1.05, r: 165 },
            { x: 235, y: 8, s: 0.85, r: -25 },
            { x: 105, y: 68, s: 1.25, r: 75 },
            { x: 150, y: 88, s: 1.3, r: 105 },
            { x: 195, y: 92, s: 1.1, r: -10 },
            { x: 225, y: 68, s: 0.9, r: 35 },
            { x: 55, y: 45, s: 0.95, r: -45 }
          ].map((fl, idx) => (
            <g key={`tl-realistic-fl-${idx}`} transform={`translate(${fl.x}, ${fl.y}) scale(${fl.s}) rotate(${fl.r})`}>
              <use href="#realDetailedSakuraFlower" />
            </g>
          ))}
          
          {/* Realistic Blossoms Buds */}
          {[
            { x: 135, y: 60, s: 1.15 },
            { x: 175, y: 74, s: 1.0 },
            { x: 215, y: 82, s: 0.9 },
            { x: 255, y: 50, s: 1.1 }
          ].map((bd, bidx) => (
            <g key={`tl-bud-${bidx}`} transform={`translate(${bd.x}, ${bd.y}) scale(${bd.s})`}>
              <use href="#realDetailedBud" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Top Right Delicate Hanging Branch - Fully Responsive */}
      <motion.div 
        className="absolute top-0 right-0 origin-top-right scale-[0.65] sm:scale-90 md:scale-110 lg:scale-125"
        animate={{
          rotate: [0, -1.8, 1.2, -0.6, 0],
          y: [0, 2.5, -2, 1, 0]
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <svg width="340" height="280" viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.98] filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)]">
          <defs>
            <use href="#realDetailedSakuraFlower" />
            <use href="#realDetailedBud" />
            <use href="#realLeaf" />
          </defs>
          {/* Mirrored beautiful curves */}
          <path d="M355,-15 Q280,30 210,40 T100,15 T30,-10" stroke="#14070a" strokeWidth="11" strokeLinecap="round" />
          <path d="M355,-15 Q280,30 210,40 T100,15 T30,-10" stroke="#2a141a" strokeWidth="7" strokeLinecap="round" />
          <path d="M325,10 Q270,33 210,38" stroke="#3c2227" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          
          <path d="M265,30 Q225,65 175,85 T105,95" stroke="#14070a" strokeWidth="6" strokeLinecap="round" />
          <path d="M265,30 Q225,65 175,85 T105,95" stroke="#251217" strokeWidth="3" strokeLinecap="round" />
          
          <path d="M200,38 Q155,25 120,12" stroke="#14070a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M145,55 Q105,75 75,60" stroke="#14070a" strokeWidth="3.5" strokeLinecap="round" />

          {/* Leaf detail placements */}
          {[
            { x: 280, y: 20, s: 0.8, r: -45 },
            { x: 235, y: 35, s: 0.9, r: 35 },
            { x: 195, y: 48, s: 0.7, r: -80 },
            { x: 150, y: 32, s: 0.85, r: -115 },
            { x: 110, y: 72, s: 0.75, r: 20 }
          ].map((lf, idx) => (
            <g key={`tr-leaf-${idx}`} transform={`translate(${lf.x}, ${lf.y}) scale(${lf.s}) rotate(${lf.r})`}>
              <use href="#realLeaf" />
            </g>
          ))}

          {/* Gorgeous flowers on top-right branch */}
          {[
            { x: 245, y: 32, s: 1.15, r: -15 },
            { x: 205, y: 44, s: 1.35, r: -40 },
            { x: 165, y: 36, s: 1.2, r: -80 },
            { x: 125, y: 22, s: 1.05, r: -165 },
            { x: 85, y: 8, s: 0.85, r: 25 },
            { x: 215, y: 68, s: 1.25, r: -75 },
            { x: 170, y: 88, s: 1.3, r: -105 },
            { x: 125, y: 92, s: 1.1, r: 10 },
            { x: 95, y: 68, s: 0.9, r: -35 }
          ].map((fl, idx) => (
            <g key={`tr-realistic-fl-${idx}`} transform={`translate(${fl.x}, ${fl.y}) scale(${fl.s}) rotate(${fl.r})`}>
              <use href="#realDetailedSakuraFlower" />
            </g>
          ))}
          
          {/* Buds */}
          {[
            { x: 195, y: 60, s: 1.1 },
            { x: 155, y: 74, s: 1.0 },
            { x: 115, y: 82, s: 0.9 }
          ].map((bd, bidx) => (
            <g key={`tr-bud-${bidx}`} transform={`translate(${bd.x}, ${bd.y}) scale(${bd.s})`}>
              <use href="#realDetailedBud" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Global Wind Blizzard - Drifting realistic notched leaves & petals across the screen */}
      {[
        { x: "8%", y: -30, delay: 0.2, duration: 15, size: 5.5, yOffset: 480, xOffset: 340 },
        { x: "28%", y: -35, delay: 4.0, duration: 17, size: 4.5, yOffset: 520, xOffset: 380 },
        { x: "50%", y: -40, delay: 1.8, duration: 19, size: 6.5, yOffset: 550, xOffset: 290 },
        { x: "72%", y: -30, delay: 7.0, duration: 14, size: 5.0, yOffset: 460, xOffset: 360 },
        { x: "88%", y: -35, delay: 10.5, duration: 16, size: 6.0, yOffset: 510, xOffset: 260 }
      ].map((p, idx) => (
        <motion.div
          key={`falling-p-global-${idx}`}
          className="absolute z-40 pointer-events-none select-none"
          initial={{ 
            x: p.x, 
            y: p.y, 
            opacity: 0, 
            rotate: 0,
            scale: 0.7 
          }}
          animate={{
            x: [null, `calc(${p.x} + ${p.xOffset}px)`],
            y: [p.y, p.y + p.yOffset],
            opacity: [0, 0.95, 0.8, 0],
            rotate: [0, 620],
            scale: [0.7, 1.25, 0.95, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{ width: p.size * 2, height: p.size * 2 }}
        >
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_2px_5px_rgba(227,30,36,0.45)]">
            <path 
              d="M 6,0 C 3,4 1,5 0,7 C 1,11 6,12 8,10 C 11,8 10,4 6,0 Z" 
              fill="url(#sakuraGradPetal)" 
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const ScenicEverestFooterBg = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-90 sm:opacity-100 transition-opacity duration-1000 footer-bg-container">
      {/* Soft atmospheric bottom twilight shading to silhouette Mt. Everest */}
      {/* Dark layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent z-10 footer-gradient-overlay-dark" />
      <div className="absolute inset-0 bg-black footer-radial-overlay-dark" />

      {/* Light layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/95 to-transparent z-10 footer-gradient-overlay-light opacity-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(227,30,36,0.06)_0%,rgba(250,246,240,0.82)_45%,#FAF6F0_100%)] footer-radial-overlay-light opacity-0" />
      
      <svg
        viewBox="0 0 1600 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full absolute bottom-0 left-0 z-0"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* Ukiyo-e Inspired Organic Soft Gradients for the Peak and Sky */}
          <linearGradient id="footerEverestSkyDawn" x1="800" y1="50" x2="800" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="40%" stopColor="#000000" />
            <stop offset="75%" stopColor="#000000" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="footerEverestSnowLit" x1="800" y1="200" x2="950" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#A7F3D0" />
            <stop offset="70%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="footerEverestRockShade" x1="800" y1="200" x2="620" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="50%" stopColor="#000000" />
            <stop offset="100%" stopColor="#000000" opacity="1" />
          </linearGradient>

          <linearGradient id="footerMistRibbon" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0" />
            <stop offset="25%" stopColor="#A7F3D0" stopOpacity="0.14" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.22" />
            <stop offset="75%" stopColor="#A7F3D0" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="sakuraGradPetal" x1="0" y1="0" x2="15" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ECFDF5" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="80%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="sakuraGradPetalInner" x1="0" y1="0" x2="10" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ECFDF5" />
            <stop offset="50%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="samuraiGoldGrad" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          <linearGradient id="samuraiCrimsonGrad" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="60%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>

          <linearGradient id="sakuraGradStamenCore" x1="0" y1="0" x2="3" y2="3" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#ff5a79" />
          </linearGradient>

          <linearGradient id="sakuraGradStamen" x1="0" y1="0" x2="0" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Masterfully detailed realistic sakura flower symbol */}
          <g id="realDetailedSakuraFlower">
            <circle cx="0" cy="0" r="14" fill="#ec4899" opacity="0.14" filter="blur(2px)" />
            {[0, 72, 144, 216, 288].map((angle) => (
              <path
                key={`footer-out-${angle}`}
                d="M 0 0 C -4.5 -10 -11 -16 -4.5 -21 L 0 -17 L 4.5 -21 C 11 -16 4.5 -10 0 0"
                fill="url(#sakuraGradPetal)"
                transform={`rotate(${angle})`}
              />
            ))}
            {[36, 108, 180, 252, 324].map((angle) => (
              <path
                key={`footer-in-${angle}`}
                d="M 0 0 C -3.5 -7.5 -8.5 -12 -3.5 -16 L 0 -13 L 3.5 -16 C 8.5 -12 3.5 -7.5 0 0"
                fill="url(#sakuraGradPetalInner)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.2" fill="#881337" opacity="0.25" />
            <circle cx="0" cy="0" r="2.2" fill="url(#sakuraGradStamenCore)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, sIdx) => {
              const len = 7.5;
              const rad = (angle * Math.PI) / 180;
              const x2 = Math.cos(rad) * len;
              const y2 = Math.sin(rad) * len;
              return (
                <g key={`stamen-f-${angle}-${sIdx}`}>
                  <line x1="0" y1="0" x2={x2} y2={y2} stroke="url(#sakuraGradStamen)" strokeWidth="0.5" opacity="0.95" />
                  <circle cx={x2} cy={y2} r="0.75" fill="#fbbf24" stroke="#d97706" strokeWidth="0.2" />
                </g>
              );
            })}
            <circle cx="0" cy="0" r="1.1" fill="#facc15" />
          </g>

          {/* Majestic Samurai Crest Flower - representing Bushido honor and beautiful strength */}
          <g id="samuraiFlower">
            {/* Dark backing lacquer shield for contrast */}
            <circle cx="0" cy="0" r="14" fill="#0f0206" stroke="url(#samuraiGoldGrad)" strokeWidth="0.8" />
            
            {/* Specialized sharp petals fanning out - representing blades / samurai helmet horns */}
            {[0, 72, 144, 216, 288].map((angle) => (
              <path
                key={`samurai-blade-petal-${angle}`}
                d="M 0 0 C -4.5 -10 -11 -16 -4.5 -21 L 0 -17 L 4.5 -21 C 11 -16 4.5 -10 0 0"
                fill="url(#samuraiCrimsonGrad)"
                stroke="url(#samuraiGoldGrad)"
                strokeWidth="1"
                transform={`rotate(${angle})`}
              />
            ))}

            {/* Inner golden star backing */}
            {[36, 108, 180, 252, 324].map((angle) => (
              <path
                key={`samurai-gold-crest-${angle}`}
                d="M 0 0 C -3.5 -7.5 -8.5 -12 -3.5 -16 L 0 -13 L 3.5 -16 C 8.5 -12 3.5 -7.5 0 0"
                fill="url(#samuraiGoldGrad)"
                transform={`rotate(${angle})`}
              />
            ))}

            {/* Samurai Tsuba (Handguard) styled central core */}
            <circle cx="0" cy="0" r="4.5" fill="#1e1b4b" stroke="url(#samuraiGoldGrad)" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#ef4444" />
            
            {/* Center golden stamen dots */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 3;
              const y = Math.sin(rad) * 3;
              return <circle key={`sam-stamen-${angle}`} cx={x} cy={y} r="0.6" fill="#fef08a" />;
            })}
          </g>

          {/* New Exquisite Three-Quarter / Side-Profile Sakura Flower */}
          <g id="sakuraFlowerSide">
            {/* Pedicel / Stem */}
            <path d="M 0 0 Q -3 8 -8 14" stroke="#250d13" strokeWidth="1.2" fill="none" />
            {/* Calyx (receptacle and sepals) */}
            <path d="M -3 1 Q 0 5 3 1 L 1.5 0 L -1.5 0 Z" fill="#4a0e17" stroke="#150207" strokeWidth="0.5" />
            <path d="M -4 1 L -5 -2 L -2 -1 L 0 -3 L 2 -1 L 5 -2 L 4 1 Z" fill="#1b3f22" opacity="0.65" />
            {/* Layered petals fanning out upward with notch */}
            <path d="M -5 0 C -9 -7 -12 -12 -7 -15 L -4 -13 L -2 -16 C 3 -16 5 -10 2 0 Z" fill="url(#sakuraGradPetal)" />
            <path d="M 5 0 C 9 -7 12 -12 7 -15 L 4 -13 L 2 -16 C -3 -16 -5 -10 -2 0 Z" fill="url(#sakuraGradPetal)" />
            <path d="M -3 0 L -4 -10 L -2 -12 L 0 -10 L 2 -12 L 4 -10 L 3 0 Z" fill="url(#sakuraGradPetalInner)" />
            {/* Stamens fanning outwards */}
            <line x1="0" y1="-2" x2="-2" y2="-9" stroke="url(#sakuraGradStamen)" strokeWidth="0.5" />
            <circle cx="-2" cy="-9" r="0.55" fill="#fbbf24" />
            <line x1="1" y1="-2" x2="2" y2="-9" stroke="url(#sakuraGradStamen)" strokeWidth="0.5" />
            <circle cx="2" cy="-9" r="0.55" fill="#fbbf24" />
          </g>

          {/* New High Fidelity Bud Cluster */}
          <g id="sakuraBudCluster">
            <path d="M 0 0 Q -3 7 -7 11" stroke="#250d13" strokeWidth="0.8" fill="none" />
            <path d="M -3 1 Q 1 7 5 10" stroke="#250d13" strokeWidth="0.8" fill="none" />
            <g transform="translate(0, 0)">
              <use href="#realDetailedBud" />
            </g>
            <g transform="translate(-7, 11) rotate(-25) scale(0.9)">
              <use href="#realDetailedBud" />
            </g>
          </g>

          <g id="realDetailedBud">
            <path d="M-2,2 C-4,-4 0,-7 3,-5" stroke="#250d13" strokeWidth="1.2" fill="#15060b" />
            <path d="M -1 -2 C -1.5 -6 1.5 -6 1 -2 Z" fill="url(#sakuraGradPetal)" />
            <circle cx="0" cy="-4" r="2" fill="#A7F3D0" />
          </g>

          <g id="realLeaf">
            <path d="M 0 0 C -3 -4 -5 -10 0 -14 C 5 -10 3 -4 0 0" fill="#0f5132" opacity="0.8" />
            <path d="M 0 0 C -2 -3 -3 -8 0 -11 C 3 -8 2 -3 0 0" fill="#198754" opacity="0.7" />
          </g>
        </defs>

        {/* Soft, hand-painted style evening sky background */}
        <rect x="0" y="0" width="1600" height="700" fill={isDarkMode ? "url(#footerEverestSkyDawn)" : "#FAF6F0"} />

        {/* Hand-drawn sparkling cosmic night stars (static for rendering efficiency) */}
        {[
          { x: 120, y: 120, r: 1.1 },
          { x: 340, y: 80, r: 1.8 },
          { x: 530, y: 150, r: 1.3 },
          { x: 1080, y: 90, r: 2.0 },
          { x: 1250, y: 140, r: 1.5 },
          { x: 1480, y: 110, r: 1.2 }
        ].map((star, idx) => (
          <circle
            key={`elegant-star-${idx}`}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#ffedd5"
            opacity={isDarkMode ? "0.75" : "0"}
          />
        ))}

        {/* The Great Red Dawn Sun - static for speed */}
        <g id="TraditionalRisingSun" opacity="0.88">
          <circle cx="800" cy="385" r="110" fill="#df1a2c" />
          <circle cx="800" cy="385" r="125" fill="#df1a2c" opacity="0.15" filter="blur(8px)" />
        </g>

        {/* Deep background organic mountain ridges swathed in soft sunset blush */}
        <path d="M -100,700 L 220,440 Q 320,410 440,510 L 680,700 Z" fill={isDarkMode ? "#000000" : "#E5DFD5"} opacity="0.85" />
        <path d="M 1700,700 L 1380,430 Q 1260,400 1140,520 L 920,700 Z" fill={isDarkMode ? "#000000" : "#E5DFD5"} opacity="0.75" />

        {/* DISTANT Mt. EVEREST - Centered elegantly in the far distance framing the sun, giving it scenic space */}
        <g id="DistantHumbleEverest" transform="translate(460, 290) scale(0.425)" opacity={isDarkMode ? 0.85 : 0.45}>
          {/* Back peak glow */}
          <path d="M 450,700 Q 650,450 800,140 Q 950,450 1150,700 Z" fill="#10B981" opacity="0.14" filter="blur(16px)" />
          {/* Left shady facet */}
          <path d="M 450,700 L 800,140 L 750,400 L 610,540 Z" fill="url(#footerEverestRockShade)" />
          {/* Right snow-capped facet */}
          <path d="M 610,540 L 750,400 L 800,140 L 1150,700 Z" fill="url(#footerEverestSnowLit)" />
          {/* Detailed snowy crevasses & jagged crests */}
          <path d="M 800,140 L 780,195 L 795,245 L 770,300 L 785,370 L 740,460" stroke="#A7F3D0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
          <path d="M 800,140 L 815,185 L 800,225 L 825,285 L 810,345 Z" fill="#ECFDF5" opacity="0.9" />
        </g>

        {/* Soft atmospheric background foliage fog layer - static blur */}
        <g id="AtmosphericSakuraClouds" opacity="0.32">
          {[
            { cx: 200, cy: 380, rx: 110, ry: 70 },
            { cx: 340, cy: 260, rx: 140, ry: 90 },
            { cx: 480, cy: 190, rx: 120, ry: 80 },
            { cx: 1120, cy: 190, rx: 130, ry: 80 },
            { cx: 1260, cy: 260, rx: 140, ry: 95 },
            { cx: 1400, cy: 380, rx: 110, ry: 75 }
          ].map((cloud, idx) => (
            <ellipse
              key={`bg-blossom-cloud-${idx}`}
              cx={cloud.cx}
              cy={cloud.cy}
              rx={cloud.rx}
              ry={cloud.ry}
              fill="url(#sakuraGradPetalInner)"
              filter="blur(22px)"
            />
          ))}
        </g>

        {/* HIGH-FIDELITY BOTANICAL SAKURA TREE - LEFT SCION */}
        <g id="SacredSakuraTreeLeft" className="opacity-95">
          {/* Deep Ground Roots with highlight definition */}
          <path d="M 60,700 Q 110,650 120,600" stroke="#120409" strokeWidth="22" strokeLinecap="round" fill="none" />
          <path d="M 60,700 Q 110,650 120,600" stroke="#250d15" strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d="M 170,700 Q 145,630 135,570" stroke="#120409" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M 170,700 Q 145,630 135,570" stroke="#250d15" strokeWidth="12" strokeLinecap="round" fill="none" strokeDasharray="18, 2" />

          {/* Gnarled, layered main trunk sweeping beautifully from left inside the frame */}
          {/* Level 1: Under-silhouette */}
          <path d="M 110,700 C 130,590 175,500 240,410 C 305,320 410,270 530,220" stroke="#120409" strokeWidth="32" strokeLinecap="round" fill="none" />
          {/* Level 2: Warm heartwood */}
          <path d="M 110,700 C 130,590 175,500 240,410 C 305,320 410,270 530,220" stroke="#250d15" strokeWidth="24" strokeLinecap="round" fill="none" />
          {/* Level 3: Organic Bark Highlights & Ridges */}
          <path d="M 110,700 C 130,593 174,503 238,413 C 302,323 408,273 528,223" stroke="#3d1421" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 100,680 C 122,580 168,490 230,400 C 295,310 400,260 518,210" stroke="#4d222f" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M 125,690 Q 155,560 195,470 T 280,360" stroke="#120409" strokeWidth="2.5" fill="none" opacity="0.8" />
          <path d="M 112,650 Q 138,540 180,450" stroke="#120409" strokeWidth="1.5" fill="none" opacity="0.85" />

          {/* Core Branches (Tapering naturally with realistic coordinates) */}
          {/* Branch I: Sweeping Low Left (carrying hanging flowers) */}
          <path d="M 175,500 Q 110,450 50,440" stroke="#120409" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M 175,500 Q 110,450 50,440" stroke="#250d15" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 50,440 Q 15,445 -15,435" stroke="#120409" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 50,440 Q 15,445 -15,435" stroke="#250d15" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Branch II: Sweeping Mid Left */}
          <path d="M 240,410 Q 180,350 120,340" stroke="#120409" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 240,410 Q 180,350 120,340" stroke="#250d15" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 120,340 Q 60,335 10,310" stroke="#120409" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 120,340 Q 60,335 10,310" stroke="#250d15" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Delicate twig terminal shoots (highly detailed, thin, realistic) */}
          <path d="M 10,310 Q -10,315 -25,295 M 10,310 Q 20,280 5,260" stroke="#250d15" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M -15,435 Q -30,420 -40,430 M -15,435 L -10,465" stroke="#250d15" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Branch III: Upper Framing Arch (framing Sun and Sunrise Sky) */}
          <path d="M 310,320 Q 380,265 460,250" stroke="#120409" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 310,320 Q 380,265 460,250" stroke="#250d15" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 460,250 Q 510,230 555,240" stroke="#120409" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 460,250 Q 510,230 555,240" stroke="#250d15" strokeWidth="6.5" strokeLinecap="round" fill="none" />
          {/* Branch IV: Top Crown Arch */}
          <path d="M 410,270 Q 430,200 485,165" stroke="#120409" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 410,270 Q 430,200 485,165" stroke="#250d15" strokeWidth="7.0" strokeLinecap="round" fill="none" />
          <path d="M 485,165 Q 520,135 570,140" stroke="#120409" strokeWidth="6.5" strokeLinecap="round" fill="none" />
          <path d="M 485,165 Q 520,135 570,140" stroke="#250d15" strokeWidth="4.2" strokeLinecap="round" fill="none" />

          {/* Twig terminals branching toward Mount Everest */}
          <path d="M 555,240 Q 595,255 625,235 M 555,240 Q 575,270 590,280" stroke="#250d15" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 570,140 Q 610,130 630,145 M 570,140 Q 590,110 605,95" stroke="#250d15" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* BOTANICAL FLOWER PEDICELS (The slender hanging stems unique to real cherry blossoms) */}
          <g id="LeftTreePedicels" stroke="#4a121a" strokeWidth="0.8" fill="none">
            {/* Hanging curves connecting branches to realistic blossom sites */}
            {/* On low sweeping branches */}
            <path d="M -15,435 Q -25,465 -15,480" />
            <path d="M -15,435 Q -5,455 -2,470" />
            <path d="M 50,440 Q 40,465 42,485" />
            <path d="M 50,440 Q 60,470 70,480" />
            <path d="M 120,340 Q 110,375 105,395" />
            <path d="M 120,340 Q 135,370 148,382" />
            
            {/* On mid sweeps */}
            <path d="M 195,360 Q 185,395 174,408" />
            <path d="M 195,360 Q 210,385 222,398" />
            <path d="M 280,325 Q 265,355 255,375" />
            <path d="M 280,325 Q 295,350 310,365" />

            {/* On sky framing branches */}
            <path d="M 460,250 Q 450,285 438,300" />
            <path d="M 460,250 Q 475,280 490,295" />
            <path d="M 550,230 Q 535,265 520,282" />
            <path d="M 550,230 Q 565,260 580,275" />
            <path d="M 555,240 Q 545,275 538,295" />
            <path d="M 555,240 Q 570,270 582,285" />
          </g>

          {/* MAGNIFICENT SAKURA BLOSSOMS IN HIGH ART PLACEMENT - LEFT TREE */}
          {[
            // Blossoms growing directly on wood (Cushion blossoms)
            { x: 125, y: 335, s: 1.15, r: 12, type: "full" },
            { x: 185, y: 440, s: 0.95, r: 85, type: "side" },
            { x: 155, y: 490, s: 1.05, r: -45, type: "bud" },
            { x: 232, y: 412, s: 1.25, r: -15, type: "full" },
            { x: 295, y: 315, s: 1.3, r: 120, type: "full" },
            { x: 420, y: 265, s: 1.1, r: -95, type: "side" },
            { x: 505, y: 175, s: 1.2, r: 35, type: "side" },
            { x: 535, y: 225, s: 1.15, r: 145, type: "side" },

            // Blossoms hanging from the botanical pedicels designed above
            { x: -15, y: 480, s: 1.25, r: 15, type: "full" },
            { x: -2, y: 470, s: 1.05, r: 75, type: "side" },
            { x: 42, y: 485, s: 1.2, r: -35, type: "full" },
            { x: 70, y: 480, s: 1.1, r: 110, type: "side" },
            { x: 105, y: 395, s: 1.25, r: -15, type: "full" },
            { x: 148, y: 382, s: 1.0, r: 42, type: "side" },
            { x: 174, y: 408, s: 1.22, r: -60, type: "full" },
            { x: 222, y: 398, s: 1.05, r: 125, type: "side" },
            { x: 255, y: 375, s: 1.18, r: 18, type: "full" },
            { x: 310, y: 365, s: 1.3, r: -72, type: "side" },
            { x: 438, y: 300, s: 1.25, r: 95, type: "full" },
            { x: 490, y: 295, s: 1.1, r: -15, type: "side" },
            { x: 520, y: 282, s: 1.2, r: 135, type: "full" },
            { x: 580, y: 275, s: 1.05, r: -50, type: "side" },
            { x: 538, y: 295, s: 0.9, r: 80, type: "full" },
            { x: 582, y: 285, s: 0.8, r: -25, type: "side" },

            // Terminal shoot blossom clusters
            { x: -25, y: 295, s: 1.1, r: -110, type: "bud" },
            { x: 5, y: 260, s: 1.25, r: 45, type: "full" },
            { x: -40, y: 430, s: 0.95, r: 130, type: "bud" },
            { x: -10, y: 465, s: 1.15, r: -15, type: "full" },
            { x: 625, y: 235, s: 0.9, r: 55, type: "full" },
            { x: 590, y: 280, s: 0.75, r: -40, type: "side" },
            { x: 620, y: 145, s: 0.8, r: 105, type: "full" },
            { x: 595, y: 95, s: 0.7, r: -15, type: "bud" }
          ].map((fl, idx) => (
            <g key={`left-tree-fl-${idx}`} transform={`translate(${fl.x}, ${fl.y})`}>
              <g
                className="sakura-tree-blossom"
                style={{
                  '--base-scale': fl.s,
                  '--base-rotation': `${fl.r}deg`,
                  '--duration': `${5.5 + (idx % 3) * 1.5}s`,
                  '--delay': `${-((idx * 0.15) % 2.0)}s`
                } as React.CSSProperties}
              >
                <use href={fl.type === "samurai" ? "#samuraiFlower" : (fl.type === "full" ? "#realDetailedSakuraFlower" : fl.type === "side" ? "#sakuraFlowerSide" : "#sakuraBudCluster")} />
              </g>
            </g>
          ))}

          {/* Fresh spring leaf shoots popping near flower nodes */}
          {[
            { x: 140, y: 315, s: 0.85, r: 110 },
            { x: 260, y: 390, s: 0.7, r: -45 },
            { x: 420, y: 230, s: 0.8, r: 65 },
            { x: 50, y: 425, s: 0.9, r: -15 },
            { x: 560, y: 200, s: 0.75, r: 135 },
            { x: 670, y: 110, s: 0.8, r: -50 }
          ].map((lf, idx) => (
            <g key={`left-tree-lf-${idx}`} transform={`translate(${lf.x}, ${lf.y}) scale(${lf.s}) rotate(${lf.r})`}>
              <use href="#realLeaf" />
            </g>
          ))}
        </g>

        {/* HIGH-FIDELITY BOTANICAL SAKURA TREE - RIGHT SCION */}
        <g id="SacredSakuraTreeRight" className="opacity-95">
          {/* Deep Ground Roots with highlight definition */}
          <path d="M 1540,700 Q 1490,650 1480,600" stroke="#120409" strokeWidth="22" strokeLinecap="round" fill="none" />
          <path d="M 1540,700 Q 1490,650 1480,600" stroke="#250d15" strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d="M 1430,700 Q 1455,630 1465,570" stroke="#120409" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M 1430,700 Q 1455,630 1465,570" stroke="#250d15" strokeWidth="12" strokeLinecap="round" fill="none" strokeDasharray="18, 2" />

          {/* Gnarled, layered main trunk sweeping from right inside the frame */}
          {/* Level 1: Under-silhouette */}
          <path d="M 1490,700 C 1470,590 1425,500 1360,410 C 1295,320 1190,270 1070,220" stroke="#120409" strokeWidth="32" strokeLinecap="round" fill="none" />
          {/* Level 2: Warm heartwood */}
          <path d="M 1490,700 C 1470,590 1425,500 1360,410 C 1295,320 1190,270 1070,220" stroke="#250d15" strokeWidth="24" strokeLinecap="round" fill="none" />
          {/* Level 3: Organic Bark Highlights & Ridges */}
          <path d="M 1490,700 C 1470,593 1426,503 1362,413 C 1298,323 1192,273 1072,223" stroke="#3d1421" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 1500,680 C 1478,580 1432,490 1370,400 C 1305,310 1200,260 1082,210" stroke="#4d222f" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M 1475,690 Q 1445,560 1405,470 T 1320,360" stroke="#120409" strokeWidth="2.5" fill="none" opacity="0.8" />
          <path d="M 1488,650 Q 1462,540 1420,450" stroke="#120409" strokeWidth="1.5" fill="none" opacity="0.85" />

          {/* Core Branches (Tapering naturally with realistic coordinates) */}
          {/* Branch I: Sweeping Low Right (carrying hanging flowers) */}
          <path d="M 1425,500 Q 1490,450 1550,440" stroke="#120409" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M 1425,500 Q 1490,450 1550,440" stroke="#250d15" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 1550,440 Q 1585,445 1615,435" stroke="#120409" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 1550,440 Q 1585,445 1615,435" stroke="#250d15" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Branch II: Sweeping Mid Right */}
          <path d="M 1360,410 Q 1420,350 1480,340" stroke="#120409" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 1360,410 Q 1420,350 1480,340" stroke="#250d15" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 1480,340 Q 1540,335 1590,310" stroke="#120409" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 1480,340 Q 1540,335 1590,310" stroke="#250d15" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Delicate twig terminal shoots (highly detailed, thin, realistic) */}
          <path d="M 1590,310 Q 1610,315 1625,295 M 1590,310 Q 1580,280 1595,260" stroke="#250d15" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 1615,435 Q 1630,420 1640,430 M 1615,435 L 1610,465" stroke="#250d15" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Branch III: Upper Framing Arch (framing Sun and Sunrise Sky) */}
          <path d="M 1290,320 Q 1220,265 1140,250" stroke="#120409" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 1290,320 Q 1220,265 1140,250" stroke="#250d15" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 1140,250 Q 1090,230 1045,240" stroke="#120409" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 1140,250 Q 1090,230 1045,240" stroke="#250d15" strokeWidth="6.5" strokeLinecap="round" fill="none" />
          {/* Branch IV: Top Crown Arch */}
          <path d="M 1190,270 Q 1170,200 1115,165" stroke="#120409" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 1190,270 Q 1170,200 1115,165" stroke="#250d15" strokeWidth="7.0" strokeLinecap="round" fill="none" />
          <path d="M 1115,165 Q 1080,135 1030,140" stroke="#120409" strokeWidth="6.5" strokeLinecap="round" fill="none" />
          <path d="M 1115,165 Q 1080,135 1030,140" stroke="#250d15" strokeWidth="4.2" strokeLinecap="round" fill="none" />

          {/* Twig terminals branching toward Mount Everest */}
          <path d="M 1045,240 Q 1005,255 975,235 M 1045,240 Q 1025,270 1010,280" stroke="#250d15" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 1030,140 Q 990,130 970,145 M 1030,140 Q 1010,110 995,95" stroke="#250d15" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* BOTANICAL FLOWER PEDICELS (The slender hanging stems unique to real cherry blossoms - Right profile) */}
          <g id="RightTreePedicels" stroke="#4a121a" strokeWidth="0.8" fill="none">
            {/* Hanging curves connecting branches to realistic blossom sites */}
            {/* On low sweeping branches */}
            <path d="M 1615,435 Q 1625,465 1615,480" />
            <path d="M 1615,435 Q 1605,455 1602,470" />
            <path d="M 1550,440 Q 1560,465 1558,485" />
            <path d="M 1550,440 Q 1540,470 1530,480" />
            <path d="M 1480,340 Q 1490,375 1495,395" />
            <path d="M 1480,340 Q 1465,370 1452,382" />
            
            {/* On mid sweeps */}
            <path d="M 1405,360 Q 1415,395 1426,408" />
            <path d="M 1405,360 Q 1390,385 1378,398" />
            <path d="M 1320,325 Q 1335,355 1345,375" />
            <path d="M 1320,325 Q 1305,350 1290,365" />

            {/* On sky framing branches */}
            <path d="M 1140,250 Q 1150,285 1162,300" />
            <path d="M 1140,250 Q 1125,280 1110,295" />
            <path d="M 1050,230 Q 1065,265 1080,282" />
            <path d="M 1050,230 Q 1035,260 1020,275" />
            <path d="M 1045,240 Q 1055,275 1062,295" />
            <path d="M 1045,240 Q 1030,270 1018,285" />
          </g>

          {/* MAGNIFICENT SAKURA BLOSSOMS IN HIGH ART PLACEMENT - RIGHT TREE */}
          {[
            // Blossoms growing directly on wood (Cushion blossoms)
            { x: 1475, y: 335, s: 1.15, r: -12, type: "full" },
            { x: 1415, y: 440, s: 0.95, r: -85, type: "side" },
            { x: 1445, y: 490, s: 1.05, r: 45, type: "bud" },
            { x: 1368, y: 412, s: 1.25, r: 15, type: "full" },
            { x: 1305, y: 315, s: 1.3, r: -120, type: "full" },
            { x: 1180, y: 265, s: 1.1, r: 95, type: "side" },
            { x: 1095, y: 175, s: 1.2, r: -35, type: "side" },
            { x: 1065, y: 225, s: 1.15, r: -145, type: "side" },

            // Blossoms hanging from the botanical pedicels designed above
            { x: 1615, y: 480, s: 1.25, r: -15, type: "full" },
            { x: 1602, y: 470, s: 1.05, r: -75, type: "side" },
            { x: 1558, y: 485, s: 1.2, r: 35, type: "full" },
            { x: 1530, y: 480, s: 1.1, r: -110, type: "side" },
            { x: 1495, y: 395, s: 1.25, r: 15, type: "full" },
            { x: 1452, y: 382, s: 1.0, r: -42, type: "side" },
            { x: 1426, y: 408, s: 1.22, r: 60, type: "full" },
            { x: 1378, y: 398, s: 1.05, r: -125, type: "side" },
            { x: 1345, y: 375, s: 1.18, r: -18, type: "full" },
            { x: 1290, y: 365, s: 1.3, r: 72, type: "side" },
            { x: 1162, y: 300, s: 1.25, r: -95, type: "full" },
            { x: 1110, y: 295, s: 1.1, r: 15, type: "side" },
            { x: 1080, y: 282, s: 1.2, r: -135, type: "full" },
            { x: 1020, y: 275, s: 1.05, r: 50, type: "side" },
            { x: 1062, y: 295, s: 0.9, r: -80, type: "side" },
            { x: 1018, y: 285, s: 0.8, r: 25, type: "side" },

            // Terminal shoot blossom clusters
            { x: 1625, y: 295, s: 1.1, r: 110, type: "bud" },
            { x: 1595, y: 260, s: 1.25, r: -45, type: "full" },
            { x: 1640, y: 430, s: 0.95, r: -130, type: "bud" },
            { x: 1610, y: 465, s: 1.15, r: 15, type: "full" },
            { x: 975, y: 235, s: 0.9, r: -55, type: "full" },
            { x: 1010, y: 280, s: 0.75, r: 40, type: "side" },
            { x: 970, y: 145, s: 0.8, r: -105, type: "full" },
            { x: 995, y: 95, s: 0.7, r: 15, type: "bud" }
          ].map((fl, idx) => (
            <g key={`right-tree-fl-${idx}`} transform={`translate(${fl.x}, ${fl.y})`}>
              <g
                className="sakura-tree-blossom"
                style={{
                  '--base-scale': fl.s,
                  '--base-rotation': `${fl.r}deg`,
                  '--duration': `${5.5 + (idx % 3) * 1.5}s`,
                  '--delay': `${-(((idx * 0.15) % 2.0) + 0.1)}s`
                } as React.CSSProperties}
              >
                <use href={fl.type === "samurai" ? "#samuraiFlower" : (fl.type === "full" ? "#realDetailedSakuraFlower" : fl.type === "side" ? "#sakuraFlowerSide" : "#sakuraBudCluster")} />
              </g>
            </g>
          ))}

          {/* Fresh spring leaf shoots popping near flower nodes */}
          {[
            { x: 1460, y: 315, s: 0.85, r: -110 },
            { x: 1340, y: 390, s: 0.7, r: 45 },
            { x: 1180, y: 230, s: 0.8, r: -65 },
            { x: 1550, y: 425, s: 0.9, r: 15 },
            { x: 1040, y: 200, s: 0.75, r: -135 },
            { x: 930, y: 110, s: 0.8, r: 50 }
          ].map((lf, idx) => (
            <g key={`right-tree-lf-${idx}`} transform={`translate(${lf.x}, ${lf.y}) scale(${lf.s}) rotate(${lf.r})`}>
              <use href="#realLeaf" />
            </g>
          ))}
        </g>

        {/* Dynamic Flying/Falling Single Petals blowing across the Sunset & Peaks */}
        <g id="FallingBlossomsWind" opacity="0.85">
          {[
            { x: 300, y: 200, s: 1.2, r: 15, delay: 0.0, speedY: 3.5, speedX: 2.2 },
            { x: 500, y: 150, s: 0.9, r: 45, delay: 1.5, speedY: 4.1, speedX: 1.8 },
            { x: 750, y: 80, s: 1.1, r: -60, delay: 3.2, speedY: 3.8, speedX: 2.5 },
            { x: 950, y: 110, s: 0.85, r: 95, delay: 0.8, speedY: 3.2, speedX: 2.2 },
            { x: 1150, y: 140, s: 1.3, r: -15, delay: 2.6, speedY: 4.5, speedX: 2.0 },
            { x: 1350, y: 220, s: 1.0, r: 120, delay: 4.1, speedY: 3.6, speedX: 1.5 },
            // Extra falling petals
            { x: 400, y: 280, s: 1.15, r: 50, delay: 2.1, speedY: 4.3, speedX: 2.4 },
            { x: 670, y: 220, s: 0.95, r: -35, delay: 1.0, speedY: 3.4, speedX: 1.9 },
            { x: 880, y: 310, s: 1.25, r: 75, delay: 3.7, speedY: 3.9, speedX: 2.1 },
            { x: 1250, y: 270, s: 1.05, r: -110, delay: 1.9, speedY: 4.2, speedX: 2.3 }
          ].map((petal, idx) => (
            <path
              key={`wind-petal-${idx}`}
              d="M 0 0 C -3 -5 -5 -8 -2 -11 C 1 -13 4 -12 3 -5 C 2 -1 1 0 0 0"
              fill="url(#sakuraGradPetal)"
              transform={`translate(${petal.x + 100}, ${petal.y + 60}) scale(${petal.s}) rotate(${petal.r})`}
              opacity="0.85"
            />
          ))}
        </g>

        {/* Traditional Japanese Horizontal Cloud Ornaments (Kasumi Clouds) - static layout */}
        <g id="KasumiClouds" opacity="0.85">
          {/* Floating Lower Mist Ribbon */}
          <path
            d="M -100,420 C 300,380 600,460 1000,400 Q 1300,350 1700,420"
            stroke="url(#footerMistRibbon)"
            strokeWidth="24"
            fill="none"
            strokeLinecap="round"
          />
          {/* Floating Upper Mist Ribbon */}
          <path
            d="M -100,260 C 250,300 650,220 1050,280 T 1700,240"
            stroke="url(#footerMistRibbon)"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Beautiful Natural Sakura Frame - 4 Hand-drawn styled Branch Clusters */}

        {/* 1. TOP-LEFT Delicate Hanging Sakura Canopy - static */}
        <g 
          transform="translate(-20, -20) scale(1.6)"
        >
          {/* Dark Charcoal natural knobby branch */}
          <path d="M 0,0 C 50,25 110,65 170,55 Q 230,45 285,110" stroke="#120609" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M 110,45 Q 150,110 200,125" stroke="#1c0a0f" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 170,55 Q 190,15 220,5" stroke="#1c0a0f" strokeWidth="2.2" strokeLinecap="round" fill="none" strokeDasharray="30 1" />
          
          {/* Organic green leaves */}
          {[
            { x: 80, y: 35, s: 0.9, r: 15 },
            { x: 140, y: 65, s: 0.8, r: -35 },
            { x: 230, y: 75, s: 0.85, r: 60 }
          ].map((lf, i) => (
            <g key={`tl-leaf-${i}`} transform={`translate(${lf.x}, ${lf.y}) scale(${lf.s}) rotate(${lf.r})`}>
              <use href="#realLeaf" />
            </g>
          ))}

          {/* Premium layered blossoms hanging organically */}
          {[
            { x: 60, y: 25, s: 1.15, r: 42 },
            { x: 100, y: 45, s: 1.3, r: -15 },
            { x: 135, y: 35, s: 1.05, r: 88 },
            { x: 165, y: 70, s: 1.2, r: 120 },
            { x: 195, y: 105, s: 1.25, r: -55 },
            { x: 235, y: 85, s: 1.1, r: 210 },
            { x: 260, y: 100, s: 0.95, r: 15 },
            { x: 155, y: 115, s: 1.0, r: -40 }
          ].map((fl, i) => (
            <g 
              key={`tl-flower-${i}`} 
              transform={`translate(${fl.x}, ${fl.y})`}
              className="sakura-tree-blossom"
              style={{
                '--base-rotation': `${fl.r}deg`,
                '--base-scale': fl.s,
                '--duration': `${7 + (i % 3) * 2}s`,
                '--delay': `${(i * 0.4).toFixed(1)}s`
              } as React.CSSProperties}
            >
              <use href="#realDetailedSakuraFlower" />
            </g>
          ))}
          <circle cx="170" cy="50" r="3" fill="#ffe4e6" />
          <circle cx="215" cy="120" r="2.5" fill="#fecdd3" />
        </g>

        {/* 2. TOP-RIGHT Overhanging Sakura Branch - static */}
        <g 
          transform="translate(1620, -10) scale(1.5) scale(-1, 1)"
        >
          <path d="M 0,0 C 60,30 130,50 185,45 Q 240,40 310,95" stroke="#120609" strokeWidth="5.0" strokeLinecap="round" fill="none" />
          <path d="M 120,40 Q 160,95 210,110" stroke="#1c0a0f" strokeWidth="2.8" strokeLinecap="round" fill="none" />

          {/* Organic green leaves */}
          {[
            { x: 75, y: 30, s: 0.85, r: -20 },
            { x: 150, y: 60, s: 0.9, r: 40 },
            { x: 220, y: 65, s: 0.75, r: -50 }
          ].map((lf, i) => (
            <g key={`tr-leaf-${i}`} transform={`translate(${lf.x}, ${lf.y}) scale(${lf.s}) rotate(${lf.r})`}>
              <use href="#realLeaf" />
            </g>
          ))}

          {/* Dense, real cherry blossoms */}
          {[
            { x: 50, y: 22, s: 1.2, r: -30 },
            { x: 95, y: 40, s: 1.35, r: 15 },
            { x: 130, y: 25, s: 1.0, r: -80 },
            { x: 160, y: 65, s: 1.15, r: 95 },
            { x: 185, y: 95, s: 1.2, r: -45 },
            { x: 225, y: 80, s: 1.05, r: 180 },
            { x: 250, y: 90, s: 0.9, r: -10 }
          ].map((fl, i) => (
            <g 
              key={`tr-flower-${i}`} 
              transform={`translate(${fl.x}, ${fl.y})`}
              className="sakura-tree-blossom"
              style={{
                '--base-rotation': `${fl.r}deg`,
                '--base-scale': fl.s,
                '--duration': `${8 + (i % 3) * 1.5}s`,
                '--delay': `${(i * 0.3).toFixed(1)}s`
              } as React.CSSProperties}
            >
              <use href="#realDetailedSakuraFlower" />
            </g>
          ))}
        </g>

        {/* 3. BOTTOM-LEFT Climbing Rugged Sakura Shoot - static */}
        <g 
          transform="translate(60, 530) scale(1.75)" 
          opacity="0.95"
        >
          <path d="M -80,100 Q 15,35 90,20 T 175,-15" stroke="#120609" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M -80,100 Q 15,35 90,20 T 175,-15" stroke="#2a1015" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M 25,48 Q 50,-15 105,-22" stroke="#120609" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 85,18 Q 115,55 145,52" stroke="#1c0a0f" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Leaf Shoots */}
          {[
            { x: 45, y: 15, s: 0.8, r: 25 },
            { x: 80, y: -5, s: 0.9, r: -45 }
          ].map((lf, idx) => (
            <g key={`l-btm-leaf-${idx}`} transform={`translate(${lf.x}, ${lf.y}) scale(${lf.s}) rotate(${lf.r})`}>
              <use href="#realLeaf" />
            </g>
          ))}

          {/* Multilayered natural flowers */}
          {[
            { x: 30, y: 44, s: 1.15, r: 12 },
            { x: 65, y: 32, s: 1.3, r: 45 },
            { x: 105, y: 16, s: 1.25, r: 85 },
            { x: 145, y: -2, s: 1.05, r: 120 },
            { x: 55, y: -5, s: 1.18, r: -30 },
            { x: 95, y: -20, s: 1.1, r: -60 },
            { x: 110, y: 44, s: 0.95, r: 15 },
            { x: 142, y: 48, s: 1.05, r: -15 }
          ].map((fl, idx) => (
            <g 
              key={`f-l-sak-${idx}`} 
              transform={`translate(${fl.x}, ${fl.y})`}
              className="sakura-tree-blossom"
              style={{
                '--base-rotation': `${fl.r}deg`,
                '--base-scale': fl.s,
                '--duration': `${7 + (idx % 3) * 2}s`,
                '--delay': `${(idx * 0.3).toFixed(1)}s`
              } as React.CSSProperties}
            >
              <use href="#realDetailedSakuraFlower" />
            </g>
          ))}
          <circle cx="80" cy="18" r="3.5" fill="#A7F3D0" />
          <circle cx="120" cy="-22" r="2.5" fill="#6EE7B7" />
          <circle cx="160" cy="-12" r="3" fill="#e31e24" />
        </g>

        {/* 4. BOTTOM-RIGHT Climbing Rugged Sakura Shoot - static */}
        <g 
          transform="translate(1540, 530) scale(1.75) scale(-1, 1)" 
          opacity="0.95"
        >
          <path d="M -80,100 Q 15,35 90,20 T 175,-15" stroke="#120609" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M -80,100 Q 15,35 90,20 T 175,-15" stroke="#2a1015" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M 25,48 Q 50,-15 105,-22" stroke="#120609" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 85,18 Q 115,55 145,52" stroke="#1c0a0f" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Leaf Shoots */}
          {[
            { x: 45, y: 15, s: 0.8, r: 25 },
            { x: 80, y: -5, s: 0.9, r: -45 }
          ].map((lf, idx) => (
            <g key={`r-btm-leaf-${idx}`} transform={`translate(${lf.x}, ${lf.y}) scale(${lf.s}) rotate(${lf.r})`}>
              <use href="#realLeaf" />
            </g>
          ))}

          {/* Multilayered natural flowers */}
          {[
            { x: 30, y: 44, s: 1.15, r: -12 },
            { x: 65, y: 32, s: 1.3, r: -45 },
            { x: 105, y: 16, s: 1.25, r: -85 },
            { x: 145, y: -2, s: 1.05, r: -120 },
            { x: 55, y: -5, s: 1.18, r: 30 },
            { x: 95, y: -20, s: 1.1, r: 60 },
            { x: 110, y: 44, s: 0.95, r: -15 },
            { x: 142, y: 48, s: 1.05, r: 15 }
          ].map((fl, idx) => (
            <g 
              key={`f-r-sak-${idx}`} 
              transform={`translate(${fl.x}, ${fl.y})`}
              className="sakura-tree-blossom"
              style={{
                '--base-rotation': `${fl.r}deg`,
                '--base-scale': fl.s,
                '--duration': `${7.5 + (idx % 3) * 1.8}s`,
                '--delay': `${(idx * 0.25).toFixed(2)}s`
              } as React.CSSProperties}
            >
              <use href="#realDetailedSakuraFlower" />
            </g>
          ))}
          <circle cx="80" cy="18" r="3.5" fill="#A7F3D0" />
          <circle cx="120" cy="-22" r="2.5" fill="#6EE7B7" />
        </g>

        {/* Loose petals dynamically dancing on Himalayan mountain wind across the Footer with multi-wave curves */}
        {[
          { cx: 120, cy: 340, r: 4.5, delay: 0, dur: 14, dx: 520, dy: 160, windOffset: 35 },
          { cx: 420, cy: 200, r: 3.5, delay: 3.0, dur: 16, dx: 580, dy: 190, windOffset: -40 },
          { cx: 800, cy: 320, r: 4.8, delay: 1.5, dur: 13, dx: 490, dy: 140, windOffset: 25 },
          { cx: 1100, cy: 260, r: 3.8, delay: 5.5, dur: 17, dx: 460, dy: 170, windOffset: -30 },
          { cx: 280, cy: 380, r: 5.2, delay: 2.2, dur: 15, dx: 510, dy: 130, windOffset: 45 },
          { cx: 950, cy: 420, r: 4.5, delay: 7.0, dur: 18, dx: 540, dy: 120, windOffset: -20 }
        ].map((p, i) => (
          <motion.g
            key={`footer-p-realistic-${i}`}
            initial={{ 
              x: p.cx, 
              y: p.cy, 
              rotate: 0, 
              opacity: 0,
              scale: 0.85 
            }}
            animate={{
              x: [
                p.cx, 
                p.cx + p.dx * 0.33, 
                p.cx + p.dx * 0.66, 
                p.cx + p.dx
              ],
              y: [
                p.cy, 
                p.cy + p.dy * 0.33 - p.windOffset, 
                p.cy + p.dy * 0.66 + p.windOffset, 
                p.cy + p.dy
              ],
              rotate: [0, 180, 360, 540],
              opacity: [0, 0.95, 0.8, 0],
              scale: [0.85, 1.25, 0.95, 0.55]
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <path
              d="M0,0 C-3,-6 -8,-4 -5,0 C-8,4 -4,8 0,0"
              fill="url(#sakuraGradPetal)"
              className="filter drop-shadow-[0_2px_5px_rgba(227,30,36,0.38)]"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved !== "light";
    }
    return true;
  });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isPickerActive, setIsPickerActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoldingPhoto, setIsHoldingPhoto] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, -150]);

  // Auto-slide dynamic shuffling effect (paused when interacting)
  useEffect(() => {
    if (isPickerActive || isHovered || isHoldingPhoto) return;
    const timer = setInterval(() => {
      setGalleryIndex((prev) => {
        let nextIndex = prev;
        while (nextIndex === prev && GALLERY_IMAGES.length > 1) {
          nextIndex = Math.floor(Math.random() * GALLERY_IMAGES.length);
        }
        return nextIndex;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [galleryIndex, isPickerActive, isHovered, isHoldingPhoto]);

  const fadeIn = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  };

  const nextSlide = () => setGalleryIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const prevSlide = () => setGalleryIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  return (
    <div className="bg-black text-neutral-100 antialiased selection:bg-sakura-red/30 selection:text-red-200 relative overflow-hidden">
      
      {/* Premium Dynamic Fluid Ambient Background (matches footer sunset sky & Mt Everest sunrise gradient but richer/blacker) */}
      <div className="dynamic-site-bg" />
      <div className="ambient-glow-orb-1" />
      <div className="ambient-glow-orb-2" />
      <div className="ambient-glow-orb-3" />
      <div className="ambient-glow-orb-4" />
      
      {/* High-Performance GPU-Accelerated Photo Enhancer Filters (Handled directly by CSS engine) */}
      
      {/* Dynamic Background Parallax - High Performance (No expensive mix-blend-mode or blur filter) */}
      <motion.div 
        className="fixed inset-0 w-full h-[140vh] -z-10 pointer-events-none opacity-[0.14]"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1600&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: yBg,
          willChange: "transform"
        }}
      />

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-[60] pt-4 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-7xl"
        >
          <div className="flex bg-black/80 border-white/10 border rounded-2xl px-2 sm:px-4 py-2 shadow-sm backdrop-blur-2xl items-center justify-between header-nav-container">
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden inline-flex hover:bg-neutral-900 bg-black/60 border-white/10 border rounded-xl h-10 w-10 items-center justify-center transition mobile-ham-btn"
              >
                <MenuIcon className="h-4 w-4 text-neutral-200 mobile-ham-icon" />
              </button>
              
              <a href="#" className="inline-flex items-center gap-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 transition-transform hover:scale-110">
                  <img src="https://raw.githubusercontent.com/Sujanad69/Pukumodel/main/IMG_3388.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-xl tracking-tight font-serif whitespace-nowrap text-white font-bold leading-none" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Sakura Everest</span>
                  <span className="text-[7px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-neutral-400 leading-none mt-1 font-black whitespace-nowrap">Sushi & Bento</span>
                </div>
              </a>
            </div>

            <nav id="desktop-nav" className="hidden md:flex items-center gap-7 text-sm text-neutral-300">
              <a href="#about" className="hover:text-white transition">About</a>
              <a href="#space" className="hover:text-white transition">Art of Sushi</a>
              <a href="#sushi-guide" className="hover:text-white transition">Sushi Guide</a>
              <a href="#order-now" className="hover:text-white transition">Order Now</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="inline-flex hover:bg-white/5 border border-white/10 rounded-xl h-10 w-10 items-center justify-center transition cursor-pointer text-white theme-toggle-btn"
                title={isDarkMode ? "Switch to Day Mode" : "Switch to Night Mode"}
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-sky-400" />}
               </button>

              <button 
                onClick={() => setShowCallModal(true)}
                className="inline-flex items-center gap-1.5 hover:bg-red-400 h-10 px-4 sm:px-6 text-[11px] sm:text-sm font-bold text-white bg-sakura-red rounded-xl transition shadow-lg shadow-sakura-red/20 whitespace-nowrap cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-2 bg-black border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-xl space-y-4"
              >
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Art of Sushi', href: '#space' },
                  { name: 'Sushi Guide', href: '#sushi-guide' },
                  { name: 'Order Now', href: '#order-now' },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <a key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-neutral-300 hover:text-sakura-red py-1">{item.name}</a>
                ))}
                
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-full flex items-center justify-between text-sm font-medium text-neutral-300 hover:text-sakura-red py-2 border-t border-white/10 mt-2 pt-2 cursor-pointer"
                >
                  <span>{isDarkMode ? "Day Mode" : "Night Mode"}</span>
                  {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-sky-400" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <motion.div 
              {...fadeIn}
              className="col-span-12 lg:col-span-8 relative rounded-3xl overflow-hidden border border-white/10 min-h-[70vh] md:min-h-[78vh] lg:min-h-[82vh] group"
            >
              {/* Restaurant Background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/9248420e-2dde-4cb6-9a4e-1b15220aa65d.jfif" 
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105" 
                  alt="Restaurant Background" 
                />
                <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] hero-dark-overlay" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent hero-gradient-overlay" />
                
                {/* Sophisticated Accents */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sakura-red/[0.03] rounded-full blur-3xl opacity-50" />
              </div>

              {/* Bowl Image as Main Hero with Detailed Circular Rotating Text Path - Perfectly concentric & centered on all screens! */}
              <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[8%] xl:pr-[12%] pointer-events-none z-[1] select-none">
                <motion.div 
                  className="relative aspect-square w-11/12 sm:w-3/4 max-w-[260px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[390px]"
                  animate={{ 
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  
                  {/* Elegant rotating text path curving perfectly around the sushi plate - Absolutely centered */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] animate-[spin_55s_linear_infinite] pointer-events-none">
                    <svg viewBox="0 0 400 400" className="w-full h-full pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
                      <path 
                        id="circlePathHero" 
                        d="M 200, 200 m -155, 0 a 155, 155 0 1, 1 310, 0 a 155, 155 0 1, 1 -310, 0" 
                        fill="none" 
                      />
                      <text className="font-serif fill-white/95 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] uppercase hero-rotating-text" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>
                        <textPath href="#circlePathHero" startOffset="0%" textLength="974" lengthAdjust="spacing">
                          {"SAKURA EVEREST SUSHI & BENTO\u00a0\u00a0•\u00a0\u00a0FRESHLY MADE AND MADE FOR YOU\u00a0\u00a0•\u00a0\u00a0"}
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* High Quality Interactive floating bowl image - Perfectly concentric and sharing the exact same center anchor */}
                  <img 
                    src="https://raw.githubusercontent.com/Sujanad69/SakuraEverest/main/d19b4427-0f45-45cb-8e11-30cb4a6baf22-Photoroom.png" 
                    alt="Signature sushi bowl" 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.92)] filter contrast-[1.12] saturate-[1.15] brightness-[1.04]"
                  />
                </motion.div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-[10] p-6 sm:p-10 md:p-12 flex flex-col justify-between lg:block pointer-events-none">
                {/* Mobile: Top Center, Laptop: Left Center with line break and bigger font */}
                <div className="w-full flex justify-center lg:justify-start lg:absolute lg:top-1/2 lg:left-12 lg:-translate-y-1/2 pt-4 sm:pt-6 lg:pt-0 pointer-events-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center lg:text-left"
                  >
                    <h1 className="font-serif tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-[1.1] lg:leading-[1.05]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                      Sushi <br className="hidden lg:block" /> <span className="text-sakura-red">Sensation.</span>
                    </h1>
                  </motion.div>
                </div>
                
                {/* Bottom Left: Order Now button - repositioned absolutely on lg */}
                <div className="w-full flex justify-start pb-14 sm:pb-16 lg:absolute lg:bottom-24 lg:left-12 lg:pb-0 pointer-events-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <a 
                      href="#order-now"
                      className="inline-flex items-center gap-2 rounded-xl bg-sakura-red px-6 py-3 text-sm font-medium text-white hover:bg-emerald-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-sakura-red/20 hover:shadow-emerald-500/20 active:scale-95"
                    >
                      Order Now
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Info Bar - Sora Sushi Style */}
              <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 py-4 z-[11] flex border-t border-white/10 backdrop-blur-md bg-black/40 justify-between items-center text-[10px] text-neutral-300 hero-info-bar">
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="inline-flex items-center gap-1.5 hover:text-white transition cursor-default">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400 group-hover:text-sakura-red transition" /> 
                    West Orchard Centre
                  </span>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <a 
                    href="https://www.facebook.com/share/17cD1pqfix/?mibextid=wwXIfr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-sakura-red transition duration-300 font-bold uppercase tracking-widest text-[9px]"
                  >
                    <Facebook className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Facebook</span>
                  </a>
                  <span className="text-white/10 font-light">/</span>
                  <a 
                    href="https://www.instagram.com/sakuraeverest2026?igsh=cWdvZmV5YTNnbTFq" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-sakura-red transition duration-300 font-bold uppercase tracking-widest text-[9px]"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Decorative Lines for Mobile */}
            <div className="lg:hidden col-span-12 py-6 space-y-3 opacity-60">
              <div className="h-px bg-white/10 w-full" />
              <div className="h-px bg-white/10 w-full" />
              <div className="h-px bg-white/10 w-full" />
            </div>

            {/* Side Action Cards - Hidden on Mobile */}
            <div className="hidden lg:flex col-span-12 lg:col-span-4 flex-col gap-4 md:gap-6">
              <motion.a 
                {...fadeIn}
                transition={{ delay: 0.2 }}
                href="#space"
                className="group relative flex-1 min-h-[200px] h-full rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-end p-8"
              >
                <img src="https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=1600&q=80" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[2px]" alt="Art of Sushi" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/75 transition-opacity group-hover:opacity-85" />
                              {/* Sora Sushi Style Bottom-right pill */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="text-2xl text-white font-serif tracking-tight drop-shadow-md" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    ART OF SUSHI
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border border-white/10 text-white group-hover:translate-x-2 transition-transform">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Seigaiha Wave & Urushi Chopsticks Section Divider */}
      <WaveChopsticksDivider isDarkMode={isDarkMode} />

      {/* About Section */}
      <section id="about" className="py-12 md:py-16 px-4 overflow-hidden min-h-[50vh] flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn} className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1711991022613-63df8929f311?w=800&q=80" className="w-full h-full object-cover" alt="Sushi Craft" />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-sakura-red/90 text-white text-[10px] font-bold uppercase tracking-widest mb-2">A Passion for Perfection</span>
              </div>
            </motion.div>
            
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif leading-tight text-white mb-4">Your Go-To Spot <br /> for Fresh <span className="text-sakura-red">Sushi & Bento.</span></h2>
              <p className="text-neutral-300 text-base leading-relaxed font-light">
                At Sakura Everest, we’re all about serving up delicious, freshly made Japanese fusion without any of the fuss. Whether you're grabbing a daily lunch bento, sharing a few rolls with friends, or ordering a cozy dinner to enjoy at home, we make sure every single bite is packed with fresh flavors and crafted with care, right here in the heart of Coventry.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { 
                    icon: Leaf, 
                    title: 'Nutritious & Fresh', 
                    text: 'Daily sourced seasonal items.',
                    variants: {
                      hover: {
                        rotate: [0, -12, 10, -6, 4, 0],
                        scale: [1, 1.15, 1.15, 1],
                        transition: { duration: 0.45, ease: "easeOut" }
                      }
                    }
                  },
                  { 
                    icon: ChefHat, 
                    title: 'Expert Mastery', 
                    text: 'Classic techniques, refined taste.',
                    variants: {
                      hover: {
                        y: [0, -6, 2, 0],
                        scale: [1, 1.15, 1.15, 1],
                        transition: { duration: 0.45, ease: "easeOut" }
                      }
                    }
                  },
                  { 
                    icon: Tag, 
                    title: 'Exceptional Value', 
                    text: 'Sophistication for all.',
                    variants: {
                      hover: {
                        rotate: [0, -18, 14, -8, 4, 0],
                        scale: [1, 1.15, 1.15, 1],
                        transition: { duration: 0.45, ease: "easeOut" }
                      }
                    }
                  },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover="hover"
                    className="p-6 luxury-gradient-card rounded-2xl group flex flex-col items-center text-center select-none cursor-default"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 group-hover:bg-sakura-red/20 group-hover:border-sakura-red/30 shadow-xl">
                      <motion.div variants={item.variants}>
                        <item.icon className={`h-6 w-6 transition-colors duration-300 ${isDarkMode ? 'text-sakura-rose group-hover:text-white' : 'text-sakura-rose group-hover:text-sakura-red'}`} />
                      </motion.div>
                    </div>
                    <h4 className="font-serif text-base text-white mb-1 tracking-wide">{item.title}</h4>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Chopsticks Lifting Premium Nigiri Section Divider */}
      <ChopsticksLiftDivider isDarkMode={isDarkMode} />

      {/* Gallery Section - Single Viewport Optimized Layout */}
      <section id="space" className="py-12 md:py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center justify-center gap-2 mb-10 w-full">
            <motion.div {...fadeIn} className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-2">Art of Sushi</h2>
              <p className="text-neutral-400 font-light text-sm sm:text-base">A sensory adventure of bold flavors and exquisite presentation in every bite.</p>
            </motion.div>
          </div>

          <div className="relative h-[38vh] sm:h-[42vh] md:h-[45vh] lg:h-[48vh] max-h-[380px] w-full max-w-2xl mx-auto flex items-center justify-center [perspective:1200px] select-none">
            <AnimatePresence>
              {[
                { id: (galleryIndex + 2) % GALLERY_IMAGES.length, style: { scale: 0.88, y: -45, rotate: 6, opacity: 0.35, zIndex: 10 } },
                { id: (galleryIndex + 1) % GALLERY_IMAGES.length, style: { scale: 0.94, y: -22, rotate: -4, opacity: 0.75, zIndex: 20 } },
                { id: galleryIndex, style: { scale: 1.00, y: 0, rotate: 0, opacity: 1, zIndex: 30 } }
              ].map((card) => {
                const isFront = card.id === galleryIndex;
                return (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, scale: 0.75, y: 50, rotate: -15 }}
                    animate={{ 
                      scale: card.style.scale, 
                      y: card.style.y, 
                      rotate: card.style.rotate, 
                      opacity: card.style.opacity,
                      zIndex: card.style.zIndex
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.82, 
                      x: -260, 
                      y: 50,
                      rotate: -20,
                      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    onClick={isFront ? () => setIsPickerActive(true) : undefined}
                    onMouseEnter={isFront ? () => setIsHovered(true) : undefined}
                    onMouseLeave={isFront ? () => { setIsHovered(false); setIsHoldingPhoto(false); } : undefined}
                    onMouseDown={isFront ? () => setIsHoldingPhoto(true) : undefined}
                    onMouseUp={isFront ? () => setIsHoldingPhoto(false) : undefined}
                    onTouchStart={isFront ? () => { setIsHoldingPhoto(true); setIsHovered(true); } : undefined}
                    onTouchEnd={isFront ? () => { setIsHoldingPhoto(false); setIsHovered(false); } : undefined}
                    className={`absolute inset-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl origin-bottom gallery-card ${
                      isFront ? "cursor-pointer group hover:border-sakura-red/50 transition-colors duration-500" : ""
                    }`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img 
                        src={GALLERY_IMAGES[card.id]} 
                        className="w-full h-full object-cover select-none pointer-events-none transition-all duration-300 contrast-[1.04] saturate-[1.05] brightness-[1.01]" 
                        style={{ filter: (isFront && !isScrubbing) ? "contrast(1.08) saturate(1.08) brightness(1.02)" : "none" }}
                        alt="Gallery Art" 
                      />
                      {/* Radial vignette overlay - Dark */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-10 gallery-vignette-dark" />
                      {/* Radial vignette overlay - Light */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(250,246,240,0.45)_100%)] pointer-events-none z-10 gallery-vignette-light opacity-0" />
                      {/* Dynamic cinematic inner shadow overlay - Dark */}
                      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] pointer-events-none z-10 gallery-inner-shadow-dark" />
                      {/* Dynamic cinematic inner shadow overlay - Light */}
                      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(250,246,240,0.5)] pointer-events-none z-10 gallery-inner-shadow-light opacity-0" />
                      
                      {/* Immersive hover choose hint overlay */}
                      {isFront && (
                        <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <span className="px-5 py-2.5 rounded-full bg-neutral-950/90 backdrop-blur-md border border-white/10 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-2xl gallery-choose-hint">
                            <Sliders className="h-3.5 w-3.5 text-sakura-red animate-pulse" />
                            Click Photo to Choose or Slide
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {isFront && (
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-6 z-20 gallery-card-info overflow-hidden">
                         {/* Seamless cross-fading background overlays */}
                         <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent z-0 gallery-card-info-dark" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/88 to-transparent z-0 gallery-card-info-light opacity-0" />

                         <div className="max-w-[80%] text-left z-10">
                            <span className="text-[9px] uppercase font-bold tracking-[0.4em] text-sakura-red mb-1.5 block font-mono gallery-card-tag">
                              Art of the Plate
                            </span>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-white tracking-tight leading-tight gallery-card-text">
                              Bold. Exquisite. Unforgettable.
                            </p>
                         </div>
                         
                         <div className="flex items-center gap-4 self-start sm:self-auto font-sans z-10">
                           <div className="text-xs font-mono tracking-wider text-neutral-400 gallery-card-indicator-text">
                             <span className="text-white font-bold gallery-card-active-num">{String(galleryIndex + 1).padStart(2, '0')}</span>
                             <span className="text-neutral-600"> / </span>
                             <span>{String(GALLERY_IMAGES.length).padStart(2, '0')}</span>
                           </div>
                           <div className="w-16 h-[2px] bg-white/15 rounded-full overflow-hidden relative gallery-card-progress">
                             <div 
                               className="absolute top-0 bottom-0 left-0 bg-sakura-red transition-all duration-500 ease-out"
                               style={{ width: `${((galleryIndex + 1) / GALLERY_IMAGES.length) * 100}%` }}
                             />
                           </div>
                         </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Magnificent Slide Scrubber Control Ribbon */}
          <div className="mt-6 md:mt-8 max-w-5xl mx-auto px-4 z-40 relative">
            <div className="flex flex-col items-center gap-4">
              
              {/* Decorative slide indicator line */}
              <div className="text-[11px] uppercase tracking-[0.3em] font-mono text-neutral-400 flex items-center gap-2 select-none gallery-slide-indicator">
                <span className="w-1.5 h-1.5 rounded-full bg-sakura-red animate-ping" />
                Drag slider or click any thumbnail to slide
              </div>

              {/* Japanese Traditional Style Tactile Scrubber Slider */}
              <div className="w-full max-w-md flex items-center gap-4 bg-black/85 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-2xl gallery-main-scrubber">
                <span className="text-[9px] font-mono text-neutral-500 font-bold gallery-main-scrubber-label">01</span>
                <input 
                  type="range" 
                  min="0" 
                  max={GALLERY_IMAGES.length - 1} 
                  value={galleryIndex}
                  onChange={(e) => setGalleryIndex(Number(e.target.value))}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onMouseDown={() => setIsScrubbing(true)}
                  onMouseUp={() => setIsScrubbing(false)}
                  onTouchStart={() => setIsScrubbing(true)}
                  onTouchEnd={() => setIsScrubbing(false)}
                  className="flex-grow accent-sakura-red h-1 bg-white/10 rounded-full appearance-none cursor-pointer focus:outline-none gallery-main-scrubber-input"
                />
                <span className="text-[9px] font-mono text-neutral-500 font-bold gallery-main-scrubber-label">{String(GALLERY_IMAGES.length).padStart(2, '0')}</span>
              </div>
              
              {/* Elegant horizontal Slide Thumbnail strip */}
              <div 
                className="w-full overflow-x-auto no-scrollbar py-2 px-1 flex justify-center gap-3.5 scroll-smooth snap-x"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {GALLERY_IMAGES.map((img, idx) => {
                  const isActive = idx === galleryIndex;
                  return (
                    <button
                      key={`tray-sushi-${idx}`}
                      onClick={() => setGalleryIndex(idx)}
                      className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-center focus:outline-none gallery-tray-thumb ${
                        isActive 
                          ? 'border-sakura-red scale-105 shadow-lg shadow-sakura-red/20 z-10' 
                          : 'border-white/10 hover:border-white/25 scale-100 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        className="w-full h-full object-cover select-none pointer-events-none transition-all duration-300 contrast-[1.04] saturate-[1.05] brightness-[1.01]" 
                        alt="Sushi bento choice" 
                      />
                      <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition" />
                      {isActive && (
                        <div className="absolute inset-x-0 bottom-0 py-1 bg-sakura-red text-[8px] font-bold text-center text-white uppercase tracking-widest leading-none font-mono">
                          Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Japanese Style Section Divider */}
      <FallingSushiSilverDivider isDarkMode={isDarkMode} />

      {/* Interactive Know Your Sushi Section */}
      <KnowYourSushi isDarkMode={isDarkMode} />

      {/* Traditional Seigaiha Wave & Urushi Chopsticks Section Divider */}
      <WaveChopsticksDivider isDarkMode={isDarkMode} />

      {/* Google Testimonials & Reviews Section */}
      <GoogleReviews isDarkMode={isDarkMode} />

      {/* Traditional Seigaiha Wave & Urushi Chopsticks Section Divider */}
      <WaveChopsticksDivider isDarkMode={isDarkMode} />

      {/* Order Now Section */}
      <OrderNowSection isDarkMode={isDarkMode} />

      {/* Immersive Gallery Full-screen Lightbox & Slide Picker */}
      <AnimatePresence>
        {isPickerActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between py-8 px-4 md:py-12 md:px-8 select-none picker-deck-modal"
          >
            {/* Header with Title and Close Button */}
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center z-10 border-b border-white/10 pb-6 picker-deck-header">
              <div>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-sakura-red font-mono picker-deck-subtitle">
                  Interactive Selection Deck
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mt-1 leading-none picker-deck-title">
                  Choose Your Sushi Art
                </h3>
              </div>
              <button
                onClick={() => setIsPickerActive(false)}
                className="w-12 h-12 rounded-full border border-white/10 bg-black hover:bg-sakura-red hover:border-sakura-red hover:text-white flex items-center justify-center transition duration-300 shadow-2xl cursor-pointer picker-deck-close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Interactive Slide Display */}
            <div className="flex-grow flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto w-full gap-8 my-6">
              {/* Left Arrow */}
              <button
                onClick={() => setGalleryIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
                className="hidden md:flex w-14 h-14 rounded-full border border-white/10 bg-black hover:bg-sakura-red hover:text-white items-center justify-center transition shadow-2xl cursor-pointer picker-deck-arrow"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Active High-resolution visual card */}
              <div className="relative aspect-[4/3] md:aspect-[16/10] w-full max-w-4xl rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] picker-deck-card">
                <img 
                  src={GALLERY_IMAGES[galleryIndex]} 
                  className="w-full h-full object-cover transition-all duration-300 contrast-[1.04] saturate-[1.05] brightness-[1.01]" 
                  style={{ filter: !isScrubbing ? "contrast(1.08) saturate(1.08) brightness(1.02)" : "none" }}
                  alt="Selected Sushi Culinary Craft" 
                />
                
                {/* Visual gradient shading & info */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 picker-deck-card-overlay overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-0 picker-deck-card-overlay-dark" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/22 to-transparent z-0 picker-deck-card-overlay-light opacity-0" />

                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sakura-red mb-1.5 font-mono picker-deck-card-tag z-10">
                    Presentation {String(galleryIndex + 1).padStart(2, '0')} of {String(GALLERY_IMAGES.length).padStart(2, '0')}
                  </span>
                  <h4 className="text-2xl md:text-4xl font-serif text-white tracking-tight leading-none mb-3 font-bold picker-deck-card-title z-10">
                    Culinary Excellence
                  </h4>
                  <p className="text-neutral-300 text-xs md:text-sm max-w-2xl font-light picker-deck-card-desc z-10">
                    Crafted with deep respect for authentic Japanese culinary heritage.
                  </p>
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => setGalleryIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)}
                className="hidden md:flex w-14 h-14 rounded-full border border-white/10 bg-black hover:bg-sakura-red hover:text-white items-center justify-center transition shadow-2xl cursor-pointer picker-deck-arrow"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Slide Control Scrubber & Thumb Ribbon at the Bottom */}
            <div className="max-w-7xl mx-auto w-full z-10 flex flex-col items-center gap-6">
              {/* Dynamic Tactile Slide Rail */}
              <div className="w-full max-w-2xl bg-black/90 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-4 shadow-2xl picker-deck-rail">
                <span className="text-xs font-mono text-neutral-500 font-bold picker-deck-rail-label">S-01</span>
                <input
                  type="range"
                  min="0"
                  max={GALLERY_IMAGES.length - 1}
                  value={galleryIndex}
                  onChange={(e) => setGalleryIndex(Number(e.target.value))}
                  onMouseDown={() => setIsScrubbing(true)}
                  onMouseUp={() => setIsScrubbing(false)}
                  onTouchStart={() => setIsScrubbing(true)}
                  onTouchEnd={() => setIsScrubbing(false)}
                  className="flex-grow h-1 bg-white/15 rounded-lg appearance-none cursor-pointer focus:outline-none accent-sakura-red picker-deck-scrubber"
                />
                <span className="text-xs font-mono text-neutral-500 font-bold picker-deck-rail-label">S-{String(GALLERY_IMAGES.length).padStart(2, '0')}</span>
              </div>

              {/* Click-to-slide visual ribbon */}
              <div className="w-full overflow-x-auto no-scrollbar py-2 flex gap-3.5 snap-x justify-start md:justify-center">
                {GALLERY_IMAGES.map((img, idx) => {
                  const isActive = idx === galleryIndex;
                  return (
                    <button
                      key={`deck-thumb-${idx}`}
                      onClick={() => setGalleryIndex(idx)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-center focus:outline-none cursor-pointer picker-deck-thumb ${
                        isActive 
                          ? 'border-sakura-red scale-110 shadow-lg shadow-sakura-red/30 z-10' 
                          : 'border-white/10 hover:border-white/20 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        className="w-full h-full object-cover select-none pointer-events-none transition-all duration-300 contrast-[1.04] saturate-[1.05] brightness-[1.01]" 
                        alt="Sushi choice thumbnail" 
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Interactive Call Now Modal Supporting Direct Calling & Instant Clipboard Copy */}
      <AnimatePresence>
        {showCallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCallModal(false)}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 selection:bg-sakura-red/30"
          >
            {/* Soft Glowing Ambient Halo Behind Card */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-sakura-red/10 blur-[80px] pointer-events-none z-0" />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-black border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-2xl z-10 backdrop-blur-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowCallModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5 w-8 h-8 rounded-full flex items-center justify-center transition"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 rounded-2xl bg-sakura-red/10 border border-sakura-red/20 flex items-center justify-center mb-5 text-sakura-red/90 animate-pulse">
                  <Phone className="h-8 w-8" />
                </div>

                <span className="text-xs font-mono uppercase tracking-[0.3em] text-sakura-rose">
                  Sakura Everest
                </span>

                <h3 className="text-2xl font-serif text-white mt-2 mb-1" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  Connect with Us
                </h3>
                


                {/* Highly readable Phone Display Badge */}
                <div className="w-full bg-black border border-white/10 rounded-2xl p-4 mb-6 flex flex-col justify-center items-center group relative overflow-hidden">
                  <div className="absolute inset-0 bg-sakura-red/5 opacity-0 group-hover:opacity-100 transition duration-300" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-1">
                    Telephone Number
                  </span>
                  <a 
                    href="tel:+447440517561" 
                    className="text-2xl sm:text-3xl font-mono text-white hover:text-sakura-red transition font-bold tracking-tight select-all"
                  >
                    07440 517561
                  </a>
                  <span className="text-[10px] text-neutral-400 mt-1 font-sans italic opacity-65 group-hover:opacity-100 transition">
                    +44 (0) 7440 517561
                  </span>
                </div>

                {/* Primary Action Buttons */}
                <div className="w-full grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText("+447440517561");
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="flex justify-center items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 hover:text-white text-neutral-200 border border-white/10 rounded-xl h-12 text-sm font-medium transition active:scale-95 cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-neutral-400" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>

                  <a
                    href="tel:+447440517561"
                    className="flex justify-center items-center gap-1.5 bg-sakura-red hover:bg-emerald-500 text-white rounded-xl h-12 text-sm font-bold transition active:scale-95 shadow-lg shadow-sakura-red/20 hover:shadow-emerald-500/20 cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Call Now</span>
                  </a>
                </div>

                <button 
                  onClick={() => setShowCallModal(false)}
                  className="mt-6 text-neutral-400 hover:text-neutral-200 text-xs tracking-wider uppercase font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Chopsticks Lifting Premium Nigiri Section Divider */}
      <ChopsticksLiftDivider isDarkMode={isDarkMode} />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <motion.div {...fadeIn} className="space-y-12 text-center lg:text-left">
              <div>
                <h3 className="text-4xl font-serif mb-8 text-white font-bold uppercase tracking-tighter">Location</h3>
                <div className="space-y-8">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-sakura-rose/10 border border-sakura-rose/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sakura-red transition duration-500 font-bold text-sakura-rose group-hover:text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-neutral-100 font-bold font-serif text-xl">West Orchard Centre</p>
                      <p className="text-neutral-400 text-sm leading-relaxed mt-1 font-light">
                        2nd Floor, Coventry,<br /> 
                        CV1 1QX, United Kingdom
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-sakura-red/10 border border-sakura-red/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sakura-red transition duration-500 font-bold text-sakura-red group-hover:text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                    <a 
                      href="tel:+447440517561" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCallModal(true);
                      }}
                      className="text-neutral-100 font-bold font-serif text-xl hover:text-sakura-red transition italic cursor-pointer"
                    >
                      07440 517561
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-col items-center lg:items-start">
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/sakuraeverest2026?igsh=cWdvZmV5YTNnbTFq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-sakura-red hover:bg-white/5 transition animate-in show"><Instagram className="h-5 w-5" /></a>
                  <a href="https://www.facebook.com/share/17cD1pqfix/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-sakura-red hover:bg-white/5 transition animate-in show"><Facebook className="h-5 w-5" /></a>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="lg:col-span-2 relative h-[450px] rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-2xl group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.864765660877!2d-1.514603023348633!3d52.40822607203063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48774b094248888b%3A0x6436f50531bd7e4a!2sWest%20Orchards%20Shopping%20Centre!5e0!3m2!1sen!2suk!4v1714992000000!5m2!1sen!2suk"
                className="w-full h-full grayscale opacity-[0.1] contrast-125 group-hover:opacity-20 transition-all duration-1000"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 pointer-events-none">
                 <div className="p-8 sm:p-10 bg-black/60 border border-white/5 rounded-[2.5rem] backdrop-blur-sm text-center max-w-sm pointer-events-auto">
                    <div className="w-12 h-12 rounded-2xl bg-sakura-red/20 flex items-center justify-center mx-auto mb-6 text-sakura-red">
                      <Navigation className="h-5 w-5" />
                    </div>
                    <h5 className="text-xl font-serif text-white font-bold mb-3 tracking-tighter">Find Our Kitchen</h5>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mb-8 font-black">2nd Floor, West Orchard Centre</p>
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=West+Orchard+Shopping+Centre,+Coventry,+CV1+1QX" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-sakura-red text-white rounded-xl font-bold transition-all duration-500 text-[9px] tracking-widest border border-white/10"
                    >
                      <ExternalLink className="h-3 w-3" />
                      GET DIRECTIONS
                    </a>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-24 px-4 border-t relative overflow-hidden transition-colors duration-1000 ${
        isDarkMode ? 'bg-black border-white/5' : 'bg-[#FAF6F0] border-neutral-200'
      }`}>
        {/* Dynamic borderless ambient landscape background with Everest and Sakura branches */}
        <ScenicEverestFooterBg isDarkMode={isDarkMode} />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 relative z-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-20 h-20 transition-transform hover:scale-110 flex items-center justify-center p-3 mb-2">
              <img src="https://raw.githubusercontent.com/Sujanad69/Pukumodel/main/IMG_3388.png" className="w-full h-full object-contain" alt="Sakura Logo" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-white uppercase tracking-tighter italic text-center">Sakura Everest</h2>
            <p className="text-neutral-600 text-xs uppercase tracking-[0.6em] font-black">Crafting Culinary Perfection.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 text-[10px] text-neutral-500 uppercase tracking-[0.4em] font-black">
            <a href="#about" className="hover:text-sakura-red transition">About</a>
            <a href="#space" className="hover:text-sakura-red transition">Art of Sushi</a>
            <a href="#sushi-guide" className="hover:text-sakura-red transition">Sushi Guide</a>
            <a href="#order-now" className="hover:text-sakura-red transition">Order Now</a>
            <a href="#contact" className="hover:text-sakura-red transition">Contact</a>
          </div>

          <div className="flex flex-col items-center gap-6 pt-12 border-t border-white/5 w-full overflow-hidden">
            <p className="text-neutral-800 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.8em] text-center max-w-full leading-loose px-2 overflow-visible">
              <span className="block sm:inline">© 2026 Sakura Everest Sushi & Bento • Coventry, UK</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline mt-1 sm:mt-0">The Art of Fusion</span>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Interactive Mascot */}
      <ChibiMaki isDarkMode={isDarkMode} />
    </div>
  );
}
