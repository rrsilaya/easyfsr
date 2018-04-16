import axios from 'axios';
import qs from 'qs';

export const getNotifications = query => {
  return axios.get(`/api/notification?${qs.stringify(query)}`);
};
