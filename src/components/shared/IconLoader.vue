<script setup>
import { computed, ref, onMounted, markRaw } from 'vue';
import icons from '@/helpers/icons/icons';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#000'
  },
  width: {
    type: [String, Number],
    default: 24
  },
  height: {
    type: [String, Number],
    default: 24
  }
});

const iconColor = computed(() => props.color);

const iconWidth = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width;
});

const iconHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height;
});

const iconComponent = ref(null);

onMounted(async () => {
  const loadIcon = icons[props.icon];
  if (loadIcon) {
    try {
      const component = await loadIcon();
      iconComponent.value = markRaw(component.default || component);
    } catch (error) {
      console.error(`Error loading icon: ${props.icon}`, error);
    }
  } else {
    console.warn(`Icon not found: ${props.icon}`);
  }
});
</script>

<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :style="{ color: iconColor, width: iconWidth, height: iconHeight }"
  />
  <p v-else>Icon could not be loaded.</p>
</template>
