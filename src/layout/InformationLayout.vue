<script setup>
import TheHeader from '@/components/global/TheHeader.vue';
import InformationWrapper from '@/components/cards/InformationWrapper.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const title = computed(() => {
  if (route.path === '/info/DepositAccountForm') {
    return 'اطلاعات فردی';
  } else if (route.path === '/info/upload-img') {
    return 'تصویر کارت ملی';
  } else {
    return 'تایید اطلاعات';
  }
});
</script>
<template>
  <main>
    <TheHeader />
    <InformationWrapper :title="title" />
  </main>
</template>

<style></style>
