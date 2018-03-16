import axios from 'axios';

export const login = body => {
  return axios.post('/api/login', body);
};

export const logout = () => {
  return axios.post('/api/logout');
};

export const getSession = () => {
  return axios.post('/api/session');
};
