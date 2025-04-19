<template>
  <div class="infoManagement">
    <div class="search">
      <a-input-search
        v-model:value="searchValue"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchValue = ref();
const onSearch = () => {};
</script>

<style scoped>
.infoManagement {
  width: 100%;
  padding: 16px;
  background-color: white;
}
</style>
