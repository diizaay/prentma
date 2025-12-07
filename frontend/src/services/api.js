const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = payload.detail || response.statusText || 'Erro ao comunicar com o servidor';
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function listStatusChecks() {
  return request('/status');
}

export function createStatusCheck(clientName, extras = {}) {
  return request('/status', {
    method: 'POST',
    body: JSON.stringify({ client_name: clientName, ...extras }),
  });
}

export function createApplication(payload) {
  return request('/applications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function listApplications(limit = 50) {
  const params = new URLSearchParams({ limit: String(limit) });
  return request(`/applications?${params.toString()}`);
}

export function getApplication(id) {
  return request(`/applications/${id}`);
}
