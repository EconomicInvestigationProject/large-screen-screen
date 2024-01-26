<template>
  <div class="keyPersonnelDiscount" id="keyPersonnelDiscount"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, watch, onBeforeUnmount } from "vue";
import { keypersonnelStatistics } from "../api/keypersonnel";

const keyPersonnelDiscountChart = ref(null);

var option = reactive({
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
  label: {
    show: true,
    position: "top", // 在柱子的顶部显示
    color: "white", // 标题颜色
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "6%", // 增加底部空间
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: [
        "其他",
        "涉毒人员",
        "重大刑事犯罪前科人员",
        "涉稳人员",
        "在逃人员",
        "涉恐人员",
        "肇事肇祸精神病人",
        "重点上访人员",
        "标记人员",
      ],
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: "white",
        interval: 0, // 设置为 0 强制显示所有标签
        rotate: 45, // 设置角度
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
      axisLabel: {
        show: false, // 隐藏 y 轴的数字
      },
      splitLine: {
        show: false, // 显示横向网格线
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
        color: "#149DDA",
        // 设置圆角
        borderRadius: [20, 20, 0, 0],
        // barBorderRadius: [20, 20, 0, 0], // 从左上角开始，顺时针设置四个角的圆角半径
      },
      emphasis: {
        focus: "series",
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
});

// 初始化图表
const init = () => {
  // 如果已经存在实例，先销毁
  if (keyPersonnelDiscountChart.value) {
    keyPersonnelDiscountChart.value.dispose();
  }
  keyPersonnelDiscountChart.value = echarts.init(
    document.getElementById("keyPersonnelDiscount")
  );
  keyPersonnelDiscountChart.value.setOption(option);
};

// 异常人员
const getList = async () => {
  const res = await keypersonnelStatistics();
  if (res) {
    let data = res;
    data.map((item) => item.value);
    option.series[0].data = [...data];
    keyPersonnelDiscountChart.value.setOption(option);
  }
};

// resize 事件监听窗口变化，图标自适应
const keyPersonnelDiscountChartResize = () => {
  console.log("Window keyPersonnelDiscountChart");
  keyPersonnelDiscountChart.value.resize();
};

onMounted(() => {
  init();
  getList();
  // 监听窗口 resize 事件
  window.addEventListener("resize", keyPersonnelDiscountChartResize);
});

// 监听图标数据变化
watch(
  () => option.series[0].data,
  () => {
    keyPersonnelDiscountChart.value.setOption(option);
  }
);

// 组件卸载时，移除监听事件并卸载图表
onBeforeUnmount(() => {
  if (keyPersonnelDiscountChart.value) {
    keyPersonnelDiscountChart.value.dispose();
  }
  window.removeEventListener("resize", keyPersonnelDiscountChartResize);
});
</script>
<style scoped>
.keyPersonnelDiscount {
  width: 100%;
  height: 100%;
}
</style>