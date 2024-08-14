<script setup>
import FileUploader from '@/components/cards/FileUploader.vue';
import CustomButton from '@/components/global/CustomButton.vue';
import router from '@/router';

const goPrevPage = () => {
  router.push('/info/personal-info');
};
const goNextPage = () => {
  router.push('/info/confirm-info');
};
</script>
<template>
  <section class="uploade-img">
    <div class="uploade-img__pickers">
      <FileUploader title="تصویر روی کارت ملی" id="front"></FileUploader>
      <FileUploader title="تصویر پشت کارت ملی" id="back"></FileUploader>
    </div>
    <div class="uploade-img__actions">
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
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.uploade-img {
  width: 100%;
  @include mixins.flex($dir: column);
  gap: 2.5rem;

  &__pickers {
    @include mixins.flex(center, center);
    gap: 2.5rem;
  }

  &__actions {
    width: 100%;
    @include mixins.flex(flex-end, center);
    gap: 1rem;
  }
}
</style>
