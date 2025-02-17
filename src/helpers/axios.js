import store from '@/store';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9091/api/v1', // Base API URL LOCAL
  // baseURL: 'https://gosm.muhammadilham.xyz/api/v1', // Base API URL PRODUCTION
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(function (response) {
  return response;
}, function(err) {
  if (err.status === 401) {
    store.dispatch('handleSignOut', {message: 'Your session is expired.'});
  }
});


export default apiClient;
