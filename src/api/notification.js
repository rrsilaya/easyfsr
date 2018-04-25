import axios from 'axios';
import qs from 'qs';

export const addNotification = body => {
  return axios.post(`/api/notification`, body);
};

export const getNotifications = query => {
  return axios.get(`/api/notification?${qs.stringify(query)}`);
};

export const deleteNotification = id => {
  return axios.delete(`/api/notification/${id}`);
};
