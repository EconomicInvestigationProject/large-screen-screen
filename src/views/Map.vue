<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>
   
   <script>
import * as echarts from "echarts";
import chinaMap from "../assets/json/china.json";

export default {
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.chart);
      echarts.registerMap("china", chinaMap);

      // 指定图表的配置项和数据
      var option = {
        geo: {
          show: true,
          type: "map",
          map: "china",
          // label: {
          //   show: true, //文字标签显示
          //   color: "#fff",
          //   fontSize: 12,
          // },
          itemStyle: {
            //图形样式
            areaColor: "#3352c7", //背景色
            borderColor: "#fff",
            borderWidth: 1,
          },
          zoom: 1,
          emphasis: {
            //高亮状态
            label: {
              show: true, //文字标签显示
              color: "#000",
              fontSize: 14,
            },
            itemStyle: {
              //图形样式
              areaColor: "#fff", //背景色
              borderColor: "#ccc",
              borderWidth: 1,
            },
          },
        },
        series: [
          {
            type: "effectScatter", //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出
            coordinateSystem: "geo", //该系列使用的坐标系
            rippleEffect: {
              //涟漪特效相关配置。
              period: 2,
              brushType: "stroke",
              scale: 5,
            },
            label: {
              //标签
              normal: {
                show: true,
                position: "right",
              },
            },
            itemStyle: {
              color: "#fff",
            },
            symbol: "circle", //标记的图形，还可以设置图片
            symbolSize: function (val) {
              return val[2];
            },
            data: [
              {
                // name: "贤文庄",
                // value: [117.117744, 36.684818],
                name: "济南",
                value: [117, 36.65, 10],
              },
              {
                name: "聊城",
                value: [115.97, 36.45, 10],
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>