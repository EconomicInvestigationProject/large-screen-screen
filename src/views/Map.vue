<template>
  <div class="map">
    <!-- <div @click="back" class="back">全国</div> -->
    <!-- <BaiduMap
    v-if="showMap"
    :maplng="maplng"
    :maplat="maplat"
    @goback="showMap = $event"
  ></BaiduMap> -->
    <div class="map1"></div>
    <div class="map2"></div>
    <div class="map3"></div>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div
      ref="mapChart"
      class="mapChart"
      id="mapChart"
      style="width: 100%; height: 100%"
    ></div>
  </div>
</template>
   
<script setup>
import * as echarts from "echarts";
import { onMounted, defineEmits, onBeforeUnmount } from "vue";
import { ref } from "vue";
import { provinces } from "../utils/provincesmap";
import { cityMap } from "../utils/citymap";
// 导入组件
// import BaiduMap from "../components/BaiduMap.vue";
import axios from "axios";

// 是否显示地图
const showMap = ref(false);
// 经度
const maplng = ref(0);
// 纬度
const maplat = ref(0);
//直辖市和特别行政区-只有二级地图，没有三级地图
const special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
// 地图数据
var mapdata = [];
var chinaName = "china";

//记录父级ID、Name
var mapStack = [];
var parentName = null;

// 定义一个echarts对象
var myChart = ref(null);

const back = () => {
  if (mapStack.length != 0) {
    //如果有上级目录则执行
    var map = mapStack.pop();
    if (map.mapName == "china") {
      initChart();
      //返回上一级后，父级的ID、Name随之改变
      mapStack = [];
      parentName = null;
      changedata("全国");
    } else {
      axios
        .get("/map/province/" + map.mapName + ".json", {})
        .then((response) => {
          const mapJson = response.data;
          renderMap(map.mapName, mapJson, false);
          //返回上一级后，父级的ID、Name随之改变
          parentName = map.mapName;
        });
    }
  }
};

// 控制全局数据变化
const changdifang = ref("全国");
const emit = defineEmits();

// 初始化地图对象
const mapChart = ref(null);

//初始化绘制全国地图配置
let option = {
  backgroundColor: "rgba(0,0,0,0)",
  title: {
    top: 20,
    right: 20,
    textStyle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold", // 使用 "bold" 表示字体加粗
      fontFamily: "Microsoft YaHei",
    },
    subtextStyle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold", // 使用 "bold" 表示字体加粗
      fontFamily: "Microsoft YaHei",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}",
  },
  toolbox: {
    show: true,
    orient: "vertical",
    left: "right",
    top: "center",
    iconStyle: {
      color: "#fff",
    },
  },
  animationDuration: 1000,
  animationEasing: "cubicOut",
  animationDurationUpdate: 1000,
};

const markers = [
  {
    name: "贤文花园",
    value: [117.124099, 36.693762, 10],
  },
];

//绘制地图的方法
const renderMap = (map, data, parentName, flag) => {
  option.title.subtext = map;
  option.series = [
    {
      name: map,
      type: "map",
      mapType: map,
      roam: false,
      nameMap: {
        china: "中国",
        show: false,
      },
      label: {
        show: true,
        color: "#999",
        fontSize: 13,
        emphasis: {
          label: {
            color: "#fff",
            fontSize: 13,
            show: true,
          },
        },
      },
      itemStyle: {
        areaColor: "#3352c7", //背景色
        borderColor: "color", // Change to the desired shade of blue
        emphasis: {
          label: {
            color: "#fff",
            areaColor: "darkorange",
          },
        },
      },
      data: data,
    },
    {
      show: true,
      rippleEffect: {
        // 涟漪特效相关配置。
        scale: 4, // 控制涟漪大小
      },
      type: "effectScatter",
      coordinateSystem: "geo",
      data: markers.map((marker) => ({
        name: marker.name,
        value: marker.value,
        symbol: "pin",
        symbolSize: 20,
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
      })),
    },
  ];
  //渲染地图
  myChart.value.setOption(option);

  if (flag) {
    //往mapStack里添加parentId，parentName,返回上一级使用
    mapStack.push({
      mapName: parentName,
    });
    parentName = parentName;
  }
};

