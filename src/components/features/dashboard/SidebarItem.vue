<script setup>
import { computed } from 'vue';
import IconLoader from '@/components/shared/IconLoader.vue';

const props = defineProps({
  itemClass: {
    type: String,
    default: 'item'
  },
  icon: {
    type: String,
    required: true
  },
  iconWidth: {
    type: String,
    default: '1.25rem'
  },
  iconHeight: {
    type: String,
    default: '1.25rem'
  },
  iconColor: {
    type: String,
    default: 'currentColor'
  },
  text: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    default: '#4152A0'
  }
});

const emit = defineEmits(['toggleActive']);

const toggle = () => {
  emit('toggleActive');
};

const computedActiveClass = computed(() => (props.isActive ? props.itemClass + '--active' : ''));
</script>

<template>
  <li :class="`${itemClass} ${computedActiveClass}`" @click="toggle">
    <div class="item__icon">
      <IconLoader :icon="icon" :width="iconWidth" :height="iconHeight" color="currentColor" />
    </div>
    <span class="item__text">{{ text }}</span>
  </li>
</template>

<style lang="scss" scoped>
.item {
  @include mixins.flex($justify: flex-start);
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 0.75rem;
  align-self: stretch;
  cursor: pointer;
  &__text,
  &__icon {
    color: var(--Text-Gray);
  }

  &:hover {
    border-radius: 0.375rem;
    background-color: var(--Surface-Lightblue);
    .item__text,
    .item__icon {
      font-weight: 700;
      color: var(--primary-500);
    }
  }

  &--active {
    border-radius: 0.375rem;
    background-color: var(--Surface-Lightblue);
    .item__text,
    .item__icon {
      font-weight: 700;
      color: var(--primary-500);
    }
  }
}

.item__icon {
  @include mixins.flex($justify: center, $align: start);
  @include mixins.box(1.25rem);
}

.item__text {
  @include mixins.text(0.875rem, 400);
  height: 1.75rem;
  @include mixins.flex($align: center);
}

.item--exit {
  @include mixins.flex($justify: flex-start);
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 0.75rem;
  align-self: stretch;
  cursor: pointer;
  .item__text,
  .item__icon {
    color: var(--fail-500);
  }
  &:hover {
    border-radius: 0.375rem;
    background-color: var(--fail-50);
    .item__text,
    .item__icon {
      font-weight: 700;
      color: var(--fail-500);
    }
  }

  &--active {
    border-radius: 0.375rem;
    background-color: var(--fail-50);
    .item__text,
    .item__icon {
      font-weight: 700;
      color: var(--fail-500);
    }
  }
}
</style>
