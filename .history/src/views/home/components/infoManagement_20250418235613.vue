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
      margin-left: 10px;
      padding: ;
      border: 1px solid #B9B9B9;
      img {
        width: 10px;
      }
    }
  }
}
</style>
