<template>
  <div class="propertyAnalysis paddingBox">
    <!-- 搜索和选择器区域 - 保持原有业务功能不变 -->
    <div class="header">
      <a-select
        ref="select"
        v-model:value="selectValue"
        style="width: 200px"
        placeholder="请选择"
        @change="handleChange"
      >
        <a-select-option
          v-for="(item, index) in selectList"
          :key="index"
          :value="item"
          >{{ item }}</a-select-option
        >
      </a-select>

      <a-range-picker
        v-model:value="timeValue"
        show-time
        format="YYYY-MM-DD HH:mm"
        value-format="YYYY-MM-DD HH:mm:ss"
        :placeholder="['开始日期', '结束日期']"
        @change="handleTimeChang"
      />

      <div class="button" @click="onRest()">
        <img src="@/assets/image/刷新.png" alt="" />
        <span>刷新</span>
      </div>
    </div>

    <div class="content">
      <div class="chart-area">
        <div class="chart-wrapper">
          <h3 class="title">报告生成趋势</h3>
          <G2Chart
            type="line"
            :data="lineChartData"
            :options="lineChartOptions"
          />
        </div>
        <div class="chart-wrapper">
          <h3 class="title">报告类型分布</h3>
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
              <a-tag v-else-if="record.type === '市场分析'" color="blue">{{
                record.type
              }}</a-tag>
            </template>

            <template v-if="column.key === 'status'">
              <a-tag v-if="record.status === 1" color="green">已完成</a-tag>
              <a-tag v-else-if="record.status === 2" color="blue">进行中</a-tag>
            </template>

            <template v-if="column.key === 'operation'">
              <div style="display: flex; gap: 10px">
                <div
                  class="operation"
                  style="color: #1677ff"
                  @click="setDataTwo(record)"
                >
                  <img src="" alt="" /> <span>查看</span>
                </div>
                <div
                  class="operation"
                  style="color: #1677ff"
                  @click="handleColumns(record)"
                >
                  <img src="" alt="" /> <span>编辑</span>
                </div>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
  <a-modal
    v-model:open="modalVisible"
    :title="modalValue"
    style="top: 30px"
    @ok="setModal1Visible(false)"
  >
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      style="margin-top: 40px; margin-left: -40px"
    >
      <a-form-item label="报告ID" name="id">
        <a-input v-model:value="formState.id" />
      </a-form-item>
      <a-form-item label="报告名称" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="报告类型" name="type">
        <a-input v-model:value="formState.type" />
      </a-form-item>
      <a-form-item label="报告状态" name="status">
        <a-select v-model:value="formState.status" placeholder="请选择状态">
          <a-select-option :value="1">进行中</a-select-option>
          <a-select-option :value="2">已完成</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="报告内容" name="content">
        <a-input v-model:value="formState.content" />
      </a-form-item>
    </a-form>

    <template #footer v-if="modalValue === '报告修改'">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleSubmit">确定</a-button>
    </template>
    <template #footer v-else> </template>
  </a-modal>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import G2Chart from "@/components/G2Chart.vue";
import api from "@/api";

onMounted(() => {
  getData();
});
// 选择器功能 (保持原样)
const selectValue = ref();
const selectList = ref(["技术分析", "市场分析", "专利分析"]);
const handleChange = (value) => {
  selectValue.value = value;
  getData();
};
const timeValue = ref();
const start_time = ref();
const end_time = ref();
const handleTimeChang = (value) => {
  timeValue.value = value;
  start_time.value = value[0];
  end_time.value = value[1];
  getData();
};
// 刷新
const onRest = () => {
  selectValue.value = "";
  timeValue.value = "";
  start_time.value = "";
  end_time.value = "";
  getData();
};
// 图表数据配置
const lineChartData = ref([
  { year: "1月", value: 10 },
  { year: "2月", value: 15 },
  { year: "3月", value: 20 },
  { year: "4月", value: 25 },
]);
// 动态计算最大值（向上取整到最近的1000）
const maxValue = Math.ceil(
  Math.max(...lineChartData.value.map((d) => d.value / 5)) * 5
);
// 生成刻度数组（0到maxValue，间隔1000）
const yTicks = Array.from({ length: maxValue / 5 + 1 }, (_, i) => i * 5);

// 静态图表配置
const lineChartOptions = ref({
  type: "view",
  height: 400,
  autoFit: true,
  padding: [40, 20, 50, 50], // 调整边距（上、右、下、左）
  encode: {
    x: "year",
    y: "value",
  },
  scale: {
    x: {
      type: "point",
      domain: lineChartData.value.map((d) => d.year), // 所有年份
    },
    y: {
      type: "linear",
      domain: [0, maxValue],
      ticks: yTicks, // 动态生成的刻度
      tickCount: yTicks.length,
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
    y: {
      title: false,
      line: false,
      tickLine: false,
      grid: true,
      gridLineDash: [0, 0],
      gridLineWidth: 2.1,
      label: {
        formatter: (val) => (val % 5 === 0 ? val : ""),
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
});

const barChartData = ref([
  { item: "专利分析", value: 30 },
  { item: "技术分析", value: 20 },
  { item: "市场分析", value: 15 },
]);

const barChartOptions = ref({
  type: "view",
  height: 400,
  title: false,
  coordinate: { transform: [{ type: "transpose" }] }, // 关键：实现水平方向
  encode: { x: "item", y: "value" }, // 交换x/y编码
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
      encode: { color: "item" },
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
    getData();
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
const data = ref([]);
const getData = async () => {
  try {
    const params = {
      type: selectValue.value,
      start_time: start_time.value || "",
      end_time: end_time.value || "",
      page: pagination.value.current,
      pageSize: pagination.value.pageSize,
    };
    const res = await api.propertyAnalysis.getDataReportList(params);
    data.value = res.data.list;
    timeValue.value = "";
  } catch (e) {}
};
// 弹窗
const modalVisible = ref(false);
const modalValue = ref();
const setModal1Visible = (open) => {
  modal1Visible.value = open;
};
const formState = reactive({
  id: 1,
  name: "",
  type: "",
  content: "",
  status: 1,
});
const handleColumns = (row) => {
  modalVisible.value = true;
  modalValue.value = "报告修改";
  Object.keys(formState).forEach((key) => {
    if (row.hasOwnProperty(key)) {
      formState[key] = row[key];
    }
  });
};
const handleSubmit = async () => {
  try {
    const params = { ...formState };
    await api.propertyAnalysis.updateDataReport(params);
  } catch (e) {}
};

const handleCancel = () => {
  // 重置表单
  Object.assign(formState, {
    name: "",
    type: "",
    content: "",
    status: 1,
  });
  // 关闭弹窗
  modalVisible.value = false;
};

const setDataTwo = (row) => {
  modalValue.value = "查看";
  modalVisible.value = true;
  Object.keys(formState).forEach((key) => {
    if (row.hasOwnProperty(key)) {
      formState[key] = row[key];
    }
  });
};
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
        height: auto;
        margin-bottom: 10px;
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
