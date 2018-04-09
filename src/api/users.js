import axios from 'axios';
import qs from 'qs';

export const getUsers = query => {
  return axios.get(`/api/user?${qs.stringify(query)}`);
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

export const deleteUser = id => {
  return axios.delete(`api/user/${id}`);
};
