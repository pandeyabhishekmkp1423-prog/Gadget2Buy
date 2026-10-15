import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Tag, Watch, Footprints, Shirt, Smartphone, Headphones, Layers, Check, X, FolderPlus } from 'lucide-react';
import { adminFetchCategories, adminSaveCategory, adminDeleteCategory } from '../api/admin';
import { useToast } from '../context/ToastContext';

const AVAILABLE_ICONS = [
  { name: 'Watch', label: 'Watch / Timepiece' },
  { name: 'Footprints', label: 'Shoes / Footwear' },
  { name: 'Shirt', label: 'Jackets / Apparel' },
  { name: 'Smartphone', label: 'Phones / Tablets' },
  { name: 'Headphones', label: 'Audio / Headphones' },
  { name: 'Layers', label: 'Accessories' },
  { name: 'Tag', label: 'General / Deals' },
];

export function AdminCategories() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('Tag');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetchCategories();
      setCategories(data);
    } catch (err) {
      showToast(err.message || 'Failed to load categories.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Category name is required.', 'error');
      return;
    }

    setSaving(true);
    try {
      await adminSaveCategory({
        name: name.trim(),
        icon,
        description: description.trim(),
      });
      showToast(`Category "${name}" created successfully!`, 'success');
      setName('');
      setDescription('');
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      showToast(err.message || 'Failed to save category.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Are you sure you want to delete category "${cat.name}"?`)) return;
    try {
      await adminDeleteCategory(cat.id);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      showToast(`Category "${cat.name}" deleted.`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete category.', 'error');
    }
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Watch': return <Watch size={18} color="var(--primary)" />;
      case 'Footprints': return <Footprints size={18} color="var(--primary)" />;
      case 'Shirt': return <Shirt size={18} color="var(--primary)" />;
      case 'Smartphone': return <Smartphone size={18} color="var(--primary)" />;
      case 'Headphones': return <Headphones size={18} color="var(--primary)" />;
      case 'Layers': return <Layers size={18} color="var(--primary)" />;
      default: return <Tag size={18} color="var(--primary)" />;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Category Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Add, customize, and delete catalog categories (Watches, Shoes, Jackets, Electronics, etc.).
          </p>
        </div>

        <button type="button" className="nav-btn primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            No categories defined. Click "Add New Category" to create one.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '48px' }}>Icon</th>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Listed Products</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderIcon(cat.icon)}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                      {cat.name}
                    </div>
                  </td>

                  <td>
                    <code style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                      {cat.slug || cat.name.toLowerCase()}
                    </code>
                  </td>

                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '300px' }}>
                    {cat.description || '—'}
                  </td>

                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: cat.product_count > 0 ? '#eff6ff' : '#f1f5f9',
                        color: cat.product_count > 0 ? 'var(--primary)' : 'var(--text-dim)',
                      }}
                    >
                      {cat.product_count} items
                    </span>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '0.4rem',
                      }}
                      title="Delete category"
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

      {/* Add Category Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3>Create New Category</h3>
              <button type="button" className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label className="form-label">Category Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Luxury Watches, Sports Shoes, Winter Jackets"
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category Icon</label>
                  <select
                    className="form-select"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                  >
                    {AVAILABLE_ICONS.map((ic) => (
                      <option key={ic.name} value={ic.name}>
                        {ic.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Brief Description</label>
                  <textarea
                    className="form-textarea"
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Summary of products listed in this collection..."
                  />
                </div>

                <button type="submit" className="form-submit-btn" disabled={saving}>
                  <span>{saving ? 'Creating Category...' : 'Create Category'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
