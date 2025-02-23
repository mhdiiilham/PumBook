import store from '@/store';
import axios from 'axios';
import DomainError from './error';

const baseURL = process.env.VUE_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(function (response) {
  return response;
}, function(err) {
  if (err.status === 401) {
    store.dispatch('handleSignOut', {message: 'Your session is expired.'});
  } else {
    if (err.response && err.response.data) {
      const { data } = err.response;
      const domainErr = new DomainError(data.code, data.message);
      return Promise.reject(domainErr);
    }

    const domainErr = new DomainError(500, 'Internal Server Error');
    return Promise.reject(domainErr);
  }
});


export default apiClient;
