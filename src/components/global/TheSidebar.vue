<script setup></script>

<template>
  <nav class="dashboard-container__nav nav">
    <section class="nav__info">
      <span class="nav__user-name" id="sidebar-name">محمد جواد رحمانی نسب</span>
      <div class="nav__user-code">
        <span class="nav__user-code-label">کدملی:</span>
        <span class="nav__user-code-value" id="national-id">۰۹۱۲۳۴۵۶۷۸</span>
      </div>
    </section>
    <hr class="nav__divider" />
    <section class="nav__items-wrapper">
      <ul>
        <li class="nav__item nav__item--selected">
          <div class="nav__item-icon">
            <img src="../assets/icons/dashboard-blue.svg" alt="" />
          </div>
          <span class="nav__item-text">داشبورد</span>
        </li>
        <li class="nav__item">
          <div class="nav__item-icon">
            <img src="../assets/icons/account.svg" alt="" />
          </div>
          <span class="nav__item-text">حساب</span>
        </li>
        <li class="nav__item">
          <div class="nav__item-icon">
            <img src="../assets/icons/education.svg" alt="" />
          </div>
          <span class="nav__item-text">تحصیلات</span>
        </li>
        <li class="nav__item">
          <div class="nav__item-icon nav__icon4">
            <img src="../assets/icons/card-action.svg" alt="" />
          </div>
          <span class="nav__item-text">عملیات کارت</span>
        </li>
        <li class="nav__item">
          <div class="nav__item-icon">
            <img src="../assets/icons/electronic-promissory-note.svg" alt="" />
          </div>
          <span class="nav__item-text">سفته الکترونیک</span>
        </li>
        <li class="nav__item">
          <div class="nav__item-icon">
            <img src="../assets/icons/services.svg" alt="" />
          </div>
          <span class="nav__item-text">خدمات</span>
        </li>
        <li class="nav__item nav__item--exit-item logout-btn" id="logout-btn">
          <div class="nav__item-icon">
            <img src="../assets/icons/exit-red.svg" alt="" />
          </div>
          <span class="nav__item-text">خروج</span>
        </li>
      </ul>
    </section>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  background: var(--Surface);
  border-radius: 0.75rem;
  padding: 1.5rem 0 0.5rem 0;
  @include mixins.box(13.75rem, 50.25rem);
  @include mixins.flex($dir: column, $justify: flex-start, $align: center);
  gap: 1.25rem;

  &__info {
    @include mixins.flex($dir: column, $align: center);
    gap: 2.5rem;
  }

  &__user-name {
    color: var(--Text-Title, #3c4351);
    text-align: center;
    @include mixins.text(1.125rem, 700);
    line-height: 28px;
    width: 10.75rem;
  }

  &__user-code {
    @include mixins.flex($justify: space-between, $align: center);
    align-self: stretch;
    direction: rtl;
    &_label {
      color: var(--Gray);
      @include mixins.text(0.75rem, 400);
    }
    &_value {
      color: var(--black-500);
      @include mixins.text(1rem, 600);
    }
  }

  &__divider {
    border: none;
    width: 196px;
    height: 1px;
    background-color: #e2edff;
  }

  &__items-wrapper {
    direction: rtl;
    padding: 0 0.5rem;
    gap: 0.125rem;
    align-self: stretch;
    @include mixins.flex($align: flex-start);

    ul {
      align-self: stretch;
      @include mixins.flex($dir: column);
      flex-basis: 100%;
    }
  }
  &__item {
    @include mixins.flex($justify: flex-start);
    gap: 0.5rem;
    padding: 0.5rem 1rem 0.5rem 0.75rem;
    align-self: stretch;
    cursor: pointer;

    &:hover {
      border-radius: 0.375rem;
      background: var(--Surface-Lightblue);

      .nav__item-text {
        font-weight: 700;
        color: var(--primary-500);
      }
    }

    &--selected {
      border-radius: 0.375rem;
      background: var(--Surface-Lightblue);
      .nav__item-text {
        font-weight: 700;
        color: var(--primary-500);
      }
    }
  }

  &__item-icon {
    @include mixins.flex($justify: center, $align: start);
    @include mixins.box(1.25rem);
    img {
      width: 100%;
    }
  }

  &__item-text {
    color: var(--Text-Gray);
    @include mixins.text(0.875rem, 400);
    height: 1.75rem;
    @include mixins.flex($align: center);
  }

  &__item--exit-item {
    .nav__item-text {
      color: var(--fail-500);
    }
  }
}
.logout-btn {
  transition: all 0.5s ease;

  &:hover {
    border-radius: 0.375rem;
    background-color: var(--fail-50);

    .nav__item-text {
      font-weight: 700;
      color: var(--fail-500);
    }
  }
}
</style>
