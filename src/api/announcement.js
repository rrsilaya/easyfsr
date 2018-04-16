import axios from 'axios';
import qs from 'qs';

export const getAnnouncements = query => {
  return axios.get(`/api/announcement?${qs.stringify(query)}`);
};
