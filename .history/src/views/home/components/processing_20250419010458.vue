<template>
  <div class="processing paddingBox">
    <div class="header">
      <div>数据任务管理</div>
      <a-button type="primary"
        >+ <span style="margin-left: 10px">新建任务</span></a-button
      >
      <div class="table">
      <a-table :columns="columns" :data-source="data" :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <!-- 自定义名称列 -->
          <template v-if="column.key != 'type' && column.key != 'status'">
            {{ record[column.dataIndex] }}
          </template>

          <template v-if="column.key === 'type'">
            <a-tag v-if="record.type === '专利'" color="blue">{{
              record.type
            }}</a-tag>
            <a-tag v-else-if="record.type === '软件著作权'" color="orange">{{
              record.type
            }}</a-tag>
            <a-tag v-else-if="record.type === '专利'" color="green">{{
              record.type
            }}</a-tag>
          </template>

          <template v-if="column.key === 'status'">
            <a-tag v-if="record.status === '已完成'" color="blue">{{
              record.status
            }}</a-tag>
            <a-tag v-else-if="record.status === '未完成'" color="pink">{{
              record.status
            }}</a-tag>
            <a-tag v-else color="blue">{{ record.status }}</a-tag>
          </template>
        </template>
      </a-table>
    </div>
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
    justify-content: space-between;
    align-items: center;
  }
}
</style>
