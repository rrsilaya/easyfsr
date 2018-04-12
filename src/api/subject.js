import axios from 'axios';
import qs from 'qs';

export const getSubjects = query => {
  return axios.get(`/api/subject?${qs.stringify(query)}`);
};

export const getSubject = subjectID => {
  return axios.get(`/api/subject/${subjectID}`);
};

export const addSubject = subject => {
  return axios.post(`/api/subject`, subject);
};

export const deleteSubject = subjectID => {
  return axios.delete(`/api/subject/${subjectID}`);
};

export const editSubject = (subjectID, body) => {
  return axios.put(`/api/subject/${subjectID}`, body);
};
