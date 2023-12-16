<template>
  <div class="variousPeople" id="variousPeople"></div>
</template>
    <script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { deviceList } from "../api/device";

const variousPeopleChart = ref(null);

let option = reactive({
  title: {
    text: "人口占比比例",
    textStyle: {
      color: "#fff",
    },
    show: false,
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
    textStyle: {
      color: "#fff", // 设置标题文字颜色为白色
    },
  },
  textStyle: {
    color: "#fff",
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#060E3F",
        borderWidth: 2,
        color: [],
      },
      label: {
        show: false,
        position: "center",
        textStyle: {
          // 设置字体样式
          color: "#fff", // 设置字体颜色为白色
        },
      },
      itemStyle: {
        // color: ['#071141','#060F44','#06104A','#07124E','#081454']
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
        { value: 12000, name: "常住人口" },
        { value: 800, name: "流出人口" },
        { value: 900, name: "陌生人" },
      ],
    },
  ],
});

// 设备状态
const getList = async () => {
  const res = await deviceList();
};

const init = () => {
  variousPeopleChart.value = echarts.init(
    document.getElementById("variousPeople")
  );
  option && variousPeopleChart.value.setOption(option);
};

onMounted(() => {
  // getList();
  init();
});
</script>
    <style scoped>
.variousPeople {
  width: 100%;
  height: 100%;
}
</style>