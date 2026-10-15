import React from 'react';
import { ArrowLeft, Lock, Shield } from 'lucide-react';

export function PrivacyPage({ onBackToHome }) {
  return (
    <div className="container">
      <div className="policy-page animate-fade-in">
        <button
          onClick={onBackToHome}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--primary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.875rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Store</span>
        </button>

        <h1 className="policy-title">Privacy & Data Security Policy</h1>
        <div className="policy-meta">
          <span>Your Privacy is Guaranteed</span> &middot; <span>Zero Third-Party Sharing</span>
        </div>

        <div className="policy-content">
          <h3>1. Information We Collect</h3>
          <p>
            When you request a product callback or place an enquiry on <strong>Gadget2Buy</strong>, we collect your name, 10-digit mobile phone number, delivery address/city, and any specific notes or questions you provide.
          </p>

          <h3>2. How Your Information is Utilized</h3>
          <p>
            Your details are used solely to:
          </p>
          <ul>
            <li>Contact you via telephone or WhatsApp regarding the gadget or apparel you enquired about.</li>
            <li>Confirm dispatch address, sizing, and invoice details.</li>
            <li>Facilitate delivery with our registered courier partners.</li>
            <li>Provide warranty service and exchange support.</li>
          </ul>

          <h3>3. Zero Spam & Data Confidentiality Guarantee</h3>
          <p>
            We adhere to strict data ethics. We <strong>never</strong> sell, lease, rent, or distribute your personal phone number or email address to third-party telemarketers or advertisers. Communication is restricted exclusively to your explicit requests on Gadget2Buy.
          </p>

          <h3>4. Data Storage & Protection</h3>
          <p>
            All data transmitted on Gadget2Buy is protected via 256-bit SSL encryption. Administrative access to enquiry leads is guarded by multi-layer authentication, IP rate limiting, and encrypted credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
