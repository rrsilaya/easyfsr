import axios from 'axios';
import qs from 'qs';

export const getCreativeWorks = query => {
  return axios.get(`/api/creativeWork?${qs.stringify(query)}`);
};

export const getCreativeWork = creativeWorkID => {
  return axios.get(`/api/creativeWork/${creativeWorkID}`);
};

export const addCreativeWork = creativeWork => {
  return axios.post(`/api/creativeWork`, creativeWork);
};

export const deleteCreativeWork = creativeWorkID => {
  return axios.delete(`/api/creativeWork/${creativeWorkID}`);
};

export const editCreativeWork = (creativeWorkID, body) => {
  return axios.put(`/api/creativeWork/${creativeWorkID}`, body);
};
