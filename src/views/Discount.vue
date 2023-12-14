<template>
  <div class="dscount" id="dscount"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { deviceList } from "../api/device";

const dscountChart = ref(null);

let option = reactive({
  color: ["#80FFA5", "#00DDFF"],
  title: {
    text: "搬入搬出人口统计",
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
    data: ["实有人口总数", "上周实有人口"],
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
      name: "实有人口总数",
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
            color: "rgb(128, 255, 165)",
          },
          {
            offset: 1,
            color: "rgb(1, 191, 236)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [10, 28,30,20,10,5],
    }
  ],
});

// 设备状态
const getList = async () => {
  const res = await deviceList();
};

const init = () => {
  dscountChart.value = echarts.init(document.getElementById("dscount"));
  dscountChart.value.setOption(option);
};

onMounted(() => {
  getList();
  init();
});
</script>
<style scoped>
.dscount {
  width: 100%;
  height: 100%;
}
</style>