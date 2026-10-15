import React from 'react';
import { X, PhoneCall, MessageCircle, ShieldCheck, Tag, AlertCircle } from 'lucide-react';

export function ProductDetailModal({ product, isOpen, onClose, onEnquire }) {
  if (!isOpen || !product) return null;

  const {
    name,
    category,
    formatted_price,
    formatted_mrp,
    discount_percent,
    formatted_savings,
    description,
    image_url,
    in_stock,
    whatsapp_link,
  } = product;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)' }}>
              {category || 'Gadget Overview'}
            </span>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Main Photo Banner */}
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#0f172a',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {image_url && !image_url.includes('placeholder.svg') ? (
              <img src={image_url} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <div style={{ color: 'var(--text-dim)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Gadget2Buy Verified Item</span>
              </div>
            )}
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.75rem' }}>
            {name}
          </h2>

          {/* Pricing Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              padding: '0.85rem 1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.25rem',
            }}
          >
            <span className="price-num" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {formatted_price}
            </span>
            {formatted_mrp && (
              <span className="price-num" style={{ fontSize: '1.1rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                {formatted_mrp}
              </span>
            )}
            {discount_percent > 0 && (
              <span
                style={{
                  marginLeft: 'auto',
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {discount_percent}% OFF ({formatted_savings ? `Save ${formatted_savings}` : ''})
              </span>
            )}
          </div>

          {/* Sold out notice */}
          {!in_stock && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: '#fbbf24',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>This product is currently out of stock. You can still leave your number to receive a priority restock notification.</span>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Description & Specifications
            </h4>
            <div style={{ color: 'var(--text-main)', fontSize: '0.925rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {description || 'No detailed specifications provided.'}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'grid', gridTemplateColumns: whatsapp_link ? '1fr 1fr' : '1fr', gap: '0.75rem' }}>
            <button
              type="button"
              className="form-submit-btn"
              onClick={() => {
                onClose();
                onEnquire(product);
              }}
            >
              <PhoneCall size={17} />
              <span>{in_stock ? 'Request Callback' : 'Notify Restock'}</span>
            </button>

            {whatsapp_link && (
              <a
                href={whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="form-submit-btn"
                style={{
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid var(--whatsapp)',
                  color: 'var(--whatsapp)',
                  boxShadow: 'none',
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp Enquiry</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
