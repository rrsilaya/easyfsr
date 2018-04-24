import axios from 'axios';
import qs from 'qs';

export const getAwards = query => {
  return axios.get(`/api/award?${qs.stringify(query)}`);
};

export const editAward = (awardID, body) => {
  return axios.put(`/api/award/${awardID}`, body);
};
