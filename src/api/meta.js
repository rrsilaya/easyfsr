import axios from 'axios';
import qs from 'qs';

export const getMeta = query => {
  return axios.get(`/api/meta?${qs.stringify(query)}`);
};

export const addMetaData = body => {
  return axios.post(`/api/meta`, body); //parang add
};
