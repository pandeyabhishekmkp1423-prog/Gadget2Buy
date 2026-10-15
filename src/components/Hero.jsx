import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Zap, Truck, ArrowRight, Star, 
  CheckCircle2, Clock, PhoneCall, MessageCircle, Package 
} from 'lucide-react';

export function Hero({ siteConfig, onExploreDeals, onExploreBestsellers, onQuickEnquire }) {
  // Interactive spotlight items that users can switch between in the hero
  const spotlightItems = [
    {
      id: 10,
      category: 'Jackets',
      name: 'North Face Nuptse 1996 Retro Down Puffer Jacket',
      price: '₹19,990',
      mrp: '₹28,990',
      discount: '31% OFF',
      savings: 'Save ₹9,000',
      image: 'uploads/jacket_1.jpg',
      rating: '4.9',
      reviews: '142 orders',
      tag: 'Winter Bestseller',
      highlight: '700-fill goose down insulation with water-repellent ripstop shell.',
    },
    {
      id: 3,
      category: 'Watches',
      name: 'Apple Watch Ultra 2 (49mm Titanium GPS + Cellular)',
      price: '₹79,900',
      mrp: '₹89,900',
      discount: '11% OFF',
      savings: 'Save ₹10,000',
      image: 'uploads/watch_1.jpg',
      rating: '4.9',
      reviews: '98 orders',
      tag: 'Flagship Timepiece',
      highlight: 'Aerospace-grade titanium case with sapphire crystal glass.',
    },
    {
      id: 8,
      category: 'Shoes',
      name: 'Nike Air Jordan 1 Retro High OG Chicago Edition',
      price: '₹18,499',
      mrp: '₹22,999',
      discount: '20% OFF',
      savings: 'Save ₹4,500',
      image: 'uploads/shoe_1.jpg',
      rating: '5.0',
      reviews: '215 orders',
      tag: 'Iconic Sneaker',
      highlight: 'Full-grain leather with Air-Sole cushioning. 100% verified authentic.',
    },
  ];

  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const activeItem = spotlightItems[activeSpotlightIndex];

  return (
    <section className="hero">
      <div className="container hero-container">
        {/* Left Column: Hero Copy & Value Proposition */}
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={14} color="var(--primary)" />
            <span>Festive Curated Expo • Up to 45% Off</span>
          </div>

          <h1 className="hero-title">
            Luxury Watches, Footwear & Outerwear.{' '}
            <span>At Direct Honest Prices.</span>
          </h1>

          <p className="hero-subtitle">
            Curated collection of 100% verified authentic timepieces, collector sneakers, and winter down jackets. Delivered to your doorstep across India with zero upfront card payment—inspect before you pay.
          </p>

          {/* 3 Core Guarantees Checkmarks */}
          <div className="hero-features-list">
            <div className="hero-feature-row">
              <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
              <span><strong>100% Original Sealed Boxes</strong> with brand warranty and proof of authenticity</span>
            </div>
            <div className="hero-feature-row">
              <CheckCircle2 size={18} color="#2563eb" style={{ flexShrink: 0 }} />
              <span><strong>Zero Card Needed:</strong> Inspect your package at delivery before paying Cash/UPI</span>
            </div>
            <div className="hero-feature-row">
              <CheckCircle2 size={18} color="#d97706" style={{ flexShrink: 0 }} />
              <span><strong>15-Minute Callback Verification:</strong> Speak to our product specialist before dispatch</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="nav-btn primary hero-btn"
              onClick={onExploreDeals}
            >
              <span>Explore Flash Deals (Up to 50% Off)</span>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              className="nav-btn hero-btn secondary"
              onClick={onExploreBestsellers}
            >
              <Star size={16} color="#d97706" fill="#f59e0b" />
              <span>Browse Bestsellers</span>
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="hero-metrics">
            <div className="metric-box">
              <div className="metric-num">4.9 / 5.0</div>
              <div className="metric-lbl">⭐ Verified Buyer Rating</div>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <div className="metric-num">19,000+</div>
              <div className="metric-lbl">🚚 Pin Codes Covered</div>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <div className="metric-num">₹0 Advance</div>
              <div className="metric-lbl">💵 100% Pay on Delivery</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Featured Product Spotlight */}
        <div className="hero-spotlight">
          <div className="spotlight-card">
            {/* Top Badge Strip */}
            <div className="spotlight-header">
              <span className="spotlight-badge">
                <Zap size={13} fill="currentColor" />
                <span>{activeItem.tag}</span>
              </span>
              <span className="spotlight-scarcity">
                <Clock size={13} />
                <span>Only 3 Left at this Price</span>
              </span>
            </div>

            {/* Product Image Stage with Studio Photo */}
            <div className="spotlight-image-stage">
              <img
                src={activeItem.image}
                alt={activeItem.name}
                className="spotlight-img"
              />
              <span className="badge-discount" style={{ top: '0.75rem', left: '0.75rem' }}>
                {activeItem.discount}
              </span>
            </div>

            {/* Spotlight Details */}
            <div className="spotlight-body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span className="spotlight-cat">{activeItem.category}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={13} color="#d97706" fill="#f59e0b" />
                  <strong>{activeItem.rating}</strong> ({activeItem.reviews})
                </span>
              </div>

              <h3 className="spotlight-title">{activeItem.name}</h3>
              <p className="spotlight-desc">{activeItem.highlight}</p>

              {/* Price & Savings */}
              <div className="spotlight-price-row">
                <div>
                  <div className="spotlight-price">{activeItem.price}</div>
                  <div className="spotlight-mrp">MRP <s>{activeItem.mrp}</s></div>
                </div>
                <div className="spotlight-savings-tag">
                  {activeItem.savings}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="nav-btn primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1rem', fontSize: '0.9rem', fontWeight: 800 }}
                onClick={() => {
                  if (onQuickEnquire) {
                    onQuickEnquire({
                      id: activeItem.id,
                      name: activeItem.name,
                      category: activeItem.category,
                      formatted_price: activeItem.price,
                      image_url: activeItem.image,
                    });
                  } else if (onExploreDeals) {
                    onExploreDeals();
                  }
                }}
              >
                <PhoneCall size={16} />
                <span>Book Order via Callback</span>
              </button>
            </div>

            {/* Quick Switcher Tabs */}
            <div className="spotlight-switcher">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginRight: '0.25rem' }}>
                Trending Drops:
              </span>
              {spotlightItems.map((item, idx) => (
                <button
                  key={item.category}
                  type="button"
                  className={`switcher-pill ${idx === activeSpotlightIndex ? 'active' : ''}`}
                  onClick={() => setActiveSpotlightIndex(idx)}
                >
                  {item.category === 'Watches' ? 'Watches' : item.category === 'Shoes' ? 'Footwear' : 'Jackets'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
