import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { X } from "lucide-react";

interface ChibiMakiProps {
  isDarkMode: boolean;
}

interface Mascot {
  id: string;
  name: string;
  color: string;
  greetings: string[];
}

const MASCOTS: Record<string, Mascot> = {
  maki: {
    id: "maki",
    name: "Chibi-Maki",
    color: "bg-sakura-red",
    greetings: [
      "Hi! Did you know everything at Sakura Everest is prepared fresh right here on the 2nd Floor of West Orchards, Coventry? Never pre-packaged! 🍣",
      "My top recommendation: Try our best-selling Dragon Roll! Inside is crispy fried tempura shrimp and fresh cucumber, wrapped snugly and topped with buttery avocado slices and sweet unagi sauce! 🥑✨",
      "Chef's Tip: Our top-rated Menu Sakura Combo Sushi combines flavorful shrimp rolls and crunchy katsu chicken rolls in one delicious box! Perfect for a quick, filling lunch! 🍱",
      "Fun Fact: Traditional sushi rice (Shari) is carefully seasoned with high-quality vinegar, mirin, and sake, and fanned to a neat body temperature for ultimate umami! 🍚",
      "Did you know? Chopsticks should never be rubbed together—it politely implies the restaurant's tools are cheap! In Japan, many people eat nigiri sushi directly with clean hands! 🥢",
      "Staying home in Coventry today? You can order all our special maki rolls and poke bowls fresh to your door via Uber Eats or Just Eat! 🚀",
      "Hungry for a deal? Grab Meal Deal 1—featuring 6 pieces of Salmon Nigiri, 8 pieces of Uramaki Sushi, and a cold drink for just £14.99! 🏷️",
      "Need some trivia fun? Tap the Know Your Sushi dial on our homepage to master your sushi terms! 🎡"
    ]
  },
  usagi: {
    id: "usagi",
    name: "Mochi-Usagi",
    color: "bg-[#10B981]",
    greetings: [
      "Hello! Mochi-Usagi here! 🐇🌸 Did you know our rice cakes are pounded over 500 times to get that super-squishy texture? Try our sweet Mochi desserts! 🍡",
      "Bunny Hint: Feeling chilly? Try our hot, comforting Grilled Chicken Ramen! It's loaded with bamboo shoots, tender meat, wakame seaweed, edamame, and a soft-boiled egg in a savory hot broth! 🍜",
      "Sweet Update: For a sweet afternoon treat, our traditional Dorayaki pancakes come in Green Tea, Strawberry, and Chocolate fillings! It's sweet happiness in every bite! 🥞",
      "Appetizer Fact: Our golden-crisp Chicken Gyozas and Vegetable Spring Rolls are fried fresh to order. They are the ultimate starter combination! 🥟✨",
      "Remember to drink lots of water and treat yourself today! A fresh Salmon Poke Bowl with tamago, wakame, and edamame is the ultimate self-care meal! 🥑🐟",
      "Drink Tip: Want a fun pop? Try our Japanese Ramune Soda! It comes in Strawberry, Lychee, and Original flavor. Pressing the glass marble down is super satisfying! 🫧",
      "Chef's Delight: Sharing is caring! Our Vegetarian Sushi Platter packages 40 pieces of colorful vegetable rolls, nigiri, and sweet tofu inari pockets for £36.99! 🥬🎎",
      "Matcha power: High-grade matcha green tea contains L-theanine, which relaxes your mind while keeping you energized and happy! Have a wonderful day! 🍵✨"
    ]
  },
  kuma: {
    id: "kuma",
    name: "Wasabi-Kuma",
    color: "bg-[#84B835]",
    greetings: [
      "Rawrr! Wasabi-Kuma here! 🐻🌿 True wasabi comes from mountain streams. Here at Coventry West Orchards, we give you that authentic, fresh kick!",
      "Spicy Recommendation: If you love a rich, satisfying crunch, try our Katsu Chicken Curry! Tasty breaded chicken cutlets soaked in thick, rich Japanese curry over steaming white rice! 🍛🔥",
      "Fusion Fact: Our kitchen proudly blends rich, authentic Japanese techniques with warm, local hospitality here in the heart of Coventry! 🗻🌸",
      "Our Rating: If you look us up, you'll see we are rated an outstanding 4.7 stars by local foodies! Naresh Mali highly recommends our authentic sushi for local lovers! ⭐⭐⭐⭐⭐",
      "Hot Tip: Need a real fiery flavor? Try our Spicy Chicken Ramen! It features marinated chicken breast seasoned with aromatic herbs to give you that amazing warming glow. 🌶️🍜",
      "Spice Level Hack: Not a fan of high heat? Don't worry! Ask our friendly crew, and they can easily serve sweet, savory Teriyaki sauce on the side for your katsu chicken or salmon! 🍯",
      "Kuma Treat: Don't miss our golden-crisp Ebi (Shrimp) Fried! Six pieces of light, bubbly battered prawns, perfect with a dip of sweet chili or spicy mayo! 🍤",
      "Hours Info: We are open from 10:30 AM to 5:30 PM (Sundays until 4:30 PM)! Catch us on the 2nd Floor food court of West Orchards Shopping Centre for a fresh feast! 🏬👋"
    ]
  }
};

