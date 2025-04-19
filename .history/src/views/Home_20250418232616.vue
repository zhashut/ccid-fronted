<template>
  <div class="home">
    <div class="nav">
      <div v-for="(item, index) in navItem" :key="index"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const navActive = ref("知识产权信息管理");
const navItem = ref([
  "知识产权信息管理",
  "数据加工协作",
  "专利数据分析",
  "知识产权态势分析",
  "知识产权分析报告",
]);
const handleActive = () => {
    navActive
};
</script>

<style>
.home {
  height: 95vh;
  background-color: #f0f2f5;
  padding: 16px;
  box-sizing: border-box;
}
</style>
