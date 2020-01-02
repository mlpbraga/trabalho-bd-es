import axios from 'axios';
import constants from '../utils/constants';
import {getToken} from './auth';

const { apiEndpoint } = constants;

const api = axios.create({
  baseURL: apiEndpoint
});

api.interceptors.request.use(async config => {
  const token = getToken();
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzY2MTQxODQxOTgsInN1YiI6ImFsZWFsb2kiLCJ1c2VybmFtZSI6ImFsZWFsb2kiLCJpc3MiOiJyZXN0LmFwaS50ZW1wbGF0ZSIsImV4cCI6MTU3NjYyOTczNjE5OCwiYWxnb3JpdGhtIjoiSFMyNTYiLCJhdWQiOiJyZXN0LmFwaS50ZW1wbGF0ZSJ9.t7MINhbk5elyeph6r2uv8bYRivwSlJpzP4FTXPEs8Jg  ";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;