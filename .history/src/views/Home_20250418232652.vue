<template>
  <div class="home">
    <div class="nav">
      <div
        v-for="(item, index) in navItem"
        :key="index"
        @click="navActive = item"
      >
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const navActive = ref("知识产权信息管理");
const navItem = ref([
  
]);
</script>

<style>
.home {
  height: 95vh;
  background-color: #f0f2f5;
  padding: 16px;
  box-sizing: border-box;
}
</style>
