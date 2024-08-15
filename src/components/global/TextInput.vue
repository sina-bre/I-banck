<script setup>
import { computed } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '3rem'
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  labelDynamicClass: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  as: {
    type: String,
    default: 'input'
  },
  rules: {
    type: Object,
    default: () => ({})
  }
});

const { value, errorMessage, meta } = useField(props.name, props.rules);

const inputId = computed(() => props.name);
const computedInputContainerClass = computed(() =>
  meta.touched || meta.dirty
    ? meta.valid
      ? 'input-container-class'
      : 'input-container-class--error'
    : 'input-container-class'
);
</script>

<template>
  <div class="input-wrapper" :style="{ width: props.width }">
    <div class="label-container">
      <label v-if="props.label" :for="inputId" class="label" :class="props.labelDynamicClass">
        {{ props.label }}
      </label>
    </div>
    <slot name="before-start"></slot>
    <div :class="computedInputContainerClass" class="input-container">
      <div class="after-start" :style="{ height: props.height }">
        <slot name="after-start"></slot>
      </div>
      <input
        :id="inputId"
        :name="props.name"
        :type="props.type"
        :placeholder="props.placeholder"
        :style="{ height: props.height }"
        v-model="value"
        class="input"
      />
      <div class="before-end" :style="{ height: props.height }">
        <slot name="before-end"></slot>
      </div>
    </div>
    <slot name="after-end"></slot>
    <div class="error-container">
      <span class="error-class">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  @include mixins.flex(center, flex-start, column);
  gap: 0.25rem;
  overflow: hidden;
}

.normal {
  @include mixins.text(1rem, 400);
  color: var(--Text-Title, #3c4351);
  overflow: hidden;
}

.input {
  font-family: 'Peyda';
  background: var(--Surface-Lightblue, #f9fafb);
  width: 100%;
  overflow: hidden;
}

.input::placeholder {
  @include mixins.text(0.875rem, 400);
  color: var(--black-100, #c3c5c9);
}

.input-container {
  @include mixins.flex($justify: flex-start);
  border-radius: 0.375rem;
  border: 2px solid var(--Surface-Lightblue, #f9fafb);
  align-self: stretch;
  overflow: hidden;
}

.input-wrapper:focus-within .input-container-class {
  border-color: var(--primary-200, #a8afd3);
}

.input-wrapper:focus-within .input-container-class--error {
  border-color: var(--fail-500, #eb482b);
}
.input-container-class--error {
  border-color: var(--fail-500, #eb482b);
}

.label {
  font-weight: 600;
}
.information-label {
  @include mixins.text(1rem, 400);
  color: var(--Text-Title);
}

.after-start {
  @include mixins.flex($justify: center, $align: center);
  background-color: var(--Surface-Lightblue, #f9fafb);
  border-radius: 0 0.375rem 0.375rem 0;
  min-width: 0.5rem;
  height: 3rem;
}

.before-end {
  @include mixins.flex($justify: center, $align: center);
  background-color: var(--Surface-Lightblue, #f9fafb);
  border-radius: 0.375rem 0 0 0.375rem;
  min-width: 3rem;
  height: 3rem;
}

.error-class {
  color: var(--fail-500, #eb482b);
  @include mixins.text(0.75rem, 400);
}

.error-container {
  height: 1rem;
  @include mixins.flex($align: center);
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

input.form-input {
  flex: 1;
  padding-right: 2rem;
}

.input-with-icon ::slotted([slot='input-icon']) {
  position: absolute;
  right: 1rem;
  pointer-events: none;
}

.input-error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
