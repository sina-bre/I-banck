<script setup>
import { Form } from 'vee-validate';
import loginSchema from '@/helpers/validation/loginSchema.js';
import CustomButton from '@/components/global/CustomButton.vue';
import TextInput from '@/components/global/TextInput.vue';
</script>

<template>
  <Form :validation-schema="loginSchema" class="login-form">
    <div class="input-group">
      <TextInput
        name="phoneNumber"
        label="شماره همراه"
        placeholder="مثلا ۰۹۱۲۳۴۵۶۷۸۹"
        type="text"
        width="22.125rem"
      />
      <TextInput
        name="password"
        label="رمز عبور"
        placeholder="رمز عبور"
        type="password"
        width="22.125rem"
      />
      <TextInput
        name="textarea"
        label="رمز عبور"
        placeholder="رمز عبور"
        type="password"
        width="22.125rem"
      />
    </div>
    <CustomButton width="22.125rem" />
  </Form>
</template>

<style scoped lang="scss">
.login-form {
  @include mixins.flex($justify: center, $dir: column);
  gap: 1rem;
  margin-top: 6.47rem;
}
.input-group {
  @include mixins.flex($dir: column);
  align-self: stretch;
  gap: 0.5rem;
}
</style>
