import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, ArrowRight, Clock, ShieldCheck, ShoppingBag, Package } from 'lucide-react';

export function SuccessPage({ orderData, onContinueShopping }) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1e40af', '#2563eb', '#16a34a', '#f59e0b'],
      });
    } catch (e) {
      // Graceful fallback
    }
  }, []);

  const orderId = orderData?.orderId || `G2B-${Math.floor(100000 + Math.random() * 900000)}`;
  const product = orderData?.product;
  const customerName = orderData?.customerName || 'Valued Customer';
  const phone = orderData?.phone || '';
  const waUrl = orderData?.whatsapp_url;
  const sla = orderData?.sla || 'Within 15–30 minutes during business hours';

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div
        className="animate-scale-up"
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center',
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#dcfce7',
            border: '3px solid #86efac',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 4px 16px rgba(22, 163, 74, 0.2)',
          }}
        >
          <CheckCircle2 size={44} color="#16a34a" strokeWidth={2.5} />
        </div>

        <span
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            background: '#eff6ff',
            color: 'var(--primary)',
            fontSize: '0.8rem',
            fontWeight: 800,
            borderRadius: 'var(--radius-full)',
            marginBottom: '0.75rem',
          }}
        >
          ENQUIRY ORDER #{orderId}
        </span>

        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Enquiry Successfully Placed!
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          Thank you, <strong>{customerName}</strong>! Our product specialist has received your booking request for{' '}
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{product?.name || 'your selected item'}</span>.
        </p>

        {/* Product Snapshot Card */}
        {product && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 1.25rem',
              textAlign: 'left',
              marginBottom: '1.75rem',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src={product.image_url || '/assets/placeholder.svg'}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                {product.category}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.name}
              </div>
              <div className="price-num" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {product.formatted_price}
              </div>
            </div>
          </div>
        )}

        {/* Timeline SLA Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            textAlign: 'left',
            marginBottom: '2rem',
          }}
        >
          <Clock size={28} color="#d97706" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#92400e' }}>
              Next Step: Order Verification Call
            </div>
            <div style={{ fontSize: '0.85rem', color: '#b45309', marginTop: '0.15rem' }}>
              We will call you on <strong>+91 {phone}</strong> ({sla}) to confirm dispatch details.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="form-submit-btn"
              style={{
                background: '#25d366',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
              }}
            >
              <MessageCircle size={20} />
              <span>Connect on WhatsApp for Priority Dispatch</span>
            </a>
          )}

          <button
            type="button"
            className="nav-btn primary"
            onClick={onContinueShopping}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem',
              fontSize: '0.95rem',
            }}
          >
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
            marginTop: '1.75rem',
          }}
        >
          <ShieldCheck size={16} color="#16a34a" />
          <span>No payment charged until delivery is inspected by you.</span>
        </div>
      </div>
    </div>
  );
}
