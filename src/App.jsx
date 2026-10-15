import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { fetchSiteConfig } from './api/products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPage } from './pages/RefundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SuccessPage } from './pages/SuccessPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminLayout } from './components/AdminLayout';
import { EnquireDrawer } from './components/EnquireDrawer';

function AppContent() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [siteConfig, setSiteConfig] = useState(null);
  
  // Navigation states: 'home' | 'product' | 'terms' | 'refund' | 'privacy' | 'success' | 'admin'
  const [currentView, setCurrentView] = useState('home');
  const [activeProductId, setActiveProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderSuccessData, setOrderSuccessData] = useState(null);
  const [globalEnquireProduct, setGlobalEnquireProduct] = useState(null);

  // Helper to parse path string into view and extra parameter
  const parsePath = (path) => {
    const clean = path.replace(/\/+$/, '') || '/';
    if (clean === '/admin') return { view: 'admin', extra: null };
    if (clean === '/terms') return { view: 'terms', extra: null };
    if (clean === '/refund') return { view: 'refund', extra: null };
    if (clean === '/privacy') return { view: 'privacy', extra: null };
    if (clean === '/success') return { view: 'success', extra: null };
    if (clean.startsWith('/product/')) {
      const id = clean.replace('/product/', '');
      return { view: 'product', extra: id };
    }
    return { view: 'home', extra: null };
  };

  // HTML5 History Routing without #
  useEffect(() => {
    const handleLocationChange = () => {
      let path = window.location.pathname;
      const hash = window.location.hash;
      
      // Auto-migrate legacy hash links (#terms -> /terms)
      if (hash && hash.startsWith('#')) {
        const cleanFromHash = '/' + hash.replace(/^#\/?/, '');
        window.history.replaceState(null, '', cleanFromHash);
        path = cleanFromHash;
      }

      const { view, extra } = parsePath(path);
      setCurrentView(view);
      setActiveProductId(extra);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    fetchSiteConfig()
      .then((cfg) => setSiteConfig(cfg))
      .catch((err) => console.error('Failed to load site config:', err));
  }, []);

  const navigateTo = (view, extra = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let path = '/';
    if (view === 'home') path = '/';
    else if (view === 'product') path = `/product/${extra}`;
    else if (view === 'terms') path = '/terms';
    else if (view === 'refund') path = '/refund';
    else if (view === 'privacy') path = '/privacy';
    else if (view === 'success') path = '/success';
    else if (view === 'admin') path = '/admin';

    window.history.pushState(null, '', path);
    setCurrentView(view);
    if (view === 'product') setActiveProductId(extra);
  };

  const handleOrderSuccess = (data) => {
    setOrderSuccessData(data);
    navigateTo('success');
  };

  // If Admin View (accessible directly via #admin URL hash)
  if (currentView === 'admin') {
    if (authLoading) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
          Authenticating merchant admin session...
        </div>
      );
    }

    if (!isAdmin) {
      return <AdminLogin onBackToStore={() => navigateTo('home')} />;
    }

    return <AdminLayout onBackToStore={() => navigateTo('home')} />;
  }

  return (
    <>
      <Navbar
        siteConfig={siteConfig}
        onNavigate={navigateTo}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HomePage
            siteConfig={siteConfig}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onViewProductDetail={(id) => navigateTo('product', id)}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentView === 'product' && (
          <ProductDetailPage
            productId={activeProductId}
            onBack={() => navigateTo('home')}
            onEnquire={(p) => setGlobalEnquireProduct(p)}
          />
        )}

        {currentView === 'terms' && (
          <TermsPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentView === 'refund' && (
          <RefundPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentView === 'privacy' && (
          <PrivacyPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentView === 'success' && (
          <SuccessPage
            orderData={orderSuccessData}
            onContinueShopping={() => navigateTo('home')}
          />
        )}
      </main>

      <Footer
        siteConfig={siteConfig}
        onAdminClick={() => navigateTo('admin')}
        onNavigate={navigateTo}
        onSelectCategory={setSelectedCategory}
      />

      {/* Global Booking / Enquiry Drawer for Product Detail Page */}
      <EnquireDrawer
        product={globalEnquireProduct}
        isOpen={!!globalEnquireProduct}
        onClose={() => setGlobalEnquireProduct(null)}
        onSuccess={handleOrderSuccess}
      />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}
