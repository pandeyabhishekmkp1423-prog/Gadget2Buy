import React from 'react';
import { Watch, Footprints, Shirt, Smartphone, Headphones, Layers, Tag, ArrowRight } from 'lucide-react';

export function CategoryVisualCards({ categories = [], selectedCategory, onSelectCategory }) {
  // Category preview images mapping
  const categoryImages = {
    'Watches': 'uploads/watch_1.jpg',
    'Shoes': 'uploads/shoe_1.jpg',
    'Jackets': 'uploads/jacket_1.jpg',
    'Smartphones': 'uploads/phone_1.jpg',
    'Audio': 'uploads/audio_1.jpg',
    'Accessories': 'uploads/watch_1.jpg',
  };

  const getIcon = (iconName, catName) => {
    const lower = (iconName || catName || '').toLowerCase();
    if (lower.includes('watch')) return <Watch size={20} />;
    if (lower.includes('shoe') || lower.includes('footwear')) return <Footprints size={20} />;
    if (lower.includes('jacket') || lower.includes('apparel') || lower.includes('cloth')) return <Shirt size={20} />;
    if (lower.includes('phone') || lower.includes('smart')) return <Smartphone size={20} />;
    if (lower.includes('audio') || lower.includes('headphone') || lower.includes('sound')) return <Headphones size={20} />;
    if (lower.includes('access')) return <Layers size={20} />;
    return <Tag size={20} />;
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div className="section-header">
        <div>
          <h2 className="section-title">Shop by Curated Departments</h2>
          <p className="section-subtitle">Discover certified luxury watches, designer footwear, and winter apparel</p>
        </div>
        {selectedCategory && (
          <button
            type="button"
            className="section-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => onSelectCategory('')}
          >
            <span>View All Collections</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      <div className="dept-grid">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const bgImg = categoryImages[cat.name];

          return (
            <div
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(isSelected ? '' : cat.name)}
              style={{
                background: '#ffffff',
                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1rem',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: isSelected ? '0 10px 20px -5px rgba(37, 99, 235, 0.2)' : 'var(--shadow-xs)',
                transition: 'all 200ms ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--primary-border)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                }
              }}
            >
              {/* Product preview circle */}
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: '#f8fafc',
                border: '2px solid #eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.85rem',
                overflow: 'hidden',
                position: 'relative',
              }}>
                {bgImg ? (
                  <img
                    src={bgImg}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  getIcon(cat.icon, cat.name)
                )}
              </div>

              {/* Title & Item Count */}
              <div style={{
                fontSize: '0.95rem',
                fontWeight: 800,
                color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                marginBottom: '0.2rem',
              }}>
                {cat.name}
              </div>

              <div style={{
                fontSize: '0.775rem',
                color: 'var(--text-dim)',
                fontWeight: 600,
              }}>
                {cat.product_count !== undefined ? `${cat.product_count} models` : 'Explore'}
              </div>

              {isSelected && (
                <span style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}>
                  Active
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
