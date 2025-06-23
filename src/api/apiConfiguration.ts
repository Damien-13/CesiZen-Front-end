// src/api/api.ts
import axios from 'axios';

const api = axios.create({

  baseURL: 'http://cesizen-back-end.test/api/', 
  // Remplacez par l'URL de votre API
  

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 60000,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers = config.headers || {};
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const { response } = error;
      if (response?.status === 401) {
        localStorage.removeItem("access_token");
        // window.location.href = '/login'; // Rediriger vers login si besoin
      }
    } catch (e) {
      console.error('Erreur de gestion 401', e);
    }
    return Promise.reject(error);
  }
);

export default api;
