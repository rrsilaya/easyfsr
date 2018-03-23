import axios from 'axios';

export const getUsers = () => {
  return axios.get('/api/user');
};

export const getUser = id => {
  return axios.get(`/api/user/${id}`);
};

export const addUser = user => {
  return axios.post('/api/user', user);
};

export const editUser = (userID, body) => {
  return axios.put(`/api/user/${userID}`, body);
};
