<template>
  <div class="peopleinandout" id="peopleinandout"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, watch, onBeforeUnmount } from "vue";
import { peopleinandoutStatistics } from "../api/peopleinandout";

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
      avoidLabelOverlap: false,
      radius: '80', // 或者使用数字，如 radius: 100
      itemStyle: {
        borderRadius: 10,
        borderColor: "#060E3F",
        borderWidth: 2,
        color: [],
      },
      label: {
        // normal: {
        position: "inside", // 在内部显示，outseide 是在外部显示
        show: true,
        formatter: "{c}", // formatter 是标签内容的格式器，用于转换格式。支持 字符串和回调函数两种形式。
        // },
        // textStyle: {
        // 设置字体样式
        color: "#fff", // 设置字体颜色为白色
        // },
      },
      itemStyle: {
        // normal: {
        color: function (colors) {
          var colorList = ["#129DD9", "#187AE4"];
          return colorList[colors.dataIndex];
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

// 初始化图表数据
const init = () => {
  // 如果已经存在实例，先销毁
  if (peopleinandoutChart.value) {
    peopleinandoutChart.value.dispose();
  }
  peopleinandoutChart.value = echarts.init(
    document.getElementById("peopleinandout")
  );
  option && peopleinandoutChart.value.setOption(option);
};

// 搬入搬出人员统计
const getList = async () => {
  const res = await peopleinandoutStatistics();
  if (res) {
    option.series[0].data[0].value = res[0].sumPeopleMovedIn;
    option.series[0].data[1].value = res[0].sumPeopleMovedOut;
    peopleinandoutChart.value.setOption(option);
  }
};

// resize 事件监听窗口变化，图标自适应
const peopleinandoutChartResize = () => {
  console.log("Window peopleinandoutChart");
  peopleinandoutChart.value.resize();
};

onMounted(() => {
  init();
  getList();
  // 监听窗口 resize 事件
  window.addEventListener("resize", peopleinandoutChartResize);
});

// 监听图标数据变化
watch(
  () => option.series[0].data,
  () => {
    peopleinandoutChart.value.setOption(option);
  }
);

// 组件卸载时，移除监听事件并卸载图表
onBeforeUnmount(() => {
  if (peopleinandoutChart.value) {
    peopleinandoutChart.value.dispose();
  }
  window.removeEventListener("resize", peopleinandoutChartResize);
});
</script>
<style scoped>
.peopleinandout {
  width: 100%;
  height: 100%;
}
</style>