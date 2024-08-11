import { Axios } from '@/plugins/axiosConfig.js';

const baseAPI = 'auth/login';

const methods = {
  get: (params = {}) => Axios.get(`/${baseAPI}`, { params }),

  post: (data, params = {}) => Axios.post(`/${baseAPI}`, data, { params })
};

export default {
  ...methods
};
