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
    div.progres
    <a-progress :percent="30" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchValue = ref();
const onSearch = () => {};
const onRest = () => {
  searchValue.value = "";
};

</script>

<style lang="scss" scoped>
.infoManagement {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: white;
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
