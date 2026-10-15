import { apiRequest, setCsrfToken } from './client';

export async function fetchSiteConfig() {
  const res = await apiRequest('/api/config.php');
  if (res?.data?.csrf_token) {
    setCsrfToken(res.data.csrf_token);
  }
  return res.data;
}

export async function fetchCategories() {
  const res = await apiRequest('/api/categories.php');
  return res.data || [];
}

export async function fetchProducts({ q = '', cat = '', sort = 'featured' } = {}) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (cat) params.set('cat', cat);
  if (sort) params.set('sort', sort);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await apiRequest(`/api/products.php${query}`);
  return res.data || [];
}

export async function fetchProductById(id) {
  const res = await apiRequest(`/api/product.php?id=${id}`);
  return res.data;
}
