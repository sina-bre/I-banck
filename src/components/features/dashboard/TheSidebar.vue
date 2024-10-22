<script setup>
import { ref, computed } from 'vue';
import { convertToPersianNumber } from '@/utilities/convertToPersianNumber';
import SidebarItem from './SidebarItem.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const activeIndex = ref(0);

const toggleActive = async (item, index) => {
  activeIndex.value = index;
  if (item.exit) {
    try {
      await userStore.logout();
    } catch (error) {
      console.log('error', error);
    }
  }
};

const props = defineProps({
  firstName: {
    type: String,
    required: true,
    default: 'محمد جواد'
  },
  lastName: {
    type: String,
    required: true,
    default: 'رحمانی نسب'
  },
  nationalCode: {
    type: String,
    required: true,
    default: '۰۹۱۲۳۴۵۶۷۸'
  }
});

const name = computed(() => props.lastName + ' ' + props.firstName);
const computedNationalCode = computed(() => convertToPersianNumber(Number(props.nationalCode)));
</script>

<template>
  <nav class="nav">
    <section class="nav__info">
      <span class="nav__user-name" id="sidebar-name"> {{ name }} </span>
      <div class="nav__user-code">
        <span class="nav__user-code-label">کدملی:</span>
        <span class="nav__user-code-value" id="national-id">{{ computedNationalCode }}</span>
      </div>
    </section>
    <hr class="nav__divider" />
    <section class="nav__items-wrapper">
      <ul>
        <SidebarItem
          v-for="(item, index) in items"
          :key="index"
          :icon="item.icon"
          :text="item.text"
          :item-class="item.class"
          :isActive="activeIndex === index"
          @toggleActive="toggleActive(item, index)"
        />
      </ul>
    </section>
  </nav>
</template>

<script>
const items = [
  { icon: 'dashboard', text: 'داشبورد', isActive: true },
  { icon: 'account', text: 'حساب' },
  { icon: 'facilities', text: 'تسهیلات' },
  { icon: 'cardOperation', text: 'عملیات کارت' },
  { icon: 'electronicPromissoryNote', text: 'سفته الکترونیک' },
  { icon: 'services', text: 'خدمات' },
  { icon: 'exit', text: 'خروج', class: 'item--exit', exit: true }
];
</script>

<style scoped lang="scss">
.nav {
  background: var(--Surface);
  border-radius: 0.75rem;
  padding: 1.5rem 0 0.5rem 0;
  @include mixins.box(13.75rem, 50.25rem);
  @include mixins.flex($dir: column, $justify: flex-start, $align: center);
  gap: 1.25rem;

  &__info {
    @include mixins.flex($dir: column, $align: center);
    gap: 2.5rem;
  }

  &__user-name {
    color: var(--Text-Title, #3c4351);
    text-align: center;
    @include mixins.text(1.125rem, 700);
    line-height: 28px;
    width: 10.75rem;
  }

  &__user-code {
    @include mixins.flex($justify: space-between, $align: center);
    align-self: stretch;
    direction: rtl;
    &_label {
      color: var(--Gray);
      @include mixins.text(0.75rem, 400);
    }
    &_value {
      color: var(--black-500);
      @include mixins.text(1rem, 600);
    }
  }

  &__divider {
    border: none;
    width: 196px;
    height: 1px;
    background-color: #e2edff;
  }

  &__items-wrapper {
    direction: rtl;
    padding: 0 0.5rem;
    gap: 0.125rem;
    align-self: stretch;
    @include mixins.flex($align: flex-start);

    ul {
      align-self: stretch;
      @include mixins.flex($dir: column);
      flex-basis: 100%;
    }
  }
}
</style>
