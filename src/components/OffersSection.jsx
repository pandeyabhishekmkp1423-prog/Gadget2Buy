import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { GadgetCard } from './GadgetCard';

export function OffersSection({ products = [], onEnquire, onViewDetail }) {
  // 6 hour live countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const offerProducts = products.filter((p) => p.is_offer || p.discount_percent >= 15).slice(0, 4);

  if (offerProducts.length === 0) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Header with live timer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #dbeafe',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                background: '#dc2626',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
              }}
            >
              <Flame size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Special Flash Offers
                </h2>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#fee2e2', color: '#dc2626', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  UP TO 45% OFF
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Limited inventory deals on luxury watches, sneakers, and tech
              </div>
            </div>
          </div>

          {/* Countdown Clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', border: '1px solid #bfdbfe', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)' }}>
            <Clock size={16} color="#d97706" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Offers End In:</span>
            <span className="price-num" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#dc2626' }}>
              {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
            </span>
          </div>
        </div>

        {/* Offer Cards Grid */}
        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {offerProducts.map((p) => (
            <GadgetCard
              key={`offer-${p.id}`}
              product={p}
              onEnquire={onEnquire}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
