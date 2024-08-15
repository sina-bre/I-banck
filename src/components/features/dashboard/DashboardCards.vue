<script setup>
import CustomCard from '@/components/cards/CustomCard.vue';
import AccountBox from '@/components/cards/AccountBox.vue';
import DisableDashboard from './DisableDashboard.vue';
import TheTable from './TheTable.vue';
import IconLoader from '@/components/shared/IconLoader.vue';
import { onBeforeMount, ref, computed } from 'vue';
import { useUserStore } from '@/stores/user.js';
import { convertToPersianNumber } from '@/utilities/convertToPersianNumber.js';
import { convertToPersianDate } from '@/utilities/convertToPersianDate';
import { insertComma } from '@/utilities/insertComma';

const userStore = useUserStore();
const depositAccountData = ref('');
const balance = ref('');
const cardNumber = ref('');
const scoreAmount = ref('');
const scorePaymentPeriod = ref('');
const upcomingInstalmentAmount = ref('');
const upcomingInstalmentDueDate = ref('');

onBeforeMount(async () => {
  try {
    await userStore.getDepositAccount();
    depositAccountData.value = userStore.depositAccountData;
    balance.value = userStore.depositAccountData?.balance;
    cardNumber.value = userStore.depositAccountData?.cardNumber;
    scoreAmount.value = userStore.depositAccountData?.score?.amount;
    scorePaymentPeriod.value = userStore.depositAccountData?.score?.paymentPeriod;
    upcomingInstalmentAmount.value = userStore.depositAccountData?.upcomingInstalment?.amount;
    upcomingInstalmentDueDate.value = userStore.depositAccountData?.upcomingInstalment?.dueDate;
  } catch (error) {
    console.error('Get Deposit Account failed:', error);
  }
});

const isDepositAccountCreated = computed(
  () => depositAccountData.value && Object.keys(depositAccountData.value).length > 0
);

const computedScoreAmount = computed(() =>
  isDepositAccountCreated.value ? insertComma(convertToPersianNumber(scoreAmount.value)) : 0
);
const computedScorePaymentPeriod = computed(() =>
  isDepositAccountCreated.value ? convertToPersianNumber(scorePaymentPeriod.value) : 0
);
const computedUpcomingInstalmentAmount = computed(() =>
  isDepositAccountCreated.value
    ? insertComma(convertToPersianNumber(upcomingInstalmentAmount.value))
    : 0
);
const computedUpcomingInstalmentDueDate = computed(() =>
  isDepositAccountCreated.value ? convertToPersianDate(upcomingInstalmentDueDate.value) : ''
);
</script>

<template>
  <section class="dashboard-container__cards">
    <DisableDashboard v-if="!isDepositAccountCreated" />
    <AccountBox :accountAmount="balance" :accountNumber="cardNumber" />
    <CustomCard btnText="محاسبه امتیاز">
      <template v-slot:action>
        <IconLoader icon="infoCircleBold" width="1.5rem" height="1.5rem" color="var(--Gray)" />
      </template>
      <div class="points__amount">
        <span class="points__amount-num" id="score-amount">{{ computedScoreAmount }}</span>
        <span class="points__amount-suffix">ریال</span>
      </div>
      <div class="points__months">
        <span class="points__months-num" id="score-payment-period">{{
          computedScorePaymentPeriod
        }}</span>
        <span class="points__months-suffix">ماهه</span>
      </div>
    </CustomCard>
    <CustomCard btnText="پرداخت" title="قسط پیش رو">
      <template v-slot:action>
        <p>جزییات</p>
        <IconLoader icon="angleLeft" width="1.5rem" height="1.5rem" color="var(--Gray)" />
      </template>
      <template v-slot:icon>
        <IconLoader icon="arrowLeft" color="var(--Text-Title)" width="1.5rem" height="1.5rem" />
      </template>
      <div class="installment">
        <div class="installment__item">
          <p class="installment__item-title">مبلغ قسط:</p>
          <p class="installment__item-value">
            <span id="upcoming-instalment-amount">{{ computedUpcomingInstalmentAmount }} </span>
            <span>ریال</span>
          </p>
        </div>
        <div class="installment__item">
          <p class="installment__item-title">تاریخ سررسید:</p>
          <p class="installment__item-value" id="upcoming-instalment-due-date">
            {{ computedUpcomingInstalmentDueDate }}
          </p>
        </div>
      </div>
    </CustomCard>
    <TheTable />
  </section>
</template>

<style lang="scss" scoped>
.dashboard-container__cards {
  @include mixins.flex($justify: flex-start);
  max-width: 72.75rem;
  gap: 1rem;
  flex-wrap: wrap;
  position: relative;
}
.points {
  &__amount {
    color: var(--primary-500);
    &-num {
      @include mixins.text(2.5rem, 700);
    }
    &-suffix {
      @include mixins.text(0.875rem, 400);
    }
  }

  &__months {
    color: var(--primary-500);
    &-num {
      @include mixins.text(1.125rem, 700);
    }

    &-suffix {
      @include mixins.text(0.875rem, 400);
    }
  }
}
.installment {
  @include mixins.box(100%, 100%);
  @include mixins.flex(flex-end, end, column);
  margin-bottom: 1.25rem;
  gap: 0.75rem;
  &__item {
    align-self: stretch;
    @include mixins.flex($justify: space-between);

    &-title {
      @include mixins.text(0.875rem, 400);
      color: var(--Gray);
    }

    &-value {
      @include mixins.text(0.875rem, 600);
      color: var(--Text-Title);
    }
  }
}
</style>
