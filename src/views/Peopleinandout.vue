<template>
  <div class="peopleinandout" id="peopleinandout"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { deviceList } from "../api/device";

const peopleinandoutChart = ref(null);

let option = reactive({
  title: {
    text: "搬入搬出人员占比",
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
      // radius: ["40%", "70%"],
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
            // var colorList = ["#129DD9", "#187AE4"];
            // return colorList[colors.dataIndex];
            // params.dataIndex表示数据项的索引
            var colorList = [
              { offset: 0, color: "#129DD9" }, // 开始颜色
              { offset: 1, color: "#187AE4" }, // 结束颜色
            ];
            var linearGradient = new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              colorList
            );
            return linearGradient;
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
        { value: 12000, name: "搬入人员" },
        { value: 800, name: "搬出人员" },
      ],
    },
  ],
});

// 搬入搬出人员
const getList = async () => {
  const res = await deviceList();
};

const init = () => {
  peopleinandoutChart.value = echarts.init(
    document.getElementById("peopleinandout")
  );
  option && peopleinandoutChart.value.setOption(option);
};

onMounted(() => {
  // getList();
  init();
});

watch(
  () => option.series[0].data,
  () => {
    peopleinandoutChart.value.setOption(option);
  }
);
</script>
<style scoped>
.peopleinandout {
  width: 100%;
  height: 100%;
}
</style>