<template>
  <div class="home">
    <div class="nav">
      <div
        v-for="(item, index) in navItem"
        :key="index"
        @click="navActive = item.path"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
  <component :is="navActive"></component>
</template>

<script setup lang="ts">
import { ref,shallowRef } from "vue";
import infoManagement from "./components/infoManagement.vue"

const navActive = shallowRef("infoManagement");
const navItem = ref([
  {
    path: "infoManagement",
    name: "知识产权信息管理",
  },
  {
    path: "processing",
    name: "数据加工协作",
  },
  {
    path: "dataAnalysis",
    name: "专利数据分析",
  },
  {
    path: "powerAnalysis",
    name: "知识产权态势分析",
  },
  {
    path: "propertyAnalysis",
    name: "知识产权分析报告",
  },
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
