<script setup>
import { ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import loginSchema from '@/helpers/validation/loginSchema.js';
import CustomButton from '@/components/global/CustomButton.vue';
import TextInput from '@/components/global/TextInput.vue';
import IconLoader from '@/components/shared/IconLoader.vue';
import { useUserStore } from '@/stores/user.js';

const hidePassword = ref(false);
const passwordInputType = ref('password');

const userStore = useUserStore(); // Use the Pinia store

const toggleVisibility = () => {
  hidePassword.value = !hidePassword.value;
  passwordInputType.value = passwordInputType.value === 'text' ? 'password' : 'text';
};

const { handleSubmit, errors, values } = useForm({
  validationSchema: loginSchema
});

const onSubmit = handleSubmit(async (formValues) => {
  try {
    await userStore.login(formValues); // Call the login action
    userStore.phoneNumber = formValues.phoneNumber;
  } catch (error) {
    console.error('Login failed:', error);
  }
});

const computedDisableButton = computed(() => Object.keys(errors.value).length > 0);
</script>

<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <div class="login-form__input-group input-group">
      <TextInput
        name="phoneNumber"
        label="شماره همراه"
        placeholder="مثلا ۰۹۱۲۳۴۵۶۷۸۹"
        type="text"
        v-model="values.phoneNumber"
        width="22.125rem"
      />
      <TextInput
        name="password"
        label="رمز عبور"
        placeholder="رمز عبور"
        :type="passwordInputType"
        v-model="values.password"
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
    <CustomButton
      width="22.125rem"
      type="submit"
      :disabled="computedDisableButton"
      :loading="userStore.loading"
    />
  </form>
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
