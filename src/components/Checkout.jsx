import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { assetUrl } from '../utils/assetUrl';

const INITIAL_SHIPPING = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', pincode: '',
};

function validate(form) {
  const e = {};
  if (!form.firstName.trim()) e.firstName = 'Required';
  if (!form.lastName.trim()) e.lastName = 'Required';
  if (!form.email.trim()) e.email = 'Required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
  if (!form.phone.trim()) e.phone = 'Required';
  else if (!/^[0-9\s\+\-]{8,15}$/.test(form.phone)) e.phone = 'Invalid number';
  if (!form.address.trim()) e.address = 'Required';
  if (!form.city.trim()) e.city = 'Required';
  if (!form.state.trim()) e.state = 'Required';
  if (!form.pincode.trim()) e.pincode = 'Required';
  else if (!/^[0-9]{6}$/.test(form.pincode)) e.pincode = '6-digit PIN';
  return e;
}

const STATES = [
  'Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana',
  'Maharashtra', 'Delhi', 'West Bengal', 'Rajasthan', 'Gujarat',
  'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Punjab', 'Other',
];

export default function Checkout({ onBack, onConfirm }) {
  const { cart, subtotal, shipping, tax, total } = useCart();
  const [step, setStep] = useState(1); // 1: shipping, 2: payment
  const [shippingForm, setShippingForm] = useState(INITIAL_SHIPPING);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleShippingNext = (e) => {
    e.preventDefault();
    const errs = validate(shippingForm);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onConfirm({ shippingForm, paymentMethod });
    }, 1600);
  };

  const inputCls = (field) =>
    `w-full bg-brand-card border ${
      errors[field] ? 'border-red-500/60' : 'border-brand-border focus:border-brand-muted'
    } text-white text-sm px-4 py-3 outline-none transition-colors placeholder:text-brand-muted/50`;

  const labelCls = 'text-xs text-brand-muted tracking-wide block mb-1.5';

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={onBack}
            className="text-brand-muted hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Cart
          </button>
          <div className="flex-1 h-px bg-brand-border" />
          <img src={assetUrl('/logo.jpg')} alt="TYSC" className="h-8 rounded-sm" />
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-10">
          {[
            { n: 1, label: 'Shipping' },
            { n: 2, label: 'Payment' },
          ].map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= s.n ? 'bg-white text-brand-black' : 'bg-brand-card text-brand-muted border border-brand-border'
                }`}>
                  {step > s.n ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : s.n}
                </div>
                <span className={`text-sm ${step >= s.n ? 'text-white' : 'text-brand-muted'}`}>{s.label}</span>
              </div>
              {i < 1 && <div className={`flex-1 h-px transition-colors ${step > s.n ? 'bg-white' : 'bg-brand-border'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left — Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleShippingNext}
                  className="space-y-5"
                >
                  <h2 className="font-serif text-2xl text-white mb-6">Shipping Information</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>First Name *</label>
                      <input name="firstName" type="text" placeholder="Arjun" value={shippingForm.firstName} onChange={handleChange} className={inputCls('firstName')} autoComplete="given-name" />
                      {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Last Name *</label>
                      <input name="lastName" type="text" placeholder="Kumar" value={shippingForm.lastName} onChange={handleChange} className={inputCls('lastName')} autoComplete="family-name" />
                      {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Email Address *</label>
                    <input name="email" type="email" placeholder="arjun@example.com" value={shippingForm.email} onChange={handleChange} className={inputCls('email')} autoComplete="email" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className={labelCls}>Phone Number *</label>
                    <input name="phone" type="tel" placeholder="+91 98765 43210" value={shippingForm.phone} onChange={handleChange} className={inputCls('phone')} autoComplete="tel" />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className={labelCls}>Street Address *</label>
                    <input name="address" type="text" placeholder="Flat / House No., Street, Area" value={shippingForm.address} onChange={handleChange} className={inputCls('address')} autoComplete="street-address" />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>City *</label>
                      <input name="city" type="text" placeholder="Chennai" value={shippingForm.city} onChange={handleChange} className={inputCls('city')} autoComplete="address-level2" />
                      {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>PIN Code *</label>
                      <input name="pincode" type="text" placeholder="600001" value={shippingForm.pincode} onChange={handleChange} className={inputCls('pincode')} autoComplete="postal-code" maxLength={6} />
                      {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>State *</label>
                    <select name="state" value={shippingForm.state} onChange={handleChange} className={`${inputCls('state')} bg-brand-card`}>
                      <option value="">Select State</option>
                      {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-brand-black text-sm font-semibold tracking-widest uppercase hover:bg-brand-light transition-colors mt-2"
                  >
                    Continue to Payment →
                  </button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-2xl text-white mb-6">Payment Method</h2>

                  {/* COD */}
                  <label className={`flex items-start gap-4 p-5 border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-white bg-brand-card' : 'border-brand-border hover:border-brand-muted'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="mt-1 accent-white" />
                    <div>
                      <p className="text-white text-sm font-semibold">Cash on Delivery</p>
                      <p className="text-brand-muted text-xs mt-1 leading-relaxed">Pay when your order arrives. Available across India. No extra charges.</p>
                    </div>
                  </label>

                  {/* Online */}
                  <label className={`flex items-start gap-4 p-5 border cursor-pointer transition-colors ${paymentMethod === 'online' ? 'border-white bg-brand-card' : 'border-brand-border hover:border-brand-muted'}`}>
                    <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="mt-1 accent-white" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">Online Payment</p>
                      <p className="text-brand-muted text-xs mt-1 leading-relaxed">UPI, Credit/Debit Card, Net Banking, Wallets. Secure & instant.</p>
                      <div className="flex items-center gap-3 mt-3 flex-wrap">
                        {['UPI', 'VISA', 'Mastercard', 'NetBanking'].map((m) => (
                          <span key={m} className="text-xs border border-brand-border px-2.5 py-1 text-brand-muted">{m}</span>
                        ))}
                      </div>
                      {paymentMethod === 'online' && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-brand-muted mt-3 p-3 bg-brand-surface border border-brand-border"
                        >
                          You will be redirected to our secure payment gateway to complete your transaction.
                        </motion.p>
                      )}
                    </div>
                  </label>

                  {/* Shipping address review */}
                  <div className="border border-brand-border p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs tracking-widest uppercase text-brand-muted">Delivering To</p>
                      <button onClick={() => setStep(1)} className="text-xs text-brand-muted hover:text-white transition-colors underline underline-offset-2">Edit</button>
                    </div>
                    <p className="text-sm text-white">{shippingForm.firstName} {shippingForm.lastName}</p>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">{shippingForm.address}, {shippingForm.city}, {shippingForm.state} — {shippingForm.pincode}</p>
                    <p className="text-xs text-brand-muted">{shippingForm.phone}</p>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    className="w-full py-4 bg-white text-brand-black text-sm font-semibold tracking-widest uppercase hover:bg-brand-light transition-colors disabled:opacity-70"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : 'Place Order'}
                  </button>

                  <p className="text-xs text-brand-muted text-center leading-relaxed">
                    By placing your order, you agree to our Terms & Conditions and Privacy Policy.
                    Your data is secure and never shared.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h3 className="font-serif text-xl text-white mb-5">Order Summary</h3>
              <div className="border border-brand-border divide-y divide-brand-border">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4">
                    <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden bg-brand-card">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 bg-brand-muted text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium leading-tight">{item.name}</p>
                      <p className="text-xs text-brand-muted">{item.weight}</p>
                    </div>
                    <p className="text-sm text-white font-medium flex-shrink-0">₹{item.price * item.quantity}</p>
                  </div>
                ))}

                <div className="p-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal</span><span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-white">Free</span> : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>GST (5%)</span><span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-base pt-2 border-t border-brand-border">
                    <span>Total</span><span>₹{total}</span>
                  </div>
                </div>
              </div>

              {shipping === 0 && (
                <p className="text-xs text-brand-muted text-center mt-3 flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  Free shipping applied
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
