<script setup>
import IconLoader from '../shared/IconLoader.vue';
import { ref } from 'vue';

const text = ref('');
const type = ref('');
const visible = ref(false);
const show = ref(false);

const showToast = (state, message, duration = 3000) => {
  text.value = message;
  type.value = state;
  visible.value = true;
  show.value = true;
  setTimeout(() => {
    hideToast();
  }, duration);
};

const hideToast = () => {
  visible.value = false;
  setTimeout(() => {
    show.value = false;
  }, 700);
};
defineExpose({ showToast });
</script>

<template>
  <div v-if="show" class="toast" :class="{ 'toast--hidden': !visible }">
    <div
      class="toast__box"
      :class="type === 'success' ? 'toast__box--success' : 'toast__box--error'"
    >
      <IconLoader
        v-if="type === 'error'"
        icon="info"
        width="1.5rem"
        height="1.5rem"
        color="black"
      />
      <IconLoader v-else icon="check" width="1.5rem" height="1.5rem" color="black" />
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toast {
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  z-index: 40;
  overflow: hidden;
  width: 19.6rem;
  height: 4rem;
  transition: display 1s ease-out;
  animation: show_toast 0.7s ease-in forwards;

  &--hidden {
    animation: hide_toast 0.7s ease-out forwards;
  }

  &__box {
    @include mixins.flex(flex-start, center, row);
    @include mixins.text(1rem, 700);
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 1rem;
    color: var(--Text-On-Primary);

    &--error {
      background: var(--fail-500, #eb482b);
    }

    &--success {
      background: var(--success-500, #00ae6f);
    }
    &--info {
      background: var(--primary-400);
    }

    &-icon {
      @include mixins.box(1.5rem);
      @include mixins.flex(center, center);
    }
  }
}
</style>
