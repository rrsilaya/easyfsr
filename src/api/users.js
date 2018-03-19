import axios from 'axios';

export const addUser = user => {
  return axios.post('/api/user', user);
};
