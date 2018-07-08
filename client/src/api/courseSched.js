import axios from 'axios';
import qs from 'qs';

export const addCourseSched = courseSched => {
  return axios.post(`/api/courseSched`, courseSched);
};

export const getCourseScheds = query => {
  return axios.get(`/api/courseSched?${qs.stringify(query)}`);
};

export const editCourseSched = (courseSchedID, body) => {
  return axios.put(`/api/courseSched/${courseSchedID}`, body);
};
