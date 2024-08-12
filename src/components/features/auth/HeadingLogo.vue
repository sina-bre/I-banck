<template>
  <div class="brand">
    <div class="brand__logo">
      <img :src="imageUrl" alt="" width="100%" />
    </div>
    <section class="brand__info">
      <p class="brand__title">{{ title }}</p>
      <p class="brand__subtitle">
        {{ subTitle }}
      </p>
    </section>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'پارت بارنک'
  },
  subTitle: {
    type: String,
    default: 'تجربه‌ای نوین در بانک داری'
  },
  imageUrl: {
    type: String,
    default: '../../../assets/images/Logo.svg'
  }
});
</script>

<style scoped lang="scss">
@use '../../../assets/scss/utilities/mixins' as mixins;
.brand {
  @include mixins.flex(center, center, row);
  height: 5.75rem;
  gap: 1rem;
  color: var(--primary-500);

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
