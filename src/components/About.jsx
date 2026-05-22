import React from 'react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    label: '100% Natural',
    desc: 'No preservatives. No artificial colours. No additives. Ever.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    label: '30+ Years Heritage',
    desc: 'Three decades of farming the highlands of Yercaud with care and respect for the land.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Ethically Sourced',
    desc: 'Fair wages, sustainable harvesting, and a deep commitment to the farming community.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    label: 'Altitude Grown',
    desc: 'Every spice grown at 1,515m in the Eastern Ghats — where cooler air produces richer, more complex flavours.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="bg-brand-surface">
      {/* Story Block */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-brand-muted mb-5">Our Story</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-8">
              Born in the Mist<br />
              <em className="not-italic text-brand-muted">of Yercaud.</em>
            </h2>

            <div className="space-y-5 text-brand-light text-sm leading-loose">
              <p>
                Nestled at 1,515 metres in the Eastern Ghats of Tamil Nadu, the hill town of
                Yercaud has been our home for over thirty years. Here, cooler temperatures,
                rich laterite soil, and consistent highland mist create the perfect conditions
                for spices of extraordinary depth and purity.
              </p>
              <p>
                The Yercaud Spice Company was founded on a simple but unwavering belief:
                that great food begins with great ingredients. We grow, harvest, and
                process every single spice ourselves — with no middlemen, no compromises,
                and absolutely no additives.
              </p>
              <p>
                What you receive is not a commodity. It is the result of decades of
                knowledge, passed down through generations of farmers who understand the
                land, respect its rhythms, and take immense pride in what they grow.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-brand-border grid grid-cols-3 gap-6">
              {[
                { n: '1992', l: 'Founded' },
                { n: '8+', l: 'Spice Varieties' },
                { n: '1515m', l: 'Altitude Grown' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-serif text-2xl text-white">{s.n}</p>
                  <p className="text-xs text-brand-muted tracking-wider uppercase mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/photos/mixed-spices.jpg"
                  alt="A collection of Yercaud spices"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col gap-3 pt-8">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/photos/turmeric.jpg"
                    alt="Raw Turmeric from Yercaud"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="/photos/bay-leaves.jpg"
                    alt="Bay Leaves"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pillars */}
      <div className="border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-brand-border">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="px-8 py-8 lg:py-0 first:pl-0 last:pr-0"
            >
              <div className="text-brand-muted mb-4">{pillar.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-2 tracking-wide">{pillar.label}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-width image banner */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src="/photos/cinnamon.jpg"
          alt="Ceylon Cinnamon sticks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-black/60 flex items-center justify-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center px-6"
          >
            <p className="font-serif text-2xl md:text-4xl text-white italic max-w-2xl leading-snug">
              "The spice you smell is the story of the mountain it came from."
            </p>
            <p className="text-brand-muted text-xs tracking-[0.25em] uppercase mt-4">
              — The Yercaud Spice Company
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
