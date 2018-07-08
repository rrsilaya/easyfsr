import axios from 'axios';
import qs from 'qs';

export const getUsers = query => {
  return axios.get(`/api/user?${qs.stringify(query)}`);
};

export const getUser = id => {
  return axios.get(`/api/user/${id}`);
};

export const addUser = user => {
  return axios.post('/api/user', user);
};

export const editUser = (userID, body) => {
  return axios.put(`/api/user/${userID}`, body);
};

export const deleteUser = id => {
  return axios.delete(`api/user/${id}`);
};

export const getAdminWork = id => {
  return axios.get(`/api/user/${id}/adminWork`);
};

export const getUserExtensionAndCommServices = query => {
  return axios.get(`/api/extensionAndCommunityService?${qs.stringify(query)}`);
};

export const getUserExtensionAndCommService = id => {
  return axios.get(`/api/user/${id}/extensionAndCommunityService`);
};

export const getUserSchedule = user => {
  return axios.get(`/api/user/${user}/schedule`);
};

export const getUserCreativeWorks = id => {
  return axios.get(`/api/user/${id}/creativeWork`);
};

export const getUserLimitedPractices = id => {
  return axios.get(`/api/user/${id}/limitedPracticeOfProf`);
};

export const getUserStudyLoads = id => {
  return axios.get(`/api/user/${id}/studyLoad`);
};

export const getUserAwards = id => {
  return axios.get(`/api/user/${id}/award`);
};

export const getUserResearches = id => {
  return axios.get(`/api/user/${id}/research`);
};
