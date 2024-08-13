<script setup>
import HeadingLogo from '@/components/features/auth/HeadingLogo.vue';
import CustomButton from '@/components/global/CustomButton.vue';
</script>

<template>
  <div class="login-form">
    <HeadingLogo />
    content
    <CustomButton width="22.125rem" />
  </div>
</template>

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
