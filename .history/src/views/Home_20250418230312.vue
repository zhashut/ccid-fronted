<template>
  <div class="home">
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="navTable" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const current = ref<string>("知识产权信息管理")
const navTable = ref<MenuProps['items']>([
    {
        key
    }
])

</script>

<style>

</style>
