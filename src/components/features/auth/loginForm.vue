<script setup>
import { Form } from 'vee-validate';
import loginSchema from '@/helpers/validation/loginSchema.js';
</script>

<template>
  <Form :validation-schema="loginSchema"> </Form>
</template>

<style scoped lang="scss"></style>
