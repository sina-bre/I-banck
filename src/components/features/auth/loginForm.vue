<script setup>
import { ref } from 'vue';
import { Form } from 'vee-validate';
import loginSchema from '@/helpers/validation/loginSchema.js';
import CustomButton from '@/components/global/CustomButton.vue';
import TextInput from '@/components/global/TextInput.vue';
import IconLoader from '@/components/shared/IconLoader.vue';

const hidePassword = ref(false);
const passwordInputType = ref('password');

const toggleVisibility = () => {
  hidePassword.value = !hidePassword.value;
  console.log();
  passwordInputType.value === 'text'
    ? (passwordInputType.value = 'password')
    : (passwordInputType.value = 'text');
};
</script>

<template>
  <Form :validation-schema="loginSchema" class="login-form">
    <div class="login-form__input-group input-group">
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
        :type="passwordInputType"
        width="22.125rem"
      >
        <template v-slot:before-end>
          <template v-if="hidePassword">
            <IconLoader
              icon="eye"
              width="1.5rem"
              height="1.5rem"
              color="#3C4351"
              @click="toggleVisibility"
            />
          </template>
          <template v-else>
            <IconLoader
              icon="eyeClose"
              width="1.5rem"
              height="1.5rem"
              color="#3C4351"
              @click="toggleVisibility"
            />
          </template>
        </template>
      </TextInput>
    </div>
    <CustomButton width="22.125rem" />
  </Form>
</template>

<style scoped lang="scss">
.login-form {
  @include mixins.flex($justify: center, $dir: column);
  gap: 2rem;
  margin-top: 6.47rem;
}
.input-group {
  @include mixins.flex($dir: column);
  align-self: stretch;
  gap: 0.5rem;
}
</style>
