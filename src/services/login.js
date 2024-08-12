import createAxiosInstance from '@/plugins/axiosConfig.js';

const baseAPI = 'auth/login';

const axiosInstance = createAxiosInstance();

const methods = {
  post: async (params) => {
    try {
      const response = await axiosInstance.post(`${baseAPI}`, params);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('Auth Request Error:', error);
    }
  }
};

export default {
  ...methods
};
