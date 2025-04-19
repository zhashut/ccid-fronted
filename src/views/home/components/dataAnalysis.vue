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
        <div class="chart-wrapper">
          <G2Chart type="bar" :data="barChartData" :options="barChartOptions" />
        </div>
      </div>
      <div class="table">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
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

<script setup>
import { ref } from "vue";
import G2Chart from "@/components/G2Chart.vue";

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
    title: "专科号",
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
// 模拟数据生成
const data = ref([
  {
    id: "CN202410000000.1",
    title: "一种基于深度学习的图像识别方法",
    applicant: "某科技公司",
    date: "2024-01-01",
    field: "计算机视觉",
  },
  {
    id: "CN202410000001.2",
    title: "自然语言处理中的文本分类方法",
    applicant: "某人工智能研究所",
    date: "2024-01-05",
    field: "自然语言处理",
  },
  {
    id: "CN202410000002.3",
    title: "基于深度强化学习的决策系统",
    applicant: "某大学",
    date: "2024-01-10",
    field: "机器学习",
  },
  {
    id: "CN202410000003.4",
    title: "一种音视频特征提取方法",
    applicant: "某声学研究所",
    date: "2024-01-15",
    field: "语音识别",
  },
]);
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
