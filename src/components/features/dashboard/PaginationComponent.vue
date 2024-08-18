<script setup>
import { ref, computed, watch } from 'vue';
import IconLoader from '@/components/shared/IconLoader.vue';
import { convertToPersianNumber } from '@/utilities/convertToPersianNumber';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    default: 1
  }
});

const emits = defineEmits(['pageChange']);

const activePageNumber = ref(props.currentPage);

watch(activePageNumber, (newValue) => {
  emits('pageChange', newValue);
});

const increaseActivePageNumber = () => {
  if (activePageNumber.value < props.totalPages) {
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
const isNextDisabled = computed(() => activePageNumber.value >= props.totalPages);

const paginationItems = computed(() => {
  let startPage = Math.max(activePageNumber.value - 1, 1);
  let endPage = startPage + 2;

  if (endPage > props.totalPages) {
    endPage = props.totalPages;
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
</script>

<template>
  <div class="pagination">
    <button @click="decreaseActivePageNumber" :disabled="isPreviousDisabled" class="angle">
      <IconLoader
        icon="angleLeft"
        width="1.125rem"
        height="1.125rem"
        color="#8999b9"
        :class="{ 'disable-button': isPreviousDisabled }"
      />
    </button>

    <div
      v-for="item in paginationItems"
      :key="item.pageNumber"
      class="page"
      :class="{ 'active-page': item.isActive }"
      @click="setActivePage(item.pageNumber)"
    >
      {{ convertToPersianNumber(item.pageNumber) }}
    </div>

    <button
      @click="increaseActivePageNumber"
      :disabled="isNextDisabled"
      class="angle"
      :class="{ 'disable-button': isNextDisabled }"
    >
      <IconLoader icon="angleRight" width="1.125rem" height="1.125rem" color="#8999b9" />
    </button>
  </div>
</template>

<style scoped>
.pagination {
  direction: ltr;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
}
.angle {
  display: flex;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background: var(--Surface-Lightblue, #f9fafb);
}
.page {
  display: flex;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background: var(--Surface-Lightblue, #f9fafb);
  color: var(--Gray, #8999b9);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
}

.active-page {
  background: var(--primary-500, #4152a0);
  color: var(--Text-On-Primary, #fff);
}

.disable-button {
  opacity: 0.6;
}
</style>
