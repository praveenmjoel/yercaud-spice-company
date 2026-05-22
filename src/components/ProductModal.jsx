import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products as allProducts } from '../data/products';
import StarRating from './StarRating';

const REVIEWS = [
  { name: 'Meera S.', rating: 5, text: 'Unbelievably fresh — the aroma fills the whole kitchen the moment you open the pack. Nothing compares to this quality.' },
  { name: 'Arjun R.', rating: 5, text: 'Finally found a spice brand that takes purity seriously. No fillers, no artificial anything. My biryani has never tasted better.' },
  { name: 'Priya K.', rating: 4, text: 'The packaging is elegant and the product is genuinely premium. Will be ordering every month without question.' },
];

export default function ProductModal({ product, onClose }) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const relatedProducts = product.relatedIds
    ? allProducts.filter((p) => product.relatedIds.includes(p.id))
    : [];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="bg-brand-surface w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto hide-scrollbar rounded-none sm:rounded-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <div className="sticky top-0 bg-brand-surface z-10 flex justify-end p-4 border-b border-brand-border">
            <button
              onClick={onClose}
              className="text-brand-muted hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square md:aspect-auto md:min-h-[500px] bg-brand-card overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-white text-brand-black text-[10px] font-bold tracking-widest uppercase px-3 py-1.5">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="p-8 lg:p-10 flex flex-col">
              <p className="text-xs tracking-[0.25em] uppercase text-brand-muted mb-2">{product.weight} · Premium Grade</p>
              <h2 className="font-serif text-3xl text-white mb-1">{product.name}</h2>
              <p className="text-brand-muted text-sm mb-4">{product.tagline}</p>

              <div className="flex items-center gap-3 mb-5">
                <StarRating rating={product.rating} size="md" />
                <span className="text-sm text-brand-muted">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <p className="font-serif text-3xl text-white">₹{product.price}</p>
                <p className="text-xs text-brand-muted">incl. of all taxes</p>
              </div>

              {/* Origin */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-brand-border">
                <svg className="w-4 h-4 text-brand-muted flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-xs text-brand-muted">{product.origin}</p>
              </div>

              {/* Tabs */}
              <div className="flex gap-0 mb-5 border-b border-brand-border">
                {['description', 'benefits', 'purity'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs tracking-widest uppercase pb-3 px-4 transition-colors ${
                      activeTab === tab
                        ? 'text-white border-b-2 border-white -mb-px'
                        : 'text-brand-muted hover:text-brand-light'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[80px] mb-6 text-sm text-brand-light leading-relaxed">
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'benefits' && (
                  <ul className="space-y-2">
                    {product.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-white mt-0.5 flex-shrink-0">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'purity' && (
                  <div className="space-y-3">
                    <p className="text-white">{product.ingredients}</p>
                    <p className="text-brand-muted text-xs">No artificial colours · No preservatives · No additives · Ethically sourced · Direct from farm</p>
                  </div>
                )}
              </div>

              {/* Quantity + Cart */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="flex items-center border border-brand-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-brand-light hover:text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-sm text-white border-x border-brand-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-brand-light hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                    added
                      ? 'bg-white text-brand-black'
                      : 'bg-white text-brand-black hover:bg-brand-light'
                  }`}
                >
                  {added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="border-t border-brand-border p-8 lg:p-10">
            <h3 className="font-serif text-xl text-white mb-6">Customer Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map((review, i) => (
                <div key={i} className="border border-brand-border p-5">
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-brand-light leading-relaxed mt-3 mb-4">{review.text}</p>
                  <p className="text-xs text-brand-muted font-medium tracking-wide">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-brand-border p-8 lg:p-10">
              <h3 className="font-serif text-xl text-white mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-3 gap-4">
                {relatedProducts.slice(0, 3).map((rp) => (
                  <div
                    key={rp.id}
                    className="cursor-pointer group"
                    onClick={() => onClose()}
                  >
                    <div className="aspect-square overflow-hidden mb-2 bg-brand-card">
                      <img
                        src={rp.image}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-xs text-white font-medium">{rp.name}</p>
                    <p className="text-xs text-brand-muted">₹{rp.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
