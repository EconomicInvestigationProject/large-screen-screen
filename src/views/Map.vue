<template>
  <div @click="back" class="back">返回全国</div>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div ref="mapChart" id="mapChart" style="width: 100%; height: 100%"></div>
  <!-- <BaiduMap
    v-if="showMap"
    :maplng="maplng"
    :maplat="maplat"
    @goback="showMap = $event"
  ></BaiduMap> -->
</template>
   
<script setup>
import * as echarts from "echarts";
import { onMounted, defineEmits } from "vue";
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
let mapdata = [];

// 定义一个echarts对象
var myChart = ref(null);

const back = () => {
  changedata('全国')
  renderMap("china", mapdata);
};

// 控制全局数据变化
const changdifang = ref("全国");
const emit = defineEmits();

// 初始化地图对象
const mapChart = ref(null);

//初始化绘制全国地图配置
let option = {
  backgroundColor: "#060E3F",
  title: {
    left: "center",
    textStyle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: "Microsoft YaHei",
    },
    subtextStyle: {
      color: "#ccc",
      fontSize: 13,
      fontWeight: "normal",
      fontFamily: "Microsoft YaHei",
    },
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
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
    iconStyle: {
      normal: {
        color: "#fff",
      },
    },
  },
  animationDuration: 1000,
  animationEasing: "cubicOut",
  animationDurationUpdate: 1000,
};

const markers = [
  {
    name: "济南",
    value: [117, 36.65, 10],
  },
  {
    name: "聊城",
    value: [115.97, 36.45, 10],
  },
];

//绘制地图的方法
const renderMap = (map, data) => {
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
        normal: {
          show: true,
          textStyle: {
            color: "#999",
            fontSize: 13,
          },
        },
        emphasis: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 13,
          },
        },
      },
      itemStyle: {
        normal: {
          areaColor: "#3352c7", //背景色
          borderColor: "color", // Change to the desired shade of blue
        },
        emphasis: {
          areaColor: "darkorange",
        },
      },
      data: data,
    },
    {
      // Add a new series for markers
      type: "scatter",
      coordinateSystem: "geo",
      data: markers.map((marker) => ({
        name: marker.name,
        value: marker.value,
        symbol: "pin", // You can use other symbols for markers
        symbolSize: 20, // Adjust the size of the marker symbol
        label: {
          show: true,
          position: "right", // Adjust the position of the label
          formatter: "{b}", // Label format
        },
      })),
    },
  ];
  //渲染地图
  myChart.value.setOption(option);
};

// 初始化地图
const initChart = async () => {
  // 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(document.getElementById("mapChart"));
  let { data } = await axios.get("/map/china.json");
  let d = [];
  for (var i = 0; i < data.features.length; i++) {
    d.push({
      name: data.features[i].properties.name,
    });
  }
  mapdata = d;
  //注册地图
  echarts.registerMap("china", data);
  //绘制地图
  renderMap("china", d);
  // 使用刚指定的配置项和数据显示图表。
  myChart.value.setOption(option);
};

const changedata = (name) => {
  emit("sendMessageToParent", name);
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
      renderMap(params.name, d);
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
        maplng.value = lng;
        maplat.value = lat;
        showMap.value = true;
      } else {
        //显示县级地图
        let { data } = await axios.get(
          "/map/city/" + cityMap[params.name] + ".json"
        );
        // 注册城市地图数据
        echarts.registerMap(params.name, data);
        // 添加城市对应的区县数据
        var d = [];
        for (var i = 0; i < data.features.length; i++) {
          d.push({
            name: data.features[i].properties.name,
          });
        }
        // 重新绘制地图
        renderMap(params.name, d);
      }
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
      showMap.value = true;
    }
  });
});
</script>
<style>
.back {
  width: 80px;
  height: 30px;
  color: #fff;
  margin: 30px;
  font-size: 18px;
}
</style>