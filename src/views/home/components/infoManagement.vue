<template>
  <div class="infoManagement paddingBox">
    <div class="search">
      <a-input-search
        v-model:value="searchValue"
        placeholder="搜索数据"
        style="width: 200px"
        @search="onSearch"
      />
      <div class="button" @click="onRest()">
        <img src="@/assets/image/刷新.png" alt="" />
        <span>刷新</span>
      </div>
    </div>
    <div class="progress">
      <div>数据采集进度</div>
      <a-progress :percent="progressValue" />
    </div>
    <div class="table">
      <a-table :columns="columns" :data-source="data" :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <!-- 自定义名称列 -->
          <template v-if="column.key != 'type' && column.key != 'status'">
            {{ record[column.dataIndex] }}
          </template>

          <template v-if="column.key === 'type'">
            <a-tag :color="getTypeColor(record.type)">{{ record.type }}</a-tag>
          </template>

          <template v-if="column.key === 'status'">
            <a-tag :color="record.status == 1 ? 'blue' : 'green'">{{
              getStatus(record.status)
            }}</a-tag>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/index";

onMounted(() => {
  getData();
});
// 搜索
const searchValue = ref();
const onSearch = () => {
  console.log("点击了搜索");
  getData();
};
const onRest = () => {
  console.log("点击了刷新");
  searchValue.value = "";
  getData();
};

//  进度条
const progressValue = ref(75);

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
  {
    title: "采集时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "来源",
    dataIndex: "status",
    key: "status",
  },
];
// 模拟数据生成;
const getData = async () => {
  try {
    const params = {
      keyword: searchValue.value,
      page: 1,
      pageSize: 10,
    };
    const res = await api.infoManagement.getDataPropertyList(params);
    console.log(res);
    data.value = res.data.list;
  } catch (e) {
    console.log("getData 错误", e);
  }
};
const data = ref([]);
const getTypeColor = (type) => {
  const colorMap = {
    专利: "blue",
    论文: "green",
    软件著作权: "orange",
  };
  return colorMap[type] || "orange"; // 默认橙色
};
const getStatus = (status) => {
  const statusMap = {
    1: "进行中",
    2: "已完成",
  };
  return statusMap[status] || "";
};
</script>

<style lang="scss" scoped>
.infoManagement {
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
