import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { assetUrl } from '../utils/assetUrl';

const INITIAL = { name: '', email: '', phone: '', message: '' };
const ERRORS_INIT = { name: '', email: '', phone: '', message: '' };

function validate(form) {
  const errors = { ...ERRORS_INIT };
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email.';
  if (form.phone && !/^\+?[0-9\s\-]{8,15}$/.test(form.phone)) errors.phone = 'Enter a valid phone number.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState(ERRORS_INIT);
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs);
      return;
    }
    // Simulate submission
    setStatus('success');
    setForm(INITIAL);
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputClass = (field) =>
    `w-full bg-brand-card border ${
      errors[field] ? 'border-red-500/60' : 'border-brand-border focus:border-brand-muted'
    } text-white text-sm px-4 py-3.5 outline-none transition-colors placeholder:text-brand-muted/50`;

  return (
    <section id="contact" className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-muted mb-4">Get in Touch</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-white max-w-lg leading-tight">
            We'd Love to<br />
            <em className="not-italic text-brand-muted">Hear from You.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-brand-border p-10 text-center"
              >
                <div className="w-12 h-12 rounded-full border border-brand-muted flex items-center justify-center mx-auto mb-5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">Message Received</h3>
                <p className="text-sm text-brand-muted">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      name="name"
                      type="text"
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                      autoComplete="name"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number (optional)"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass('phone')}
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-brand-black text-sm font-semibold tracking-widest uppercase hover:bg-brand-light transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {[
              {
                label: 'Address',
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
                content: 'The Yercaud Spice Company\nYercaud Hills, Salem District\nTamil Nadu — 636 602, India',
              },
              {
                label: 'Email',
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ),
                content: 'hello@yercaudspice.com',
              },
              {
                label: 'Phone',
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ),
                content: '+91 98765 43210',
              },
              {
                label: 'Hours',
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                content: 'Monday – Saturday\n9:00 AM – 6:00 PM IST\n\nSunday: Closed',
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="text-brand-muted mt-0.5 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-brand-muted mb-1.5">{item.label}</p>
                  <p className="text-sm text-brand-light leading-relaxed whitespace-pre-line">{item.content}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="relative h-48 bg-brand-card border border-brand-border overflow-hidden">
              <img
                src={assetUrl('/photos/mixed-spices.jpg')}
                alt="Yercaud location"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-white text-sm font-medium">Yercaud, Tamil Nadu</p>
                <p className="text-brand-muted text-xs">1,515m · Eastern Ghats</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
