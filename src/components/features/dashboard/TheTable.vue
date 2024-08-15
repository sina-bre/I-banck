<script setup>
import { ref, computed } from 'vue';

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

const currentPage = ref(1);

const headers = ['مبلغ تراکنش', 'تاریخ و ساعت تراکنش', 'نوع تراکنش'];

const totalPages = computed(() => Math.ceil(props.data.length / props.itemsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return props.data.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const formatAmount = (amount) => {
  return new Intl.NumberFormat('fa-IR').format(amount);
};

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(date).toLocaleDateString('fa-IR', options);
};

const translateType = (type) => {
  return type === 'deposit' ? 'واریز' : 'برداشت';
};
</script>

<template>
  <div class="table-container">
    <div class="table-container__search-controls search-controls">
      <div class="search-controls__title title">
        <span class="title__main">لیست تراکنش ها</span>
        <span class="title__unit">(ریال)</span>
      </div>
      <section class="search-controls__inputs">
        <TextInput height="2.125rem" width="16.0625rem" placeholder="جست و جو">
          <template v-slot:before-end>
            <div class="icon-background">
              <IconLoader icon="search" width="1rem" height="1rem" color="#4152A0" />
            </div>
          </template>
        </TextInput>
      </section>
    </div>
    <table class="contracts-history-container__table table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.id">
          <td>{{ formatAmount(item.amount) }}</td>
          <td>{{ formatDate(item.date) }}</td>
          <td>
            {{ translateType(item.type) }}
            <span :class="item.type === 'deposit' ? 'table__deposit' : 'table__withdraw'"></span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <div class="pagination-item back-button" @click="prevPage" v-if="currentPage > 1">
        <img src="../../../assets/icons/angle-right.svg" alt="Previous" />
      </div>
      <div
        class="pagination-item"
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ 'active-page': page === currentPage }"
      >
        {{ page }}
      </div>
      <div class="pagination-item next-button" @click="nextPage" v-if="currentPage < totalPages">
        <img src="../../../assets/icons/angle-left.svg" alt="Next" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.table-container {
  margin: auto;
  border-radius: 0.75rem;
  background: var(--Surface, #fff);
  box-shadow: 0px 0px 4px 0px rgba(0, 67, 101, 0.05);
  width: 72.75rem;
  height: 32.5rem;
  padding: 1.5rem;
}

.table-container {
  margin: auto;
  border-radius: 0.75rem;
  background: var(--Surface, #fff);
  box-shadow: 0px 0px 4px 0px rgba(0, 67, 101, 0.05);
  width: 72.75rem;
  height: 32.5rem;
  padding: 1.5rem;
}
.search-controls {
  @include mixins.flex($justify: space-between, $align: center);

  &__title {
    .title__main {
      color: var(--Text-Title, #3c4351);
      @include mixins.text(1.25rem, 700);
    }
    .title__unit {
      color: var(--Text-Gray, #8999b9);
      @include mixins.text(1rem, 400);
    }
  }
}

.icon-background {
  background: var(--Primary-Primary-50, #eceef6);
  width: 100%;
  height: 100%;
  @include mixins.flex();
}

.table {
  direction: ltr;
  width: 1116px;

  & thead tr {
    background: var(--primary-500, #4152a0);
    border-radius: 0.5rem;
    @include mixins.text(1rem, 600);
    color: var(--Text-On-Primary);
  }

  & tbody tr {
    color: var(--black-500);
    @include mixins.text(1rem, 400);
  }

  & tbody tr,
  & thead tr {
    @include mixins.flex($justify: space-between);
  }

  & thead tr th,
  & tbody tr td {
    height: 3.75rem;
    padding: 0.625rem;
    flex-basis: 100%;
    @include mixins.flex($justify: center, $align: center);
  }

  & tbody tr:nth-child(even) {
    background-color: var(--Surface-Lightblue);
    border-radius: 0.5rem;
  }

  &__deposit {
    background-image: url('../../../assets/icons/deposit.svg');
    @include mixins.cover-background;
    background-color: inherit;
    width: 34px;
    height: 34px;
  }

  &__withdraw {
    background-image: url('../../../assets/icons/withdraw.svg');
    @include mixins.cover-background;
    background-color: inherit;
    width: 34px;
    height: 34px;
  }
}

.pagination {
  display: flex;
  justify-content: center;
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
  font-style: normal;
  font-weight: 600;
  color: var(--Gray, #8999b9);
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: var(--Gray, #8999b9);
  border-radius: 4px;
  background: var(--Surface-Lightblue, #f9fafb);
  cursor: pointer;
}

.active-page {
  background-color: var(--primary-500);
  color: var(--Text-On-Primary, #fff);
}

.back-button img,
.next-button img {
  width: 16px;
  height: 16px;
}
</style>
