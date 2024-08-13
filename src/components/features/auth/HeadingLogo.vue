<script setup>
import IconLoader from '@/components/shared/IconLoader.vue';
defineProps({
  title: {
    type: String,
    default: 'پارت بارنک'
  },
  subTitle: {
    type: String,
    default: 'تجربه‌ای نوین در بانک داری'
  },
  icon: {
    type: String,
    default: 'logo'
  }
});
</script>

<template>
  <div class="brand">
    <div class="brand__logo">
      <IconLoader :icon="icon" width="100%" height="100%" color="var(--primary-500)" />
    </div>
    <section class="brand__info">
      <p class="brand__title">{{ title }}</p>
      <p class="brand__subtitle">
        {{ subTitle }}
      </p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.brand {
  @include mixins.flex(center, center, row);
  height: 5.75rem;
  gap: 1rem;
  color: var(--primary-500);
  margin-top: 5.22rem;

  &__logo {
    @include mixins.box(6rem, 6rem);
    @include mixins.flex(center, center, row);
  }

  &__info {
    @include mixins.flex(center, center, column);
    gap: 0.25rem;
  }

  &__title {
    @include mixins.text(2.5rem, 700);
  }

  &__subtitle {
    @include mixins.text(1rem, 400);
  }
}
</style>
