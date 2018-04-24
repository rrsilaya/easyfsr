import axios from 'axios';
import qs from 'qs';

export const getCourses = query => {
  return axios.get(`/api/course?${qs.stringify(query)}`);
};

export const getCourse = courseID => {
  return axios.get(`/api/course/${courseID}`);
};

export const addCourse = course => {
  return axios.post(`/api/course`, course);
};

export const deleteCourse = courseID => {
  return axios.delete(`/api/course/${courseID}`);
};

export const editCourse = (courseID, body) => {
  return axios.put(`/api/course/${courseID}`, body);
};
