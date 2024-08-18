<script setup>
import DepositAccountSchema from '@/helpers/validation/DepositAccountSchema';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import TextInput from '@/components/global/TextInput.vue';
import CustomButton from '@/components/global/CustomButton.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const { handleSubmit, errors, values } = useForm({
  validationSchema: DepositAccountSchema,
  initialValues: {
    name: userStore.firstName,
    familyName: userStore.lastName,
    postalCode: userStore.postalCode,
    address: userStore.address
  }
});
const submitLoading = ref(false);

const router = useRouter();

const onSubmit = handleSubmit((formValues) => {
  submitLoading.value = true;

  setTimeout(() => {
    userStore.firstName = formValues.name;
    userStore.lastName = formValues.familyName;
    userStore.postalCode = formValues.postalCode;
    userStore.address = formValues.address;
    router.push('/info/upload-img');
  }, 1000);
});

const computedDisableButton = computed(() => Object.keys(errors.value).length > 0);

const goPrevPage = () => {
  router.push('/panel/dashboard');
};
</script>

<template>
  <form @submit.prevent="onSubmit" action="" class="information-form">
    <div class="information-form__top">
      <TextInput
        name="name"
        labelDynamicClass="information-label"
        label="نام"
        placeholder="نام فارسی"
        type="text"
        width="26rem"
        v-model="values.name"
      />
      <TextInput
        labelDynamicClass="information-label"
        name="familyName"
        label="نام خانوادکی"
        placeholder="نام خانوادگی به صورت کامل"
        type="text"
        width="26rem"
        v-model="values.familyName"
      />
      <TextInput
        name="postalCode"
        labelDynamicClass="information-label"
        label="کدپستی"
        placeholder="کدپستی 10 رقمی"
        type="text"
        width="26rem"
        v-model="values.postalCode"
      />
      <TextInput
        name="address"
        labelDynamicClass="information-label"
        label="آدرس"
        placeholder="آدرس دقیق محل سکونت"
        type="text"
        as="textarea"
        width="100%"
        v-model="values.address"
        height="7.5rem"
      />
    </div>
    <div class="information-form__actions">
      <CustomButton
        @click="goPrevPage"
        text="قبلی"
        color="var(--Text-Title)"
        bgColor="var(--primary-50)"
        width="13rem"
      />
      <CustomButton
        text="ثبت و ادامه"
        color="var(--Text-On-Primary)"
        bgColor="var(--primary-500)"
        width="13rem"
        :disabled="computedDisableButton"
        type="submit"
        :loading="submitLoading"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.information-form {
  width: 100%;
  @include mixins.flex(center, center, column);
  gap: 2.5rem;
  &__top {
    @include mixins.flex(center, center);
    gap: 2rem;
    flex-wrap: wrap;
  }
  &__actions {
    width: 100%;
    @include mixins.flex(flex-end, center);
    gap: 1rem;
  }
}
.custom-textarea {
  width: 100%;
  &__label {
    @include mixins.text(1rem, 400);
    color: var(--Text-Title);
    margin-bottom: 0.5rem;
  }
  &__field {
    height: 7.5rem;
    padding: 1rem 0.5rem;
    border-radius: 0.375rem;
    font-family: 'Peyda';
    background: var(--Surface-Lightblue, #f9fafb);
    width: 100%;
    outline: none;
    border: none;
    resize: none;
    &:focus {
      border: 2px solid var(--primary-200);
    }
  }
  &__error {
    color: var(--fail-500, #eb482b);
    @include mixins.text(0.75rem, 400);
  }
  &__border-error {
    border: 1px solid var(--fail-500, #eb482b);
  }
}
</style>
