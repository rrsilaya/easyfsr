import axios from 'axios';
import qs from 'qs';
export const getFSRs = query => {
  return axios.get(`/api/fsr/?${qs.stringify(query)}`);
};

export const getFSR = id => {
  return axios.get(`/api/fsr/${id}`);
};

export const editFSR = (id, body) => {
  return axios.put(`/api/fsr/${id}`, body);
};