// 初始化地图
const initChart = async () => {
  // 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(document.getElementById("mapChart"));
  //全国数据
  // let { data } = await axios.get("/map/china.json");
  // let d = [];
  // for (var i = 0; i < data.features.length; i++) {
  //   d.push({
  //     name: data.features[i].properties.name,
  //   });
  // }
  // mapdata = d;
  //注册地图
  // echarts.registerMap("china", data);
  //绘制地图
  // renderMap("china", d);

  // 济南市初始化数据
  let { data } = await axios.get("/map/city/" + cityMap["济南市"] + ".json");
  let d = [];
  for (var i = 0; i < data.features.length; i++) {
    d.push({
      name: data.features[i].properties.name,
    });
  }
  echarts.registerMap("jinan", data);
  renderMap("jinan", d);

  // 使用刚指定的配置项和数据显示图表。
  myChart.value.setOption(option);
};

const changedata = (name) => {
  emit("sendMessageToParent", name);
};

// resize 事件监听窗口变化，图标自适应
const myChartResize = () => {
  console.log("Window myChart");
  myChart.value.resize();
};

onMounted(() => {
  initChart();
  myChart.value.on("click", async (params) => {
    // 判断点击的是不是省份
    if (params.name in provinces) {
      // 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
      let { data } = await axios.get(
        "/map/province/" + provinces[params.name] + ".json"
      );
      // 注册省份地图数据
      echarts.registerMap(params.name, data);
      // 添加省份对应的城市数据
      var d = [];
      for (var i = 0; i < data.features.length; i++) {
        d.push({
          name: data.features[i].properties.name,
        });
      }
      // 重新绘制地图
      renderMap(params.name, d, chinaName, true);
      parentName = "china";
    } else if (params.seriesName in provinces) {
      // 判断点击的是不是城市
      // 如果是【直辖市/特别行政区】只有二级下钻
      if (special.indexOf(params.seriesName) >= 0) {
        // 打开百度地图
        // let {
        //   data: {
        //     result: {
        //       location: { lat, lng },
        //     },
        //   },
        // } = await axios.get("/baidu/geocoding/v3/", {
        //   params: {
        //     address: params.seriesName + params.name,
        //     ak: "CtDFZnPIhj7MjWLllGtFNyLpT4MpgGwv",
        //     output: "json",
        //   },
        // });
        // maplng.value = lng;
        // maplat.value = lat;
        // showMap.value = true;
        changedata(params.name);
        return;
      } else {
        //显示县级地图
        let { data } = await axios.get(
          "/map/city/" + cityMap[params.name] + ".json"
        );
        // 注册城市地图数据
        echarts.registerMap(params.name, data, false);
        // 添加城市对应的区县数据
        var d = [];
        for (var i = 0; i < data.features.length; i++) {
          d.push({
            name: data.features[i].properties.name,
          });
        }
      }
      renderMap(params.name, d, params.name, false);
    } else {
      // 打开百度地图
      // let {
      //   data: {
      //     result: {
      //       location: { lat, lng },
      //     },
      //   },
      // } = await axios.get("/baidu/geocoding/v3/", {
      //   params: {
      //     address: params.seriesName + params.name,
      //     ak: "sICFGuAAPisdVnB5Bx6ILAADGPnRDusH",
      //     output: "json",
      //   },
      // });
      // maplng.value = lng;
      // maplat.value = lat;
      changedata(params.name);
      // showMap.value = true;
    }
  });

  // 监听窗口 resize 事件
  window.addEventListener("resize", myChartResize);
});

// 组件卸载时，移除监听事件并卸载图表
onBeforeUnmount(() => {
  if (myChart.value) {
    myChart.value.dispose();
  }
  window.removeEventListener("resize", myChartResize);
});
</script>
<style lang="scss">
.back {
  position: absolute;
  width: 80px;
  height: 30px;
  color: #fff;
  font-weight: bold;
  margin: 30px;
  font-size: 18px;
  z-index: 999999999;
}

.map {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .map1 {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(../assets/images/map/map.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.3;
  }

  .map2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    background: url(../assets/images/map/lbx.png);
    animation: rotate1 15s linear infinite;
    opacity: 0.6;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .map3 {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(../assets/images/map/jt.png);
    animation: rotate2 10s linear infinite;
    opacity: 0.6;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .mapChart {
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes rotate1 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate2 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
}
/* 当视图宽度小于600像素时应用的样式 */
@media screen and (max-width: 600px) {
  .back {
    margin: 30px 15px;
  }
}
</style>