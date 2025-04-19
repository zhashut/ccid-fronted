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
          <h4 class="title">专利申请趋势</h4>
          <G2Chart
            type="line"
            :data="patentLayoutData"
            :options="lineChartOptions"
          />
        </div>
        <div class="chart-wrapper">
          <h4 class="title">技术领域分布</h4>
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
import { ref, onMounted } from "vue";
import G2Chart from "@/components/G2Chart.vue";
// import { getDataPatentList } from "@/api";
import api from "@/api";

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
const selectValue = ref("全部领域");
const handleChange = async () => {
  await fetchGetDataPatentList({
    field: selectValue.value === "全部领域" ? "" : selectValue.value,
  });
};

// 分页配置
const pagination = ref({
  page: 1, // 当前页码
  pageSize: 10, // 每页显示条数
  total: 0,
});

const handleTableChange = async (pag) => {
  pagination.value = {
    ...pagination.value,
    page: pag.current,
    pageSize: pag.pageSize,
  };
  await fetchGetDataPatentList({
    page: pagination.value.page,
    pageSize: pagination.value.pageSize,
  });
};

const data = ref([]);
const isOptionsInitialized = ref(false);
const allFieldOptions = ref<Array<{ value: string; label: string }>>([]);
const fieldOptions = ref([{ value: "全部领域", label: "全部领域" }]);

async function fetchGetDataPatentList(params?: any) {
  const res: any = await api.dataAnalysis.getDataPatentList(params);
  if (res.code === 0) {
    data.value = res.data.list;
    pagination.value.total = res.data.total;
    if (!isOptionsInitialized.value) {
      const fields = res.data.list
        .map((item) => item.field)
        .filter((field, index, self) => self.indexOf(field) === index);
      allFieldOptions.value = [
        { value: "全部领域", label: "全部领域" },
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
const patentLayoutData = [
  { year: "2019", value: 1000 },
  { year: "2020", value: 1500 },
  { year: "2021", value: 2000 },
  { year: "2022", value: 2500 },
  { year: "2023", value: 3000 },
];
// 动态计算最大值（向上取整到最近的1000）
const maxValue =
  Math.ceil(Math.max(...patentLayoutData.map((d) => d.value)) / 1000) * 1000;
// 生成刻度数组（0到maxValue，间隔1000）
const yTicks = Array.from({ length: maxValue / 1000 + 1 }, (_, i) => i * 1000);

// 静态图表配置
const lineChartOptions = ref({
  type: "view",
  height: 450,
  data: patentLayoutData,
  children: [
    {
      type: "line",
      encode: { x: "year", y: "value" },
      style: {
        stroke: "#1890FF", // 蓝色折线
        lineWidth: 2,
      },
    },
    {
      type: "point", // 数据点
      encode: { x: "year", y: "value" },
      style: {
        stroke: "#1890FF",
        fill: "#1890FF",
        lineWidth: 2,
        size: 6, // 点的大小
      },
    },
  ],
  scale: {
    x: {
      type: "point",
      domain: patentLayoutData.map((d) => d.year), // 所有年份
    },
    y: {
      type: "linear",
      domain: [0, maxValue],
      ticks: yTicks, // 动态生成的刻度
      tickCount: yTicks.length,
    },
  },
  axis: {
    y: {
      title: false,
      line: false,
      tickLine: false,
      grid: true,
      gridLineDash: [0, 0],
      gridLineWidth: 2.1,
      label: {
        formatter: (val) => (val % 1000 === 0 ? val : ""),
        style: {
          fill: "#666",
          fontSize: 12,
        },
      },
    },
    x: {
      title: false,
      line: {
        style: {
          stroke: "#ccc", // x轴线颜色
          lineWidth: 1,
        },
      },
      tickLine: {
        style: {
          stroke: "#ccc", // x轴刻度线
          lineWidth: 1,
        },
      },
      label: {
        style: {
          fill: "#666", // 年份标签颜色
          fontSize: 12,
        },
      },
      grid: false,
    },
  },
  title: false,
  // 禁用所有交互效果
  interactions: [],
  tooltip: false,
});

const barChartData = ref([
  { type: "机器学习", value: 1200 },
  { type: "计算机视觉", value: 850 },
  { type: "自然语言处理", value: 650 },
  { type: "语音识别", value: 450 },
  { type: "其他", value: 300 },
]);
const barMaxValue =
  Math.ceil(Math.max(...barChartData.value.map((d) => d.value)) / 1000) * 1000;

const barChartOptions = ref({
  type: "view",
  height: 450,
  title: false,
  coordinate: { transform: [{ type: "transpose" }] }, // 关键：实现水平方向
  encode: { x: "type", y: "value" }, // 交换x/y编码
  scale: {
    x: {
      // 原y轴配置
      domainMin: 0,
      domainMax: barMaxValue,
      tickCount: 5,
    },
  },
  children: [
    {
      type: "interval",
      encode: { color: "type" },
      style: {
        intervalWidth: 0.6,
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
        height: auto;
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
