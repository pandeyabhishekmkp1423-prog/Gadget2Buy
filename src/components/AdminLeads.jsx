import React, { useState, useEffect, useCallback } from 'react';
import { PhoneCall, MessageCircle, Download, Search, Trash2, Edit3, CheckCircle2, Clock, Check } from 'lucide-react';
import { adminFetchLeads, adminUpdateLead, adminDeleteLead } from '../api/admin';
import { useToast } from '../context/ToastContext';

export function AdminLeads() {
  const { showToast } = useToast();
  const [leads, setLeads] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilter, setShowFilter] = useState('interested');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteValue, setNoteValue] = useState('');

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetchLeads({
        status: statusFilter,
        show: showFilter,
        q: searchQuery,
      });
      setLeads(data.leads);
      setStatuses(data.statuses);
    } catch (err) {
      showToast(err.message || 'Failed to load leads.', 'error');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, showFilter, searchQuery, showToast]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleStatusChange = async (id, newStatus, currentNote) => {
    try {
      await adminUpdateLead({ id, status: newStatus, admin_note: currentNote });
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status: newStatus, status_label: statuses[newStatus] || newStatus } : lead
        )
      );
      showToast('Lead status updated.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update status.', 'error');
    }
  };

  const handleSaveNote = async (id, currentStatus) => {
    try {
      await adminUpdateLead({ id, status: currentStatus, admin_note: noteValue });
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, admin_note: noteValue } : lead))
      );
      setEditingNoteId(null);
      showToast('Note saved.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save note.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await adminDeleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      showToast('Lead deleted.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete lead.', 'error');
    }
  };

  const exportUrl = `/api/admin/leads-export.php?status=${encodeURIComponent(statusFilter)}&show=${encodeURIComponent(showFilter)}&q=${encodeURIComponent(searchQuery)}`;

  return (
    <div>
      {/* Filters and Header Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Lead Management CRM</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Browse enquiries, tap to call or message on WhatsApp, and update follow-up statuses.
          </p>
        </div>

        <a
          href={exportUrl}
          className="nav-btn"
          style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'var(--border-medium)' }}
        >
          <Download size={15} />
          <span>Export CSV</span>
        </a>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
        {/* Interested Selector */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-full)', padding: '0.2rem', border: '1px solid var(--border-subtle)' }}>
          {['interested', 'all', 'not'].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setShowFilter(val)}
              style={{
                background: showFilter === val ? 'var(--primary)' : 'transparent',
                color: showFilter === val ? 'white' : 'var(--text-muted)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {val === 'interested' ? 'Interested' : val === 'all' ? 'All Leads' : 'Not Interested'}
            </button>
          ))}
        </div>

        {/* Status Dropdown Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
        >
          <option value="">All Statuses</option>
          {Object.entries(statuses).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '320px' }}>
          <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            style={{ padding: '0.35rem 0.75rem 0.35rem 2.2rem', fontSize: '0.85rem' }}
            placeholder="Search name, phone, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="admin-table-container">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            No leads matching current filters.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Product & Price</th>
                <th>Status</th>
                <th>Notes</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  {/* Date */}
                  <td style={{ whiteSpace: 'nowrap', fontSize: '0.775rem', color: 'var(--text-dim)' }}>
                    {lead.created_at ? lead.created_at.substring(0, 16) : '—'}
                  </td>

                  {/* Customer */}
                  <td>
                    <div style={{ fontWeight: 700 }}>{lead.name}</div>
                    {lead.message && (
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem', fontStyle: 'italic', maxWidth: '220px' }}>
                        "{lead.message}"
                      </div>
                    )}
                  </td>

                  {/* Contact Buttons */}
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <a
                        href={lead.tel_url}
                        className="nav-btn primary"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.775rem' }}
                        title="Click to dial"
                      >
                        <PhoneCall size={12} />
                        <span>{lead.phone}</span>
                      </a>
                      <a
                        href={lead.whatsapp_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-wa-icon"
                        style={{ padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-sm)' }}
                        title="Message on WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </td>

                  {/* Product */}
                  <td>
                    <div style={{ fontWeight: 600, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lead.product_name || 'General Query'}
                    </div>
                    {lead.product_price && (
                      <div style={{ fontSize: '0.775rem', color: '#818cf8', fontWeight: 700 }}>
                        ₹{Number(lead.product_price).toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td>
                    <select
                      className={`status-pill ${lead.status}`}
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value, lead.admin_note)}
                      style={{ border: 'none', outline: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      {Object.entries(statuses).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </td>

                  {/* Admin Notes */}
                  <td style={{ minWidth: '180px' }}>
                    {editingNoteId === lead.id ? (
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <input
                          type="text"
                          className="form-input"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                          value={noteValue}
                          onChange={(e) => setNoteValue(e.target.value)}
                          placeholder="e.g. Call back at 6 PM"
                          autoFocus
                        />
                        <button
                          type="button"
                          className="nav-btn primary"
                          style={{ padding: '0.2rem 0.5rem' }}
                          onClick={() => handleSaveNote(lead.id, lead.status)}
                        >
                          <Check size={13} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setEditingNoteId(lead.id);
                          setNoteValue(lead.admin_note || '');
                        }}
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          color: lead.admin_note ? 'var(--text-main)' : 'var(--text-dim)',
                          fontSize: '0.8rem',
                        }}
                        title="Click to edit note"
                      >
                        <span>{lead.admin_note || '+ Add note'}</span>
                        <Edit3 size={11} color="var(--text-dim)" />
                      </div>
                    )}
                  </td>

                  {/* Delete */}
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleDelete(lead.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: '0.4rem',
                      }}
                      title="Delete lead"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
