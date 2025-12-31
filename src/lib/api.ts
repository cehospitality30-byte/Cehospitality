const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Menu Items API
export const menuApi = {
  getAll: (params?: { category?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    const query = queryParams.toString();
    return apiRequest(`/menu${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/menu/${id}`),
  create: (data: any) => apiRequest('/menu', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/menu/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/menu/${id}`, {
    method: 'DELETE',
  }),
};

// Bookings API
export const bookingApi = {
  getAll: (params?: { status?: string; date?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.date) queryParams.append('date', params.date);
    const query = queryParams.toString();
    return apiRequest(`/bookings${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/bookings/${id}`),
  create: (data: any) => apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/bookings/${id}`, {
    method: 'DELETE',
  }),
};

// Contacts API
export const contactApi = {
  getAll: (params?: { status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    const query = queryParams.toString();
    return apiRequest(`/contacts${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/contacts/${id}`),
  create: (data: any) => apiRequest('/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/contacts/${id}`, {
    method: 'DELETE',
  }),
};

// Services API
export const serviceApi = {
  getAll: (params?: { active?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.active !== undefined) queryParams.append('active', String(params.active));
    const query = queryParams.toString();
    return apiRequest(`/services${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/services/${id}`),
  create: (data: any) => apiRequest('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/services/${id}`, {
    method: 'DELETE',
  }),
};

// Offers API
export const offerApi = {
  getAll: (params?: { active?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.active !== undefined) queryParams.append('active', String(params.active));
    const query = queryParams.toString();
    return apiRequest(`/offers${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/offers/${id}`),
  create: (data: any) => apiRequest('/offers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/offers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/offers/${id}`, {
    method: 'DELETE',
  }),
};

// Gallery API
export const galleryApi = {
  getAll: (params?: { category?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    const query = queryParams.toString();
    return apiRequest(`/gallery${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/gallery/${id}`),
  create: (data: any) => apiRequest('/gallery', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/gallery/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/gallery/${id}`, {
    method: 'DELETE',
  }),
};

// Leaders API
export const leaderApi = {
  getAll: () => apiRequest('/leaders'),
  getById: (id: string) => apiRequest(`/leaders/${id}`),
  create: (data: any) => apiRequest('/leaders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/leaders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/leaders/${id}`, {
    method: 'DELETE',
  }),
};

// Content API
export const contentApi = {
  getAll: (params?: { section?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.section) queryParams.append('section', params.section);
    const query = queryParams.toString();
    return apiRequest(`/content${query ? `?${query}` : ''}`);
  },
  getBySection: (section: string) => apiRequest(`/content/section/${section}`),
  update: (data: { section: string; key: string; value: string }) => apiRequest('/content', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  bulkUpdate: (section: string, data: Record<string, string>) => apiRequest('/content/bulk', {
    method: 'PUT',
    body: JSON.stringify({ section, data }),
  }),
};

