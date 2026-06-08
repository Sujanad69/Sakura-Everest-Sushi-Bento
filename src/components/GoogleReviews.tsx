import React, { useEffect, useRef, useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

interface Review {
  id: number;
  name: string;
  borderColorClass: string;
  rating: number;
  daysAgo: number; // dynamically computed relative date offset
  text: string;
}

const REAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Sameep Bhattarai",
    borderColorClass: "border-t-4 border-t-[#EA4335]", // Google Red
    rating: 5,
    daysAgo: 12, // ~1-2 weeks ago
    text: "Outstanding dining experience at Sakura Sushi and Bento! The sushi was incredibly fresh and artistically presented, and the bento boxes were packed with delicious flavors and variety. The staff were attentive, friendly, and knowledgeable about the menu, making great recommendations. The ambiance was cozy yet modern. I highly recommend trying their signature rolls and tempura – truly exceptional."
  },
  {
    id: 2,
    name: "Aayusha Khatun",
    borderColorClass: "border-t-4 border-t-[#34A853]", // Google Green
    rating: 5,
    daysAgo: 26, // ~3 weeks ago
    text: "The sushi here is absolutely phenomenal! The Sakura deluxe platter, salmon poke bowl was a highlight—generous portions of the freshest cuts, beautifully presented and very delicious. The fish melts in your mouth, and the flavours are perfectly balanced—highlighting chef’s skill. Fresh ingredients and fantastic service!"
  },
  {
    id: 3,
    name: "Naresh Mali",
    borderColorClass: "border-t-4 border-t-[#4285F4]", // Google Blue
    rating: 5,
    daysAgo: 38, // ~1 month ago
    text: "Food are tasty, Hygenic and Good service. Highly recommended restaurant for sushi and bento lovers in Coventry."
  },
  {
    id: 4,
    name: "Amina Miya",
    borderColorClass: "border-t-4 border-t-[#FBBC05]", // Google Yellow
    rating: 5,
    daysAgo: 45, // ~1 month ago
    text: "Best sushi in the city! Great food tonight, lovely and fresh, quick service. Keep up the great work sakura team 👍 Will definitely order again."
  },
  {
    id: 5,
    name: "Fatma",
    borderColorClass: "border-t-4 border-t-[#ab47bc]", // Google Purple
    rating: 5,
    daysAgo: 58, // ~1-2 months ago
    text: "i don’t usually leave reviews but this was the best sushi i’ve had in a long time. you can tell it was fresh and the chef took its time to make it. for the price it’s such good quality. 10/10 would recommend"
  },
  {
    id: 6,
    name: "yenjii",
    borderColorClass: "border-t-4 border-t-[#00acc1]", // Google Teal
    rating: 5,
    daysAgo: 74, // ~2 months ago
    text: "Got a salmon poke bowl via Uber eats for £9.49 that was delivered quickly, had wonderful taste, was very large and good value for money! Everything else was pretty good 👍"
  }
];

