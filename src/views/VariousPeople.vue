<template>
  <div class="variousPeople" id="variousPeople"></div>
</template>
    <script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { proportionvarioustypespeopleStatistics } from "../api/proportionvarioustypespeople";

const variousPeopleChart = ref(null);

let option = reactive({
  title: {
    text: "小区各类人员占比",
    textStyle: {
      color: "#fff",
    },
    show: false,
  },
  tooltip: {
    trigger: "item",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
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
        normal: {
          color: function (colors) {
            // var colorList = ["#129DD9", "#187AE4", "#1C65A1"];
            // return colorList[colors.dataIndex];
            var colorList = [
              { offset: 0, color: "#199DAD" },
              { offset: 0.5, color: "#187AE8" },
              { offset: 1, color: "#1C65A1" },
            ];
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, colorList);
          },
        },
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
        { name: "常住人口", value: "12000" },
        { name: "流动人口", value: "800" },
        { name: "陌生人", value: "900" },
      ],
    },
  ],
});

//小区各类人员占比
const getList = async () => {
  const res = await proportionvarioustypespeopleStatistics();
  if (res) {
    option.series[0].data = res;
    variousPeopleChart.value.setOption(option);
  }
};

const init = () => {
  variousPeopleChart.value = echarts.init(
    document.getElementById("variousPeople")
  );
  option && variousPeopleChart.value.setOption(option);
};

onMounted(() => {
  init();
  getList();
  // 监听窗口 resize 事件
  window.addEventListener("resize", () => {
    console.log("Window variousPeopleChart");
    variousPeopleChart.value.resize();
  });
});

watch(
  () => option.series[0].data,
  () => {
    variousPeopleChart.value.setOption(option);
  }
);
</script>
    <style scoped>
.variousPeople {
  width: 100%;
  height: 100%;
}
</style>