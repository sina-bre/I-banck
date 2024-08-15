<script setup>
import IconLoader from '@/components/shared/IconLoader.vue';
import TextInput from '@/components/global/TextInput.vue';
const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="table-container">
    <div class="table-container__search-controls search-controls">
      <div class="search-controls__title title">
        <span class="title__main">لیست تراکنش ها</span>
        <span class="title__unit">(ریال)</span>
      </div>
      <section class="search-controls__inputs">
        <TextInput height="2.125rem" width="16.0625rem" placeholder="جست و جو">
          <template v-slot:before-end>
            <div class="icon-background">
              <IconLoader icon="search" width="1rem" height="1rem" color="#4152A0" />
            </div>
          </template>
        </TextInput>
      </section>
    </div>
    <table>
      <thead></thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  margin: auto;
  border-radius: 0.75rem;
  background: var(--Surface, #fff);
  box-shadow: 0px 0px 4px 0px rgba(0, 67, 101, 0.05);
  width: 72.75rem;
  height: 32.5rem;
  padding: 1.5rem;
}
.search-controls {
  @include mixins.flex($justify: space-between, $align: center);

  &__title {
    .title__main {
      color: var(--Text-Title, #3c4351);
      @include mixins.text(1.25rem, 700);
    }
    .title__unit {
      color: var(--Text-Gray, #8999b9);
      @include mixins.text(1rem, 400);
    }
  }
}

.icon-background {
  background: var(--Primary-Primary-50, #eceef6);
  width: 100%;
  height: 100%;
  @include mixins.flex();
}
</style>
