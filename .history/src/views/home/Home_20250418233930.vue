<template>
  <div class="home">
    <!-- 导航标签 -->
    <div class="nav-tabs">
      <div
        v-for="(item, index) in navItems"
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === item.path }"
        @click="switchTab(item.path)"
      >
        {{ item.name }}
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-container">
      <component :is="activeTabComponent" />
    </div>
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
const components = {
  infoManagement: InfoManagement,
  processing: Processing,
  dataAnalysis: DataAnalysis,
  powerAnalysis: PowerAnalysis,
  propertyAnalysis: PropertyAnalysis,
};

// 当前激活的标签
const activeTab = ref("infoManagement");

// 导航项数据
const navItems = ref([
  { path: "infoManagement", name: "知识产权信息管理" },
  { path: "processing", name: "数据加工协作" },
  { path: "dataAnalysis", name: "专利数据分析" },
  { path: "powerAnalysis", name: "知识产权态势分析" },
  { path: "propertyAnalysis", name: "知识产权分析报告" },
]);

// 计算当前激活的组件
const activeTabComponent = computed(() => components[activeTab.value]);

// 切换标签页
const switchTab = (path: string) => {
  activeTab.value = path;
};
</script>

<style scoped>
.home {
  height: 95vh;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.nav-tabs {
  display: flex;
  border-radius: 4px;
  margin-bottom: 16px;
}

.tab-item {
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-item:hover {
  color: #1890ff;
  border-bottom: ;
}

.tab-item.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
  font-weight: 500;
}

.content-container {
  flex: 1;
  background: white;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
}
</style>
