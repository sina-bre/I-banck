<script setup>
import TheHeader from '@/components/global/TheHeader.vue';
import InformationWrapper from '@/components/cards/InformationWrapper.vue';
</script>
<template>
  <main>
    <TheHeader userPhone="09157282736" />
    <InformationWrapper>
      <RouterView />
    </InformationWrapper>
  </main>
</template>

<style></style>
