// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import authService from '@/services/index.js';
import SecureStorage from '@/helpers/storage/secureStorage.js';
import router from '@/router';
import useToast from '@/composables/useToast.js';

const { showToast } = useToast();

const secureStorage = new SecureStorage('encryption-key', 'localStorage');

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
    const phoneNumber = ref(null);
    const postalCode = ref(null);
    const address = ref(null);

    const login = async (credentials) => {
      try {
        const response = await authService.auth.login(credentials);
        if (response) {
          showToast('success', 'با موفقیت وارد شدید');
        }
        token.value = response.token;
        idNumber.value = response.idNumber;
        firstName.value = response.firstName;
        lastName.value = response.lastName;
        setTimeout(() => {
          router.push('/panel/dashboard');
        }, 2000);
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    const logout = async () => {
      secureStorage.clear();
      router.push('/auth/login');
    };

    const getDepositAccount = async () => {
      try {
        const response = await authService.depositAccount.get();
        console.log(response);
        depositAccountStatus.value = response?.status;
        depositAccountData.value = response?.result;
        console.log(response?.result);
      } catch (error) {
        console.error('Get deposit account failed:', error);
      }
    };

    const createDepositAccount = async (credentials) => {
      try {
        const response = await authService.depositAccount.create(credentials);
        console.log('create account', response);
        showToast('success', 'اکانت شما با موفقیت ساخته شد');
        id.value = response.data.id;
      } catch (error) {
        console.error('Create deposit account failed:', error);
      }
    };

    const deleteDepositAccount = async (slug) => {
      try {
        const response = await authService.depositAccount.delete(slug);
        depositAccountData.value = null;
        id.value = null;
        console.log(response);
      } catch (error) {
        console.error('Delete deposit account failed:', error);
      }
    };

    const getTransactions = async () => {
      try {
        const response = await authService.transactions.get();
        numberOfTransactions.value = response.count;
        transactions.value = response.results;
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
      phoneNumber,
      postalCode,
      address,
      login,
      logout,
      getDepositAccount,
      createDepositAccount,
      deleteDepositAccount,
      getTransactions
    };
  },
  {
    // persist: {
    //   enabled: true,
    //   strategies: [
    //     {
    //       storage: localStorage
    //     }
    //   ]
    // }
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
