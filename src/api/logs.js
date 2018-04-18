import axios from 'axios';
import qs from 'qs';

export const getLog = query => {
  return axios.get(`/api/log?${qs.stringify(query)}`);
};
