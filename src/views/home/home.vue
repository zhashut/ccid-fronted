<template>
  <div class="home">
    <a-tabs v-model:activeKey="activeKey" @change="handleTabChange">
      <a-tab-pane v-for="item in navItems" :key="item.key" :tab="item.name">
        <component :is="components[item.component]" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import InfoManagement from "./components/InfoManagement.vue";
import Processing from "./components/Processing.vue";
import DataAnalysis from "./components/DataAnalysis.vue";
import PowerAnalysis from "./components/PowerAnalysis.vue";
import PropertyAnalysis from "./components/PropertyAnalysis.vue";

// 组件映射
// 组件映射
const components = {
  InfoManagement,
  Processing,
  DataAnalysis,
  PowerAnalysis,
  PropertyAnalysis,
};

// 当前激活的标签key
const activeKey = ref("info");

// 导航项配置
const navItems = ref([
  {
    key: "info",
    name: "知识产权信息管理",
    component: "InfoManagement",
  },
  {
    key: "process",
    name: "数据加工协作",
    component: "Processing",
  },
  {
    key: "data",
    name: "专利数据分析",
    component: "DataAnalysis",
  },
  {
    key: "power",
    name: "知识产权态势分析",
    component: "PowerAnalysis",
  },
  {
    key: "report",
    name: "知识产权分析报告",
    component: "PropertyAnalysis",
  },
]);

// 标签切换回调
const handleTabChange = (key: string) => {
  console.log("当前标签:", key);
  // 可以在这里添加标签切换时的逻辑
};
</script>

<style scoped>
.home {
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #eff3f4;
}

.nav-tabs {
  display: flex;
  border-radius: 4px;
  margin-bottom: 16px;
}

.tab-item {
  font-size: 14px;
  padding: 12px 0;
  margin-right: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-item:hover {
  color: #1890ff;
}

.tab-item.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
  font-weight: 500;
}
</style>
