import createAxiosInstance from '@/plugins/axiosConfig.js';

const axiosInstance = createAxiosInstance();

const baseAPI = 'transactions';

const methods = {
  get: async () => {
    try {
      const response = axiosInstance.get(`/${baseAPI}`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('transactions Error:', error);
    }
  }
};

export default {
  ...methods
};
