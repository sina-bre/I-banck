<script setup>
import IconLoader from '../shared/IconLoader.vue';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();

const userPhone = ref(userStore.phoneNumber);

defineProps({
  title: {
    type: String,
    default: 'پارت بانک'
  },
  userImg: {
    type: String,
    default: '@/assets/images/user.svg'
  }
});
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <div class="header__brand-logo">
        <IconLoader icon="logo" color="var(--primary-500)" width="24" height="24" />
      </div>
      <p class="header__brand-title">{{ title }}</p>
    </div>
    <div class="header__user-information user-information">
      <div class="user-information__notify">
        <IconLoader color="var(--Gray)" icon="notification" width="40" height="40" />
      </div>
      <div class="user-information__avatar">
        <img src="@/assets/images/user.svg" alt="" />
      </div>
      <div class="user-information__phone">{{ userPhone ? userPhone : '-' }}</div>
      <div class="user-information__drop">
        <IconLoader color="var(--black-500)" icon="angleDown" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  @include mixins.flex(space-between);
  background-color: var(--Surface);
  @include mixins.box($height: 4.25rem);
  box-shadow: 0px 2px 8px 0px rgba(21, 0, 43, 0.05);
  padding: 0 2.5rem;

  &__brand {
    @include mixins.flex($align: center);
    gap: 0.75rem;

    &__title {
      color: var(--Text-Title);
      @include mixins.text(1rem, 400);
    }
    &-logo {
      @include mixins.box(1.7845rem, 1.5rem);
      @include mixins.flex(center, center, row);
    }
  }
}
.user-information {
  @include mixins.flex();
  gap: 0.5rem;

  &__avatar {
    border-radius: 50%;
    @include mixins.box(2.5625rem);
  }

  &__phone {
    color: var(--Text-Title);
    @include mixins.text(0.875rem, 400);
  }

  &__drop {
    @include mixins.flex($align: center, $dir: row-reverse);
    gap: 0.5rem;
    cursor: pointer;
  }

  &__notify {
    @include mixins.flex($align: center, $justify: center);
    cursor: pointer;
    padding-left: 0.5rem;
  }
}
</style>
