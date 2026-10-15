import { apiRequest } from './client';

export async function adminLogin(username, password) {
  const res = await apiRequest('/api/admin/login.php', {
    method: 'POST',
    body: { username, password },
  });
  return res.data;
}

export async function adminLogout() {
  return await apiRequest('/api/admin/logout.php', {
    method: 'POST',
  });
}

export async function adminCheckMe() {
  const res = await apiRequest('/api/admin/me.php');
  return res.data;
}

export async function adminFetchLeads({ status = '', show = 'interested', q = '' } = {}) {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (show) params.set('show', show);
  if (q) params.set('q', q);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await apiRequest(`/api/admin/leads.php${query}`);
  return {
    leads: res.data || [],
    statuses: res.statuses || {},
    total: res.total || 0,
  };
}

export async function adminUpdateLead({ id, status, admin_note }) {
  const res = await apiRequest('/api/admin/leads.php', {
    method: 'PATCH',
    body: { id, status, admin_note },
  });
  return res.data;
}

export async function adminDeleteLead(id) {
  const res = await apiRequest('/api/admin/leads.php', {
    method: 'DELETE',
    body: { id },
  });
  return res.data;
}

export async function adminFetchProducts(q = '') {
  const query = q ? `?q=${encodeURIComponent(q)}` : '';
  const res = await apiRequest(`/api/admin/products.php${query}`);
  return res.data || [];
}

export async function adminSaveProduct(formData) {
  const res = await apiRequest('/api/admin/products.php', {
    method: 'POST',
    body: formData, // FormData instance
  });
  return res.data;
}

export async function adminDeleteProduct(id) {
  const res = await apiRequest('/api/admin/products.php', {
    method: 'DELETE',
    body: { id },
  });
  return res.data;
}

export async function adminChangePassword(current_password, new_password) {
  const res = await apiRequest('/api/admin/password.php', {
    method: 'POST',
    body: { current_password, new_password },
  });
  return res;
}

export async function adminFetchCategories() {
  const res = await apiRequest('/api/admin/categories.php');
  return res.data || [];
}

export async function adminSaveCategory({ name, icon, description }) {
  const res = await apiRequest('/api/admin/categories.php', {
    method: 'POST',
    body: { name, icon, description },
  });
  return res.data;
}

export async function adminDeleteCategory(id) {
  const res = await apiRequest('/api/admin/categories.php', {
    method: 'DELETE',
    body: { id },
  });
  return res.data;
}
