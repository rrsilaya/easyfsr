import axios from 'axios';
import qs from 'qs';

export const getExtAndCommServices = query => {
  return axios.get(`/api/service?${qs.stringify(query)}`);
};

export const addExtAndCommService = extAndCommService => {
  return axios.post(`/api/service`, extAndCommService);
};

export const deleteExtAndCommService = extAndCommServiceID => {
  return axios.delete(`/api/service/${extAndCommServiceID}`);
};

export const editExtAndCommService = (extAndCommServiceID, body) => {
  return axios.put(`/api/service/${extAndCommServiceID}`, body);
};
