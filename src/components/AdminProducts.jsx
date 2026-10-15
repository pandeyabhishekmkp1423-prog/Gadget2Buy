import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit2, Trash2, Image, Check, X, UploadCloud, AlertCircle, Package, Star, Sparkles, Tag } from 'lucide-react';
import { adminFetchProducts, adminSaveProduct, adminDeleteProduct, adminFetchCategories } from '../api/admin';
import { useToast } from '../context/ToastContext';

export function AdminProducts() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [rating, setRating] = useState('4.8');
  
  // Multi-image uploads (minimum 5 supported)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        adminFetchProducts(searchQuery),
        adminFetchCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      showToast(err.message || 'Failed to load inventory data.', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory(categories[0]?.name || 'Watches');
    setPrice('');
    setMrp('');
    setDescription('');
    setInStock(true);
    setIsActive(true);
    setIsBestseller(false);
    setIsOffer(false);
    setRating('4.8');
    setSelectedFiles([]);
    setExistingImages([]);
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setName(p.name || '');
    setCategory(p.category || '');
    setPrice(p.price || '');
    setMrp(p.mrp || '');
    setDescription(p.description || '');
    setInStock(!!p.in_stock);
    setIsActive(!!p.is_active);
    setIsBestseller(!!p.is_bestseller);
    setIsOffer(!!p.is_offer);
    setRating(String(p.rating || '4.8'));
    setSelectedFiles([]);
    setExistingImages(p.images || (p.image_url ? [p.image_url] : []));
    setModalOpen(true);
  };

  const handleMultipleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const valid = files.filter((f) => {
        if (f.size > 5 * 1024 * 1024) {
          showToast(`File ${f.name} exceeds 5MB limit.`, 'error');
          return false;
        }
        return true;
      });
      setSelectedFiles((prev) => [...prev, ...valid]);
    }
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Product name is required.', 'error');
      return;
    }
    if (!price || Number(price) < 0) {
      showToast('Please enter a valid price.', 'error');
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      if (editingProduct?.id) {
        fd.append('id', editingProduct.id);
      }
      fd.append('name', name.trim());
      fd.append('category', category.trim() || 'General');
      fd.append('price', price);
      if (mrp) fd.append('mrp', mrp);
      fd.append('description', description.trim());
      fd.append('in_stock', inStock ? '1' : '0');
      fd.append('is_active', isActive ? '1' : '0');
      fd.append('is_bestseller', isBestseller ? '1' : '0');
      fd.append('is_offer', isOffer ? '1' : '0');
      fd.append('rating', rating);

      // Append multi-images
      selectedFiles.forEach((file) => {
        fd.append('images[]', file);
      });

      await adminSaveProduct(fd);
      showToast(editingProduct ? 'Product updated.' : 'Product created with multi-images.', 'success');
      setModalOpen(false);
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save product.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await adminDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Product deleted.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete product.', 'error');
    }
  };

  const totalImagesCount = existingImages.length + selectedFiles.length;

  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredProducts = products.filter((p) => {
    if (categoryFilter && p.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div>
      {/* Header and Add Button */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Product Catalog & Inventory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Manage pricing, categories (Watches, Shoes, Jackets), multi-image photo sets (min 5), and badges.
          </p>
        </div>

        <button type="button" className="nav-btn primary" onClick={openAddModal}>
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search and Category Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            style={{ padding: '0.45rem 0.75rem 0.45rem 2.2rem', fontSize: '0.85rem' }}
            placeholder="Search products by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
        >
          <option value="">All Categories ({products.length})</option>
          {categories.map((c) => (
            <option key={c.id || c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            No products found. Click "Add New Product" to list one.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '56px' }}>Photo</th>
                <th>Product Details</th>
                <th>Category</th>
                <th>Price & MRP</th>
                <th>Badges</th>
                <th>Stock</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  {/* Image */}
                  <td>
                    <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
                      {p.image_url && !p.image_url.includes('placeholder.svg') ? (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <Package size={22} color="var(--primary)" />
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.925rem' }}>{p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#d97706', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700 }}>
                        <Star size={12} fill="#d97706" /> {p.rating || '4.8'}
                      </span>
                      {p.images && p.images.length > 0 && (
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-dim)', background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          {p.images.length} photos
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', background: '#eff6ff', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                      {p.category || 'General'}
                    </span>
                  </td>

                  {/* Price */}
                  <td>
                    <div className="price-num" style={{ fontWeight: 800 }}>{p.formatted_price}</div>
                    {p.formatted_mrp && (
                      <div className="price-num" style={{ fontSize: '0.775rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                        {p.formatted_mrp}
                      </div>
                    )}
                  </td>

                  {/* Badges */}
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {p.is_bestseller && (
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#fef3c7', color: '#b45309', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                          BESTSELLER
                        </span>
                      )}
                      {p.is_offer && (
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#fee2e2', color: '#b91c1c', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                          DEAL
                        </span>
                      )}
                      {!p.is_bestseller && !p.is_offer && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>—</span>
                      )}
                    </div>
                  </td>

                  {/* In Stock */}
                  <td>
                    <span className={`status-pill ${p.in_stock ? 'called' : 'lost'}`}>
                      {p.in_stock ? 'In Stock' : 'Sold Out'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      onClick={() => openEditModal(p)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.4rem', marginRight: '0.2rem' }}
                      title="Edit Product"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem' }}
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal with Multi-Image Support */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product Details' : 'Add New Product (Min 5 Photos)'}</h3>
              <button type="button" className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSave}>
                {/* Multi-Image Upload Area (Minimum 5 Images Supported) */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>
                      Product Photo Gallery (Upload 5+ Images for Description Page)
                    </label>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: totalImagesCount >= 5 ? '#16a34a' : '#d97706',
                      }}
                    >
                      {totalImagesCount} of 5+ recommended photos attached
                    </span>
                  </div>

                  <div
                    style={{
                      border: '2px dashed var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      textAlign: 'center',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}
                    onClick={() => document.getElementById('multi-photo-upload-input').click()}
                  >
                    <UploadCloud size={32} color="var(--primary)" style={{ marginBottom: '0.4rem' }} />
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Click to Select or Drag Multiple Images (JPG, PNG, WEBP)
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                      Select 5 or more photos (front, back, side, packaging, closeup)
                    </div>
                    <input
                      id="multi-photo-upload-input"
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleMultipleFiles}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {/* Thumbnail Previews of Attached Photos */}
                  {(existingImages.length > 0 || selectedFiles.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', padding: '0.5rem 0' }}>
                      {existingImages.map((src, i) => (
                        <div key={`exist-${i}`} style={{ position: 'relative', width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                          <img src={src} alt="Existing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(i)}
                            style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Remove image"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}

                      {selectedFiles.map((file, i) => (
                        <div key={`new-${i}`} style={{ position: 'relative', width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                          <img src={URL.createObjectURL(file)} alt="New" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--primary)', color: 'white', fontSize: '0.6rem', textAlign: 'center' }}>
                            NEW
                          </span>
                          <button
                            type="button"
                            onClick={() => removeSelectedFile(i)}
                            style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Remove image"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="form-group">
                  <label className="form-label">Product Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rolex Submariner Automatic Watch / Nike Air Jordan 1 Chicago"
                    required
                  />
                </div>

                {/* Category & Pricing */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Special Offer Price (₹) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="18499"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">MRP (₹ optional)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                      placeholder="24999"
                    />
                  </div>
                </div>

                {/* Rating & Description */}
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Rating (1–5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      className="form-input"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Specifications & Description</label>
                    <textarea
                      className="form-textarea"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Materials, movement, size fit, features, included box accessories..."
                    />
                  </div>
                </div>

                {/* Toggles (Bestseller, Offer, Stock, Visibility) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem', background: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                    <input type="checkbox" checked={isBestseller} onChange={(e) => setIsBestseller(e.target.checked)} />
                    <span>Show in Bestsellers Section</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                    <input type="checkbox" checked={isOffer} onChange={(e) => setIsOffer(e.target.checked)} />
                    <span>Feature in Special Offers / Deals</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                    <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
                    <span>In Stock (Accepting Enquiries)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                    <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                    <span>Visible in Storefront Catalog</span>
                  </label>
                </div>

                <button type="submit" className="form-submit-btn" disabled={saving}>
                  <span>{saving ? 'Uploading & Saving...' : editingProduct ? 'Update Product' : 'Save Product with Photo Gallery'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
