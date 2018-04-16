import axios from 'axios';
import qs from 'qs';

export const addAnnouncement = body => {
  return axios.post(`/api/announcement`, body);
};

export const getAnnouncements = query => {
  return axios.get(`/api/announcement?${qs.stringify(query)}`);
};
