import axios from 'axios';
import qs from 'qs';

export const getConsultationHours = query => {
  return axios.get(`/api/consultationHours?${qs.stringify(query)}`);
};

export const getConsultationHour = chID => {
  return axios.get(`/api/consultationHours/${chID}`);
};

export const addConsultationHour = consultationHour => {
  return axios.post(`/api/consultationHours`, consultationHour);
};

export const deleteConsultationHour = chID => {
  return axios.delete(`/api/consultationHours/${chID}`);
};

export const editConsultationHour = (chID, body) => {
  return axios.put(`/api/consultationHours/${chID}`, body);
};
