<script setup>
import IconLoader from '../shared/IconLoader.vue';

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>
<template>
  <div class="popover">
    <div v-for="(item, index) in items" :key="index">
      <span class="popover__item" @click="$emit('emitClicked', item.action)">
        <IconLoader :icon="item.icon" :color="item.color" width="1.25rem" height="1.25rem" />
        <p :style="{ color: item.color }">
          {{ item.title }}
        </p>
      </span>
      <div v-if="index !== items.length - 1" class="popover__divider"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.popover {
  @include mixins.flex(flex-start, flex-start, column);
  background-color: var(--Surface);
  color: var(--Text-Title);
  border-radius: 0.75rem;
  gap: 0.5rem;
  padding: 0.5rem;
  white-space: nowrap;
  max-width: 12rem;
  min-width: 5.8rem;

  &__item {
    @include mixins.flex(flex-start);
    gap: 0.5rem;
    @include mixins.text(0.875rem, 400);
    width: 100%;
    cursor: pointer;
  }

  &__divider {
    height: 1px;
    width: 100%;
    background-color: var(--line);
    margin-top: 0.5rem;
  }
}
</style>
