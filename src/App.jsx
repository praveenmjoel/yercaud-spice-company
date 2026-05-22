import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleConfirm = (data) => {
    setOrderData(data);
    setPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackHome = () => {
    setPage('home');
    setOrderData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-black">
        <Header
          onCartOpen={() => setCartOpen(true)}
          onCheckout={() => setPage('checkout')}
        />

        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.main
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage />
            </motion.main>
          )}

          {page === 'checkout' && (
            <motion.main
              key="checkout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Checkout
                onBack={() => { setPage('home'); setCartOpen(true); }}
                onConfirm={handleConfirm}
              />
            </motion.main>
          )}

          {page === 'confirmation' && (
            <motion.main
              key="confirmation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <OrderConfirmation
                orderData={orderData}
                onContinue={handleBackHome}
              />
            </motion.main>
          )}
        </AnimatePresence>

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setPage('checkout'); }}
        />
      </div>
    </CartProvider>
  );
}
