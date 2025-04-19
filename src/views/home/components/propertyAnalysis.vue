<template>
  <div class="propertyAnalysis paddingBox">
    <!-- 搜索和选择器区域 - 保持原有业务功能不变 -->
    <div class="header">
      <a-select
        ref="select"
        v-model:value="selectValue"
        style="flex: 1"
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="disabled" disabled>Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select>

      <a-range-picker
        v-model:value="timeValue"
        show-time
        style="flex: 1"
        format="YYYY-MM-DD HH:mm"
        :placeholder="['开始日期', '结束日期']"
      />

      <a-button type="primary" style="flex: 1">生成新报告</a-button>
    </div>

    <div class="content">
      <div class="chart-area">
        <div class="chart-wrapper">
          <div class="title">报告生成趋势</div>
          <G2Chart
            type="line"
            :data="lineChartData"
            :options="lineChartOptions"
          />
        </div>
        <div class="chart-wrapper">
          <div class="title">报告类型分布</div>
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
            <template
              v-if="
                column.key != 'type' &&
                column.key != 'status' &&
                column.key != 'operation'
              "
            >
              {{ record[column.dataIndex] }}
            </template>

            <template v-if="column.key === 'type'">
              <a-tag v-if="record.type === '专利分析'" color="blue">{{
                record.type
              }}</a-tag>
              <a-tag v-else-if="record.type === '技术分析'" color="green">{{
                record.type
              }}</a-tag>
            </template>

            <template v-if="column.key === 'status'">
              <a-tag v-if="record.status === '已完成'" color="green">{{
                record.status
              }}</a-tag>
              <a-tag v-else-if="record.status === '进行中'" color="blue">{{
                record.status
              }}</a-tag>
              <a-tag v-else-if="record.status === '未完成'" color="pink">{{
                record.status
              }}</a-tag>
            </template>

            <template v-if="column.key === 'operation'">
              <div style="display: flex; gap: 10px">
                <div class="operation" style="color: #1677ff">
                  <img src="" alt="" /> <span>查看</span>
                </div>
                <div class="operation" style="color: #1677ff">
                  <img src="" alt="" /> <span>编辑</span>
                </div>
                <div class="operation" style="color: #1677ff">
                  <img src="" alt="" /> <span>下载</span>
                </div>
              </div>
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

// 选择器功能 (保持原样)
const selectValue = ref("jack");
const handleChange = () => {
  // 选择器变更逻辑
};
const timeValue = ref();

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
      title: null,
      formatter: (v) => v, // 确保显示0,10,20,30
      label: {
        style: {
          fontSize: 12,
          fill: "#666",
        },
      },
    },
    y: {
      title: null,
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
  { category: "专利分析", value: 30 },
  { category: "技术分析", value: 20 },
  { category: "市场分析", value: 15 },
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
    y: {
      // 原y轴配置
      domainMin: 0,
      domainMax: 30,
      tickCount: 4,
    },
  },
  children: [
    {
      type: "interval",
      encode: { color: "category" },
      style: {
        fill: ({ category }) =>
          ({
            专利分析: "#6395FA",
            技术分析: "#63DAAB",
            市场分析: "#657798",
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
    x: {
      // 原x轴配置
      title: false,
      label: {
        style: {
          fontSize: 12,
          fill: "#666",
        },
      },
    },
    y: {
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
    title: "报告",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "报告名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "生成时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "报告类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];
// 模拟数据生成
const data = ref([
  {
    id: "REP2024001",
    name: "人工智能领域专利分析报告",
    time: "2024-04-16",
    type: "专利分析",
    status: "已完成",
    content:
      "这是一份关于人工智能领域专利分析的报告，包含了专利趋势分析、主要申请人分析、技术领域分布等内容。",
  },
  {
    id: "REP2024002",
    name: "计算机视觉技术发展报告",
    time: "2024-04-15",
    type: "技术分析",
    status: "进行中",
    content:
      "这是一份关于计算机视觉技术发展的报告，包含了技术演进路线、关键算法分析、应用场景等内容。",
  },
]);
</script>

<style lang="scss" scoped>
.propertyAnalysis {
  & > div {
    margin-bottom: 20px;
  }
  .header {
    display: flex;
    gap: 20px;
  }

  .content {
    .operation {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      img {
        width: 15px;
      }
    }
    .chart-area {
      display: flex;
      gap: 20px;

      & > div {
        flex: 1;
      }

      .chart-wrapper {
        flex: 1;
        height: 400px;
        .title {
          margin-bottom: 10px;
        }
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
