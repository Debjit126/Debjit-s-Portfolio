import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
});

export const fetchProfile       = ()         => API.get('/profile');
export const fetchProjects      = ()         => API.get('/projects');
export const fetchSkills        = ()         => API.get('/skills');
export const fetchExperience    = ()         => API.get('/experience');
export const fetchCertifications= ()         => API.get('/certifications');
export const submitContact      = (data)     => API.post('/contact', data);

export default API;
