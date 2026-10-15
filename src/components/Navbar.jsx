import React from 'react';
import { ShoppingBag, Search, X, MessageCircle, Phone } from 'lucide-react';

export function Navbar({ 
  siteConfig, 
  onNavigate, 
  searchQuery, 
  onSearchChange, 
  currentCategory, 
  onSelectCategory 
}) {
  const phone = siteConfig?.phone || '+91 9876543210';
  const telUrl = siteConfig?.tel_url || `tel:+91${phone.replace(/\D/g, '')}`;
  const waUrl = siteConfig?.wa_url || `https://wa.me/919876543210?text=${encodeURIComponent('Hi Gadget2Buy! I want to enquire about products on your store.')}`;

  // Clean, professional categories WITHOUT emojis
  const navCategories = [
    { name: 'Watches', label: 'Watches' },
    { name: 'Shoes', label: 'Shoes' },
    { name: 'Jackets', label: 'Jackets' },
    { name: 'Smartphones', label: 'Smartphones' },
    { name: 'Audio', label: 'Audio' },
    { name: 'Accessories', label: 'Accessories' },
  ];

  return (
    <header className="navbar">
      {/* Sleek, Minimal Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <div className="announcement-text">
            Free Express Delivery &middot; Cash on Delivery Available &middot; 7-Day Doorstep Replacement
          </div>
          <div className="announcement-links">
            <a href={telUrl} style={{ color: '#ffffff', textDecoration: 'none' }}>
              Helpline: {phone}
            </a>
            <span style={{ opacity: 0.4 }}>|</span>
            <span 
              style={{ cursor: 'pointer', textDecoration: 'underline' }} 
              onClick={() => onNavigate('refund')}
            >
              Returns
            </span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span 
              style={{ cursor: 'pointer', textDecoration: 'underline' }} 
              onClick={() => onNavigate('terms')}
            >
              Terms
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container nav-inner">
        {/* Brand Logo - Minimal and Elegant */}
        <div
          onClick={() => {
            if (onSelectCategory) onSelectCategory('');
            onNavigate('home');
          }}
          className="brand-link"
          style={{ cursor: 'pointer' }}
          title="Gadget2Buy Home"
        >
          <span className="brand-badge">
            <ShoppingBag size={18} />
          </span>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.03em' }}>
            Gadget2Buy
          </span>
        </div>

        {/* Integrated Clean Search Bar */}
        <div className="nav-search">
          <div style={{ position: 'relative', width: '100%' }}>
            <Search 
              size={16} 
              style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', pointerEvents: 'none' }} 
            />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => {
                if (onSearchChange) onSearchChange(e.target.value);
                onNavigate('home');
              }}
              placeholder="Search products, brands, or categories..."
              style={{
                width: '100%',
                padding: '0.6rem 2rem 0.6rem 2.3rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-medium)',
                background: '#f8fafc',
                color: 'var(--text-main)',
                outline: 'none',
                transition: 'all 150ms ease',
              }}
              onFocus={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.12)';
              }}
              onBlur={(e) => {
                e.target.style.background = '#f8fafc';
                e.target.style.borderColor = 'var(--border-medium)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange && onSearchChange('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px',
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Minimal Customer Actions - ZERO ADMIN DISCLOSURE */}
        <div className="nav-actions">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn whatsapp"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={15} />
            <span className="nav-btn-text">WhatsApp</span>
          </a>

          <a
            href={telUrl}
            className="nav-btn primary"
            title="Call Helpline"
          >
            <Phone size={14} />
            <span className="nav-btn-text">Call Us</span>
          </a>
        </div>
      </div>

      {/* Clean Category Navigation Strip - NO EMOJIS */}
      <div className="sub-nav">
        <div className="container sub-nav-links">
          <span
            className={`sub-nav-item ${currentCategory === '' ? 'active' : ''}`}
            onClick={() => {
              if (onSelectCategory) onSelectCategory('');
              onNavigate('home');
            }}
          >
            All Products
          </span>
          {navCategories.map((c) => (
            <span
              key={c.name}
              className={`sub-nav-item ${currentCategory === c.name ? 'active' : ''}`}
              onClick={() => {
                if (onSelectCategory) onSelectCategory(c.name);
                onNavigate('home');
              }}
            >
              {c.label}
            </span>
          ))}

          <span
            className="sub-nav-item sub-nav-tagline"
            onClick={() => onNavigate('terms')}
          >
            Zero Card Needed &middot; Pay on Delivery
          </span>
        </div>
      </div>
    </header>
  );
}
