import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

function generateOrderId() {
  return 'TYSC-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function OrderConfirmation({ orderData, onContinue }) {
  const { cart, total, dispatch } = useCart();
  const orderId = React.useRef(generateOrderId()).current;

  const handleContinue = () => {
    dispatch({ type: 'CLEAR_CART' });
    onContinue();
  };

  return (
    <div className="min-h-screen bg-brand-black pt-20 flex items-center">
      <div className="max-w-2xl mx-auto px-6 lg:px-10 py-16 w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full border border-brand-border flex items-center justify-center mx-auto mb-8">
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-brand-muted mb-3">Order Confirmed</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-white mb-3">Thank You.</h1>
            <p className="text-brand-muted text-sm mb-8 leading-relaxed max-w-sm mx-auto">
              Your order has been placed successfully. You'll receive a confirmation email shortly with your order details.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border border-brand-border text-left mb-8"
          >
            <div className="p-5 border-b border-brand-border flex items-center justify-between">
              <div>
                <p className="text-xs text-brand-muted tracking-wide uppercase mb-0.5">Order ID</p>
                <p className="text-white font-mono text-sm">{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-brand-muted tracking-wide uppercase mb-0.5">Payment</p>
                <p className="text-white text-sm capitalize">
                  {orderData?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-brand-border">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 flex-shrink-0 overflow-hidden bg-brand-card">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.name}</p>
                    <p className="text-xs text-brand-muted">Qty: {item.quantity} · {item.weight}</p>
                  </div>
                  <p className="text-sm text-white">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-brand-border flex justify-between items-center">
              <p className="text-sm text-brand-muted">Total Paid</p>
              <p className="font-serif text-xl text-white">₹{total}</p>
            </div>
          </motion.div>

          {/* Shipping info */}
          {orderData?.shippingForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border border-brand-border p-5 text-left mb-8"
            >
              <p className="text-xs tracking-widest uppercase text-brand-muted mb-3">Delivering To</p>
              <p className="text-sm text-white mb-1">
                {orderData.shippingForm.firstName} {orderData.shippingForm.lastName}
              </p>
              <p className="text-xs text-brand-muted leading-relaxed">
                {orderData.shippingForm.address},<br />
                {orderData.shippingForm.city}, {orderData.shippingForm.state} — {orderData.shippingForm.pincode}
              </p>
              <p className="text-xs text-brand-muted mt-2">{orderData.shippingForm.email}</p>
            </motion.div>
          )}

          {/* Estimated Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-brand-surface border border-brand-border p-5 mb-8"
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-brand-muted" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <div>
                <p className="text-white text-sm font-medium">Estimated Delivery</p>
                <p className="text-brand-muted text-xs">3–5 business days · Tracked shipment</p>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={handleContinue}
            className="px-12 py-4 bg-white text-brand-black text-sm font-semibold tracking-widest uppercase hover:bg-brand-light transition-colors"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
