<script setup>
defineProps({
  firstTitle: {
    type: String,
    default: 'ادیت'
  },
  secondTitle: {
    type: String,
    default: 'حذف'
  }
});
</script>
<template>
  <div class="dropdown">
    <span class="dropdown__item" @click="$emit('editClicked')">
      <slot name="first-icon"></slot>
      <p>{{ firstTitle }}</p>
    </span>
    <span class="dropdown__item dropdown__item-state--error" @click="$emit('removeClicked')">
      <slot name="second-icon"></slot>
      <p>{{ secondTitle }}</p>
    </span>
  </div>
</template>
<style scoped lang="scss">
.dropdown {
  @include mixins.flex(flex-start, flex-start, column);
  background-color: var(--Surface);
  color: var(--black-100);
  border-radius: 0.75rem;
  padding: 0.75rem;
  white-space: nowrap;
  max-width: 12rem;

  &__item {
    @include mixins.flex(flex-start);
    gap: 0.5rem;
    @include mixins.text(0.875rem, 400);
    width: 100%;
    cursor: pointer;

    &-state--error {
      color: var(--fail-500);
    }
  }
}

.dropdown__item:first-child {
  border-bottom: 1px solid #e2edff;
  padding-bottom: 0.75rem;
}
.dropdown__item:last-child {
  padding-top: 0.75rem;
}
</style>
