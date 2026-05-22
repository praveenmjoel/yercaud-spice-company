import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="products" className="py-24 lg:py-32 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-muted mb-4">Our Collection</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="font-serif text-4xl lg:text-5xl text-white max-w-md leading-tight">
              Spices of Exceptional<br />
              <em className="not-italic text-brand-muted">Purity</em>
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed max-w-sm">
              Each spice is grown at altitude in the Yercaud highlands,
              harvested by hand, and processed with zero additives.
              Taste the difference purity makes.
            </p>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
          {products.map((product) => (
            <div key={product.id} className="bg-brand-black">
              <ProductCard
                product={product}
                onViewDetail={setSelectedProduct}
              />
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-brand-border"
        >
          {[
            { icon: '⊕', title: '100% Natural', desc: 'No preservatives, no fillers, no artificial colours — ever.' },
            { icon: '◎', title: 'Direct from Farm', desc: 'From our Yercaud highlands directly to your kitchen.' },
            { icon: '⊙', title: 'Free Shipping', desc: 'On all orders above ₹999. Delivered across India.' },
            { icon: '⊗', title: 'Easy Returns', desc: '7-day hassle-free return policy. No questions asked.' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <span className="text-2xl text-brand-muted">{item.icon}</span>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-brand-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
