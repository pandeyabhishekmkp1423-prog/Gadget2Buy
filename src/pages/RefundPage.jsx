import React from 'react';
import { ArrowLeft, RefreshCw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function RefundPage({ onBackToHome }) {
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

        <h1 className="policy-title">Refund & Replacement Policy</h1>
        <div className="policy-meta">
          <span>7-Day Replacement Guarantee</span> &middot; <span>100% Genuine Protection</span>
        </div>

        <div className="policy-content">
          <h3>1. 7-Day Hassle-Free Replacement</h3>
          <p>
            At <strong>Gadget2Buy</strong>, customer confidence is paramount. If you receive an item with any physical transit damage, functional defect, incorrect size (for shoes and jackets), or discrepancy from the listed specifications, you are entitled to a free replacement within <strong>7 days of delivery</strong>.
          </p>

          <h3>2. Eligibility Criteria for Returns & Replacements</h3>
          <ul>
            <li>The product must be in its original condition with all brand tags, outer packaging box, warranty cards, and accessories intact.</li>
            <li>For smartwatches, electronics, and smartphones, devices must not be iCloud/Google locked or modified with unofficial firmware.</li>
            <li>For footwear and apparel, items must be unworn with original protective soles and labels.</li>
          </ul>

          <h3>3. Open-Box Delivery Inspection</h3>
          <p>
            We offer open-box verification with selected courier partners in major metro regions. We encourage customers to inspect the outer seal upon receipt before signing the delivery manifest.
          </p>

          <h3>4. Refund Settlement Timeframes</h3>
          <p>
            In scenarios where an identical replacement model or size variant is out of stock, a full refund will be processed to your original payment method or bank UPI within <strong>3 to 5 business days</strong> following our inspection of the returned package.
          </p>

          <h3>5. How to Initiate a Return</h3>
          <p>
            Simply reach out to our support team on WhatsApp or telephone with your order confirmation number (#G2B-XXXX) and a short photo/video of the issue. Our logistics team will schedule a doorstep reverse pickup at zero additional cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
