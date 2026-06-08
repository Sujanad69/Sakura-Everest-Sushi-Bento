import React from "react";
import { motion } from "motion/react";

interface DividerProps {
  isDarkMode: boolean;
}

/**
 * 1. WaveChopsticksDivider (Traditional Japanese Seigaiha & Crossed Chopsticks)
 * Distinctive, high-fidelity vector of crossed Japanese chopsticks with a central Maki/Futomaki roll.
 * Styled in rich, vibrant lacquer red, warm bamboo wood, and gold ring accents to pop beautifully in both modes.
 */
export const WaveChopsticksDivider: React.FC<DividerProps> = ({ isDarkMode }) => {
  // Theme-matching background wave colors
  const waveStrokePrimary = isDarkMode ? "rgba(253, 164, 175, 0.15)" : "rgba(227, 30, 36, 0.08)";
  const waveStrokeSecondary = isDarkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(45, 30, 40, 0.03)";
  const ringStroke = isDarkMode ? "rgba(253, 164, 175, 0.2)" : "rgba(45, 30, 40, 0.1)";
  
  // Traditional premium Kyoto colors which pop in both light and dark mode
  const lacquerRed = "#E31E24"; // Glossy brand red lacquer
  const bambooWood = isDarkMode ? "#F59E0B" : "#D97706"; // Premium warm golden bamboo wood
  const darkLacquer = "#1F2937"; // Rich coal black lacquer
  const goldAccent = "#fbbf24"; // 24k polished gold bands

  return (
    <div className="relative w-full overflow-hidden py-10 z-20 pointer-events-none select-none">
      {/* Decorative overlapping background waves */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 w-full flex flex-col justify-center opacity-70">
        <svg 
          viewBox="0 0 1440 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-8 object-cover scale-y-110"
        >
          <path 
            d="M 0 30 C 120 12, 240 12, 360 30 C 480 48, 600 48, 720 30 C 840 12, 960 12, 1080 30 C 1200 48, 1320 48, 1440 30" 
            stroke={waveStrokePrimary} 
            strokeWidth="1.5" 
            strokeLinecap="round"
            fill="none" 
          />
          <path 
            d="M 0 45 C 180 20, 360 20, 540 45 C 720 70, 900 70, 1080 45 C 1260 20, 1440 20, 1620 45" 
            stroke={waveStrokeSecondary} 
            strokeWidth="1" 
            strokeDasharray="6, 8" 
            fill="none" 
          />
        </svg>
      </div>

      {/* Central Crossed Chopsticks Symbol */}
      <div className="relative flex justify-center items-center h-20 w-full pointer-events-auto">
        <motion.div 
          className="relative w-36 h-20 flex items-center justify-center cursor-default group"
          whileHover={{ scale: 1.05 }}
          title="Vibrant Kyoto Crossed Chopsticks"
        >
          {/* Gentle themed glow on hover */}
          <div className="absolute w-12 h-12 rounded-full blur-[10px] bg-sakura-red/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <svg viewBox="0 0 120 60" className="w-full h-full">
            {/* Concentric clean waves */}
            <circle cx="60" cy="30" r="16" stroke={ringStroke} strokeWidth="1" strokeDasharray="3, 3" fill="none" />
            <circle cx="60" cy="30" r="22" stroke={ringStroke} strokeWidth="1" fill="none" />

            {/* Chopstick 1: Vermilion Red Lacquer (Top-Left to Bottom-Right) */}
            <g>
              <line 
                x1="25" y1="42" x2="95" y2="18" 
                stroke={lacquerRed} 
                strokeWidth="2.8" 
                strokeLinecap="round" 
              />
              {/* Gold Ring Accent */}
              <line 
                x1="28" y1="41" x2="33" y2="39.3" 
                stroke={goldAccent} 
                strokeWidth="3.2" 
              />
              {/* Contrast Coal base wrap */}
              <line 
                x1="24.5" y1="42.2"x2="28" y2="41" 
                stroke={darkLacquer} 
                strokeWidth="2.8" 
                strokeLinecap="round"
              />
              {/* Natural maple wood tip */}
              <line 
                x1="88" y1="20.4" x2="95" y2="18" 
                stroke="#EAE0D5" 
                strokeWidth="2.0" 
                strokeLinecap="round" 
              />
            </g>

            {/* Chopstick 2: Warm Golden Bamboo (Bottom-Left to Top-Right) */}
            <g>
              <line 
                x1="25" y1="18" x2="95" y2="42" 
                stroke={bambooWood} 
                strokeWidth="2.8" 
                strokeLinecap="round" 
              />
              {/* Gold Ring Accent */}
              <line 
                x1="28" y1="19" x2="33" y2="20.7" 
                stroke={goldAccent} 
                strokeWidth="3.2" 
              />
              {/* Vermilion base wrap */}
              <line 
                x1="24.5" y1="17.8" x2="28" y2="19" 
                stroke={lacquerRed} 
                strokeWidth="2.8" 
                strokeLinecap="round"
              />
              {/* Natural maple wood tip */}
              <line 
                x1="88" y1="39.6" x2="95" y2="42" 
                stroke="#EAE0D5" 
                strokeWidth="2.0" 
                strokeLinecap="round" 
              />
            </g>

            {/* Delicious Central Maki Roll */}
            <g transform="translate(60, 30)">
              {/* Dark Forest Green Seaweed Wrap */}
              <circle cx="0" cy="0" r="8.5" fill="#0C1512" stroke={lacquerRed} strokeWidth="1.2" />
              {/* Soft White Seasoned Rice */}
              <circle cx="0" cy="0" r="6" fill="#F9F9F6" />
              {/* Bright Fresh Salmon Filling */}
              <rect x="-2.5" y="-2.5" width="5" height="5" rx="1.2" fill="#E31E24" />
              <circle cx="1.2" cy="-1.2" r="1.1" fill={goldAccent} />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * 2. ChopsticksLiftDivider (Minimalist Interactive Sushi Lift)
 * Premium dynamic graphic of traditional chopsticks gracefully lifting a salmon nigiri piece.
 * The chopsticks are loaded with realistic colors (vermilion red, cedar bamboo, and radiant gold)
 * to match the high-end artisan craft of Kyoto.
 */
export const ChopsticksLiftDivider: React.FC<DividerProps> = ({ isDarkMode }) => {
  const lacquerRed = "#E31E24"; // Brilliant Vermilion Red
  const bambooWood = isDarkMode ? "#F59E0B" : "#D97706"; // Premium Warm Cedar Bamboo
  const darkLacquer = "#1F2937"; // Polished charcoal wood
  const goldAccent = "#fbbf24"; // Polished gold bands
  const soySauceDrop = "#451B03"; // Elegant rich dark soy sauce tone

  return (
    <div className="relative w-full overflow-hidden py-8 z-20 pointer-events-none select-none">
      {/* Decorative horizontal lines */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 opacity-60">
        <div className={`w-[85%] max-w-5xl h-[1.5px] bg-gradient-to-r from-transparent via-current to-transparent ${
          isDarkMode ? "text-sakura-rose/10" : "text-neutral-250"
        }`} />
        <div className={`w-[60%] max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-current to-transparent ${
          isDarkMode ? "text-white/5" : "text-neutral-300/60"
        }`} />
      </div>

      <div className="relative flex justify-center items-center h-24 w-full">
        <motion.div 
          className="relative w-44 h-24 pointer-events-auto"
          whileHover="hover"
        >
          {/* Subtle themed pulse rings on hover */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-400/20 w-16 h-16"
            variants={{
              hover: {
                scale: [1, 2.2],
                opacity: [0.6, 0],
                transition: { duration: 1.2, repeat: Infinity, ease: "easeOut" }
              }
            }}
          />

          <svg viewBox="0 0 160 80" className="w-full h-full">
            {/* Elegant wavy current */}
            <path 
              d="M 20 52 C 40 45, 50 45, 60 52 C 70 59, 80 59, 90 52 C 100 45, 110 45, 130 52" 
              stroke={isDarkMode ? "rgba(253, 164, 175, 0.12)" : "rgba(45, 30, 40, 0.05)"} 
              strokeWidth="1.2" 
              fill="none" 
            />

            {/* Chopsticks - Beautiful lacquer Red & Teak Bamboo Wood finishes */}
            {/* Back Chopstick - Textured Teak Bamboo */}
            <g opacity="0.95">
              <line 
                x1="52" y1="41" x2="140" y2="12" 
                stroke={bambooWood} 
                strokeWidth="2.8" 
                strokeLinecap="round" 
              />
              {/* Contrast Vermilion Grip Base */}
              <line 
                x1="122" y1="18" x2="132" y2="14.7" 
                stroke={lacquerRed} 
                strokeWidth="3.2" 
              />
              {/* Premium Gold Band */}
              <line 
                x1="117" y1="19.7" x2="120" y2="18.7" 
                stroke={goldAccent} 
                strokeWidth="3.2" 
              />
              {/* Clean natural sleeve tip */}
              <line 
                x1="52" y1="41" x2="62" y2="37.7" 
                stroke="#EAE0D5" 
                strokeWidth="2.2" 
              />
            </g>

            {/* Front Chopstick - Crimson Urushi Lacquer */}
            <g className="drop-shadow-sm">
              <line 
                x1="48" y1="51" x2="135" y2="14" 
                stroke={lacquerRed} 
                strokeWidth="2.8" 
                strokeLinecap="round" 
              />
              {/* Charcoal Contrast grip wrapper */}
              <line 
                x1="117" y1="21.2" x2="127" y2="17.2" 
                stroke={darkLacquer} 
                strokeWidth="3.2" 
              />
              {/* Premium Gold Band */}
              <line 
                x1="112" y1="23.2" x2="115" y2="22" 
                stroke={goldAccent} 
                strokeWidth="3.2" 
              />
              {/* Clean natural sleeve tip */}
              <line 
                x1="48" y1="51" x2="58" y2="47" 
                stroke="#EAE0D5" 
                strokeWidth="2.2" 
              />
            </g>

            {/* Mouth-Watering colorful Salmon Nigiri lifted */}
            <g transform="translate(48, 48) rotate(-12)">
              {/* Premium white seasoned rice grains base */}
              <path d="M -8 2 C -8 -4, 8 -4, 8 2 C 8 8, -8 8, -8 2 Z" fill="#FAF9F6" stroke={isDarkMode ? "#2D242E" : "#D4D4D4"} strokeWidth="0.8" />
              {/* Bright fresh marbled salmon sashimi topping */}
              <path d="M -11 -1 C -11 -6, 11 -6, 11 -1 C 11 3, -11 3, -11 -1" fill="#FF4A52" />
              {/* Tender fat marbling lines across the salmon */}
              <path d="M -6 -5 Q -2 -1, -5 2" stroke="#FFF0F1" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
              <path d="M -1 -5 Q 3 -1, 0 2" stroke="#FFF0F1" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
              <path d="M 4 -5 Q 8 -1, 5 2" stroke="#FFF0F1" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
            </g>

            {/* High glossy falling soy sauce drop */}
            <motion.circle 
              cx="52" cy="62" r="1.5" 
              fill={soySauceDrop} 
              variants={{
                hover: {
                  y: [0, 10],
                  opacity: [1, 0],
                  transition: { duration: 1.0, repeat: Infinity, ease: "easeIn" }
                }
              }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * 3. FallingSushiSilverDivider (Under the Art of Sushi section)
 * Highly dynamic, beautiful floating emblems of multiple Japanese items 
 * rendered in refined, high-end, neutral washi/plum grey and soft slate tones.
 * These act as clean background silhouettes that contrast perfectly in both light and dark mode.
 */
export const FallingSushiSilverDivider: React.FC<DividerProps> = ({ isDarkMode }) => {
  const lineStroke1 = isDarkMode ? "rgba(253, 164, 175, 0.12)" : "rgba(45, 30, 40, 0.05)";
  const lineStroke2 = isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(45, 30, 40, 0.03)";
  
  // Clean neutral-greys that adapt gorgeously
  const iconColor = isDarkMode ? "text-neutral-400" : "text-neutral-500";

  return (
    <div className="relative w-full overflow-hidden py-14 z-20 pointer-events-none select-none">
      {/* Wave background */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center">
        <svg viewBox="0 0 1440 80" className="w-full h-full object-cover opacity-85">
          <path 
            d="M 0 35 C 180 50, 360 20, 540 35 C 720 50, 900 20, 1080 35 C 1260 50, 1440 20, 1620 35" 
            stroke={lineStroke1} 
            strokeWidth="1.2" 
            fill="none" 
          />
          <path 
            d="M 0 45 C 240 60, 480 30, 720 45 C 960 60, 1200 30, 1440 45" 
            stroke={lineStroke2} 
            strokeWidth="1.2" 
            fill="none" 
          />
        </svg>
      </div>

      {/* Floating silhouettes of multiple items */}
      <div className="max-w-7xl mx-auto px-12 relative h-16 w-full flex justify-between items-center">
        {[
          { icon0: "maki", label: "Maki Roll", rotate: 15, delay: 0 },
          { icon0: "tea", label: "Green Tea Cup", rotate: -10, delay: 1.5 },
          { icon0: "nigiri", label: "Pristine Salmon Nigiri", rotate: 34, delay: 3.2 },
          { icon0: "momo", label: "Momo Dumpling", rotate: -25, delay: 0.8 },
          { icon0: "maki", label: "Futomaki Special", rotate: 210, delay: 4.5 }
        ].map((item, idx) => {
          return (
            <motion.div
              key={`fall-trans-${idx}`}
              className="relative flex items-center justify-center opacity-40 hover:opacity-85 transition-opacity duration-300 pointer-events-auto cursor-help"
              title={item.label}
              animate={{
                y: [-4, 4, -4],
                rotate: [item.rotate - 5, item.rotate + 5, item.rotate - 5]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                {item.icon0 === "maki" && (
                  <svg viewBox="0 0 24 24" fill="none" className={`w-8 h-8 ${iconColor}`}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3, 3" />
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                  </svg>
                )}
                {item.icon0 === "tea" && (
                  <svg viewBox="0 0 24 24" fill="none" className={`w-8 h-8 ${iconColor}`}>
                    <path d="M 5,6 L 19,6 L 17,20 L 7,20 Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 4,6 L 20,6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 9,11 L 15,11" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                  </svg>
                )}
                {item.icon0 === "nigiri" && (
                  <svg viewBox="0 0 24 24" fill="none" className={`w-8 h-8 ${iconColor}`}>
                    <ellipse cx="12" cy="15" rx="8" ry="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 4,11 C 7,7, 17,7, 20,11" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M 8,11 L 16,11" stroke="currentColor" strokeWidth="1" strokeDasharray="2, 2" />
                  </svg>
                )}
                {item.icon0 === "momo" && (
                  <svg viewBox="0 0 24 24" fill="none" className={`w-8 h-8 ${iconColor}`}>
                    <path d="M 4,15 C 4,8, 20,8, 20,15 C 20,19, 4,19, 4,15" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 12,9 C 12,6, 12,6, 12,9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 9,10 C 11,8, 11,8, 9,10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 15,10 C 13,8, 13,8, 15,10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
