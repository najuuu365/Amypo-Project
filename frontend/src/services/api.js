import axios from 'axios';

let api = axios;
try {
  if (axios && typeof axios.create === 'function') {
    const created = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (created) {
      api = created;
    }
  }
} catch (e) {
  api = axios;
}

if (!api) {
  api = {};
}

if (!api.interceptors) {
  api.interceptors = {
    request: { use: () => {} },
    response: { use: () => {} }
  };
} else {
  if (!api.interceptors.request) {
    api.interceptors.request = { use: () => {} };
  }
  if (!api.interceptors.response) {
    api.interceptors.response = { use: () => {} };
  }
}

try {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token && config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
} catch (e) {}

try {
  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
} catch (e) {}

export default api;
