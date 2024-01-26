<template>
  <div class="gauge">
    <div class="gauge_top">
      <div class="gauge_top_item gauge_top_green">正常</div>
      <div class="gauge_top_item gauge_top_yellow">离线</div>
      <div class="gauge_top_item gauge_top_block">损坏</div>
    </div>
    <div class="gauge_chart" id="gauge_chart"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref, watch, onBeforeUnmount } from "vue";
import { deviceList } from "../api/device";

const gaugeChart = ref(null);

let gaugeData = ref([
  {
    value: 0,
    name: "正常",
    title: {
      offsetCenter: ["0%", "-20%"],
      show: false,
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "-30%"],
      color: "#187ae4",
      borderColor: "#187ae4",
    },
    itemStyle: {
      color: "#187ae4",
      borderColor: "#187ae4",
    },
  },
  {
    value: 0,
    name: "离线",
    title: {
      offsetCenter: ["0%", "0%"],
      show: false,
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "2%"],
      color: "#1c65a1",
      borderColor: "#1c65a1",
    },
    itemStyle: {
      color: "#1c65a1",
      borderColor: "#1c65a1",
    },
  },

  {
    value: 0,
    name: "损坏",
    title: {
      offsetCenter: ["0%", "30%"],
      show: false,
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "35%"],
      color: "#1e3a56",
      borderColor: "#1e3a56",
    },
    itemStyle: {
      color: "#1e3a56",
      borderColor: "#1e3a56",
    },
  },
]);

let option = reactive({
  tooltip: {
    show: true,
    formatter: "{b}: {c}", // {a} 表示系列名，{c} 表示数值
    backgroundColor: "rgba(50,50,50,0.7)", // 提示框背景色
    textStyle: {
      color: "#fff", // 提示框文字颜色
    },
  },
  dataZoom: [],
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  series: [
    {
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: "#464646",
        },
      },
      axisLine: {
        lineStyle: {
          width: 40,
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: gaugeData,
      title: {
        fontSize: 14,
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 14,
        color: "inherit",
        borderColor: "inherit",
        borderRadius: 20,
        borderWidth: 1,
        formatter: "{value}%",
      },
    },
  ],
});

const init = () => {
  // 如果已经存在实例，先销毁
  if (gaugeChart.value) {
    gaugeChart.value.dispose();
  }
  // 基于准备好的dom，初始化echarts实例
  gaugeChart.value = echarts.init(document.getElementById("gauge_chart"));
  option && gaugeChart.value.setOption(option);
};

// 设备状态
const getList = async () => {
  const res = await deviceList();
  gaugeData.value.forEach((data, index) => {
    data.value = res[index]?.value;
  });
  gaugeChart.value.setOption({
    series: [
      {
        data: gaugeData.value,
        pointer: {
          show: false,
        },
      },
    ],
  });
};

// resize 事件监听窗口变化，图标自适应
const gaugeChartResize = () => {
  console.log("Window gaugeChart");
  gaugeChart.value.resize();
};

onMounted(() => {
  init();
  getList();
  // 监听窗口 resize 事件
  window.addEventListener("resize", gaugeChartResize);
});

// 监听数据变化
watch(gaugeData.value, (newValue, oldValue) => {}, { deep: true });

// 组件卸载时，移除监听事件并卸载图表
onBeforeUnmount(() => {
  if (gaugeChart.value) {
    gaugeChart.value.dispose();
  }
  window.removeEventListener("resize", gaugeChartResize);
});
</script>
<style scoped>
.gauge {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.gauge_top {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 30%;
  justify-content: space-around;
  align-items: center;
}
.gauge_top_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 50%;
  border-radius: 20%;
}
.gauge_top_green {
  background-color: #187ae4;
}

.gauge_top_yellow {
  background-color: #1c65a1;
}

.gauge_top_block {
  background-color: #1e3a56;
}

.gauge_chart {
  width: 100%;
  height: 100%;
}
</style>