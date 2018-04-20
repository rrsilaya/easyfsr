import axios from 'axios';
import qs from 'qs';

export const getAdminWorks = query => {
  return axios.get(`/api/adminWork?${qs.stringify(query)}`);
};

export const addAdminWork = adminWork => {
  return axios.post(`/api/adminWork`, adminWork);
};

export const deleteAdminWork = adminWorkID => {
  return axios.delete(`/api/adminWork/${adminWorkID}`);
};

export const editAdminWork = (adminWorkID, body) => {
  return axios.put(`/api/adminWork/${adminWorkID}`, body);
};
