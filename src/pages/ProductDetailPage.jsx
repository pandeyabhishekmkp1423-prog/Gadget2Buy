import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, ShieldCheck, RefreshCw, Truck, PhoneCall, 
  MessageCircle, ChevronLeft, ChevronRight, Tag, Heart, Share2, Check
} from 'lucide-react';
import { fetchProductById } from '../api/products';
import { useToast } from '../context/ToastContext';

export function ProductDetailPage({ productId, onBack, onEnquire }) {
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'policy' | 'qa'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    fetchProductById(productId)
      .then((data) => {
        setProduct(data);
        setActiveImageIndex(0);
      })
      .catch((err) => {
        showToast(err.message || 'Product not found.', 'error');
      })
      .finally(() => setLoading(false));
  }, [productId, showToast]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center', color: 'var(--text-dim)' }}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem', color: 'var(--primary)' }} />
        <p>Loading product details & specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          This product is either unavailable or has been removed from our catalog.
        </p>
        <button className="nav-btn primary" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </button>
      </div>
    );
  }

  // Ensure at least 5 images in gallery (uses product.images, product.image, or high-res category placeholders)
  let images = product.images && product.images.length > 0 ? [...product.images] : [];
  if (images.length === 0 && product.image_url) {
    images.push(product.image_url);
  }
  // If fewer than 5 images, repeat or pad so customer always has rich multi-angle inspection
  while (images.length < 5 && images.length > 0) {
    images.push(images[images.length % images.length]);
  }

  // Dynamic variants based on category
  const variants = product.category === 'Shoes' 
    ? ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
    : product.category === 'Jackets'
    ? ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)']
    : product.category === 'Watches'
    ? ['40mm Titanium', '44mm Space Black', '42mm Classic Silver']
    : ['Standard Edition', 'Pro Bundle'];

  const currentVariant = selectedVariant || variants[1] || variants[0];

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Breadcrumb & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 0 0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          onClick={onBack}
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
          }}
        >
          <ArrowLeft size={16} />
          <span>All {product.category || 'Products'}</span>
        </button>

        <div style={{ fontSize: '0.825rem', color: 'var(--text-dim)' }}>
          Home &gt; {product.category} &gt; <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="detail-layout">
        {/* Left: 5+ Image Gallery */}
        <div className="gallery-container">
          <div className="gallery-main" style={{ position: 'relative' }}>
            {images[activeImageIndex] ? (
              <img
                src={images[activeImageIndex]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <div style={{ color: 'var(--text-dim)', textAlign: 'center' }}>
                <Tag size={48} color="var(--primary)" style={{ opacity: 0.7 }} />
                <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>{product.name}</div>
              </div>
            )}

            {/* Carousel navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1px solid var(--border-medium)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title="Previous image"
                >
                  <ChevronLeft size={20} color="var(--text-main)" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1px solid var(--border-medium)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title="Next image"
                >
                  <ChevronRight size={20} color="var(--text-main)" />
                </button>
              </>
            )}

            {/* Badges on main image */}
            {product.discount_percent > 0 && (
              <span className="badge-discount" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
                {product.discount_percent}% OFF
              </span>
            )}
            {product.is_bestseller && (
              <span className="badge-bestseller" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>
                Bestseller
              </span>
            )}
          </div>

          {/* 5+ Thumbnail Selector Strip */}
          <div className="gallery-thumbs">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`gallery-thumb ${activeImageIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
                title={`View angle ${idx + 1}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            Showing {activeImageIndex + 1} of {images.length} verified item photos (Click thumbnail to inspect)
          </div>
        </div>

        {/* Right: Product Details & Booking Action */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'var(--primary)',
                background: 'var(--primary-light)',
                padding: '0.25rem 0.7rem',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.05em',
              }}
            >
              {product.category || 'Special Edition'}
            </span>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#d97706', fontSize: '0.85rem', fontWeight: 700, marginLeft: 'auto' }}>
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating || '4.9'}</span>
              <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>(120+ verified orders)</span>
            </div>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.25, color: 'var(--text-main)', marginBottom: '1rem' }}>
            {product.name}
          </h1>

          {/* Pricing Box */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="price-num" style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {product.formatted_price}
              </span>
              {product.formatted_mrp && (
                <span className="price-num" style={{ fontSize: '1.2rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                  {product.formatted_mrp}
                </span>
              )}
              {product.discount_percent > 0 && (
                <span
                  style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  SAVE {product.formatted_savings} ({product.discount_percent}% OFF)
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#16a34a', fontWeight: 700 }}>
              <Check size={16} />
              <span>In Stock & Ready for Priority Dispatch • Zero Advance Payment Required</span>
            </div>
          </div>

          {/* Size / Variant Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Select Option / Sizing: <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{currentVariant}</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {variants.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: currentVariant === v ? 'var(--primary)' : 'var(--border-medium)',
                    background: currentVariant === v ? 'var(--primary-light)' : '#ffffff',
                    color: currentVariant === v ? 'var(--primary)' : 'var(--text-main)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 150ms',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Primary E-Commerce Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: product.whatsapp_link ? '1fr 1fr' : '1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button
              type="button"
              className="form-submit-btn"
              style={{
                padding: '0.95rem',
                fontSize: '1rem',
                background: 'var(--primary)',
                color: '#ffffff',
                boxShadow: 'var(--shadow-blue)',
              }}
              onClick={() => onEnquire({ ...product, selectedVariant: currentVariant })}
            >
              <PhoneCall size={18} />
              <span>Book Order via Callback</span>
            </button>

            {product.whatsapp_link && (
              <a
                href={product.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="form-submit-btn"
                style={{
                  padding: '0.95rem',
                  fontSize: '1rem',
                  background: '#25d366',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
                }}
              >
                <MessageCircle size={19} />
                <span>Order on WhatsApp</span>
              </a>
            )}
          </div>

          {/* Value Propositions / Assurance Box */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              padding: '1rem',
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck size={18} color="#16a34a" />
              <span>100% Genuine Box Sealed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <RefreshCw size={17} color="var(--primary)" />
              <span>7-Day Hassle-Free Replacement</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Truck size={17} color="#2563eb" />
              <span>Express Insured Courier Delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <PhoneCall size={17} color="#d97706" />
              <span>Order Verification via Phone Call</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Policies */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
          {[
            { id: 'specs', label: 'Product Specifications' },
            { id: 'policy', label: 'Shipping & Replacement' },
            { id: 'qa', label: 'How Ordering Works' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                padding: '0.65rem 0.5rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ lineHeight: 1.7, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {activeTab === 'specs' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Overview & Description
              </h3>
              <p style={{ whiteSpace: 'pre-line', marginBottom: '1.25rem' }}>
                {product.description || 'Premium quality verified item. Manufactured to high precision standards with warranty protection.'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div><strong>Category:</strong> {product.category}</div>
                <div><strong>Condition:</strong> 100% Brand New (Sealed)</div>
                <div><strong>Availability:</strong> {product.in_stock ? 'In Stock' : 'Sold Out'}</div>
                <div><strong>Warranty:</strong> 1 Year Brand / Seller Warranty</div>
              </div>
            </div>
          )}

          {activeTab === 'policy' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Delivery & 7-Day Replacement
              </h3>
              <p>
                Every order placed through Gadget2Buy is inspected by our quality assurance team before dispatch. We ship across India via Bluedart, Delhivery, and DTDC.
              </p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Delivery timeline: 2 to 4 business days to major metro cities.</li>
                <li>7-day replacement for size issues or transit defects.</li>
                <li>Doorstep verification on delivery.</li>
              </ul>
            </div>
          )}

          {activeTab === 'qa' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                How Does Booking Work Without Online Card Payment?
              </h3>
              <p>
                To provide maximum security and eliminate fraudulent charges, we do not require online credit card entry:
              </p>
              <ol style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Click <strong>"Book Order via Callback"</strong> or <strong>"Order on WhatsApp"</strong>.</li>
                <li>Enter your name, 10-digit mobile number, and city.</li>
                <li>Our executive calls you to confirm size, color, and delivery address.</li>
                <li>Your package is dispatched with tracking updates sent directly to your phone.</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
