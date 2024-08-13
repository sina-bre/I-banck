import services from '@/services';
import { defineStore } from 'pinia';

export const useUserData = defineStore('users', {
  state: () => ({
    userData: null,
    isAuthenticated: false
  }),

  actions: {
    async registerUser(data) {
      try {
        this.userData = await services.login.post(data);
        this.isAuthenticated = true;
      } catch (error) {
        this.isAuthenticated = false;
        return error;
      }
    }
  }
});
