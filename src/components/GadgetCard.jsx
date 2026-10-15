import React from 'react';
import { PhoneCall, MessageCircle, Star, Package, Check, ShoppingBag } from 'lucide-react';

export function GadgetCard({ product, onEnquire, onViewDetail }) {
  const {
    id,
    name,
    category,
    formatted_price,
    formatted_mrp,
    discount_percent,
    formatted_savings,
    image_url,
    in_stock,
    is_bestseller,
    is_offer,
    rating,
  } = product;

  // WhatsApp quick link
  const waText = encodeURIComponent(`Hi! I want to enquire about ${name} (${formatted_price}) on Gadget2Buy. Please call or share details.`);
  const waUrl = `https://wa.me/?text=${waText}`;

  return (
    <div className={`card ${!in_stock ? 'out-of-stock' : ''}`}>
      {/* Product Image Stage */}
      <div className="card-image-box" onClick={() => onViewDetail(product)}>
        {image_url && !image_url.includes('placeholder.svg') ? (
          <img src={image_url} alt={name} className="card-img" loading="lazy" />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafc',
              color: 'var(--text-dim)',
            }}
          >
            <ShoppingBag size={42} strokeWidth={1.5} color="var(--primary)" style={{ opacity: 0.7 }} />
            <span style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              {category || 'Gadget2Buy'}
            </span>
          </div>
        )}

        {discount_percent > 0 && in_stock && (
          <span className="badge-discount">{discount_percent}% OFF</span>
        )}

        {is_bestseller && in_stock && (
          <span className="badge-bestseller">Bestseller</span>
        )}

        {!in_stock && (
          <span className="badge-sold-out">Sold Out</span>
        )}
      </div>

      {/* Product Body */}
      <div className="card-body">
        <div className="card-cat-rating">
          <span className="card-cat">{category || 'General'}</span>
          <span className="card-rating">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{rating || '4.8'}</span>
          </span>
        </div>

        <h3 className="card-title" onClick={() => onViewDetail(product)} title={name}>
          {name}
        </h3>

        <div className="card-pricing">
          <span className="price-current price-num">{formatted_price}</span>
          {formatted_mrp && <span className="price-mrp price-num">{formatted_mrp}</span>}
          {formatted_savings && (
            <span className="price-savings">Save {formatted_savings}</span>
          )}
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="btn-enquire"
            onClick={() => onEnquire(product)}
          >
            <PhoneCall size={14} />
            <span>{in_stock ? 'Book / Enquire' : 'Notify Restock'}</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-icon"
            title="Chat on WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
