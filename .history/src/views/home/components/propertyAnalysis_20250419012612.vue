<template>
<div class="home">
<h2>home Vue</h2>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { Chart } from "@antv/g2";

const chart = new Chart({ container: "container" });
chart.options({
  type: "view",
  autoFit: true,
  data: [
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
  encode: { x: "year", y: "value" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { type: "line", labels: [{ text: "value", style: { dx: -10, dy: -12 } }] },
    { type: "point", style: { fill: "white" }, tooltip: false },
  ],
});

chart.render();
</script>
 
<style lang="less" scoped>
    
</style>