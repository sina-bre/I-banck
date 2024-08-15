import createAxiosInstance from '@/plugins/axiosConfig.js';

const baseAPI = 'deposit-account';

const axiosInstance = createAxiosInstance();

const methods = {
  get: async () => {
    try {
      const response = await axiosInstance.get(`/${baseAPI}`);
      console.log(response);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('Deposit Account Error:', error);
    }
  },

  create: async (params) => {
    try {
      const response = await axiosInstance.post(`${baseAPI}`, params);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('Deposit Account Create:', error);
    }
  },

  delete: async (slug) => {
    try {
      const response = axiosInstance.delete(`/${baseAPI}/${slug}`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('Deposit Account Delete:', error);
    }
  }
};

export default {
  ...methods
};
