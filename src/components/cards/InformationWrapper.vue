<script setup>
import { RouterView } from 'vue-router';
defineProps({
  title: {
    type: String,
    default: 'اطلاعات فردی'
  }
});
</script>

<template>
  <div>
    <section class="dashboard-content">
      <div class="dashboard-content__card information-card">
        <div class="information-card__heading">
          <h1 class="information-card__title">{{ title }}</h1>
        </div>
        <div class="information-card__divider"></div>
        <div class="information-card__content">
          <RouterView />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.dashboard-content {
  @include mixins.flex(center, center);
  &__card {
    margin-top: 2.62rem;
  }
}
.information-card {
  width: 87.5rem;
  padding: 2.5rem;
  border-radius: var(--card-radius);
  background-color: var(--Surface);
  height: min-content;

  &__title {
    color: var(--Text-Title, #3c4351);
    text-align: center;
    font-size: 1.25rem;
    @include mixins.text(1.25rem, 700);
  }
  &__divider {
    @include mixins.box(100%, 0.0625rem);
    background-color: var(--line);
    margin: 2.5rem 0;
  }

  &__content {
    width: 100%;
    @include mixins.flex($dir: column, $align: start);
    gap: 2.5rem;
    &-top {
      @include mixins.flex(space-between);
      gap: 2rem;
    }
  }

  &__actions {
    width: 100%;
    @include mixins.flex(flex-end);
    gap: 1rem;
  }

  &__btn-prev {
    transition: background-color 0.25s linear;

    &:hover {
      background-color: var(--primary-100);
    }
  }
  &__btn-submit {
    transition: background-color 0.25s linear;

    &:hover {
      background-color: var(--primary-600);
    }
  }
}
</style>
