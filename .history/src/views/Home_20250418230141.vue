<template>
  <div class="home">
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const current = ref<string>("知识产权")

</script>

<style>

</style>
