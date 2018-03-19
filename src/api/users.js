import axios from 'axios';

export const addUser = user => {
  return axios.post('api/user', user);
};

export const deleteUser = id => {
  return axios.delete(`api/user/${id}`);
};
