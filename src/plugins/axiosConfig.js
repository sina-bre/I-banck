import SecureStorage from '../helpers/storage/secureStorage.js';
import axios from 'axios';
import useToast from '@/composables/useToast.js';

const { showToast } = useToast();

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL || 'https://college.apipart.ir',
    headers: {
      'Content-Type': 'application/json',
      'gateway-system': 'turboFront'
    }
  });

  instance.interceptors.request.use(
    async (config) => {
      try {
        const secureLocalStorage = new SecureStorage('encryption-key');
        const data = secureLocalStorage.getItem('user');

        const myData = JSON.parse(data);
        if (myData) {
          config.headers['gateway-token'] = myData.token;
        }
      } catch (error) {
        console.error('Error retrieving token from localStorage:', error);
        return Promise.reject(error);
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
      if (response.data.message) {
        showToast('success', response.data.message);
      }
      return response.data;
    },
    (error) => {
      showToast('error', error.response?.data?.data?.message?.fa || 'خطای ارتباط با سرور');

      return Promise.reject(error);
    }
  );

  return instance;
};
export default createAxiosInstance;
