<template>
  <div class="home">
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="navTable" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const current = ref<string>("知识产权信息管理")
const navTable = ref<MenuProps['items']>([
    {
        key: '知识产权信息管理',
        label:'知识产权信息管理',
        title:'知识产权信息管理'
    },
    {
        key: '数据加工协作',
        label:'数据加工协作',
        title:'数据加工协作'
    },
    {
        key: '专利数据分析',
        label:'专利数据分析',
        title:'专利数据分析'
    },
    {
        key: '知识产权态势分析',
        label:'知识产权态势分析',
        title:'知识产权态势分析'
    },
    {
        key: '知识产权分析报告',
        label:'知识产权分析报告',
        title:'知识产权分析报告'
    },
    {
        key: '知识产权信息管理',
        label:'知识产权信息管理',
        title:'知识产权信息管理'
    },
])

</script>

<style>

</style>
