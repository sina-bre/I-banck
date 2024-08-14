<script setup>
import CustomButton from '@/components/global/CustomButton.vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();

const goNextPage = () => {
  router.push('/panel/dashboard');
};
const goPrevPage = () => {
  router.push('/info/upload-img');
};
</script>
<template>
  <section class="confirm-fields">
    <div class="confirm-fields__item">
      <p class="confirm-fields__label">نام:</p>
      <p class="confirm-fields__value" id="name-field">
        {{ userStore.firstName ? userStore.firstName : 'نامشخص' }}
      </p>
    </div>
    <div class="confirm-fields__item confirm-fields__item--gap">
      <p class="confirm-fields__label">نام خانوادگی:</p>
      <p class="confirm-fields__value" id="family-name-field">
        {{ userStore.lastName ? userStore.lastName : 'نامشخص' }}
      </p>
    </div>
    <div class="confirm-fields__item">
      <p class="confirm-fields__label">کدپستی:</p>
      <p class="confirm-fields__value" id="postal-field">
        {{ userStore.postalCode ? userStore.postalCode : 'نامشخص' }}
      </p>
    </div>
    <div class="confirm-fields__item confirm-fields__item--stretch">
      <p class="confirm-fields__label">محل سکونت:</p>
      <p class="confirm-fields__value" id="address-field">
        {{ userStore.address ? userStore.address : 'نامشخص' }}
      </p>
    </div>
    <div class="confirm-fields__actions">
      <CustomButton
        @click="goPrevPage"
        text="قبلی"
        color="var(--Text-Title)"
        bgColor="var(--primary-50)"
        width="13rem"
      />
      <CustomButton
        @click="goNextPage"
        text="افتتاح حساب"
        color="var(--Text-On-Primary)"
        bgColor="var(--primary-500)"
        width="13rem"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.confirm-fields {
  width: 100%;
  text-align: right;
  @include mixins.flex($justify: flex-start);
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-top: 2.5rem;

  &__item {
    @include mixins.flex($dir: column, $justify: flex-start, $align: start);
    gap: 0.25rem;

    &--gap {
      padding: 0 7.5rem;
    }

    &--stretch {
      flex-basis: 100%;
    }
  }

  &__label {
    color: var(--Gray);
    opacity: 0.6;
    @include mixins.text(1rem, 400);
  }

  &__value {
    color: var(--black-500);
    @include mixins.text(1rem, 600);
  }
  &__actions {
    width: 100%;
    @include mixins.flex(flex-end);
    gap: 1rem;
  }
}
</style>
