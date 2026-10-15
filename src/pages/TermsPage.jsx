import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export function TermsPage({ onBackToHome }) {
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

        <h1 className="policy-title">Terms & Conditions</h1>
        <div className="policy-meta">
          <span>Last Updated: October 2026</span> &middot; <span>Effective Immediately</span>
        </div>

        <div className="policy-content">
          <h3>1. Overview & Service Scope</h3>
          <p>
            Welcome to <strong>Gadget2Buy</strong>. We provide an online curated showcase of premium gadgets, watches, footwear, jackets, and electronics. Our platform enables customers to discover products at competitive prices, review verified details, and submit callback purchase enquiries.
          </p>

          <h3>2. Order Enquiry & Verification</h3>
          <p>
            Submitting a callback request on Gadget2Buy constitutes an enquiry rather than an automatic card charge. To ensure customer protection and eliminate fraudulent orders:
          </p>
          <ul>
            <li>Our executive will contact you via telephone or WhatsApp at your verified 10-digit mobile number within our designated SLA.</li>
            <li>Product availability, sizing/color preferences, delivery address, and final invoice amounts are confirmed during the callback.</li>
            <li>No advance payment is required for standard delivery unless explicitly arranged for high-tier custom imports.</li>
          </ul>

          <h3>3. Pricing & Product Accuracy</h3>
          <p>
            All prices are stated in Indian Rupees (₹) and include applicable taxes unless stated otherwise. While we strive to maintain complete pricing accuracy, in the event of an inadvertent typographical error, we reserve the right to correct the price before dispatch confirmation.
          </p>

          <h3>4. Dispatch & Delivery Timelines</h3>
          <p>
            Orders confirmed during phone verification are typically dispatched within 24 to 48 business hours via insured courier partners (Bluedart, Delhivery, or DTDC). Estimated transit duration is 2–5 business days depending on delivery pincode.
          </p>

          <h3>5. Customer Privacy & Communication</h3>
          <p>
            Your contact information is strictly utilized for processing your specific product enquiry, order updates, and warranty support. We enforce a zero-spam policy and never sell customer data to third-party marketing brokers.
          </p>
        </div>
      </div>
    </div>
  );
}
