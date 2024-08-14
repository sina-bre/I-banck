<script setup>
import { ref } from 'vue';
import IconLoader from '../shared/IconLoader.vue';
import DropdownBox from '../global/DropdownBox.vue';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';

const imageSrc = ref(null);
const showPopover = ref(false);
const fileInputRef = ref(null);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const iconClicked = () => {
  showPopover.value = !showPopover.value;
};

// functions of the items

const removeImg = () => {
  imageSrc.value = null;
};

const editImg = () => {
  fileInputRef.value.click();
};

// handle when user click outside

const handleClickOutside = (event) => {
  if (!event.target.closest('.option-box__front-icon')) {
    showPopover.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// items of the popover box
const boxItems = ref([
  {
    title: 'ویرایش',
    icon: 'edit',
    color: 'var(--black-500)',
    action: editImg
  },
  {
    title: 'حذف',
    icon: 'trash',
    color: 'var(--fail-500)',
    action: removeImg
  }
]);
</script>
<template>
  <section class="form-image-uploader__national-card-section national-card-section">
    <label
      class="national-card-section__upload-box upload-box"
      for="national-card-front"
      id="front-drop-area"
    >
      <input
        type="file"
        accept="image/*"
        id="national-card-front"
        hidden
        @change="onFileChange"
        ref="fileInputRef"
      />
      <div class="upload-box__view" id="national-card-front-view">
        <template v-if="imageSrc">
          <!-- Image Preview -->
          <div class="upload-box__view-img"></div>
        </template>
        <template v-else>
          <!-- Icon and Text when no image is selected -->
          <IconLoader icon="upload" width="4.25rem" height="3.1rem" color="var(--black-100)" />
          <div class="upload-box__text">
            <span class="upload-box__text-upper">تصویر را بکشید و اینجا رها کنید</span>
            <span class="upload-box__text-below">
              یا
              <span class="upload-box__blue-text">کلیک کنید.</span>
            </span>
          </div>
        </template>
      </div>
    </label>
    <div class="national-card-section__option-box option-box">
      <span class="option-box__text">تصویر روی کارت ملی</span>
      <div class="option-box__front-icon" v-if="imageSrc" @click="iconClicked">
        <IconLoader icon="more" width="1.25rem" height="1.25rem" color="var(--Gray)" />

        <DropdownBox class="popover" v-if="showPopover" :items="boxItems"> </DropdownBox>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.national-card-section {
  @include mixins.box(20.0625rem, 14.5rem);
  background-color: var(--Surface-light-blue, #f9fafb);
  border-radius: 0.75rem;
  &__buttons-group {
    margin-top: 2.5rem;
    direction: ltr;
  }
}
.upload-box {
  cursor: pointer;
  height: 11.25rem;
  @include mixins.flex(center, center, column);
  overflow: hidden;
  border-radius: 0.75rem 0.75rem 0 0;
  border: 1px dashed var(--Line, #e2edff);
  &__view {
    @include mixins.flex(center, center, column);
    gap: 0.5rem;
    width: 100%;
    height: 100%;
    @include mixins.cover-background;
  }
  &__text {
    @include mixins.text(0.875rem, 600);
    @include mixins.flex(center, center, column);
    color: var(--Gray, #8999b9);
    height: auto;
    text-align: center;
    line-height: normal;
    word-spacing: 2px;
  }
  &__blue-text {
    color: var(--primary-500);
  }
}

.option-box {
  @include mixins.flex($justify: space-between, $align: center);
  height: 3.25rem;
  padding: 1rem 0.75rem;
  position: relative;
  &__text {
    @include mixins.text(0.875rem, 400);
    color: var(--black-500, #3c4351);
  }
  &__back-icon {
    position: relative;
    cursor: pointer;
  }
  &__front-icon {
    position: relative;
    cursor: pointer;
  }
}
.popover {
  position: absolute;
  left: 100%;
  bottom: 100%;
}
</style>
