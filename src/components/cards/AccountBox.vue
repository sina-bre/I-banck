<script setup>
import { ref, computed } from 'vue';
import { convertToPersianNumber } from '@/utilities/convertToPersianNumber';
import { insertComma } from '@/utilities/insertComma';

const showDropdown = ref(false);

const props = defineProps({
  accountNumber: {
    type: String,
    default: '23424234234334'
  },
  accountAmount: {
    type: Number,
    required: true
  }
});

const partLength = ref(4);

const slicedParts = computed(() => {
  let parts = [];
  for (let i = 0; i < props.accountNumber.length; i += partLength.value) {
    parts.push(props.accountNumber.slice(i, i + partLength.value));
  }
  return parts;
});
</script>

<template>
  <div class="account">
    <div class="account__heading">
      <div class="account__heading-left amount">
        <p class="amount__title">موجودی کل</p>
        <p class="amount__value" id="balance">
          {{ insertComma(convertToPersianNumber(accountAmount)) }}
        </p>
      </div>
      <div class="account__heading-right">
        <img src="../../assets/icons/more.svg" alt="" class="account__heading-right-icon" />

        <div v-if="showDropdown">
          <!-- add dropdown here  -->
        </div>
      </div>
    </div>
    <div class="account__number">
      <div class="account__part" v-for="(slice, index) in slicedParts" :key="index">
        {{ convertToPersianNumber(slice) }}
      </div>
    </div>
  </div>
  ;
</template>

<style scoped lang="scss">
@use '../../assets/scss/utilities/mixins' as mixins;
.account {
  @include mixins.box(28.125rem, 16.25rem);
  background-image: url('../../assets/images/Noise.svg'), url('../../assets/images/Pattern.svg'),
    linear-gradient(to right, var(--primary-500), #d0c9c1);
  @include mixins.cover-background;
  border-radius: var(--card-radius);
  padding: 2.25rem 1.5rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  overflow: hidden;

  &__heading {
    width: 100%;
    @include mixins.flex(space-between, flex-start, row-reverse);
    text-align: center;

    &-right {
      position: relative;
    }
  }
  &-left {
    padding-left: 0.625rem;
  }

  &__number {
    @include mixins.text(2.25rem);
    @include mixins.flex($justify: center);
    gap: 1rem;
  }

  &__part {
    color: var(--Text-On-Primary, #fff);
    @include mixins.text(2.25rem, 400);
  }
}

.amount {
  @include mixins.flex(flex-end, end, column);

  &__title {
    @include mixins.text(1rem, 600);
  }

  &__value {
    @include mixins.text(2.5rem, 600);
  }
}

.account__heading-right-icon {
  cursor: pointer;
}
.account__heading-right-box {
  position: absolute;
  right: -13rem;
  top: 90%;
  z-index: 5;
}

.account__heading-right-icon:active ~ .account__heading-right-box {
  animation: dropdown 0.5s ease-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}
@keyframes dropdown {
  from {
    right: -13rem;
  }
  to {
    right: 0.625rem;
  }
}
</style>
