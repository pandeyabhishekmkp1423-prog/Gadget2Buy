import React, { useState } from 'react';
import { Shield, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function AdminLogin({ onBackToStore }) {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      showToast('Please enter both username and password.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await login(username.trim(), password);
      showToast('Admin logged in successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Invalid username or password.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div
        className="modal-content"
        style={{
          maxWidth: '420px',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-medium)',
        }}
      >
        <button
          onClick={onBackToStore}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
          }}
        >
          <ArrowLeft size={15} />
          <span>Back to Storefront</span>
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary), #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 4px 16px var(--primary-glow)',
            }}
          >
            <Shield size={28} color="white" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            Sign in to manage leads and product listings
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-user">Username</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
                <User size={16} />
              </span>
              <input
                id="admin-user"
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-pass">Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
                <Lock size={16} />
              </span>
              <input
                id="admin-pass"
                type={showPass ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="form-submit-btn" disabled={submitting} style={{ marginTop: '0.5rem' }}>
            <span>{submitting ? 'Authenticating...' : 'Sign In as Admin'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
