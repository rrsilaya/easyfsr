import axios from 'axios';
import qs from 'qs';

export const addTimeslot = timeslot => {
  return axios.post(`/api/timeslot`, timeslot);
};

export const getTimeslots = query => {
  return axios.get(`/api/timeslot?${qs.stringify(query)}`);
};
