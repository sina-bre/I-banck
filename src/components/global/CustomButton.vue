<script setup>
import { computed } from 'vue';
const props = defineProps({
  text: {
    type: String,
    default: 'ورود'
  },
  loading: {
    type: Boolean,
    default: false
  },
  bgColor: {
    type: String,
    default: 'var(--primary-500)'
  },
  color: {
    type: String,
    default: 'var(--Text-On-Primary)'
  },
  width: {
    type: String,
    default: '100%'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const computedDisable = computed(() => props.disabled || props.loading);
</script>

<template>
  <button class="custom-btn" :style="{ width }" :disabled="computedDisable">
    <div v-if="!loading" class="custom-btn__body">
      <p>{{ text }}</p>
      <slot name="btn-icon"></slot>
    </div>
    <div class="custom-btn__loading" v-else></div>
  </button>
</template>

<style scoped lang="scss">
.custom-btn {
  @include mixins.box($height: 3rem);
  @include mixins.flex(center, center);
  border-radius: var(--btn-radius);
  color: v-bind(color);
  background-color: v-bind(bgColor);
  padding: 0.5rem 1rem;
  border: none;
  min-width: 12.5rem;
  cursor: pointer;

  &__loading {
    @include mixins.flex(center, center);
    width: 22px;
    height: 22px;
    border: 3px solid transparent;
    border-top: 3px solid var(--Surface);
    border-left: 3px solid var(--Surface);
    border-bottom: 3px solid var(--Surface);
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  &__body {
    @include mixins.flex(center, center);
    gap: 0.75rem;
    @include mixins.text(1rem, 700);
  }
}

.custom-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
