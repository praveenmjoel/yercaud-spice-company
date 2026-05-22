import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { cart, dispatch, totalItems, subtotal, shipping, tax, total } = useCart();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const updateQty = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const remove = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-brand-surface flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
              <div>
                <h2 className="font-serif text-xl text-white">Your Cart</h2>
                <p className="text-xs text-brand-muted mt-0.5">
                  {totalItems === 0 ? 'Empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-brand-muted hover:text-white transition-colors p-1"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {cart.items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-card flex items-center justify-center">
                    <svg className="w-8 h-8 text-brand-muted" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                  <p className="font-serif text-xl text-white">Your cart is empty</p>
                  <p className="text-sm text-brand-muted">Add some exceptional spices to get started.</p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-8 py-3 border border-brand-border text-white text-xs tracking-widest uppercase hover:border-brand-muted transition-colors"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <ul className="divide-y divide-brand-border">
                  {cart.items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-5"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-brand-card">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-base text-white leading-tight">{item.name}</h3>
                          <button
                            onClick={() => remove(item.id)}
                            className="text-brand-muted hover:text-white transition-colors flex-shrink-0 ml-1"
                            aria-label={`Remove ${item.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-brand-muted mb-3">{item.weight}</p>

                        <div className="flex items-center justify-between">
                          {/* Qty */}
                          <div className="flex items-center border border-brand-border">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-white transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center text-xs text-white border-x border-brand-border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-white transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-white">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer — Totals + CTA */}
            {cart.items.length > 0 && (
              <div className="border-t border-brand-border p-6 space-y-4">
                {/* Free shipping banner */}
                {subtotal < 999 && (
                  <div className="bg-brand-card px-4 py-3 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-0.5 bg-brand-border overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(subtotal / 999) * 100}%` }}
                          className="h-full bg-white"
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-xs text-brand-muted mt-1.5">
                        Add ₹{999 - subtotal} more for free shipping
                      </p>
                    </div>
                  </div>
                )}
                {subtotal >= 999 && (
                  <div className="bg-brand-card px-4 py-2 text-xs text-white text-center">
                    🎉 You've unlocked free shipping!
                  </div>
                )}

                {/* Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold pt-2 border-t border-brand-border">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => { onClose(); onCheckout(); }}
                  className="w-full py-4 bg-white text-brand-black text-sm font-semibold tracking-widest uppercase hover:bg-brand-light transition-colors"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs text-brand-muted hover:text-white transition-colors tracking-widest uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
