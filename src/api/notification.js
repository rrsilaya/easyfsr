import axios from 'axios';

export const addNotification = body => {
  return axios.post(`/api/notification`, body);
};
