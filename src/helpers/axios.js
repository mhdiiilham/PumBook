import store from '@/store';
import axios from 'axios';
import DomainError from './error';

const apiClient = axios.create({
  // baseURL: 'http://localhost:9091/api/v1', // Base API URL LOCAL
  baseURL: 'https://gosm.muhammadilham.xyz/api/v1', // Base API URL PRODUCTION
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
