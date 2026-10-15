/**
 * Gadget2Buy API HTTP Client
 */

let cachedCsrfToken = null;

export function setCsrfToken(token) {
  cachedCsrfToken = token;
}

export function getCsrfToken() {
  return cachedCsrfToken;
}

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export async function apiRequest(endpoint, options = {}) {
  const path = endpoint.startsWith('/') ? endpoint : `/api/${endpoint}`;
  const url = API_BASE ? `${API_BASE}${path}` : path;
  
  const headers = {
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  if (cachedCsrfToken) {
    headers['X-CSRF-Token'] = cachedCsrfToken;
  }

  // If payload is standard JSON and not FormData, stringify and set Content-Type
  let body = options.body;
  if (body && !(body instanceof FormData) && typeof body === 'object') {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      body,
      credentials: 'include', // Needed for PHP session cookie
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.error || `Request failed with status ${res.status}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    console.error(`API Error [${options.method || 'GET'} ${url}]:`, error);
    throw error;
  }
}
