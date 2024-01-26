<template>
  <div class="histogram" id="histogram"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, watch, markRaw, onBeforeUnmount } from "vue";
import { elevatorpersonneldensityStatistics } from "../api/elevatorpersonneldensity";

const histogramChart = ref(null);

let option = reactive({
  tooltip: {
    trigger: "item",
    axisPointer: {
      type: "shadow",
      label: {
        backgroundColor: "#6a7985",
      },
    },
    show: true,
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
        // textStyle: {
        color: "white", // 设置字体颜色为白色
        // },
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        // textStyle: {
        color: "white", // 设置字体颜色为白色
        // },
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
        borderRadius: [20, 20, 0, 0],
        // barBorderRadius: [20, 20, 0, 0], // 从左上角开始，顺时针设置四个角的圆角半径
      },
      emphasis: {
        focus: "series",
      },
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
});

// 初始化图表数据
const init = () => {
  // 如果已经存在实例，先销毁
  if (histogramChart.value) {
    histogramChart.value.dispose();
  }
  histogramChart.value = markRaw(
    echarts.init(document.getElementById("histogram"))
  );
  option && histogramChart.value.setOption(option);
};

// 电梯人员密度
const getList = async () => {
  const res = await elevatorpersonneldensityStatistics();
  if (res) {
    option.series[0].data = [...res] || [0, 0, 0, 0, 0, 0, 0];
    histogramChart.value.setOption(option, true); // 添加第二个参数 true 表示合并而不是替换
  }
};

// resize 事件监听窗口变化，图标自适应
const histogramChartResize = () => {
  console.log("Window histogramChart");
  histogramChart.value && histogramChart.value.resize();
};

onMounted(() => {
  init();
  getList();
  // 监听窗口 resize 事件
  window.addEventListener("resize", histogramChartResize);
});

// 监听数据变化
watch(
  () => option.series[0].data,
  () => {
    histogramChart.value.setOption(option, true);
  }
);

// 组件卸载时，移除监听事件并卸载图表
onBeforeUnmount(() => {
  if (histogramChart.value) {
    histogramChart.value.dispose();
  }
  window.removeEventListener("resize", histogramChartResize);
});
</script>
<style scoped>
.histogram {
  width: 100%;
  height: 100%;
}
</style>