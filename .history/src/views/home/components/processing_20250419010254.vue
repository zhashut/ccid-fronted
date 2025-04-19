<template>
  <div class="processing paddingBox">
    <div class="header">
      <div>数据任务管理</div>
      <a-button type="primary"
        >+ <span style="margin-left: 10px">新建任务</span></a-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.processing {
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
