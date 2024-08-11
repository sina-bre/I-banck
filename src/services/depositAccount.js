import { Axios } from '@/plugins/axiosConfig.js';

const baseAPI = 'deposit-account';

const methods = {
  get: (params = {}) => Axios.get(`/${baseAPI}`, { params }),

  create: (data, params = {}) => Axios.post(`/${baseAPI}`, data, { params })
};

export default {
  ...methods
};
