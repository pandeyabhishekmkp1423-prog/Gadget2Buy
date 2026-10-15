import React, { useState, useEffect } from 'react';
import { 
  Users, Package, KeyRound, ExternalLink, LogOut, Shield, 
  Layers, PhoneCall, CheckCircle2, Clock, ShoppingBag 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AdminLeads } from './AdminLeads';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminPassword } from './AdminPassword';
import { adminFetchLeads, adminFetchProducts, adminFetchCategories } from '../api/admin';

export function AdminLayout({ onBackToStore }) {
  const { adminUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('leads'); // leads | products | categories | password

  // Dashboard Overview Metrics
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    newLeads: 0,
    totalProducts: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    Promise.all([
      adminFetchLeads({ show: 'all' }).catch(() => ({ leads: [] })),
      adminFetchProducts('').catch(() => []),
      adminFetchCategories().catch(() => []),
    ]).then(([leadsData, prods, cats]) => {
      const allLeads = leadsData.leads || [];
      const newCount = allLeads.filter((l) => l.status === 'new').length;
      setMetrics({
        totalLeads: allLeads.length,
        newLeads: newCount,
        totalProducts: Array.isArray(prods) ? prods.length : 0,
        totalCategories: Array.isArray(cats) ? cats.length : 0,
      });
    });
  }, [activeTab]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Admin Top Header */}
      <header className="admin-header" style={{ background: '#ffffff', borderBottom: '1px solid var(--border-medium)', padding: '0.85rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="brand-badge" style={{ width: '2rem', height: '2rem', borderRadius: '6px' }}>
              <Shield size={16} />
            </span>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--primary)' }}>
                Gadget2Buy
              </span>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', fontWeight: 700, background: '#eff6ff', color: 'var(--primary)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                Operations Console
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Logged in as <strong style={{ color: 'var(--text-main)' }}>{adminUser?.username || 'admin'}</strong>
            </span>

            <button
              type="button"
              onClick={onBackToStore}
              className="nav-btn"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderColor: 'var(--border-medium)' }}
              title="Open Customer Storefront"
            >
              <ExternalLink size={13} />
              <span>View Storefront</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="nav-btn"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderColor: '#fecaca', color: '#dc2626', background: '#fef2f2' }}
              title="End admin session"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation Bar with Metrics */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid var(--border-subtle)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div className="container admin-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className={activeTab === 'leads' ? 'active' : ''}
              onClick={() => setActiveTab('leads')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <Users size={16} />
              <span>Customer Enquiries</span>
              {metrics.newLeads > 0 && (
                <span style={{ background: '#ef4444', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)' }}>
                  {metrics.newLeads} new
                </span>
              )}
            </button>

            <button
              type="button"
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <Package size={16} />
              <span>Product Catalog ({metrics.totalProducts})</span>
            </button>

            <button
              type="button"
              className={activeTab === 'categories' ? 'active' : ''}
              onClick={() => setActiveTab('categories')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <Layers size={16} />
              <span>Categories ({metrics.totalCategories})</span>
            </button>

            <button
              type="button"
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => setActiveTab('password')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <KeyRound size={16} />
              <span>Security</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <main className="container" style={{ padding: '2rem 1.25rem', flex: 1 }}>
        {/* Metric KPI Overview Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Total Enquiries
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              {metrics.totalLeads}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: '0.2rem' }}>
              Assisted callback requests
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Pending Action
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: metrics.newLeads > 0 ? '#ef4444' : '#16a34a', marginTop: '0.25rem' }}>
              {metrics.newLeads}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, marginTop: '0.2rem' }}>
              {metrics.newLeads > 0 ? 'Requires phone verification' : 'All callbacks updated'}
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Listed Products
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
              {metrics.totalProducts}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, marginTop: '0.2rem' }}>
              With multi-image photo sets
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Live Categories
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              {metrics.totalCategories}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, marginTop: '0.2rem' }}>
              Watches, Shoes, Jackets, Tech
            </div>
          </div>
        </div>

        {/* Tab Components */}
        {activeTab === 'leads' && <AdminLeads />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'categories' && <AdminCategories />}
        {activeTab === 'password' && <AdminPassword />}
      </main>
    </div>
  );
}
