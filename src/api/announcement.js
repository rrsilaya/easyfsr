import axios from 'axios';

export const addAnnouncement = body => {
  return axios.post(`/api/announcement`, body);
};
