import createAxiosInstance from '@/plugins/axiosConfig.js';

const baseURL = 'auth';

const axiosInstance = createAxiosInstance();

const methods = {
  login: async (params) => {
    try {
      const response = await axiosInstance.post(`${baseURL}/login`, params);
      console.log('response in auth', response);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('login Request Error:', error);
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.post(`${baseURL}/logout`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('logout Request Error:', error);
    }
  },
  signup: async () => {
    try {
      const response = await axiosInstance.post(`${baseURL}/signup`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('signup Request Error:', error);
    }
  }
};

export default {
  ...methods
};
