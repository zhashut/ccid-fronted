<template>
  <div class="dataAnalysis paddingBox">
    <!-- 搜索和选择器区域 - 保持原有业务功能不变 -->
    <div class="search">
      <a-input-search
        v-model:value="searchValue"
        placeholder="搜索数据"
        style="width: 200px"
        @search="onSearch"
      />
      <a-select
        ref="select"
        v-model:value="selectValue"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option
          v-for="option in fieldOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </a-select-option>
      </a-select>
    </div>

    <div class="content">
      <div class="chart-area">
        <div class="chart-wrapper">
          <G2Chart
            type="line"
            :data="lineChartData"
            :options="lineChartOptions"
          />
        </div>
        <div class="chart-wrapper">
          <G2Chart type="bar" :data="barChartData" :options="barChartOptions" />
        </div>
      </div>
      <div class="table">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <!-- 自定义名称列 -->
            <template v-if="column.key != 'field'">
              {{ record[column.dataIndex] }}
            </template>

            <template v-if="column.key === 'field'">
              <a-tag color="blue">{{ record.field }}</a-tag>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import G2Chart from "@/components/G2Chart.vue";
import { getDataPatentList } from "@/api";

onMounted(async () => {
  await fetchGetDataPatentList();
});

const columns = [
  {
    title: "专利号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },

  {
    title: "申请人",
    dataIndex: "applicant",
    key: "applicant",
  },
  {
    title: "申请日期",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "技术领域",
    dataIndex: "field",
    key: "field",
  },
];

// 搜索功能
const searchValue = ref("");
const onSearch = async () => {
  await fetchGetDataPatentList({
    keyword: searchValue.value,
  });
};

// 选择器功能
const selectValue = ref("全部");
const handleChange = async () => {
  await fetchGetDataPatentList({
    field: selectValue.value === "全部" ? "" : selectValue.value,
  });
};

const handleTableChange = (pag) => {
  pagination.value = {
    ...pagination.value,
    page: pag.current,
    pageSize: pag.pageSize,
  };
};

// 分页配置
const pagination = ref({
  page: 1, // 当前页码
  pageSize: 10, // 每页显示条数
  total: 0,
});

watch(pagination, async () => {
  await fetchGetDataPatentList({
    ...pagination.value,
  });
});

const data = ref([]);
const isOptionsInitialized = ref(false);
const allFieldOptions = ref<Array<{ value: string; label: string }>>([]);
const fieldOptions = ref([{ value: "全部", label: "全部" }]);

async function fetchGetDataPatentList(params?: any) {
  const res: any = await getDataPatentList(params);
  if (res.code === 0) {
    data.value = res.data.list;
    pagination.value.total = res.data.total;
    if (!isOptionsInitialized.value) {
      const fields = res.data.list
        .map((item) => item.field)
        .filter((field, index, self) => self.indexOf(field) === index);
      allFieldOptions.value = [
        { value: "全部", label: "全部" },
        ...fields.map((field) => ({
          value: field,
          label: field,
        })),
      ];
      isOptionsInitialized.value = true;
    }
    fieldOptions.value = allFieldOptions.value;
  }
}

// 图表数据配置
const lineChartData = ref([
  { year: "1月", value: 10 },
  { year: "2月", value: 15 },
  { year: "3月", value: 20 },
  { year: "4月", value: 25 },
]);

// 静态图表配置
const lineChartOptions = ref({
  type: "view",
  height: 350,
  autoFit: true,
  padding: [40, 20, 50, 50], // 调整边距（上、右、下、左）
  encode: {
    x: "year",
    y: "value",
  },
  scale: {
    y: {
      min: 0,
      max: 25,
      tickCount: 5, // 0,5,10,15,20,25
      nice: true,
    },
    x: {
      range: [0.1, 0.9], // 控制x轴显示范围
    },
  },
  children: [
    {
      type: "line",
      style: {
        stroke: "#1890ff",
        lineWidth: 3, // 加粗线条
        lineJoin: "round", // 圆角连接
      },
      label: {
        text: "value",
        position: "top",
        style: {
          fill: "#1890ff",
          fontSize: 12,
          fontWeight: "bold",
          dy: -10, // 标签上移
        },
      },
    },
    {
      type: "point",
      shape: "circle",
      size: 4,
      style: {
        fill: "#fff",
        stroke: "#1890ff",
        lineWidth: 2,
      },
    },
  ],
  axis: {
    x: {
      title: false,
      label: {
        style: {
          fontSize: 12,
          fill: "#666",
        },
      },
      grid: null, // 隐藏x轴网格线
    },
    y: {
      title: false,
      tickCount: 6, // 强制6个刻度
      label: {
        formatter: (v) => `${v}`,
        style: {
          fontSize: 12,
          fill: "#666",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#eee",
            lineWidth: 1,
            lineDash: [4, 2], // 虚线网格
          },
        },
      },
    },
  },
});

const barChartData = ref([
  { category: "机器学习", value: 1050 },
  { category: "计算机视觉", value: 850 },
  { category: "自然语言处理", value: 650 },
  { category: "语音识别", value: 450 },
  { category: "其他", value: 300 },
]);

const barChartOptions = ref({
  type: "view",
  height: 350,
  title: {
    text: "技术领域分布",
    style: {
      fontSize: 16,
      fontWeight: "bold",
      fill: "#333",
    },
  },
  coordinate: { transform: [{ type: "transpose" }] }, // 关键：实现水平方向
  encode: { x: "category", y: "value" }, // 交换x/y编码
  scale: {
    x: {
      // 原y轴配置
      domainMin: 0,
      domainMax: 1200,
      tickCount: 5,
    },
  },
  children: [
    {
      type: "interval",
      encode: { color: "category" },
      style: {
        fill: ({ category }) =>
          ({
            机器学习: "#6395FA",
            计算机视觉: "#63DAAB",
            自然语言处理: "#657798",
            语音识别: "#F7C122",
            其他: "#7666FA",
          }[category]),
        marginBottom: 30, // 间隔像素值
      },
      label: {
        text: "value",
        position: "right",
        style: {
          fill: "#333",
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    },
  ],
  axis: {
    y: {
      // 原x轴配置
      title: null,
      label: {
        style: {
          fontSize: 10,
          fill: "#666",
        },
      },
    },
    x: {
      // 原y轴配置
      title: null,
      grid: {
        line: {
          style: {
            stroke: "#eee",
            lineWidth: 1,
          },
        },
      },
    },
  },
  legend: {
    color: {
      position: "right",
      itemName: {
        style: {
          fill: "#333",
          fontSize: 12,
        },
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.dataAnalysis {
  & > div {
    margin-bottom: 20px;
  }

  .content {
    .chart-area {
      display: flex;
      gap: 20px;

      & > div {
        flex: 1;
      }

      .chart-wrapper {
        flex: 1;
        height: 400px;
        margin-bottom: 20px;

        /* 图表容器样式 */
        :deep(.g2-chart-container) {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      }

      .sidebar {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fafafa;
        border-radius: 4px;
      }
    }
  }
}
</style>
