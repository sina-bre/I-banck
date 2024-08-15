<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { convertToPersianNumber } from '../..//utilities/convertToPersianNumber.js';
import { insertComma } from '@/utilities/insertComma.js';
import IconLoader from '../shared/IconLoader.vue';
import PopoverBox from '../global/PopoverBox.vue';

const showPopover = ref(false);

const props = defineProps({
  accountNumber: {
    type: String,
    default: '0000000000000000'
  },
  accountAmount: {
    type: Number,
    default: 0
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

const iconClicked = () => {
  showPopover.value = !showPopover.value;
};

// items of the popover box
const boxItems = ref([
  {
    title: 'تغییر حساب متصل',
    icon: 'cardOperation',
    color: 'var(--black-100)',
    action: 'edit'
  },
  {
    title: 'حذف حساب بانکی',
    icon: 'trash',
    color: 'var(--fail-500)',
    action: 'remove'
  }
]);

// handle when user click outside

const handleClickOutside = (event) => {
  if (!event.target.closest('.account__heading-right')) {
    showPopover.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
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
      <div class="account__heading-right" @click="iconClicked">
        <IconLoader icon="more" width="2rem" height="2rem" color="var(--Surface)" />

        <PopoverBox class="popover" v-if="showPopover" :items="boxItems" @emitClicked="emitClicked">
        </PopoverBox>
      </div>
    </div>
    <div class="account__number">
      <div class="account__part" v-for="(slice, index) in slicedParts" :key="index">
        {{ convertToPersianNumber(slice) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
      cursor: pointer;
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

.popover {
  position: absolute;
  right: 50%;
  top: 80%;
}
@keyframes Popover {
  from {
    right: -13rem;
  }
  to {
    right: 0.625rem;
  }
}
</style>
