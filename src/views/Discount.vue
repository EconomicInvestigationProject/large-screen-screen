<template>
  <div class="dscount" id="dscount"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { abnormalpersonnelStatistics } from "../api/abnormalpersonnel";

var dscountChart;
var option = {
  color: ["#37A2FF"],
  title: {
    text: "异常人员",
    show: false,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["异常人员"],
    textStyle: {
      color: "#fff",
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
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
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          color: "white", // 设置字体颜色为白色
        },
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
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
      name: "异常人员",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(0, 221, 255)",
          },
          {
            offset: 1,
            color: "rgb(77, 119, 255)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [10, 28, 30, 20, 10, 5, 20],
    },
  ],
};

const init = () => {
  dscountChart = echarts.init(document.getElementById("dscount"));
  dscountChart.setOption(option);
};

// 异常人员
const getList = async () => {
  const res = await abnormalpersonnelStatistics();
  if (res) {
    option.series[0].data = [...res];
    dscountChart.setOption(option);
  }
};

onMounted(() => {
  init();
  getList();
});

watch(
  () => option.series[0].data,
  () => {
    dscountChart.value.setOption(option);
  }
);
</script>
<style scoped>
.dscount {
  width: 100%;
  height: 100%;
}
</style>