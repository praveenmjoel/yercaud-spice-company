import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';

export default function ProductCard({ product, onViewDetail }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer bg-brand-card border border-brand-border hover:border-brand-muted/40 transition-all duration-500"
      onClick={() => onViewDetail(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-brand-surface">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white text-brand-black text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
            {product.badge}
          </span>
        )}

        {/* Quick view on hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-xs tracking-widest uppercase text-white bg-brand-black/60 backdrop-blur-sm px-4 py-2">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-serif text-lg text-white leading-tight">{product.name}</h3>
          <p className="text-white font-semibold text-sm flex-shrink-0">₹{product.price}</p>
        </div>

        <p className="text-xs text-brand-muted mb-3 tracking-wide">{product.tagline}</p>

        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-xs text-brand-muted">({product.reviews})</span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
            added
              ? 'bg-white text-brand-black'
              : 'border border-brand-border text-white hover:bg-white hover:text-brand-black hover:border-white'
          }`}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </motion.article>
  );
}
