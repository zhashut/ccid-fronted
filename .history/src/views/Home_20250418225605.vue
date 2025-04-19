<template>
  <div class="home">
    <template>
      <a-affix :offset-top="top">
        <a-button type="primary" @click="top += 10">Affix top</a-button>
      </a-affix>
      <br />
      <a-affix :offset-bottom="bottom">
        <a-button type="primary" @click="bottom += 10">Affix bottom</a-button>
      </a-affix>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const top = ref<number>(10);
const bottom = ref<number>(10);
</script>

<style></style>
