import axios from 'axios';
import qs from 'qs';

export const getLtdPractOfProfs = query => {
  return axios.get(`/api/ltdPractOfProf?${qs.stringify(query)}`);
};

export const editLtdPractOfProf = (id, body) => {
  return axios.put(`/api/ltdPractOfProf/${id}`, body);
};
