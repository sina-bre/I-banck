<script setup>
import { ref, computed } from 'vue';
import PaginationComponent from './PaginationComponent.vue';
import IconLoader from '@/components/shared/IconLoader.vue';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    required: true
  },
  rowsPerPage: {
    type: Number,
    default: 10
  }
});

const searchQuery = ref('');
const activePageNumber = ref(1);
const sortOrder = ref('asc');
const sortKey = ref(null);

const filteredData = computed(() => {
  let filtered = props.data;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(query))
    );
  }

  if (sortKey.value) {
    filtered.sort((a, b) => {
      const compareA = a[sortKey.value];
      const compareB = b[sortKey.value];
      if (sortOrder.value === 'asc') {
        return compareA > compareB ? 1 : compareA < compareB ? -1 : 0;
      } else {
        return compareA < compareB ? 1 : compareA > compareB ? -1 : 0;
      }
    });
  }

  return filtered;
});

const paginatedData = computed(() => {
  const start = (activePageNumber.value - 1) * props.rowsPerPage;
  const end = start + props.rowsPerPage;
  return filteredData.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.rowsPerPage));

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const handlePageChange = (pageNumber) => {
  activePageNumber.value = pageNumber;
};
</script>

<template>
  <div class="table-container">
    <div class="table-container__controls controls">
      <div class="controls__title">لیست تراکنش ها<span class="controls__unit">(ریال)</span></div>
      <div class="controls__input-group input-group">
        <select
          @change="handleSort($event.target.value)"
          class="input-group__sort-transactions sort-transactions"
        >
          <option class="sort-transactions__option" value="" selected>همه</option>
          <option
            class="sort-transactions__option"
            v-for="header in headers"
            :key="header.key"
            :value="header.key"
          >
            {{ header.label }}
          </option>
        </select>
        <div class="search-input-container">
          <input
            class="search-input-container__input"
            type="text"
            v-model="searchQuery"
            placeholder="جستجو"
          />
          <div class="search-input-container__icon">
            <IconLoader icon="search" width="1.125rem" height="1.125rem" color="#4152A0" />
          </div>
        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.key">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in paginatedData" :key="row.id">
          <td v-for="header in headers" :key="header.key">
            {{ row[header.key] }}
          </td>
        </tr>
      </tbody>
    </table>

    <PaginationComponent
      :totalPages="totalPages"
      :currentPage="activePageNumber"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<style scoped lang="scss">
.table-container {
  width: 72.75rem;
  height: 32.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.75rem;
  background: var(--Surface, #fff);
  box-shadow: 0px 0px 4px 0px rgba(0, 67, 101, 0.05);
}

.controls {
  display: flex;
  justify-content: space-between;
  &__title {
    color: var(--Text-Title, #3c4351);
    font-size: 1.25rem;
    font-weight: 700;
  }
  &__unit {
    color: var(--Text-Gray, #8999b9);
    font-size: 1rem;
    font-weight: 400;
  }
}

.input-group {
  display: flex;
  gap: 0.75rem;
}

.sort-transactions {
  padding-left: 2rem;
  width: 11.4375rem;
  font-family: 'Peyda';
  border-radius: 0.5rem;
  border: 1px solid var(--Line, #e2edff);
  background: var(--Surface, #fff);
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  &__option {
    border: none;
    height: 2.125rem;
    color: var(--Text-Title, #3c4351);
    font-size: 0.875rem;
    font-weight: 400;
    outline: none;
  }
}

.sort-transactions:focus,
.sort-transactions:active,
.sort-transactions:focus-visible {
  border: 2px solid var(--Primary-Primary-200, #a8afd3) !important;
  outline: none;
  border-inline: none;
}

.search-input-container {
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid var(--Line, #e2edff);
  &__input {
    border-radius: 0 0.5rem 0.5rem 0;
    border: none;
    width: 13.94rem;
    height: 2.125rem;
    padding-right: 0.5rem;
    font-family: 'Peyda';
  }
  &__input::placeholder {
    font-family: 'Peyda';
    color: var(--Text-Gray, #8999b9);
    font-family: Peyda;
    font-size: 0.875rem;
    font-weight: 400;
  }
  &__icon {
    background: var(--Primary-Primary-50, #eceef6);
    width: 2.125rem;
    height: 2.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem 0 0 0.5rem;
  }
}

.table {
  width: 69.8rem;
  //   width: 72.75rem;
  height: 364px;
  //   @include box(72.5rem, 32.5rem);

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
}
</style>
