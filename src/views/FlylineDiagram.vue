<template>
  <div class="FlylineDiagram">
    <div class="FlylineDiagram_item"></div>
    <div class="FlylineDiagram_item">
      <div
          ref="mapchart"
          id="mapchart"
          style="height: 50vh;width:50vw; position: relative"
        ></div>
    </div>
    <div class="FlylineDiagram_item"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted  ,onBeforeUnmount} from "vue";

import * as echarts from "echarts";

// import "echarts/extension/bmap/bmap";
import "echarts-extension-amap";
import "echarts-wordcloud";
import "echarts-liquidfill";
import config from "./../config/index";
import utils from "./../utils/utils";
import chartutils from "./../utils/chartutils"

const $echarts = echarts;

//地图
let mapchart = null;
//初始化图标
const initCharts = () => {
  // title, values, ele
  chartutils.initMapChart("mapchart");
  initStatusChart();
};

let timer = null;
// const startRefreshChart = () => {
//   timer && clearInterval(timer);

//   //获取刷新周期，TODO 配置变动时，此处需自动更新
//   let refreshtime = 60 * 1000;
//   config.getConfig().forEach(function (item, index) {
//     if (item.key == "refreshtime") {
//       refreshtime = item.value;
//     }
//   });
// };


onMounted(() => {
  initCharts();
  // startRefreshChart();
  initRadar()
})
 onBeforeUnmount (() => {
  timer && clearInterval(timer);
});

//初始化雷达图
const initRadar = ()=>{
  let option = {
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
};
}





// 初始化地图
const initStatusChart = () => {

  let angleAxis = [];
  let titles = [];
  let radiusAxis = [];
  let polar = [];
  let series = [];
  
  let option = {
    title: titles,
    tooltip: {
      show: false,
    },
    // 极坐标系的角度轴
    angleAxis: angleAxis,
    // 极坐标系的径向轴。
    radiusAxis: radiusAxis,
    // 极坐标系
    polar: polar,
    series: series,
  };
};
</script>

<style scoped>
.FlylineDiagram {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.FlylineDiagram_item{
  flex: 1;
}
</style>