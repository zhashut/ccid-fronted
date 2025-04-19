<template>
  <div class="home">
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const top = ref<number>(10);
const bottom = ref<number>(10);
</script>

<style></style>
