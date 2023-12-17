<template>
  <div class="floating" id="floating"></div>
</template>
  <script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { deviceList } from "../api/device";

const floatingChart = ref(null);

let option = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
});

// 设备状态
const getList = async () => {
  const res = await deviceList();
};

const init = () => {
  floatingChart.value = echarts.init(document.getElementById("floating"));
  option && floatingChart.value.setOption(option);
};

onMounted(() => {
  // getList();
  init();
  // 监听窗口 resize 事件
  window.addEventListener("resize", () => {
    console.log("Window floatingChart");
    floatingChart.value.resize();
  });
});
</script>
  <style scoped>
.floating {
  width: 100%;
  height: 100%;
}
</style>