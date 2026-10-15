import React from 'react';
import { Star, TrendingUp, ArrowRight } from 'lucide-react';
import { GadgetCard } from './GadgetCard';

export function BestsellersSection({ products = [], onEnquire, onViewDetail, onExploreAll }) {
  const bestsellers = products.filter((p) => p.is_bestseller).slice(0, 4);

  if (bestsellers.length === 0) return null;

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <div className="section-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} color="#b45309" />
            </div>
            <h2 className="section-title">Bestsellers & Trending</h2>
          </div>
          <p className="section-subtitle">
            Most enquired watches, shoes, and tech devices with verified 4.8+ ratings
          </p>
        </div>

        <button
          type="button"
          className="section-link"
          style={{ background: 'transparent', border: 'none' }}
          onClick={onExploreAll}
        >
          <span>Explore All ({products.length})</span>
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {bestsellers.map((p) => (
          <GadgetCard
            key={`best-${p.id}`}
            product={p}
            onEnquire={onEnquire}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>
    </section>
  );
}
