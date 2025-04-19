<template>
  <div class="infoManagement">
    <div class="search">
      <a-input-search
        v-model:value="searchValue"
        placeholder="搜索数据"
        style="width: 200px"
        @search="onSearch"
      />
      <div class="button" @click="onRest()">
        <img src="../../../assets/image/刷新.png" alt="" />
        <span>刷新</span>
      </div>
    </div>
    <div class="progress">
      <div>数据采集进度</div>
      <a-progress :percent="progressValue" />
    </div>
    <div class="table">
      <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, record }">
          <!-- 自定义名称列 -->
          <template v-if="column.key === 'name'">
            <a :href="'/user/' + record.key">{{ record.name }}</a>
          </template>

          <!-- 自定义操作列 -->
          <template v-if="column.key === 'action'">
            <a-button @click="edit(record)">编辑</a-button>
            <a-button danger @click="delete record.key">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 搜索
const searchValue = ref();
const onSearch = () => {};
const onRest = () => {
  searchValue.value = "";
};

//  进度条
const progressValue = ref(75);

// table
const columns = [
  {
    title: "数据ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "数据类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "来源",
    dataIndex: "source",
    key: "source",
  },
  
];
</script>

<style lang="scss" scoped>
.infoManagement {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: white;
  & > div {
    margin-bottom: 20px;
  }
  .search {
    display: flex;
    .button {
      display: flex;
      align-items: center;
      margin-left: 10px;
      padding: 2px 15px;
      font-size: 12px;
      border: 1px solid #d9d9d9;
      gap: 10px;
      cursor: pointer;
      img {
        width: 17px;
      }
    }
  }
}
</style>