// Helper to format dynamically like Google Maps relative review dates
const getRelativeDateString = (daysAgo: number): string => {
  if (daysAgo < 7) {
    return "recent";
  }
  if (daysAgo < 30) {
    const weeks = Math.floor(daysAgo / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  const months = Math.floor(daysAgo / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
};

interface GoogleReviewsProps {
  isDarkMode?: boolean;
}

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({ isDarkMode = true }) => {
  // Triple the array for seamless infinite looping
  const duplicatedReviews = [...REAL_REVIEWS, ...REAL_REVIEWS, ...REAL_REVIEWS];

  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef<number>(0);
  
  // High-performance direct physics engine refs
  const xRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  
  // Interaction states
  const isInteractingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  
  const lastPointerXRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Loading state (prevents initial flash/layout snap)
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measureAndInit = () => {
      const setWidth = track.scrollWidth / 3;
      if (setWidth > 0) {
        setWidthRef.current = setWidth;
        xRef.current = -setWidth;
        track.style.transform = `translate3d(${-setWidth}px, 0, 0)`;
        setIsLoaded(true);
      }
    };

    measureAndInit();

    window.addEventListener("resize", measureAndInit);
    return () => {
      window.removeEventListener("resize", measureAndInit);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let frameId: number;
    const autoSpeed = 0.55; // Pristine, premium constant drift

    const tick = () => {
      const track = trackRef.current;
      if (!track) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      // Lazily measure if width is not yet ready
      if (setWidthRef.current === 0) {
        const setWidth = track.scrollWidth / 3;
        if (setWidth > 0) {
          setWidthRef.current = setWidth;
          xRef.current = -setWidth;
          track.style.transform = `translate3d(${-setWidth}px, 0, 0)`;
          setIsLoaded(true);
        }
      }

    const S = setWidthRef.current;
      if (S > 0) {
        if (isInteractingRef.current) {
          // Keeps velocity updated with small dampening while dragging input is continuous
          velocityRef.current *= 0.85;
        } else {
          // Momentum glide or normal auto-drift
          if (Math.abs(velocityRef.current) > 0.1) {
            xRef.current += velocityRef.current;
            velocityRef.current *= 0.95; // Physics decay (friction)
          } else {
            velocityRef.current = 0;
            if (!isPausedRef.current) {
              xRef.current -= autoSpeed;
            }
          }
        }

        // Universal seamless bounds checking on every single animation frame
        if (xRef.current <= -S * 2) {
          xRef.current += S;
        } else if (xRef.current >= -S * 0.5) {
          xRef.current -= S;
        }

        // Apply hardware accelerated styles to DOM EXACTLY ONCE per frame
        track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Pointer interaction handlers with full momentum calculations
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current || setWidthRef.current === 0) return;

    isInteractingRef.current = true;
    isPausedRef.current = true;
    
    // Smooth capture of touch & pointer movements
    trackRef.current.setPointerCapture(e.pointerId);
    
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractingRef.current || !trackRef.current || setWidthRef.current === 0) return;

    const dx = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    // Direct, latency-free coordinate update (no DOM writes here for ultimate 120Hz performance)
    xRef.current += dx;
    // Smooth the velocity using an exponential moving average to filter sensor noise
    velocityRef.current = velocityRef.current * 0.4 + dx * 0.6;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractingRef.current || !trackRef.current) return;

    isInteractingRef.current = false;
    try {
      trackRef.current.releasePointerCapture(e.pointerId);
    } catch (_) {}

    // Pauses auto-drift temporarily on release for premium reader focus
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 2800);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerUp(e);
  };

  return (
    <section 
      id="reviews" 
      className={`py-14 overflow-hidden relative transition-colors duration-500 border-t border-b ${
        isDarkMode 
          ? "bg-black border-white/5 text-white" 
          : "bg-[#FAF6F0] border-neutral-200 text-neutral-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <svg className="h-5 w-5 flex-shrink-0 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.77-.63-1.19-1.37-1.19-2.09l2.85-2.22c.7-.53 1.14-1.32 1.14-2.2z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 ${
                isDarkMode ? "text-neutral-400" : "text-neutral-500"
              }`}>
                Google Testimonials <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight leading-tight">
              Loved by our Coventry Community
            </h2>
          </div>

          {/* Clean Google Rating Box */}
          <div className={`py-2 px-4 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
            isDarkMode 
              ? "bg-black border-white/10" 
              : "bg-white border-neutral-200/60 shadow-xs"
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold font-sans tracking-tight">4.9</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className={`h-5 w-[1px] ${isDarkMode ? "bg-white/10" : "bg-neutral-200"}`} />
            <a 
              href="https://share.google/UjdQAZ4XO5bOMglQX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-sakura-red hover:underline"
            >
              22 Google Reviews
            </a>
          </div>
        </div>
      </div>

      {/* TRACK CANVAS */}
      <div className="relative w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
        <div 
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          style={{ touchAction: "pan-y", willChange: "transform" }}
          className={`flex gap-6 cursor-grab active:cursor-grabbing select-none w-max pr-6 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {duplicatedReviews.map((review, idx) => {
            const initialLetter = review.name.charAt(0);
            return (
              <div 
                key={`${review.id}-${idx}`}
                className={`w-[290px] sm:w-[330px] md:w-[360px] flex-shrink-0 p-6 rounded-2xl border transition-colors duration-300 flex flex-col justify-between relative ${review.borderColorClass} ${
                  isDarkMode 
                    ? "bg-black border-white/10 shadow-md hover:border-white/20" 
                    : "bg-white border-neutral-200/85 hover:border-neutral-300 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-sans font-semibold text-sm shadow-inner transition-colors duration-300">
                        <div className={`w-full h-full rounded-full flex items-center justify-center text-sm font-bold border transition-colors duration-300 ${
                          isDarkMode 
                            ? "bg-neutral-900 border-white/10 text-sakura-rose" 
                            : "bg-neutral-100 border-neutral-200/80 text-neutral-700"
                        }`}>
                          {initialLetter}
                        </div>
                        
                        {/* Miniature Google verified badge overlay on the bottom-right of initial */}
                        <div className={`absolute -bottom-1 -right-1 rounded-full p-0.5 shadow-xs flex items-center justify-center border ${
                          isDarkMode ? "bg-black border-white/10" : "bg-white border-neutral-100"
                        }`}>
                          <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.77-.63-1.19-1.37-1.19-2.09l2.85-2.22c.7-.53 1.14-1.32 1.14-2.2z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm font-sans tracking-tight leading-tight">
                          {review.name}
                        </h4>
                        <div className="flex gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < review.rating 
                                  ? "fill-amber-400 text-amber-400" 
                                  : "text-neutral-200 dark:text-neutral-800"
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] sm:text-xs font-sans ${isDarkMode ? "text-neutral-500" : "text-neutral-400"}`}>
                      {getRelativeDateString(review.daysAgo)}
                    </span>
                  </div>

                  <p className={`text-[12.5px] font-sans font-light leading-relaxed text-left line-clamp-4 ${
                    isDarkMode ? "text-neutral-300" : "text-neutral-600"
                  }`}>
                    "{review.text}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
