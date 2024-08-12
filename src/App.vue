<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import TextInput from './components/global/TextInput.vue';
import { Form } from 'vee-validate';

const emailRules = yup
  .string()
  .required('فیلد ایمیل نمی تواند خالی باشد.')
  .email('ایمیل نا معتبر است');

const myValue = ref('');
</script>

<template>
  <div>
    <Form>
      <TextInput
        name="email"
        label="شماره همراه"
        labelDynamicClasses="normal"
        placeholder="مثلا ۰۹۱۲۳۴۵۶۷۸۹"
        type="email"
        v-model:inputValue="myValue"
        :rules="emailRules"
        inputClasses="input-class"
        inputErrorClasses="error-class"
        inputContainerClasses="custom-input-container"
      />
    </Form>
  </div>
  <h2>{{ myValue }}</h2>
</template>

<style scoped lang="scss"></style>
