import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const bookingAPI = {
  create: (data) => axios.post(`${API}/bookings`, data),
  getAll: () => axios.get(`${API}/bookings`, { headers: getAuthHeaders() }),
  updateStatus: (id, status) => axios.patch(`${API}/bookings/${id}?status=${status}`, {}, { headers: getAuthHeaders() })
};

export const productAPI = {
  getAll: () => axios.get(`${API}/products`),
  getOne: (id) => axios.get(`${API}/products/${id}`),
  create: (data) => axios.post(`${API}/products`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API}/products/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/products/${id}`, { headers: getAuthHeaders() })
};

export const blogAPI = {
  getAll: () => axios.get(`${API}/blog`),
  getOne: (id) => axios.get(`${API}/blog/${id}`),
  create: (data) => axios.post(`${API}/blog`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/blog/${id}`, { headers: getAuthHeaders() })
};

export const testimonialAPI = {
  getAll: () => axios.get(`${API}/testimonials`),
  getAllAdmin: () => axios.get(`${API}/admin/testimonials`, { headers: getAuthHeaders() }),
  create: (data) => axios.post(`${API}/testimonials`, data),
  approve: (id, approved) => axios.patch(`${API}/testimonials/${id}?approved=${approved}`, {}, { headers: getAuthHeaders() })
};

export const settingsAPI = {
  get: () => axios.get(`${API}/settings`),
  update: (data) => axios.put(`${API}/settings`, data, { headers: getAuthHeaders() })
};

export const dashboardAPI = {
  getStats: () => axios.get(`${API}/dashboard/stats`, { headers: getAuthHeaders() })
};

export const orderAPI = {
  create: (data) => axios.post(`${API}/orders`, data),
  getAll: () => axios.get(`${API}/orders`, { headers: getAuthHeaders() }),
  getCustomerOrders: (email) => axios.get(`${API}/orders/customer/${email}`),
  updateStatus: (id, order_status, payment_status) => 
    axios.patch(`${API}/orders/${id}/status?order_status=${order_status}${payment_status ? `&payment_status=${payment_status}` : ''}`, {}, { headers: getAuthHeaders() })
};

export const financeAPI = {
  getSummary: (startDate, endDate) => {
    let url = `${API}/finance/summary`;
    const params = [];
    if (startDate) params.push(`start_date=${startDate}`);
    if (endDate) params.push(`end_date=${endDate}`);
    if (params.length) url += `?${params.join('&')}`;
    return axios.get(url, { headers: getAuthHeaders() });
  },
  getExpenses: () => axios.get(`${API}/expenses`, { headers: getAuthHeaders() }),
  createExpense: (data) => axios.post(`${API}/expenses`, data, { headers: getAuthHeaders() }),
  deleteExpense: (id) => axios.delete(`${API}/expenses/${id}`, { headers: getAuthHeaders() }),
  getInvestments: () => axios.get(`${API}/investments`, { headers: getAuthHeaders() }),
  createInvestment: (data) => axios.post(`${API}/investments`, data, { headers: getAuthHeaders() })
};