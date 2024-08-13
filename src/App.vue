<script setup>
import DropdownBox from './components/global/DropdownBox.vue';
import IconLoader from './components/shared/IconLoader.vue';
</script>

<template>
  <div>
    <DropdownBox>
      <template v-slot:first-icon>
        <IconLoader icon="account" width="1.5rem" height="1.5rem" color="black" />
      </template>
      <template v-slot:second-icon>
        <IconLoader icon="logo" width="1.5rem" height="1.5rem" color="red" />
      </template>
    </DropdownBox>
  </div>
</template>

<style scoped lang="scss"></style>
