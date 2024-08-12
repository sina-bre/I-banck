<template>
  <main class="page-container">
    <div class="page-container__background-image"></div>
    <div class="page-container__layout layout">
      <div class="layout__content content">
        <div class="content__image"></div>
        <div class="content__login-form login-form">
          <slot></slot>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup></script>

<style scoped lang="scss">
@use '../assets/scss/utilities/mixins' as mixins;
.page-container {
  @include mixins.box(100dvw, 100dvh);
  background-color: #ecfaff;
  position: relative;

  &__background-image {
    background: url('../assets/images/bg-image.jpg') lightgray 0px -100px / 100% 118.519% no-repeat;
    @include mixins.box(100%, 100%);
    transform: scaleX(-1);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0.4;
  }
}

.layout {
  position: relative;
  z-index: 2;
  @include mixins.box(100%, 100%);
  @include mixins.flex($justify: center, $align: center);
}

.content {
  padding: 1.25rem;
  border-radius: 1.25rem;
  @include mixins.box(75rem, 52.5rem);
  @include mixins.flex(flex-start, flex-start, row-reverse);
  background-color: var(--Surface, #fff);
  box-shadow: 0px 0px 4px 0px rgba(0, 67, 101, 0.05);

  &__image {
    background-image: url('../assets/images/app-hand.jpg');
    border-radius: 0.75rem;
    @include mixins.box(35rem, 50rem);
    @include mixins.cover-background;
  }

  &__login-form {
    margin-top: 5.22rem;
    align-self: stretch;
  }
}

.login-form {
  width: 37.5rem;
  @include mixins.flex($justify: space-between, $align: center, $dir: column);
  gap: 6.47rem;

  &__footer {
    color: var(--Text-Title);
    @include mixins.text(0.875rem, 400);
    margin-top: 7rem;
  }
}
</style>
