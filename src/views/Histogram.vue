<template>
  <div class="histogram" id="histogram"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { elevatorpersonneldensityStatistics } from "../api/elevatorpersonneldensity";

const histogramChart = ref(null);

let option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      label: {
        backgroundColor: "#6a7985",
      },
    },
    formatter: "{b}:人员密度是 {c}", // 提示框内容，{b} 表示 x 轴数据，{c} 表示 y 轴数据
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        textStyle: {
          color: "white", // 设置字体颜色为白色
        },
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        textStyle: {
          color: "white", // 设置字体颜色为白色
        },
      },
    },
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      barWidth: "50%",
      // 设置柱子的样式
      itemStyle: {
        color: "#187AE4",
        // 设置圆角
        barBorderRadius: [20, 20, 0, 0], // 从左上角开始，顺时针设置四个角的圆角半径
      },
      emphasis: {
        focus: "series",
      },
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
});

const init = () => {
  histogramChart.value = echarts.init(document.getElementById("histogram"));
  option && histogramChart.value.setOption(option);
};

// 电梯人员密度
const getList = async () => {
  const res = await elevatorpersonneldensityStatistics();
  if (res) {
    option.series[0].data = [...res];
    histogramChart.value.setOption(option);
  }
};

onMounted(() => {
  init();
  getList();
});

watch(
  () => option.series[0].data,
  () => {
    histogramChart.value.setOption(option);
  }
);
</script>
<style scoped>
.histogram {
  width: 100%;
  height: 100%;
}
</style>