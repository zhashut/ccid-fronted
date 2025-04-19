<template>
  <div class="infoManagement">
    <div class="search">
      <a-input-search
        v-model:value="searchValue"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
      <div class="button">
        <img src="../../../assets/image/刷新.png" alt="" />
        <span>刷新</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchValue = ref();
const onSearch = () => {};
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
      padding: 2px 10px;
      font-size: 12px;
      border: 1px solid #b9b9b9;
      grid: 5px;
      img {
        width: 10px;
      }
    }
  }
}
</style>
