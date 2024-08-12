<template>
  <div class="login-form">
    <HeadingLogo />
    content
    <CustomButton />
  </div>
</template>

<script setup>
import HeadingLogo from './HeadingLogo.vue';
import CustomButton from '@/components/global/CustomButton.vue';
</script>

<style scoped lang="scss">
.form {
  height: 12.5rem;
  @include mixins.flex(center, center, column);
  gap: 2rem;
  width: 22.1rem;

  &__input-group {
    @include mixins.flex(center, center, column);
    width: 100%;
  }

  &__submit-group {
    width: 100%;
  }
}
</style>
