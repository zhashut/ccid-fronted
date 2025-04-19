<template>
  <div class="dataAnalysis">
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Chart } from "@antv/g2";

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [
      { year: "1991", value: 3 },
      { year: "1992", value: 4 },
      { year: "1993", value: 3.5 },
      { year: "1994", value: 5 },
      { year: "1995", value: 4.9 },
      { year: "1996", value: 6 },
      { year: "1997", value: 7 },
      { year: "1998", value: 9 },
      { year: "1999", value: 13 },
    ],
  },
  chartOptions: {
    type: Object,
    default: () => ({
      type: "view",
      autoFit: true,
      encode: { x: "year", y: "value" },
      scale: {
        x: { range: [0, 1] },
        y: { domainMin: 0, nice: true },
      },
      children: [
        {
          type: "line",
          labels: [
            {
              text: "value",
              style: { dx: -10, dy: -12 },
            },
          ],
        },
        {
          type: "point",
          style: { fill: "white" },
          tooltip: false,
        },
      ],
    }),
  },
});

const chartContainer = ref(null);
let chart = null;

const initChart = () => {
  if (!chartContainer.value) return;

  // 销毁旧图表实例（防止重复创建）
  if (chart) {
    chart.destroy();
  }

  chart = new Chart({
    container: chartContainer.value,
    autoFit: true,
  });

  // 合并默认配置和传入配置
  const mergedOptions = {
    ...props.chartOptions,
    data: props.chartData,
  };

  chart.options(mergedOptions);
  chart.render();

  // 添加窗口大小变化监听
  window.addEventListener("resize", handleResize);
};

const handleResize = () => {
  if (chart) {
    chart.forceFit();
  }
};

const updateChart = () => {
  if (chart) {
    chart.changeData(props.chartData);
  }
};

// 初始化图表
onMounted(initChart);

// 监听数据变化
watch(() => props.chartData, updateChart);

// 监听配置变化
watch(
  () => props.chartOptions,
  () => {
    initChart(); // 配置变化需要重新初始化
  },
  { deep: true }
);

// 清理资源
onBeforeUnmount(() => {
  if (chart) {
    window.removeEventListener("resize", handleResize);
    chart.destroy();
    chart = null;
  }
});
</script>

<style lang="scss" scoped>
.dataAnalysis {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  .chart-container {
    width: 100%;
    height: 400px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
