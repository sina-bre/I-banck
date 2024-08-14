// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import authService from '@/services/index.js';
import SecureStorage from '@/helpers/storage/secureStorage.js';

const secureStorage = new SecureStorage('encryption-key');

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(null);
    const idNumber = ref(null);
    const firstName = ref(null);
    const lastName = ref(null);
    const depositAccountStatus = ref(null);
    const depositAccountData = ref(null);
    const id = ref(null);
    const numberOfTransactions = ref(null);
    const transactions = ref(null);

    const login = async (credentials) => {
      try {
        const response = await authService.auth.login(credentials);
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

    const getDepositAccount = async () => {
      try {
        const response = await authService.depositAccount.get();
        depositAccountStatus.value = response.status;
        depositAccountData.value = response.result;
      } catch (error) {
        console.error('Get deposit account failed:', error);
      }
    };

    const createDepositAccount = async (credentials) => {
      try {
        const response = await authService.depositAccount.create(credentials);
        id.value = response.id;
      } catch (error) {
        console.error('Create deposit account failed:', error);
      }
    };

    const deleteDepositAccount = async (slug) => {
      try {
        const response = await authService.depositAccount.delete(slug);
        console.log(response);
      } catch (error) {
        console.error('Delete deposit account failed:', error);
      }
    };

    const getTransactions = async () => {
      try {
        const response = await authService.transactions.get();
        numberOfTransactions.value = response.count;
        transactions.value = response.transactions;
      } catch (error) {
        console.error('Get transactions failed:', error);
      }
    };

    return {
      token,
      idNumber,
      firstName,
      lastName,
      depositAccountStatus,
      depositAccountData,
      numberOfTransactions,
      transactions,
      login,
      logout,
      getDepositAccount,
      createDepositAccount,
      deleteDepositAccount,
      getTransactions
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: secureStorage
        }
      ]
    }
  }
);
