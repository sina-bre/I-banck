<script setup>
import CustomButton from '../global/CustomButton.vue';
import router from '@/router';
</script>
<template>
  <main class="main">
    <img src="../../assets/images/404.svg" alt="" />
    <CustomButton
      text=" ورود به لاگین "
      color="var(--Text-Title)"
      bgColor="var(--primary-100)"
      @click="router.push('/auth/login')"
      width="13rem"
    ></CustomButton>
  </main>
</template>

<style lang="scss" scoped>
.main {
  @include mixins.box(100vw, 100vh);
  @include mixins.flex(center, center, column);
  gap: 2rem;
}
</style>
