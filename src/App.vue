<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import TextInput from './components/global/TextInput.vue';
import { Form } from 'vee-validate';

const schema = yup.object().shape({
  email: yup.string().required('فیلد ایمیل نمی تواند خالی باشد.').email('ایمیل نا معتبر است')
});

const myValue = ref('');
</script>

<template>
  <div>
    <Form :validation-schema="schema">
      <TextInput
        name="email"
        label="شماره همراه"
        labelDynamicClass="normal"
        placeholder="مثلا ۰۹۱۲۳۴۵۶۷۸۹"
        type="email"
        v-model:inputValue="myValue"
      />
    </Form>
  </div>
  <h2>{{ myValue }}</h2>
</template>

<style scoped lang="scss"></style>
