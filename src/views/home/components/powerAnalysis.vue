<template>
  <div class="power-analysis">
    <div class="top-section">
      <!-- 专利布局趋势 -->
      <div class="chart-section trend-chart">
        <h3>专利布局趋势</h3>
        <div id="patent-trend" ref="patentTrendRef"></div>
      </div>

      <!-- 技术领域分布 -->
      <div class="chart-section distribution-chart">
        <h3>技术领域分布</h3>
        <div id="tech-distribution" ref="techDistributionRef"></div>
      </div>
    </div>

    <!-- 技术竞争力分析 -->
    <div class="chart-section competitiveness-chart">
      <h3>技术竞争力分析</h3>
      <div id="tech-competitiveness" ref="techCompetitivenessRef"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart } from "@antv/g2";
import G2Chart from "../../../components/G2Chart.vue";

// 引用元素
const patentTrendRef = ref(null);
const techDistributionRef = ref(null);
const techCompetitivenessRef = ref(null);

// 初始化图表
onMounted(() => {
  // ---------------------------------------------------------------专利布局趋势图---------------------------------------------------------------
  {
    const patentLayoutData = [
      { year: "2019", value: 1000 },
      { year: "2020", value: 1500 },
      { year: "2021", value: 2000 },
      { year: "2022", value: 2500 },
      { year: "2023", value: 3000 },
    ];

    // 动态计算最大值（向上取整到最近的1000）
    const maxValue =
      Math.ceil(Math.max(...patentLayoutData.map((d) => d.value)) / 1000) *
      1000;

    // 生成刻度数组（0到maxValue，间隔1000）
    const yTicks = Array.from(
      { length: maxValue / 1000 + 1 },
      (_, i) => i * 1000
    );

    const trendChart = new Chart({
      container: patentTrendRef.value,
      autoFit: true,
      height: 400,
    });

    trendChart.options({
      type: "view",
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
      title: {
        text: "专利布局趋势",
        style: {
          fontSize: 16,
          fill: "#333",
          textAlign: "left",
        },
        position: "left-top",
      },
      // 禁用所有交互效果
      interactions: [],
      tooltip: false,
    });

    trendChart.render();
  }

  // ---------------------------------------------------------------技术领域分布饼图---------------------------------------------------------------
  {
    const techDistributionData = [
      { item: "机器学习", count: 1200 },
      { item: "计算机视觉", count: 800 },
      { item: "自然语言处理", count: 600 },
      { item: "语音识别", count: 400 },
      { item: "其他", count: 200 },
    ];

    // 计算总数和百分比
    const total = techDistributionData.reduce(
      (sum, item) => sum + item.count,
      0
    );
    techDistributionData.forEach((item) => {
      item.percent = (item.count / total).toFixed(4); // 保留四位小数
    });

    const pieChart = new Chart({
      container: techDistributionRef.value,
      autoFit: true,
      height: 400,
    });

    pieChart.options({
      coordinate: {
        type: "theta",
        outerRadius: 0.8,
      },
      type: "interval",
      data: techDistributionData,
      transform: [{ type: "stackY" }],
      encode: {
        y: "count",
        color: "item",
      },
      legend: {
        color: {
          position: "right",
          layout: { justifyContent: "center" },
        },
      },
      labels: [
        {
          position: "outside",
          text: (data) => `${data.item}: ${(data.percent * 100).toFixed(2)}%`,
        },
      ],
      tooltip: {
        items: [
          (data) => ({
            name: data.item,
            value: `${(data.percent * 100).toFixed(2)}%`,
          }),
        ],
      },
    });

    pieChart.render();
  }

  // ---------------------------------------------------------------技术竞争力雷达图---------------------------------------------------------------
  {
    const techCompetitivenessData = [
      { item: "技术创新", score: 85 },
      { item: "专利质量", score: 80 },
      { item: "市场应用", score: 75 },
      { item: "研发投入", score: 90 },
      { item: "人才储备", score: 70 },
    ];

    const radarChart = new Chart({
      container: techCompetitivenessRef.value,
      autoFit: true,
      theme: {
        colors10: ["#1890FF"],
        backgroundColor: "#fff",
      },
    });

    radarChart.options({
      coordinate: {
        type: "polar",
        args: [
          {
            innerRadius: 0.3,
            radius: 0.75,
          },
        ],
      },
      data: techCompetitivenessData,
      scale: {
        x: {
          range: [0, 1],
          padding: 0.5,
        },
        y: {
          min: 0,
          max: 100,
          tickCount: 5,
          nice: true,
        },
      },
      axis: {
        x: {
          grid: {
            line: {
              type: "circle",
              style: {
                stroke: "#DDD",
                lineWidth: 1,
                strokeOpacity: 0.8,
              },
            },
          },
          line: false,
          tick: false,
          label: {
            style: {
              fontSize: 12,
              fill: "#333",
              fontWeight: "normal",
            },
            offset: 15,
          },
        },
        y: {
          title: false,
          label: false,
          grid: {
            line: {
              style: {
                stroke: "#DDD",
                lineWidth: 1,
              },
            },
          },
          line: false,
          label: false,
        },
      },
      children: [
        {
          type: "area",
          encode: {
            x: "item",
            y: "score",
          },
          style: {
            fill: "#1890FF",
            fillOpacity: 0.2,
            stroke: "#1890FF",
            lineWidth: 0,
          },
        },
        {
          type: "line",
          encode: {
            x: "item",
            y: "score",
          },
          style: {
            lineWidth: 2,
          },
        },
        {
          type: "point",
          encode: {
            x: "item",
            y: "score",
            size: 4,
          },
          style: {
            fill: "#1890FF",
            stroke: "#FFF",
            lineWidth: 1,
          },
        },
      ],
    });

    radarChart.render();
  }
});
</script>

<style lang="less" scoped>
.power-analysis {
  .top-section {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .chart-section {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    h3 {
      margin-bottom: 20px;
      font-size: 18px;
      color: #333;
    }
  }

  .trend-chart {
    flex: 1;
    min-width: 0;
  }

  .distribution-chart {
    flex: 1;
    min-width: 0;
  }

  .competitiveness-chart {
    width: 100%;
  }
}
</style>
