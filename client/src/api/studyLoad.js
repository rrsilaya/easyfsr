import axios from 'axios';

export const getStudyLoad = id => {
  return axios.get(`/api/studyLoad/${id}`);
};

export const editStudyLoad = (id, body) => {
  return axios.put(`/api/studyLoad/${id}`, body);
};
