<script setup>
import { ref, computed, watch } from 'vue';

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 5
  }
});

const activePageNumber = ref(1);
const totalPages = computed(() => Math.ceil(props.data.length / props.itemsPerPage));

const convertToPersianNumber = (num) => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  if (typeof num === 'number')
    return num.toString().replace(/\d/g, (digit) => persianDigits[digit]);
  if (typeof num === 'string') return num.replace(/\d/g, (digit) => persianDigits[digit]);
};

const paginatedData = computed(() => {
  const start = (activePageNumber.value - 1) * props.itemsPerPage;
  return props.data.slice(start, start + props.itemsPerPage);
});

const increaseActivePageNumber = () => {
  if (activePageNumber.value < totalPages.value) {
    activePageNumber.value++;
  }
};

const decreaseActivePageNumber = () => {
  if (activePageNumber.value > 1) {
    activePageNumber.value--;
  }
};

const setActivePage = (pageNumber) => {
  activePageNumber.value = pageNumber;
};

const isPreviousDisabled = computed(() => activePageNumber.value <= 1);
const isNextDisabled = computed(() => activePageNumber.value >= totalPages.value);

const paginationItems = computed(() => {
  let startPage = Math.max(activePageNumber.value - 1, 1);
  let endPage = startPage + 2;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(endPage - 2, 1);
  }

  const items = [];
  for (let i = startPage; i <= endPage; i++) {
    items.push({
      pageNumber: i,
      isActive: i === activePageNumber.value
    });
  }

  return items;
});

watch(
  () => props.data,
  () => {
    activePageNumber.value = 1;
  }
);
</script>

<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>مبلغ تراکنش</th>
          <th>تاریخ و ساعت تراکنش</th>
          <th>نوع تراکنش</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="index">
          <td>{{ convertToPersianNumber(item.Amount) }}</td>
          <td>{{ new Date(item.dateTime).toLocaleString('fa-IR') }}</td>
          <td>
            <span v-if="item.type === 'deposit'" class="deposit">واریز</span>
            <span v-else class="withdraw">برداشت</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button
        class="pagination-item back-button"
        @click="decreaseActivePageNumber"
        :disabled="isPreviousDisabled"
      >
        <img src="./assets/icons/pagination-angle-left.svg" alt="Back" />
      </button>

      <div
        v-for="item in paginationItems"
        :key="item.pageNumber"
        class="pagination-item"
        :class="{ 'active-page': item.isActive }"
        @click="setActivePage(item.pageNumber)"
      >
        {{ item.pageNumber }}
      </div>

      <button
        class="pagination-item next-button"
        @click="increaseActivePageNumber"
        :disabled="isNextDisabled"
      >
        <img src="./assets/icons/pagination-angle-right.svg" alt="Next" />
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  border: none;
}
.container {
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: right;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}

.pagination-item {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--Gray, #8999b9);
  border-radius: 4px;
  background: var(--Surface-Lightblue, #f9fafb);
  cursor: pointer;
}

.active-page {
  background-color: var(--primary-500, #4152a0);
  color: var(--Text-On-Primary, #fff);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
