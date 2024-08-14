import SecureStorage from '../helpers/storage/secureStorage.js';
import axios from 'axios';

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL || 'https://college.apipart.ir', // Default base URL
    headers: {
      'Content-Type': 'application/json',
      'gateway-system': 'turboFront'
    }
  });

  instance.interceptors.request.use(
    async (config) => {
      try {
        const secureLocalStorage = new SecureStorage('encryption-key', 'localStorage');
        const token = secureLocalStorage.getItem('token');
        console.log(token);
        if (token) {
          config.headers['gateway-token'] = token;
        }
      } catch (error) {
        console.error('Error retrieving token from localStorage:', error);
      }
      return config;
    },
    (error) => {
      console.error('Request Error:', error.message || error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      response.data;
    },
    (error) => {
      console.error('Response Error:', error.response ? error.response.data : error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};
export default createAxiosInstance;
