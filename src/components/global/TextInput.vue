<script setup>
import { computed, ref } from 'vue';
import { useField, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  labelDynamicClasses: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  inputClasses: {
    type: String,
    default: 'form-input'
  },
  inputErrorClasses: {
    type: String,
    default: 'input-error'
  },
  inputContainerClasses: {
    type: String,
    default: 'input-with-icon'
  }
});

const inputValue = defineModel('inputValue');

const computedInputClasses = computed(() => props.inputClasses);
const computedErrorClasses = computed(() => props.inputErrorClasses);
const inputId = computed(() => props.name);

useField(props.name, props.rules);

const inputContainerRef = ref('');

const handleFocus = () => {
  console.log(inputContainerRef.value);
};
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="label" :class="labelDynamicClasses">{{
      label
    }}</label>
    <slot name="before-start"> </slot>
    <div :class="inputContainerClasses" class="input-container" :ref="inputContainerRef">
      <div class="after-start">
        <slot name="after-start"></slot>
      </div>
      <Field
        :validate-on-input="true"
        :id="inputId"
        :name="name"
        :type="type"
        :rules="rules"
        :placeholder="placeholder"
        :class="computedInputClasses"
        class="input"
        v-model="inputValue"
        @focus="handleFocus"
      />
      <div class="before-end">
        <slot name="before-end"></slot>
      </div>
    </div>
    <slot name="after-end"></slot>
    <ErrorMessage :name="name" :class="computedErrorClasses" class="error-class" as="span" />
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
  height: 3rem;
  background: var(--Surface-Lightblue, #f9fafb);
}
.input::placeholder {
  @include mixins.text(0.875rem, 400);
  color: var(--black-100, #c3c5c9);
}

.input-wrapper:focus-within .input-container {
  border: 2px solid var(--primary-200, #a8afd3);
  border-radius: 0.375rem;
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

.input-container {
  @include mixins.flex($justify: flex-start);
  border: 2px solid var(--Surface-Lightblue, #f9fafb);
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
