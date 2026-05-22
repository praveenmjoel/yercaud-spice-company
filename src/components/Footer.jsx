import React from 'react';
import { assetUrl } from '../utils/assetUrl';

const LINKS = {
  Shop: ['Black Pepper', 'Green Cardamom', 'Ceylon Cinnamon', 'Cloves', 'Star Anise', 'Raw Turmeric'],
  Company: ['Our Story', 'Heritage', 'Sustainability', 'Blog'],
  Support: ['Contact Us', 'FAQ', 'Shipping Policy', 'Return Policy', 'Privacy Policy'],
};

export default function Footer({ onNavClick }) {
  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src={assetUrl('/logo.jpg')} alt="The Yercaud Spice Company" className="h-14 w-auto rounded-sm mb-5" />
            <p className="text-xs text-brand-muted leading-relaxed max-w-[200px]">
              Premium spices from the highland farms of Yercaud, Tamil Nadu.
              Pure. Authentic. Exceptional.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs tracking-[0.25em] uppercase text-white mb-5 font-medium">{category}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => onNavClick && onNavClick(link)}
                      className="text-xs text-brand-muted hover:text-white transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} The Yercaud Spice Company. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-brand-muted">Made with care in Tamil Nadu, India</p>
            <div className="flex items-center gap-3">
              {['🌿', '♻️', '🏔️'].map((emoji, i) => (
                <span key={i} className="text-sm">{emoji}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
