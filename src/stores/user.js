// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import authService from '@/services/index.js';
import { SecureStorage } from '@/helpers/storage/secureStorage.js';

const secureStorage = new SecureStorage('encryption-key', 'localStorage');

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(null);
    const idNumber = ref(null);
    const firstName = ref(null);
    const lastName = ref(null);

    const login = async (credentials) => {
      try {
        const response = await authService.login.post(credentials);
        token.value = response.token;
        idNumber.value = response.idNumber;
        firstName.value = response.firstName;
        lastName.value = response.lastName;
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    const logout = async () => {
      token.value = null;
      idNumber.value = null;
      firstName.value = null;
      lastName.value = null;
    };

    return {
      token,
      idNumber,
      firstName,
      lastName,
      login,
      logout
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'userStore',
          storage: {
            getItem: (key) => secureStorage.get(key),
            setItem: (key, value) => secureStorage.set(key, value),
            removeItem: (key) => secureStorage.remove(key),
            clear: () => secureStorage.clear()
          }
        }
      ]
    }
  }
);
