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
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="disabled" disabled>Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
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
        <div class="sidebar">
          <G2Chart type="bar" :data="barChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import G2Chart from "../../../components/G2Chart.vue";

// 搜索功能 (保持原样)
const searchValue = ref("");
const onSearch = () => {
  // 搜索逻辑
};

// 选择器功能 (保持原样)
const selectValue = ref("jack");
const handleChange = () => {
  // 选择器变更逻辑
  console.log("选择器值变更:", selectValue.value);
};

// 图表数据配置
const lineChartData = ref([
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
]);

// 静态图表配置
const lineChartOptions = ref({
  type: "view",
  autoFit: true,
  encode: { x: "year", y: "value" },
  children: [
    {
      type: "line",
      labels: [{ text: "value", style: { dx: -10, dy: -12 } }],
      style: { stroke: "#1890ff", lineWidth: 2 },
    },
    {
      type: "point",
      style: { fill: "white" },
      tooltip: false,
    },
  ],
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
  title: {
    text: "技术领域分布",
    style: {
      fontSize: 16,
      fontWeight: "bold",
      fill: "#333",
    },
  },
  coordinate: { transform: [{ type: "transpose" }] }, // 关键：实现水平方向
  encode: { y: "category", x: "value" }, // 交换x/y编码
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
            机器学习: "#1f77b4",
            计算机视觉: "#17becf",
            自然语言处理: "#2ca02c",
            语音识别: "#ff7f0e",
            其他: "#9467bd",
          }[category]),
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
      title: false,
      label: {
        style: {
          fontSize: 12,
          fill: "#666",
        },
      },
    },
    x: {
      // 原y轴配置
      title: false,
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
