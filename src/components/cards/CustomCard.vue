<script setup>
import CustomButton from '../global/CustomButton.vue';
defineProps({
  title: {
    type: String,
    default: 'امتیاز حساب'
  },
  months: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number,
    default: 0
  },
  btnText: {
    type: String,
    default: 'محاسبه امتیاز'
  }
});
</script>

<template>
  <div class="points">
    <div class="points__heading">
      <p class="points__heading-title">{{ title }}</p>
      <div class="points__heading-action">
        <slot name="action"></slot>
      </div>
    </div>
    <slot></slot>
    <div class="points__action">
      <CustomButton :text="btnText" color="var(--Text-Title)" bgColor="var(--Primary-50)">
        <template #btn-icon>
          <slot name="icon"></slot>
        </template>
      </CustomButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/scss/utilities/mixins' as mixins;

.points {
  padding: 1.5rem;
  @include mixins.box(21.125rem, 16.5rem);
  border-radius: var(--card-radius);
  background-color: var(--Surface);
  @include mixins.flex($dir: column, $justify: space-between);
  gap: auto;

  &__heading {
    align-self: stretch;
    @include mixins.flex($justify: space-between);
    @include mixins.text(1.25rem, 700);
    color: var(--Text-Title);

    &-action {
      @include mixins.flex(center, center);
    }
  }

  &__amount {
    color: var(--primary-500);
    &-num {
      @include mixins.text(2.5rem, 700);
    }
    &-suffix {
      @include mixins.text(0.875rem, 400);
      color: var(--Text-Gray, #8999b9);
    }
  }

  &__months {
    color: var(--primary-500);
    &-num {
      @include mixins.text(1.125rem, 700);
    }

    &-suffix {
      @include mixins.text(0.875rem, 400);
      color: var(--Text-Gray, #8999b9);
    }
  }
  &__action {
    align-self: stretch;
  }
  // &__btn {
  //   width: 100%;
  //   @include mixins.defaultBtn(var(--primary-50), var(--Text-Title));
  //   @include mixins.text(1rem, 700);
  // }
}
</style>
