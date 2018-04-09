import axios from 'axios';

export const getFSRs = () => {
  return axios.get('/api/fsr');
};

export const getFSR = id => {
  return axios.get(`/api/fsr/${id}`);
};
