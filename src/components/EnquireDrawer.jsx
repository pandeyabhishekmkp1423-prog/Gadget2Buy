import React, { useState, useEffect } from 'react';
import { X, PhoneCall, CheckCircle2, AlertCircle, Sparkles, Shield, Clock, MapPin, ShoppingBag } from 'lucide-react';
import { submitEnquiry } from '../api/leads';
import { useToast } from '../context/ToastContext';

export function EnquireDrawer({ product, isOpen, onClose, onSuccess }) {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [interested, setInterested] = useState(1);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot
  const [submitting, setSubmitting] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  // Clean phone input to digits only
  const cleanPhoneDigits = phone.replace(/\D/g, '');
  const isValidIndianPhone = /^[6-9]\d{9}$/.test(cleanPhoneDigits);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Please enter your full name.', 'error');
      return;
    }

    if (!isValidIndianPhone) {
      showToast('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).', 'error');
      setPhoneTouched(true);
      return;
    }

    setSubmitting(true);
    try {
      const fullMessage = [
        product.selectedVariant ? `Variant: ${product.selectedVariant}` : '',
        city ? `Delivery City/Pin: ${city.trim()}` : '',
        message.trim() ? `Note: ${message.trim()}` : '',
      ].filter(Boolean).join(' | ');

      const res = await submitEnquiry({
        product_id: product.id,
        name: name.trim(),
        phone: cleanPhoneDigits,
        interested,
        message: fullMessage,
        website, // Honeypot field
      });

      showToast(res.message || 'Order enquiry confirmed! We will call you shortly.', 'success');
      
      const orderRef = `G2B-${Math.floor(100000 + Math.random() * 900000)}`;

      onSuccess({
        orderId: orderRef,
        product,
        customerName: name.trim(),
        phone: cleanPhoneDigits,
        whatsapp_url: res.data?.whatsapp_url,
        sla: res.data?.sla,
      });

      onClose();
      // Reset form
      setName('');
      setPhone('');
      setCity('');
      setMessage('');
      setPhoneTouched(false);
    } catch (err) {
      showToast(err.message || 'Could not submit enquiry. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={18} color="var(--primary)" />
            <h3>Book Order / Request Callback</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Product Snapshot */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              padding: '0.85rem',
              background: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.25rem',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={product.image_url || '/assets/placeholder.svg'}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--text-main)',
                }}
              >
                {product.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.15rem' }}>
                <span className="price-num" style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.05rem' }}>
                  {product.formatted_price}
                </span>
                {product.selectedVariant && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                    {product.selectedVariant}
                  </span>
                )}
                {product.discount_percent > 0 && (
                  <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700 }}>
                    {product.discount_percent}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Honeypot field */}
            <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <label>
                Leave empty <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex="-1" autoComplete="off" />
              </label>
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="lead-name">Customer Full Name *</label>
              <input
                id="lead-name"
                type="text"
                className="form-input"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={120}
                required
                autoFocus
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label className="form-label" htmlFor="lead-phone" style={{ margin: 0 }}>
                  Mobile Number (For Dispatch Verification) *
                </label>
                {cleanPhoneDigits.length > 0 && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      color: isValidIndianPhone ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {isValidIndianPhone ? (
                      <>
                        <CheckCircle2 size={13} /> Valid 10-digit
                      </>
                    ) : (
                      <>
                        <AlertCircle size={13} /> Enter 10 digits starting 6–9
                      </>
                    )}
                  </span>
                )}
              </div>

              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0.9rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.9rem',
                    color: 'var(--text-dim)',
                    fontWeight: 700,
                  }}
                >
                  +91
                </span>
                <input
                  id="lead-phone"
                  type="tel"
                  inputMode="numeric"
                  className="form-input"
                  style={{ paddingLeft: '3.3rem' }}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneTouched(true);
                  }}
                  maxLength={15}
                  required
                />
              </div>
            </div>

            {/* Delivery Location / City */}
            <div className="form-group">
              <label className="form-label" htmlFor="lead-city">Delivery City & Pincode (Optional)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
                  <MapPin size={16} />
                </span>
                <input
                  id="lead-city"
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="e.g. Mumbai 400001, Delhi 110001"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label" htmlFor="lead-message">Preferred Time to Call / Instructions (Optional)</label>
              <textarea
                id="lead-message"
                className="form-textarea"
                rows="2"
                placeholder="e.g. Please call after 3 PM, check size 9 availability..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
              />
            </div>

            <button type="submit" className="form-submit-btn" disabled={submitting}>
              <PhoneCall size={17} />
              <span>{submitting ? 'Placing Order Enquiry...' : 'Confirm Order Enquiry (Pay on Delivery)'}</span>
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                marginTop: '1rem',
              }}
            >
              <Shield size={13} color="#16a34a" />
              <span>Zero upfront payment • Verified phone confirmation before dispatch</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
