import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface OrderNowSectionProps {
  isDarkMode: boolean;
}

export const OrderNowSection: React.FC<OrderNowSectionProps> = ({ isDarkMode }) => {
  const deliveryLinks = [
    {
      name: "Uber Eats",
      logoUrl: "https://raw.githubusercontent.com/Sujanad69/Pukumodel/main/Uber%20Eats%20Horizontal%202020.svg",
      url: "https://www.ubereats.com/gb/store/sakura-everest-sushi-and-bento/fVeKRBw4UrqRYkhsXy2Z_g?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AFd1xnHpjYEnQWLLFXkHRDXfZ1Cf31CpmraQm-id-j2rmrlPHS2piDFiAPfXoq7lvTVwmnS9W3C7RhJTZedsg0699ql6YSwLZQ%3D%3D",
      logoHeight: "h-6 sm:h-8 md:h-9"
    },
    {
      name: "Just Eat",
      logoUrl: "https://raw.githubusercontent.com/Sujanad69/Pukumodel/main/just-eat-icon-logo.svg",
      url: "https://www.just-eat.co.uk/restaurants-sakura-everest-sushi-and-bento-west-orchard/menu",
      logoHeight: "h-8 sm:h-11 md:h-12"
    },
    {
      name: "Deliveroo",
      logoUrl: "https://raw.githubusercontent.com/Sujanad69/Pukumodel/main/deliveroo-seeklogo.svg",
      url: "https://deliveroo.co.uk/menu/coventry/coventry-city-centre/sakura-everest-sushi-and-bento-2nd-floor-west-orchards-shopping-centre",
      logoHeight: "h-6 sm:h-8 md:h-9"
    }
  ];

  return (
    <section 
      id="order-now" 
      className={`py-8 md:py-12 px-4 md:px-6 relative overflow-hidden transition-colors duration-1000 ${
        isDarkMode ? 'bg-[#080509] text-white' : 'bg-[#FAF6F0] text-neutral-800'
      }`}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Simple, Clean Minimalist Apple-style Headline */}
        <div className="text-center mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-lg sm:text-xl font-serif tracking-tight font-medium mb-1 ${
              isDarkMode ? 'text-white/90' : 'text-neutral-900'
            }`}
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Order Delivery Coventry
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`text-[11px] font-light tracking-wide ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}
          >
            Savor fresh, hand-crafted sushi rolls and bento boxes sent straight to your doorstep.
          </motion.p>
        </div>

        {/* 3 Clickable Logo Tiles - STRICTLY SINGLE VIEWPORT ROW on both mobile & desktop */}
        <div className="flex flex-row items-center justify-center gap-1 sm:gap-4 w-full max-w-xl mx-auto py-2">
          {deliveryLinks.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.985 }}
              className="group flex-1 flex flex-col items-center justify-center py-3 px-1 sm:px-4 transition-all duration-350 cursor-pointer select-none relative"
            >
              {/* Pure Icon Layout: Completely Borderless, Backgroundless, Gray-to-Color Responsive Apple-Style Filter Interaction */}
              <div className="flex items-center justify-center w-full min-h-[32px] sm:min-h-[44px]">
                <img 
                  src={partner.logoUrl} 
                  alt={`${partner.name} Logo`}
                  referrerPolicy="no-referrer"
                  // Light mode: High-contrast legible grayscale (opacity 75%) that transitions to full vibrant original colors on hover
                  // Dark mode: Pristine inverted snow-white (opacity 75%) that sharpens to 100% full-brilliance white on hover (Apple style)
                  className={`${partner.logoHeight} w-auto object-contain transition-all duration-300 filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 dark:brightness-0 dark:invert dark:opacity-75 dark:group-hover:brightness-0 dark:group-hover:invert dark:group-hover:opacity-100`}
                />
              </div>

              {/* Micro clean text arrow indicator */}
              <div className="flex items-center gap-0.5 mt-2 text-[9px] uppercase tracking-[0.14em] font-mono font-medium text-neutral-400/80 dark:text-neutral-500/80 group-hover:text-sakura-red group-hover:opacity-100 transition duration-300 opacity-60">
                <span className="text-[8px] sm:text-[9px]">Open</span>
                <ArrowUpRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Minimal dot detail */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`text-[8px] uppercase tracking-[0.25em] font-mono text-center mt-5 sm:mt-6 opacity-30 ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}
        >
          ● Prepared fresh on spot ●
        </motion.p>
      </div>
    </section>
  );
};
