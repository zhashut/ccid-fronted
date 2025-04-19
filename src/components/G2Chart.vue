<template>
  <div class="g2-chart-wrapper">
    <div ref="chartContainer" class="g2-chart-container"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Chart } from "@antv/g2";

const props = defineProps({
  type: {
    type: String,
    default: "line",
    validator: (value) => ["line", "bar"].includes(value),
  },
  data: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const chartContainer = ref(null);
let chart = null;

const renderChart = () => {
  if (!chartContainer.value) return;

  if (chart) chart.destroy();

  chart = new Chart({
    container: chartContainer.value,
    autoFit: true,
  });

  // 合并基础配置和传入的options
  const mergedOptions = {
    type: "view",
    data: props.data,
    children: [],
    ...props.options, // 这里会合并lineChartOptions或barChartOptions
  };

  // 根据类型添加默认图形配置（如果options中未定义children）
  if (!props.options.children) {
    if (props.type === "line") {
      mergedOptions.children.push({
        type: "line",
        encode: { x: "year", y: "value" },
        style: { stroke: "#1890ff", lineWidth: 2 },
      });
    } else if (props.type === "bar") {
      mergedOptions.children.push({
        type: "interval",
        encode: { x: "year", y: "sales" },
        coordinate: { transform: [{ type: "transpose" }] },
        style: { fill: "#30BF78" },
      });
    }
  }

  chart.options(mergedOptions);
  chart.render();
};

onMounted(renderChart);
onBeforeUnmount(() => chart?.destroy());

watch(() => [props.type, props.data, props.options], renderChart, {
  deep: true,
});
</script>
