import React from 'react';
import { 
  ShoppingBag, ShieldCheck, RefreshCw, Truck, PhoneCall, 
  MessageCircle, Heart, CheckCircle2, Clock, HelpCircle 
} from 'lucide-react';

export function Footer({ siteConfig, onAdminClick, onNavigate, onSelectCategory }) {
  const phone = siteConfig?.phone || '+91 9876543210';
  const telUrl = siteConfig?.tel_url || `tel:+91${phone.replace(/\D/g, '')}`;
  const waUrl = siteConfig?.wa_url || `https://wa.me/919876543210?text=${encodeURIComponent('Hi Gadget2Buy! I want to enquire about products on your store.')}`;

  const quickCats = ['Watches', 'Shoes', 'Jackets', 'Smartphones', 'Audio', 'Accessories'];

  return (
    <footer style={{ marginTop: 'auto', background: '#ffffff', borderTop: '1px solid var(--border-subtle)' }}>
      {/* Trust Badges Ribbon */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)', padding: '2rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={24} color="var(--primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.925rem', color: 'var(--text-main)' }}>100% Genuine Sealed</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified authentic items only</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <RefreshCw size={24} color="var(--primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.925rem', color: 'var(--text-main)' }}>7-Day Easy Replacement</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Doorstep exchange guarantee</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={24} color="var(--primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.925rem', color: 'var(--text-main)' }}>Safe Insured Delivery</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bluedart & Delhivery express</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <PhoneCall size={24} color="var(--primary)" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.925rem', color: 'var(--text-main)' }}>Pay on Delivery / Call</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No advance card required</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container" style={{ padding: '3.5rem 1.25rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.85rem' }}>
              <span className="brand-badge" style={{ width: '2.1rem', height: '2.1rem' }}>
                <ShoppingBag size={17} />
              </span>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                {siteConfig?.site_name || 'Gadget2Buy'}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.15rem' }}>
              India’s trusted direct store for luxury watches, collector sneakers, winter down jackets, and premium tech. Assisted callback ordering with cash or UPI on delivery.
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>📞 Helpline: <strong style={{ color: 'var(--text-main)' }}>{phone}</strong></div>
              <div>⚡ Verification: <span style={{ color: '#16a34a', fontWeight: 600 }}>15-min human callback</span></div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.1rem' }}>
              Curated Collections
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {quickCats.map((c) => (
                <span
                  key={c}
                  style={{ cursor: 'pointer', transition: 'color 150ms' }}
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory(c);
                    onNavigate('home');
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
                >
                  {c === 'Watches' ? '⌚ Luxury Watches' : c === 'Shoes' ? '👟 Footwear & Sneakers' : c === 'Jackets' ? '🧥 Winter Jackets' : `${c} Collection`}
                </span>
              ))}
            </div>
          </div>

          {/* Customer Policies & Pages */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.1rem' }}>
              Customer Assurance
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('terms')}>
                Terms & Conditions
              </span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('refund')}>
                7-Day Refund & Replacement
              </span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('privacy')}>
                Privacy & Data Security
              </span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('terms')}>
                How Zero-Card COD Works
              </span>
            </div>
          </div>

          {/* Customer Support & Assisted Shopping - ZERO ADMIN MENTION */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.1rem' }}>
              Order & Sizing Help
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Need assistance selecting shoe size, jacket fit, or watch wrist dimensions? Our specialists are available 7 days a week.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn whatsapp"
                style={{ width: '100%', justifyContent: 'center', padding: '0.65rem 1rem', fontWeight: 700 }}
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={telUrl}
                className="nav-btn"
                style={{ width: '100%', justifyContent: 'center', padding: '0.65rem 1rem', fontWeight: 700, borderColor: 'var(--border-medium)' }}
              >
                <PhoneCall size={14} color="var(--primary)" />
                <span>Call {phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.825rem', color: 'var(--text-dim)' }}>
          <div>
            &copy; {new Date().getFullYear()} {siteConfig?.site_name || 'Gadget2Buy'}. All rights reserved. Built for smart shoppers.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('privacy')}>Privacy Policy</span>
            <span>&middot;</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('terms')}>Terms of Service</span>
            <span>&middot;</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('refund')}>7-Day Return Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
