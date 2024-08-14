<script setup>
import TheHeader from '@/components/global/TheHeader.vue';
import TheSidebar from '@/components/features/dashboard/TheSidebar.vue';
</script>
<template>
  <main>
    <header>
      <TheHeader />
    </header>
    <div class="dashboard-container">
      <main class="dashboard-container__main">
        <nav>
          <TheSidebar />
        </nav>

        <RouterView />
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
}
</style>
