import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TICKER_ITEMS = [
  'HAND-HARVESTED',
  'YERCAUD HILLS',
  '100% NATURAL',
  'NO PRESERVATIVES',
  'ETHICALLY SOURCED',
  '30+ YEARS HERITAGE',
  'PREMIUM QUALITY',
  'DIRECT FROM FARM',
];

export default function Hero({ onShopNow, onExplore }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-brand-black flex flex-col">
      {/* Hero Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left — Text */}
        <div className="relative z-10 flex flex-col justify-center px-6 lg:px-16 xl:px-24 pt-32 pb-20 lg:py-0">
          <motion.div style={{ y: textY }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs tracking-[0.3em] uppercase text-brand-muted mb-6"
            >
              The Yercaud Spice Company · Est. 1992
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="font-serif text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-white mb-6"
            >
              Naturally
              <br />
              <em className="not-italic text-brand-muted">Vibrant.</em>
              <br />
              Purely
              <br />
              <em className="not-italic text-brand-muted">Authentic.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-brand-light text-base lg:text-lg leading-relaxed max-w-sm mb-10 font-light"
            >
              Premium spices hand-harvested from the misty highlands of Yercaud,
              Tamil Nadu — at 1,515 metres above sea level.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => handleScroll('#products')}
                className="px-8 py-3.5 bg-white text-brand-black text-sm font-semibold tracking-widest uppercase hover:bg-brand-light transition-colors duration-300"
              >
                Shop Now
              </button>
              <button
                onClick={() => handleScroll('#about')}
                className="px-8 py-3.5 border border-brand-border text-white text-sm font-medium tracking-widest uppercase hover:border-brand-muted transition-colors duration-300"
              >
                Our Story
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex gap-8 mt-14 pt-8 border-t border-brand-border"
            >
              {[
                { value: '30+', label: 'Years of Heritage' },
                { value: '100%', label: 'Natural & Pure' },
                { value: '8', label: 'Premium Spices' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl text-white">{stat.value}</p>
                  <p className="text-xs text-brand-muted tracking-wider uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right — Images */}
        <div className="hidden lg:block relative overflow-hidden">
          <motion.div style={{ y: imgY }} className="absolute inset-0">
            <img
              src="/photos/black-pepper.jpg"
              alt="Premium Black Pepper from Yercaud"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-brand-black/80" />
          </motion.div>
        </div>

        {/* Mobile hero image */}
        <div className="lg:hidden absolute inset-0 z-0">
          <img
            src="/photos/mixed-spices.jpg"
            alt="Premium spices"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/40" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-brand-muted">Scroll</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-brand-muted to-transparent"
        />
      </motion.div>

      {/* Ticker */}
      <div className="relative z-10 border-t border-brand-border bg-brand-surface py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8 text-xs tracking-[0.25em] uppercase text-brand-muted">
              {item}
              <span className="w-1 h-1 rounded-full bg-brand-border flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
