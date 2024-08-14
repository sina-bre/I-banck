<script setup>
import DepositAccountSchema from '@/helpers/validation/DepositAccountSchema';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import TextInput from '@/components/global/TextInput.vue';
import CustomButton from '@/components/global/CustomButton.vue';
import { useRouter } from 'vue-router';

const { handleSubmit, errors } = useForm({
  validationSchema: DepositAccountSchema
});

const onSubmit = handleSubmit((formValues) => {
  console.log('Form Submitted:', formValues);
});

const computedDisableButton = computed(() => Object.keys(errors.value).length > 0);

const goNextPage = () => {
  useRouter.router.push('/info/uploade-image');
};
</script>

<template>
  <form @submit="onSubmit" action="" class="information-form">
    <div class="information-form__top">
      <TextInput
        name="name"
        labelDynamicClass="information-label"
        label="نام"
        placeholder="نام فارسی"
        type="text"
        width="26rem"
      />
      <TextInput
        labelDynamicClass="information-label"
        name="familyName"
        label="نام خانوادکی"
        placeholder="نام خانوادگی به صورت کامل"
        type="text"
        width="26rem"
      />
      <TextInput
        name="postalCode"
        labelDynamicClass="information-label"
        label="کدپستی"
        placeholder="کدپستی 10 رقمی"
        type="text"
        width="26rem"
      />
    </div>
    <div class="information-card__form-textarea custom-textarea">
      <label class="custom-textarea__label" for="address">محل سکونت </label>
      <textarea
        class="custom-textarea__field"
        type="text"
        id="address-textarea"
        placeholder="آدرس دقیق محل سکونت"
      ></textarea>
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
        @click="goNextPage"
        text="ثبت و ادامه"
        color="var(--Text-On-Primary)"
        bgColor="var(--primary-500)"
        width="13rem"
        :disabled="computedDisableButton"
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
}
</style>
