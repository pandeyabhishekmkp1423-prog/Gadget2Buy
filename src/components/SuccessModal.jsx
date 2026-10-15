import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export function SuccessModal({ data, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6'],
        });
      } catch (e) {
        // Fallback gracefully if canvas is blocked
      }
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const { product, customerName, phone, whatsapp_url, sla } = data;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
        <div className="modal-body" style={{ padding: '2.5rem 1.75rem' }}>
          {/* Success Ring Icon */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.25)',
            }}
          >
            <CheckCircle2 size={38} color="var(--success)" strokeWidth={2.2} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
            Callback Request Received!
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Thanks, <strong>{customerName}</strong>! Our gadget consultant has received your interest for{' '}
            <span style={{ color: '#a5b4fc', fontWeight: 600 }}>{product?.name}</span>.
          </p>

          {/* Timeline SLA Box */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <Clock size={24} color="#fbbf24" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Estimated Callback</div>
              <div style={{ color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                {sla || 'Within 15–30 minutes on +91 ' + phone}
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {whatsapp_url && (
              <a
                href={whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="form-submit-btn"
                style={{
                  background: 'var(--whatsapp)',
                  color: 'white',
                  boxShadow: '0 4px 14px var(--whatsapp-glow)',
                }}
              >
                <MessageCircle size={18} />
                <span>Message on WhatsApp Now</span>
              </a>
            )}

            <button
              type="button"
              className="nav-btn"
              onClick={onClose}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.75rem',
                fontSize: '0.95rem',
              }}
            >
              <span>Explore More Gadgets</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
              marginTop: '1.5rem',
            }}
          >
            <ShieldCheck size={14} color="var(--success)" />
            <span>Guaranteed best price match upon callback</span>
          </div>
        </div>
      </div>
    </div>
  );
}