export const ChibiMaki: React.FC<ChibiMakiProps> = ({ isDarkMode }) => {
  const [selectedBuddy, setSelectedBuddy] = useState<string>(() => {
    try {
      const persisted = localStorage.getItem("selected_cuisine_buddy");
      return persisted && (persisted === "maki" || persisted === "usagi" || persisted === "kuma") ? persisted : "maki";
    } catch {
      return "maki";
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [isAwake, setIsAwake] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Scroll tracking for playful physics (rocking and wiggling as you scroll)
  const { scrollY } = useScroll();
  const smoothedScrollY = useSpring(scrollY, { stiffness: 120, damping: 15 });

  // Map scroll value to a cyclical rocking angle (-10 to 12 degrees)
  const rotate = useTransform(smoothedScrollY, (y) => {
    return Math.sin(y / 15) * 12;
  });

  // Map scroll value to left and right foot walk heights
  const leftFootY = useTransform(smoothedScrollY, (y) => {
    return Math.max(0, Math.sin(y / 15) * 4);
  });
  const rightFootY = useTransform(smoothedScrollY, (y) => {
    return Math.max(0, -Math.sin(y / 15) * 4);
  });

  // Automatically fade out the initially friendly "Tap me!" tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Save selected buddy to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("selected_cuisine_buddy", selectedBuddy);
    } catch {
      // Ignore
    }
  }, [selectedBuddy]);

  // Handle mascot click: choose a random food trivia and show it instantly! Zero lag.
  const handleMascotClick = () => {
    setShowTooltip(false);
    setIsAwake(true);
    setIsOpen(true);
    
    const activePool = MASCOTS[selectedBuddy].greetings;
    let newIndex = Math.floor(Math.random() * activePool.length);
    if (newIndex === bubbleIndex && activePool.length > 1) {
      newIndex = (newIndex + 1) % activePool.length;
    }
    setBubbleIndex(newIndex);
  };

  // Close speech bubble and trigger relaxed awake state
  const handleBubbleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setTimeout(() => {
      setIsAwake(false);
    }, 1500);
  };

  // Auto close bubble after 12 seconds of reading
  useEffect(() => {
    if (isOpen) {
      const closeTimer = setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => setIsAwake(false), 1500);
      }, 12000);
      return () => clearTimeout(closeTimer);
    }
  }, [isOpen]);

  const activeMascot = MASCOTS[selectedBuddy];

  // SVG Renderings for each companion character
  const renderMaki = () => (
    <>
      {/* RICE GRAIN FEET */}
      <motion.ellipse 
        cx="34" 
        cy="84" 
        rx="6" 
        ry="4" 
        fill="#FAF6F0" 
        stroke="#DCD7CD" 
        strokeWidth="0.75" 
        style={{ y: leftFootY }}
      />
      <motion.ellipse 
        cx="66" 
        cy="84" 
        rx="6" 
        ry="4" 
        fill="#FAF6F0" 
        stroke="#DCD7CD" 
        strokeWidth="0.75" 
        style={{ y: rightFootY }}
      />

      {/* NORI SEAWEED OUTER WRAP */}
      <circle cx="50" cy="48" r="36" fill="url(#noriGrad)" stroke="#050807" strokeWidth="1" />

      {/* INNER WHITE RICE BODY */}
      <circle cx="50" cy="48" r="30" fill="#FCF9F5" />
      
      {/* Soft inner rice texture lines */}
      <path d="M 28,40 Q 30,38 32,41" stroke="#E6E0D5" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 68,44 Q 69,46 72,43" stroke="#E6E0D5" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 32,58 Q 30,60 33,62" stroke="#E6E0D5" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 50,65 Q 48,67 52,68" stroke="#E6E0D5" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* CORE FILLINGS */}
      <g>
        {/* Orange Salmon Wedge */}
        <path 
          d="M 36,32 C 36,25 44,22 44,28 C 44,34 36,36 36,32 Z" 
          fill="url(#salmonGrad)" 
        />
        {/* White lines on salmon fill */}
        <path d="M 38,27 Q 41,27 42,30" stroke="#FFF" strokeWidth="0.75" fill="none" opacity="0.6" />
        <path d="M 37,31 Q 39,32 40,34" stroke="#FFF" strokeWidth="0.75" fill="none" opacity="0.6" />

        {/* Creamy Yellow Tamago (Egg) Wedge */}
        <rect 
          x="46" 
          y="22" 
          width="14" 
          height="10" 
          rx="3" 
          transform="rotate(15, 53, 27)" 
          fill="#FFD700" 
        />
        <rect 
          x="49" 
          y="25" 
          width="8" 
          height="4" 
          rx="1.5" 
          transform="rotate(15, 53, 27)" 
          fill="#FFF4B8" 
          opacity="0.7" 
        />

        {/* Fresh Green Cucumber Slice */}
        <circle cx="48" cy="36" r="6" fill="#4CAF50" />
        <circle cx="48" cy="36" r="4.5" fill="#A5D6A7" />
        <circle cx="47" cy="35" r="0.6" fill="#388E3C" />
        <circle cx="49" cy="37" r="0.6" fill="#388E3C" />
        <circle cx="49" cy="34.8" r="0.6" fill="#388E3C" />
      </g>

      {/* FACIAL EXPRESSIONS */}
      <ellipse cx="28" cy="56" rx="4" ry="2.5" fill="#FFA4B4" opacity="0.75" />
      <ellipse cx="72" cy="56" rx="4" ry="2.5" fill="#FFA4B4" opacity="0.75" />

      {isAwake ? (
        <>
          {/* Shiny happy round eyes */}
          <circle cx="34" cy="51" r="3.5" fill="#20151E" />
          <circle cx="66" cy="51" r="3.5" fill="#20151E" />
          <circle cx="35" cy="50" r="1" fill="#FFF" />
          <circle cx="67" cy="50" r="1" fill="#FFF" />
          
          {/* Cute happy open mouth */}
          <path 
            d="M 44,56 Q 50,65 56,56" 
            fill="#FF334F" 
            stroke="#20151E" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </>
      ) : (
        <>
          {/* Smiling arc eyes (◡ ◡) */}
          <path 
            d="M 30,50 Q 34,54 38,50" 
            fill="none" 
            stroke="#382C31" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
          <path 
            d="M 62,50 Q 66,54 70,50" 
            fill="none" 
            stroke="#382C31" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
          {/* Shy cute smiling line */}
          <path 
            d="M 47,56 Q 50,58 53,56" 
            fill="none" 
            stroke="#382C31" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </>
      )}

      {/* RICE GRAIN ARMS */}
      <ellipse cx="22" cy="58" rx="4" ry="4" fill="#FCF9F5" stroke="#DCD7CD" strokeWidth="0.5" />
      <ellipse cx="78" cy="58" rx="4" ry="4" fill="#FCF9F5" stroke="#DCD7CD" strokeWidth="0.5" />

      {/* Japanese Hachimaki Headband */}
      <g>
        <path 
          d="M 19,30 Q 50,22 81,30 C 81,30 81,35 81,35 Q 50,27 19,35 Z" 
          fill="#FFF" 
          stroke="#DCD6CC" 
          strokeWidth="0.5" 
        />
        <circle cx="50" cy="28.5" r="3.2" fill="#E31E24" />
        
        {/* Headband knots */}
        <path d="M 80,30 Q 86,22 83,18 Q 80,18 79,24 Z" fill="#FFF" stroke="#DCD6CC" strokeWidth="0.5" />
        <path d="M 81,34 Q 88,32 86,27 Q 83,26 80,31 Z" fill="#FFF" stroke="#DCD6CC" strokeWidth="0.5" />
      </g>
    </>
  );

  const renderUsagi = () => (
    <>
      {/* BUNNY MOCHI FEET */}
      <motion.ellipse 
        cx="36" 
        cy="82" 
        rx="6" 
        ry="4" 
        fill="#E8FDF5" 
        stroke="#A7F3D0" 
        strokeWidth="0.75" 
        style={{ y: leftFootY }}
      />
      <motion.ellipse 
        cx="64" 
        cy="82" 
        rx="6" 
        ry="4" 
        fill="#E8FDF5" 
        stroke="#A7F3D0" 
        strokeWidth="0.75" 
        style={{ y: rightFootY }}
      />

      {/* BUNNY EARS */}
      {/* Left Ear */}
      <path 
        d="M 28,34 Q 20,4 34,14 C 36,16 36,30 32,34 Z" 
        fill="#F0FDF4" 
        stroke="#A7F3D0" 
        strokeWidth="1" 
      />
      <path 
        d="M 27,28 Q 23,8 31,16 C 32,17 33,26 30,28 Z" 
        fill="#34D399" 
        opacity="0.8"
      />
      {/* Right Ear */}
      <path 
        d="M 72,34 Q 80,4 66,14 C 64,16 64,30 68,34 Z" 
        fill="#F0FDF4" 
        stroke="#A7F3D0" 
        strokeWidth="1" 
      />
      <path 
        d="M 73,28 Q 77,8 69,16 C 68,17 67,26 70,28 Z" 
        fill="#34D399" 
        opacity="0.8"
      />

      {/* SQUISHY MOCHI BODY */}
      <path 
        d="M 22,74 C 18,52 30,36 50,36 C 70,36 82,52 78,74 C 76,82 66,84 50,84 C 34,84 24,82 22,74 Z" 
        fill="#F0FDF4" 
        stroke="#A7F3D0" 
        strokeWidth="1.2" 
      />

      {/* CHEEKS */}
      <ellipse cx="30" cy="62" rx="4.5" ry="3" fill="#F43F5E" opacity="0.3" />
      <ellipse cx="70" cy="62" rx="4.5" ry="3" fill="#F43F5E" opacity="0.3" />

      {/* FACIAL EXPRESSIONS */}
      {isAwake ? (
        <>
          {/* Happy sparkling curved winks */}
          <path 
            d="M 32,54 Q 37,49 42,54" 
            fill="none" 
            stroke="#422F34" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          <path 
            d="M 58,54 Q 63,49 68,54" 
            fill="none" 
            stroke="#422F34" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          {/* Delightful tiny open mouth */}
          <path 
            d="M 46,60 Q 50,63 54,60 Q 50,57 46,60 Z" 
            fill="#EF4444"
            stroke="#422F34" 
            strokeWidth="1" 
          />
        </>
      ) : (
        <>
          {/* Cozy innocent round eyes */}
          <circle cx="37" cy="54" r="3" fill="#422F34" />
          <circle cx="38" cy="53" r="1" fill="#FFF" />
          <circle cx="63" cy="54" r="3" fill="#422F34" />
          <circle cx="64" cy="53" r="1" fill="#FFF" />
          
          {/* Cute small smiley mouth */}
          <path 
            d="M 47,59 Q 50,62 53,59" 
            fill="none" 
            stroke="#422F34" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </>
      )}

      {/* MOCHI ARMS */}
      <ellipse cx="24" cy="65" rx="4.5" ry="4.5" fill="#F0FDF4" stroke="#A7F3D0" strokeWidth="0.5" />
      <ellipse cx="76" cy="65" rx="4.5" ry="4.5" fill="#F0FDF4" stroke="#A7F3D0" strokeWidth="0.5" />

      {/* EXQUISITE CHERRY BLOSSOM ON HER HEAD */}
      <g transform="translate(50, 42)">
        {[0, 72, 144, 216, 288].map((angle, idx) => (
          <path
            key={idx}
            d="M 0,0 C -3,-8 -1,-14 0,-14 C 1,-14 3,-8 0,0 Z"
            fill="#10B981"
            stroke="#059669"
            strokeWidth="0.3"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="1.8" fill="#FFF176" />
      </g>
    </>
  );

  const renderKuma = () => (
    <>
      {/* WASABI MOUNT FEET */}
      <motion.ellipse 
        cx="34" 
        cy="82" 
        rx="5" 
        ry="3" 
        fill="#A8DF65" 
        stroke="#84B835" 
        strokeWidth="0.75" 
        style={{ y: leftFootY }}
      />
      <motion.ellipse 
        cx="66" 
        cy="82" 
        rx="5" 
        ry="3" 
        fill="#A8DF65" 
        stroke="#84B835" 
        strokeWidth="0.75" 
        style={{ y: rightFootY }}
      />

      {/* COZY ROUND BEAR EARS */}
      {/* Left Ear */}
      <circle cx="28" cy="38" r="8.5" fill="#A8DF65" stroke="#719C29" strokeWidth="1" />
      <circle cx="28" cy="38" r="5.5" fill="#FFA2B2" opacity="0.6"/>
      
      {/* Right Ear */}
      <circle cx="72" cy="38" r="8.5" fill="#A8DF65" stroke="#719C29" strokeWidth="1" />
      <circle cx="72" cy="38" r="5.5" fill="#FFA2B2" opacity="0.6"/>

      {/* WASABI SWIRLED BODY SHAPE */}
      {/* Base ring */}
      <ellipse cx="50" cy="74" rx="28" ry="10" fill="#90CC4C" stroke="#719C29" strokeWidth="1" />
      {/* Middle layers */}
      <ellipse cx="50" cy="65" rx="24" ry="12" fill="#A8DF65" />
      {/* Top layered peak */}
      <path 
        d="M 22,66 C 22,46 36,32 50,32 C 64,32 78,46 78,66 C 78,74 70,76 50,76 C 30,76 22,74 22,66 Z" 
        fill="#B9E87E" 
        stroke="#719C29" 
        strokeWidth="1.2" 
      />
      {/* Swirled point */}
      <path 
        d="M 44,34 Q 50,22 51,20 Q 54,22 56,34 Z" 
        fill="#C5F08C" 
        stroke="#719C29" 
        strokeWidth="0.5" 
      />

      {/* CHEEKS */}
      <ellipse cx="32" cy="61" rx="4" ry="2.5" fill="#FFA042" opacity="0.75" />
      <ellipse cx="68" cy="61" rx="4" ry="2.5" fill="#FFA042" opacity="0.75" />

      {/* FACIAL EXPRESSIONS */}
      {isAwake ? (
        <>
          {/* Delightful slightly squinty eyes */}
          <path 
            d="M 32,52 L 38,50 L 32,48" 
            fill="none" 
            stroke="#253512" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <circle cx="64" cy="52" r="3.5" fill="#253512" />
          <circle cx="65" cy="51" r="1" fill="#FFF" />
          
          {/* Bear Nose */}
          <polygon points="50,54 47,51 53,51" fill="#253512" />

          {/* Happy Open Bear Mouth */}
          <path 
            d="M 46,58 Q 50,64 54,58" 
            fill="#D32F2F" 
            stroke="#253512" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
          />
        </>
      ) : (
        <>
          {/* Safe round eyes */}
          <circle cx="36" cy="52" r="3.2" fill="#253512" />
          <circle cx="37" cy="51" r="0.8" fill="#FFF" />
          <circle cx="64" cy="52" r="3.2" fill="#253512" />
          <circle cx="65" cy="51" r="0.8" fill="#FFF" />

          {/* Bear Nose */}
          <polygon points="50,54 47,51 53,51" fill="#253512" />

          {/* Bear Smile */}
          <path 
            d="M 45,58 Q 50,60 55,58" 
            fill="none" 
            stroke="#253512" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </>
      )}

      {/* HANDS */}
      <ellipse cx="20" cy="65" rx="3.5" ry="3.5" fill="#A8DF65" stroke="#719C29" strokeWidth="0.5" />
      <ellipse cx="80" cy="65" rx="3.5" ry="3.5" fill="#A8DF65" stroke="#719C29" strokeWidth="0.5" />

      {/* BAMBOO LEAF */}
      <g transform="translate(64, 25) rotate(25)">
        <path 
          d="M 0,0 Q 8,-12 18,-15 Q 12,-4 0,0" 
          fill="#2E7D32" 
          stroke="#1B5E20" 
          strokeWidth="0.5" 
        />
      </g>
    </>
  );

  const renderActiveMascotBody = () => {
    switch (selectedBuddy) {
      case "usagi":
        return renderUsagi();
      case "kuma":
        return renderKuma();
      case "maki":
      default:
        return renderMaki();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[50] flex flex-col items-center select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`mb-4 w-[250px] sm:w-[290px] p-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.15)] border relative cursor-default ${
              !isDarkMode
                ? "bg-[#FAF6F0] border-sakura-red/20 text-[#2D242E]"
                : "bg-black border-white/10 text-neutral-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative text-xs font-sans tracking-wide leading-relaxed pr-3">
              <span className="font-bold text-sakura-red mr-1 font-mono">{activeMascot.name}:</span>
              {activeMascot.greetings[bubbleIndex]}
              
              {/* Close Button */}
              <button 
                onClick={handleBubbleClose}
                className={`absolute -top-2 -right-2 p-1 rounded-full border transition hover:scale-105 active:scale-95 ${
                  !isDarkMode 
                    ? "bg-[#FAF6F0] border-neutral-200 text-neutral-400 hover:text-neutral-600" 
                    : "bg-black border-white/10 text-neutral-500 hover:text-neutral-300"
                }`}
                style={{ fontSize: "9px" }}
                aria-label="Close"
              >
                <X size={10} />
              </button>

              {/* Speech Bubble Arrow */}
              <div 
                className={`absolute bottom-[-6px] right-8 w-3 h-3 rotate-45 border-r border-b ${
                  !isDarkMode 
                    ? "bg-[#FAF6F0] border-sakura-red/20" 
                    : "bg-black border-white/10"
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Gentle Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mb-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md pointer-events-none flex items-center gap-1 ${
              !isDarkMode
                ? "bg-sakura-red text-white"
                : "bg-black text-[#FFF4F9] border border-white/10"
            }`}
          >
            👋 Play with {activeMascot.name}!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Companion Switcher Pill */}
      <div 
        className={`mb-1.5 px-2 py-0.5 rounded-full flex gap-1 items-center shadow-xs border backdrop-blur-md transition-all duration-300 pointer-events-auto ${
          !isDarkMode 
            ? "bg-white/90 border-neutral-200/70 shadow-neutral-200/20" 
            : "bg-black border-white/10 shadow-black/30"
        }`}
      >
        <div className="flex gap-1">
          {Object.values(MASCOTS).map((mascot) => {
            const isActive = selectedBuddy === mascot.id;
            const emoji = mascot.id === "maki" ? "🍙" : mascot.id === "usagi" ? "🍡" : "🌶️";
            
            let activeColorClass = "";
            if (mascot.id === "maki") activeColorClass = "bg-sakura-red/90 border-sakura-rose/30 text-white hover:bg-sakura-red";
            if (mascot.id === "usagi") activeColorClass = "bg-[#10B981]/90 border-[#A7F3D0]/30 text-white hover:bg-[#10B981]";
            if (mascot.id === "kuma") activeColorClass = "bg-[#84B835]/90 border-[#a8df65]/30 text-white hover:bg-[#84B835]";

            return (
              <button
                key={mascot.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBuddy(mascot.id);
                  setShowTooltip(false);
                  setIsAwake(true);
                  setIsOpen(true);
                  
                  const activePool = mascot.greetings;
                  const newIndex = Math.floor(Math.random() * activePool.length);
                  setBubbleIndex(newIndex);
                }}
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border transition-all duration-300 hover:scale-110 active:scale-95 shadow-xs cursor-pointer ${
                  isActive 
                    ? `${activeColorClass} ring-1 ring-white/10 shadow-sm` 
                    : !isDarkMode
                      ? "bg-neutral-100 border-neutral-200/60 text-neutral-600 hover:bg-neutral-200/85"
                      : "bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                }`}
                title={`Chat with ${mascot.name}`}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mascot Button Frame with Breath Induction Animation */}
      <motion.button
        onClick={handleMascotClick}
        style={{ rotate }}
        animate={{ 
          y: isAwake ? 0 : [0, -3, 0],
          scaleY: isAwake ? 1 : [1, 1.03, 1],
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
          scaleY: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
        }}
        className="w-[72px] h-[72px] focus:outline-none select-none relative hover:scale-[1.08] active:scale-95 transition-transform duration-200 ease-out cursor-pointer active:cursor-grabbing"
        title={`I am ${activeMascot.name}! Tap me for food trivia!`}
      >
        {/* Mascot Vector Drawing (SVG Frame) */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS & GRADIENTS */}
          <defs>
            {/* Salmon textures */}
            <linearGradient id="salmonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA07A" />
              <stop offset="100%" stopColor="#FF6347" />
            </linearGradient>

            {/* Seaweed body gradient */}
            <linearGradient id="noriGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C2623" />
              <stop offset="100%" stopColor="#0B100E" />
            </linearGradient>
          </defs>

          {renderActiveMascotBody()}
        </svg>
      </motion.button>
    </div>
  );
};
