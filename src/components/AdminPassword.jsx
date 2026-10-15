import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { adminChangePassword } from '../api/admin';
import { useToast } from '../context/ToastContext';

export function AdminPassword() {
  const { showToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please fill in all password fields.', 'error');
      return;
    }
    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    setSaving(true);
    try {
      await adminChangePassword(currentPassword, newPassword);
      showToast('Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      showToast(err.message || 'Failed to change password.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>Admin Security Settings</h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        Update your login credentials. Use a strong password with at least 8 characters.
      </p>

      <div className="modal-content" style={{ padding: '1.5rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              required
            />
          </div>

          <button type="submit" className="form-submit-btn" disabled={saving}>
            <KeyRound size={16} />
            <span>{saving ? 'Updating Password...' : 'Save New Password'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
