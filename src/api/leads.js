import { apiRequest } from './client';

export async function submitEnquiry(payload) {
  const res = await apiRequest('/api/enquire.php', {
    method: 'POST',
    body: payload,
  });
  return res;
}
