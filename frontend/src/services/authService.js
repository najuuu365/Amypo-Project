import api from './api';

export const login = (data) => api.post('/auth/login', data);
export const logout = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (e) {}
};
export const register = (data) => api.post('/auth/register', data);

const authService = {
  login,
  logout,
  register
};

export default authService;