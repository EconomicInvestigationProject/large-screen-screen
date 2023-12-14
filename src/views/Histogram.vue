<template>
  <div class="histogram" id="histogram"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { deviceList } from "../api/device";

const dscountChart = ref(null);

let option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
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
        color:'#187AE4',
        // 设置圆角
        barBorderRadius: [20, 20, 0, 0], // 从左上角开始，顺时针设置四个角的圆角半径
      },
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
});

// 设备状态
const getList = async () => {
  const res = await deviceList();
};

const init = () => {
  dscountChart.value = echarts.init(document.getElementById("histogram"));
  option && dscountChart.value.setOption(option);
};

onMounted(() => {
  getList();
  init();
});
</script>
<style scoped>
.histogram {
  width: 100%;
  height: 100%;
}
</style>