<script setup>
import { computed } from 'vue';
import IconLoader from './components/shared/IconLoader.vue';
// import { RouterView } from 'vue-router';
// import CustomToast from './components/global/CustomToast.vue';
import TheTable from '@/components/features/dashboard/TheTable.vue';
import { convertToPersianNumber } from './utilities/convertToPersianNumber';

const transactions = [
  {
    type: 'withdraw',
    date: '2024-07-14 12:53:35',
    amount: '512606758'
  },
  {
    type: 'deposit',
    date: '2024-07-17 12:53:35',
    amount: '863937943'
  },
  {
    type: 'withdraw',
    date: '2024-07-17 12:53:35',
    amount: '740825361'
  },
  {
    type: 'withdraw',
    date: '2024-07-14 12:53:35',
    amount: '512606758'
  },
  {
    type: 'withdraw',
    date: '2024-07-18 12:53:35',
    amount: '962769900'
  },
  {
    type: 'deposit',
    date: '2024-07-15 12:53:35',
    amount: '129365939'
  },
  {
    type: 'deposit',
    date: '2024-07-14 12:53:35',
    amount: '411745627'
  },
  {
    type: 'withdraw',
    date: '2024-07-14 12:53:35',
    amount: '960845825'
  },
  {
    type: 'withdraw',
    date: '2024-07-14 12:53:35',
    amount: '182193093'
  },
  {
    type: 'deposit',
    date: '2024-07-14 12:53:35',
    amount: '701265621'
  },
  {
    type: 'withdraw',
    date: '2024-07-11 12:53:35',
    amount: '989765803'
  },
  {
    type: 'deposit',
    date: '2024-07-15 12:53:35',
    amount: '517469573'
  },
  {
    type: 'withdraw',
    date: '2024-07-14 12:53:35',
    amount: '512606758'
  },
  {
    type: 'deposit',
    date: '2024-07-17 12:53:35',
    amount: '863937943'
  },
  {
    type: 'withdraw',
    date: '2024-07-17 12:53:35',
    amount: '740825361'
  },
  {
    type: 'withdraw',
    date: '2024-07-14 12:53:35',
    amount: '512606758'
  },
  {
    type: 'withdraw',
    date: '2024-07-18 12:53:35',
    amount: '962769900'
  },
  {
    type: 'deposit',
    date: '2024-07-15 12:53:35',
    amount: '129365939'
  },
  {
    type: 'deposit',
    date: '2024-07-14 12:53:35',
    amount: '411745627'
  },
  {
    type: 'withdraw',
    date: '2024-07-14 12:53:35',
    amount: '960845825'
  },
  {
    type: 'withdraw',
    date: '2024-07-14 12:53:35',
    amount: '182193093'
  },
  {
    type: 'deposit',
    date: '2024-07-14 12:53:35',
    amount: '701265621'
  },
  {
    type: 'withdraw',
    date: '2024-07-11 12:53:35',
    amount: '989765803'
  },
  {
    type: 'deposit',
    date: '2024-07-15 12:53:35',
    amount: '517469573'
  },
  {
    type: 'withdraw',
    date: '2024-07-19 12:53:35',
    amount: '218225923'
  },
  {
    type: 'deposit',
    date: '2024-07-12 12:53:35',
    amount: '339523346'
  },
  {
    type: 'withdraw',
    date: '2024-07-13 12:53:35',
    amount: '65924007'
  },
  {
    type: 'deposit',
    date: '2024-07-16 12:53:35',
    amount: '592290897'
  },
  {
    type: 'deposit',
    date: '2024-07-18 12:53:35',
    amount: '92168285'
  },
  {
    type: 'deposit',
    date: '2024-07-12 12:53:35',
    amount: '597042380'
  },
  {
    type: 'deposit',
    date: '2024-07-11 12:53:35',
    amount: '259449781'
  },
  {
    type: 'withdraw',
    date: '2024-07-20 12:53:35',
    amount: '606907698'
  },
  {
    type: 'deposit',
    date: '2024-07-12 12:53:35',
    amount: '327956625'
  },
  {
    type: 'withdraw',
    date: '2024-07-19 12:53:35',
    amount: '218225923'
  },
  {
    type: 'deposit',
    date: '2024-07-12 12:53:35',
    amount: '339523346'
  },
  {
    type: 'withdraw',
    date: '2024-07-13 12:53:35',
    amount: '65924007'
  },
  {
    type: 'deposit',
    date: '2024-07-16 12:53:35',
    amount: '592290897'
  },
  {
    type: 'deposit',
    date: '2024-07-18 12:53:35',
    amount: '92168285'
  },
  {
    type: 'deposit',
    date: '2024-07-12 12:53:35',
    amount: '597042380'
  },
  {
    type: 'deposit',
    date: '2024-07-11 12:53:35',
    amount: '259449781'
  },
  {
    type: 'withdraw',
    date: '2024-07-20 12:53:35',
    amount: '606907698'
  },
  {
    type: 'deposit',
    date: '2024-07-12 12:53:35',
    amount: '327956625'
  }
];

const headers = [
  {
    key: 'type',
    label: 'نوع تراکنش'
  },
  {
    key: 'date',
    label: 'تاریخ و ساعت تراکنش'
  },
  {
    key: 'amount',
    label: 'مبلغ تراکنش'
  }
];

const persianTransactions = computed(() =>
  transactions.map((item, index) => {
    const newItem = {
      ...item,
      id: index + 1,
      type: item.type === 'deposit' ? 'واریز' : 'برداشت',
      amount: convertToPersianNumber(item.amount),
      date: new Date(item.date).toLocaleString('fa-IR')
    };
    return newItem;
  })
);

console.log(transactions);
</script>

<template>
  <!-- <RouterView> </RouterView>
  <CustomToast /> -->
  <TheTable :data="persianTransactions" :headers="headers" :rowsPerPage="5">
    <template #type="{ row, value }">
      <IconLoader
        :icon="value === 'واریز' ? 'deposit' : 'withdraw'"
        width="2.1rem"
        height="2.1rem"
        :color="value === 'واریز' ? '#00BF7A' : '#EB482B'"
      />
    </template>
  </TheTable>
</template>

<style scoped lang="scss"></style>
