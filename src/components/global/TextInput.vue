<script setup>
import { computed } from 'vue';
import { useField, Field, ErrorMessage } from 'vee-validate';

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
    default: ''
  },
  rules: {
    type: Object,
    default: () => ({})
  }
});

const { value } = useField(props.name);

const inputId = computed(() => props.name);
const computedInputContainerClass = computed(() =>
  value.value ? 'input-container-class' : 'input-container-class'
);
</script>

<template>
  <div class="input-wrapper" :style="{ width: props.width }">
    <label v-if="label" :for="inputId" class="label" :class="labelDynamicClass">{{ label }}</label>
    <slot name="before-start"></slot>
    <div :class="computedInputContainerClass" class="input-container">
      <div class="after-start">
        <slot name="after-start"></slot>
      </div>
      <Field
        :validate-on-input="true"
        :validateOnBlur="false"
        :validateOnChange="false"
        :id="inputId"
        :name="name"
        :type="type"
        :rules="rules"
        :placeholder="placeholder"
        class="input"
        :style="{ height: props.height }"
        v-model="value"
      />
      <div class="before-end">
        <slot name="before-end"></slot>
      </div>
    </div>
    <slot name="after-end"></slot>
    <div class="error-container">
      <ErrorMessage :name="name" class="error-class" as="span" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  @include mixins.flex(center, flex-start, column);
  gap: 0.25rem;
}

.normal {
  @include mixins.text(1rem, 400);
  color: var(--Text-Title, #3c4351);
}
.input {
  font-family: 'Peyda';
  background: var(--Surface-Lightblue, #f9fafb);
  width: 100%;
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
}

.input-wrapper:focus-within .input-container-class {
  border-color: var(--primary-200, #a8afd3);
}

.input-wrapper:focus-within .input-container-class--error {
  border-color: var(--fail-500, #eb482b);
}

.label {
  font-weight: 600;
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
  min-width: 0.5rem;
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
