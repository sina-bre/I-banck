<script setup></script>

<template>
  <div class="overlay" id="overlay">
    <div class="overlay__img">
      <img src="../../../assets//images/Empty State Illustration.svg" alt="" />
    </div>
    <div class="overlay__text">
      <p>برای دسترسی به داشبورد، لطفا ابتدا افتتاح حساب کنید.</p>
    </div>
    <button class="overlay__btn">افتتاح حساب</button>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  @include mixins.box(100%);
  left: 0;
  top: 0;
  z-index: 2;
  @include mixins.flex($justify: center, $align: center, $dir: column);
  background-color: var(--Background-rgba);
  gap: 0.5rem;

  &__img {
    img {
      @include mixins.box(11rem, 7.8rem);
    }
  }

  &__text {
    color: var(--Text-Title);
    @include mixins.text(1rem, 600);
    margin-bottom: 1.5rem;
  }

  &__btn {
    @include mixins.text(1rem, 700);
    border-radius: 0.5rem;
    background: var(--Primary-Primary-500, #4152a0);
    width: 12.5rem;
    height: 3rem;
    color: #fff;
  }
}
</style>
