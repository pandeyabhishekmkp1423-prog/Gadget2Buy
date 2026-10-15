import React, { useState, useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { CategoryVisualCards } from '../components/CategoryVisualCards';
import { OffersSection } from '../components/OffersSection';
import { BestsellersSection } from '../components/BestsellersSection';
import { GadgetCard } from '../components/GadgetCard';
import { EnquireDrawer } from '../components/EnquireDrawer';
import { fetchProducts, fetchCategories } from '../api/products';
import { useToast } from '../context/ToastContext';
import { 
  ArrowUpDown, RefreshCw, ShoppingBag, ShieldCheck, Truck, 
  PhoneCall, MessageCircle, Star, CheckCircle2, PackageCheck, 
  Clock, Sparkles, ArrowRight, ThumbsUp 
} from 'lucide-react';

export function HomePage({ 
  siteConfig, 
  onViewProductDetail, 
  onOrderSuccess, 
  selectedCategory, 
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('featured');
  const [enquireProduct, setEnquireProduct] = useState(null);

  const catalogRef = useRef(null);
  const dealsRef = useRef(null);
  const bestsellersRef = useRef(null);

  const phone = siteConfig?.phone || '+91 9876543210';
  const waUrl = siteConfig?.wa_url || `https://wa.me/919876543210?text=${encodeURIComponent('Hi! I want to order on Gadget2Buy.')}`;

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        fetchProducts({ q: searchQuery || '', cat: selectedCategory, sort: sortOrder }),
        fetchCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      showToast('Could not load products. Please check back shortly.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortOrder]);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Verified buyer testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Vikram Malhotra',
      city: 'Mumbai, Maharashtra',
      item: 'Apple Watch Ultra 2 Titanium',
      rating: 5,
      date: '2 days ago',
      comment: 'Ordered via callback yesterday afternoon. The executive called in 10 minutes to verify my address. Received sealed box this morning, inspected before paying via UPI. 100% authentic!',
    },
    {
      id: 2,
      name: 'Sneha Rao',
      city: 'Bengaluru, Karnataka',
      item: 'Nike Air Jordan 1 Retro Chicago',
      rating: 5,
      date: '3 days ago',
      comment: 'Was skeptical about sneaker authentication without advance payment. But open-box inspection at doorstep cleared all doubts. Premium leather and verified serial code.',
    },
    {
      id: 3,
      name: 'Arjun Sen',
      city: 'New Delhi',
      item: 'North Face Nuptse 1996 Down Jacket',
      rating: 5,
      date: '5 days ago',
      comment: 'Ordered size L for winter trip. Fits like a glove. Customer support on WhatsApp helped me with chest sizing measurements before dispatch. Outstanding service!',
    },
    {
      id: 4,
      name: 'Karan Joshi',
      city: 'Pune, Maharashtra',
      item: 'Fossil Gen 6 Smartwatch',
      rating: 5,
      date: '1 week ago',
      comment: 'Zero online card risk is the best part. Delivery by Bluedart was fast and cash on delivery was hassle-free. Will definitely buy again.',
    },
  ];

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* 2-Column Hero Section with Interactive Spotlight */}
      <Hero
        siteConfig={siteConfig}
        onExploreDeals={() => dealsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onExploreBestsellers={() => bestsellersRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onQuickEnquire={(p) => setEnquireProduct(p)}
      />

      <div className="container" style={{ marginTop: '3rem' }}>
        {/* Curated Category Department Cards */}
        <CategoryVisualCards
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            onSelectCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* 4-Step "How Zero-Card Assisted Ordering Works" */}
        <div style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          color: '#ffffff',
          marginBottom: '3.5rem',
          boxShadow: '0 12px 25px -5px rgba(30, 64, 175, 0.25)',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.25rem' }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Assisted Shopping Experience
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0.75rem 0 0.5rem', color: '#ffffff' }}>
              How Assisted Doorstep Ordering Works
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#e0e7ff', lineHeight: 1.5 }}>
              Zero card needed. Zero advance payment. Enjoy premium luxury with complete peace of mind.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.75rem',
          }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', color: '#1e40af', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                1
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem', color: '#ffffff' }}>Choose Product & Size</h4>
              <p style={{ fontSize: '0.825rem', color: '#e0e7ff', lineHeight: 1.5 }}>
                Browse our watches, sneakers, or jackets. Pick your preferred sizing and color.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', color: '#1e40af', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                2
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem', color: '#ffffff' }}>Book 1-Click Callback</h4>
              <p style={{ fontSize: '0.825rem', color: '#e0e7ff', lineHeight: 1.5 }}>
                Enter your mobile number and city. No credit card or netbanking required.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', color: '#1e40af', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                3
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem', color: '#ffffff' }}>15-Min Phone Verification</h4>
              <p style={{ fontSize: '0.825rem', color: '#e0e7ff', lineHeight: 1.5 }}>
                Our specialist calls you to confirm exact wrist/shoe size and dispatch timing.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', color: '#1e40af', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                4
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem', color: '#ffffff' }}>Inspect & Pay on Delivery</h4>
              <p style={{ fontSize: '0.825rem', color: '#e0e7ff', lineHeight: 1.5 }}>
                Receive sealed parcel at your doorstep. Inspect the seal and pay via Cash or UPI.
              </p>
            </div>
          </div>
        </div>

        {/* Special Deals Section */}
        <div ref={dealsRef}>
          <OffersSection
            products={products}
            onEnquire={(p) => setEnquireProduct(p)}
            onViewDetail={(p) => onViewProductDetail(p.id)}
          />
        </div>

        {/* Bestsellers Section */}
        <div ref={bestsellersRef}>
          <BestsellersSection
            products={products}
            onEnquire={(p) => setEnquireProduct(p)}
            onViewDetail={(p) => onViewProductDetail(p.id)}
            onExploreAll={scrollToCatalog}
          />
        </div>

        {/* All Collections Catalog */}
        <div ref={catalogRef} style={{ marginTop: '3.5rem' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                {selectedCategory ? `${selectedCategory} Collection` : 'All Available Listings'}
              </h2>
              <p className="section-subtitle">
                {searchQuery ? `Showing search results for "${searchQuery}"` : 'Browse 100% verified listings with doorstep inspection guarantee'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
              <ArrowUpDown size={15} color="var(--text-dim)" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="form-select"
                style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.825rem', borderRadius: 'var(--radius-full)' }}
              >
                <option value="featured">Featured First</option>
                <option value="bestseller">Top Rated / Bestseller</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-dim)' }}>
              <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem', color: 'var(--primary)' }} />
              <p>Refreshing verified product catalog...</p>
            </div>
          ) : products.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 1.5rem',
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                margin: '1.5rem 0',
              }}
            >
              <ShoppingBag size={40} color="var(--primary)" style={{ marginBottom: '0.75rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                No items found
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                We couldn't find items matching your filters. Try resetting or selecting another category.
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  type="button"
                  className="nav-btn primary"
                  onClick={() => {
                    if (onSearchChange) onSearchChange('');
                    onSelectCategory('');
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <GadgetCard
                  key={product.id}
                  product={product}
                  onEnquire={(p) => setEnquireProduct(p)}
                  onViewDetail={(p) => onViewProductDetail(p.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Customer Testimonials & Reviews */}
        <div style={{ marginTop: '4.5rem', marginBottom: '3.5rem' }}>
          <div className="section-header" style={{ textAlign: 'center', display: 'block', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Real Customer Feedback
            </span>
            <h2 className="section-title" style={{ marginTop: '0.25rem' }}>
              Trusted by 1,400+ Smart Shoppers Across India
            </h2>
            <p className="section-subtitle">
              Read how our assisted phone verification and doorstep cash/UPI delivery delivers delight
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} color="#d97706" fill="#f59e0b" />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    "{t.comment}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
                    {t.city} • Verified Buyer ({t.item})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Helpline / WhatsApp Banner */}
        <div style={{
          background: '#eff6ff',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginTop: '2rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <Clock size={16} />
              <span>Dedicated Customer Assistance (9 AM - 9 PM)</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Need Help Choosing the Right Size or Model?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Speak with our product concierge on phone or WhatsApp for instant sizing recommendations.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-btn whatsapp"
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem', fontWeight: 700 }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp Support</span>
            </a>
            <a
              href={`tel:+91${phone.replace(/\D/g, '')}`}
              className="nav-btn primary"
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem', fontWeight: 700 }}
            >
              <PhoneCall size={16} />
              <span>Call {phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Enquiry Drawer Modal */}
      {enquireProduct && (
        <EnquireDrawer
          product={enquireProduct}
          onClose={() => setEnquireProduct(null)}
          onSuccess={(orderData) => {
            setEnquireProduct(null);
            onOrderSuccess(orderData);
          }}
        />
      )}
    </div>
  );
}
