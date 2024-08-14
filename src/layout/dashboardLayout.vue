<script setup>
import TheHeader from '@/components/global/TheHeader.vue';
// import CustomButton from '@/components/global/CustomButton.vue';
</script>
<template>
  <main>
    <header>
      <TheHeader />
    </header>
    <div class="dashboard-container">
      <main class="dashboard-container__main">
        <nav></nav>
      </main>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.dashboard-container {
  background-color: var(--Background);
  &__main {
    margin-top: 2.5rem;
    width: 100%;
    @include mixins.flex($justify: center, $align: start);
    gap: 1rem;
  }

  &__cards {
    @include mixins.flex($justify: flex-start);
    max-width: 72.75rem;
    gap: 1rem;
    flex-wrap: wrap;
    position: relative;

    &-overlay {
      position: absolute;
      @include mixins.box(100%);
      left: 0;
      top: 0;
      z-index: 2;
    }
  }
}
</style>
