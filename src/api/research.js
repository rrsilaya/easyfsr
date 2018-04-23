import axios from 'axios';
import qs from 'qs';

export const getResearches = query => {
  return axios.get(`/api/research?${qs.stringify(query)}`);
};

export const getResearch = researchID => {
  return axios.get(`/api/research/${researchID}`);
};

export const addResearch = research => {
  return axios.post(`/api/research`, research);
};

export const deleteResearch = researchID => {
  return axios.delete(`/api/research/${researchID}`);
};

export const editResearch = (researchID, body) => {
  return axios.put(`/api/research/${researchID}`, body);
};
