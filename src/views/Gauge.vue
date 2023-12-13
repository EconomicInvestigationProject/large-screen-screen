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
import { onMounted, reactive, ref, defineProps, watch } from "vue";
import { deviceList } from "../api/device";

const gaugeChart = ref(null);

let gaugeData = ref([
  {
    value: 0,
    name: "正常",
    title: {
      offsetCenter: ["0%", "-20%"],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "-30%"],
    },
  },
  {
    value: 0,
    name: "离线",
    title: {
      offsetCenter: ["0%", "0%"],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "2%"],
    },
  },
  {
    value: 0,
    name: "损坏",
    title: {
      offsetCenter: ["0%", "30%"],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "35%"],
    },
  },
]);

let option = reactive({
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

onMounted(() => {
  getList();
  init();

  // 监听数据变化
  watch(
    gaugeData.value,
    (newValue, oldValue) => {
      console.log(`新的值是：${newValue.name}，旧的值是：${oldValue.name}`);
    },
    { deep: true }
  );
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
  background-color: #91cc75;
}

.gauge_top_yellow {
  background-color: #fac858;
}

.gauge_top_block{
  background-color: #5470c6;
}

.gauge_chart {
  width: 100%;
  height: 100%;
}
</style>