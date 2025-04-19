<template>
  <div class="processing paddingBox">
    <div class="header">
      <div>数据任务管理</div>
      <a-button type="primary"
        >+ <span style="margin-left: 10px">新建任务</span></a-button
      >
    </div>
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
            <a-tag v-else-if="record.type === '论文'" color="green">{{
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
</template>

<script setup>
import { ref } from "vue";

// table
// 分页配置
const pagination = ref({
  current: 1, // 当前页码
  pageSize: 10, // 每页显示条数
  onChange: (page, pageSize) => {
    // 页码改变回调
    pagination.value.current = page;
    pagination.value.pageSize = pageSize;
  },
});
const columns = [
  {
    title: "任务ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "任务名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "数据类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "负责人",
    dataIndex: "personCharge",
    key: "personCharge",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "操作",
    dataIndex: "status",
    key: "status",
  },
];
// 模拟数据生成
const data = ref([
  {
    id: "IP-20230001",
    type: "专利",
    title: "一种新型环保材料制备方法",
    source: "国家知识产权局",
    time: "2023-05-12 09:23:45",
    status: "已完成",
  },
  {
    id: "IP-20230002",
    type: "软件著作权",
    title: "企业数据管理系统V1.0",
    source: "企业自主申报",
    time: "2023-06-18 14:12:33",
    status: "已完成",
  },
  {
    id: "IP-20230003",
    type: "商标",
    title: "绿源生态商标注册",
    source: "第三方平台",
    time: "2023-07-22 11:45:21",
    status: "进行中",
  },
  {
    id: "IP-20230004",
    type: "专利",
    title: "智能家居控制系统",
    source: "合作机构",
    time: "2023-08-05 16:30:18",
    status: "未完成",
  },
  {
    id: "IP-20230005",
    type: "版权",
    title: "数字艺术作品《城市之光》",
    source: "第三方平台",
    time: "2023-09-11 10:15:42",
    status: "已完成",
  },
  {
    id: "IP-20230006",
    type: "专利",
    title: "新能源汽车电池管理系统",
    source: "国家知识产权局",
    time: "2023-10-28 13:22:37",
    status: "进行中",
  },
  {
    id: "IP-20230007",
    type: "软件著作权",
    title: "移动支付应用系统V2.0",
    source: "企业自主申报",
    time: "2023-11-15 08:45:29",
    status: "未完成",
  },
  {
    id: "IP-20230008",
    type: "商标",
    title: "悦享生活商标注册",
    source: "合作机构",
    time: "2023-12-03 15:33:56",
    status: "已完成",
  },
]);
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
