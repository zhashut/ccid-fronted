<template>
<div class="dataAnalysis">
    <div ref="chartContainer" class="chart-container"></div>
</div>
</template>

<script setup>
import { ref } from 'vue'

import { Chart } from "@antv/g2";

// 定义props（如果需要从父组件接收数据）
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

// 图表容器引用
const chartContainer = ref(null);
// 图表实例
let chart = null;

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) return;

  // 创建图表实例
  chart = new Chart({
    container: chartContainer.value,
    autoFit: true,
  });

  // 设置图表配置
  chart.options({
    ...props.chartOptions,
    data: props.chartData,
  });

  // 渲染图表
  chart.render();
};

// 更新图表数据
const updateChart = () => {
  if (chart) {
    chart.changeData(props.chartData);
  }
};

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
});

// 监听数据变化
watch(
  () => props.chartData,
  () => {
    updateChart();
  }
);

// 组件卸载前销毁图表
onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>
 
<style lang="scss" scoped>
    
</style>