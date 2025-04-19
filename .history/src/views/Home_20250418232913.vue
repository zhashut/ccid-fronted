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
    {
        path:'infoManagement',
        name:'知识产权信息管理'
    },
    {
        path:'Processing',
        name:'数据加工协作'
    },
    {
        path:'dataAnalysis',
        name:'知识产权信息管理'
    },
    {
        path:'infoManagement',
        name:'知识产权信息管理'
    },
    {
        path:'infoManagement',
        name:'知识产权信息管理'
    },

  "专利数据分析",
  "知识产权态势分析",
  "知识产权分析报告",
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
