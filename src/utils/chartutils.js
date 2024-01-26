import * as echarts from "echarts";
import "echarts-extension-amap";

const $echarts = echarts;

import utils from "./utils.js";
import config from "@/config/index.js";

export default {
  initMapChart: (ele) => {
    let nomal_1 = {
      type: "effectScatter",
      zlevel: 5,
      // 使用百度地图坐标系
      coordinateSystem: "amap",
      //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      // symbol: 'image://http://localhost:3000/src/assets/video.png',
      symbol: "pin",
      // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
      symbolSize: [20, 20],
      itemStyle: {
        normal: {
          color: "#fac858" //标志颜色
        }
      },
      // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
      data: [
        [108.865976, 34.246629, 100],
        [108.863215, 34.247483, 100],
        [108.863854, 34.247443, 100],
        [108.864685, 34.247647, 100],
        [108.864932, 34.247572, 100],
        [108.865742, 34.247656, 100]
      ],
      rippleEffect: {
        scale: 6,
        brushType: "stroke"
      },
      hoverAnimation: true //是否开启鼠标 hover 的提示动画效果。
    };
    let nomal_2 = {
      type: "effectScatter",
      zlevel: 5,
      // 使用百度地图坐标系
      coordinateSystem: "amap",
      //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      // symbol: 'image://http://localhost:3000/src/assets/video.png',
      symbol: "triangle",
      // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
      symbolSize: [10, 10],
      itemStyle: {
        normal: {
          color: "#FF8A26" //标志颜色
        }
      },
      // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
      data: [
        [108.867319, 34.246131, 100],
        [108.868075, 34.24708, 100],
        [108.868746, 34.246951, 100],
        [108.868435, 34.246091, 100],
        [108.868365, 34.245568, 100],
        [108.867636, 34.245883, 100],
        [108.866718, 34.246011, 100],
        [108.866278, 34.246002, 100],
        [108.86572, 34.246814, 100],
        [108.86534, 34.246636, 100],
        [108.86498, 34.246752, 100],
        [108.864578, 34.246938, 100],
        [108.864224, 34.246849, 100],
        [108.864487, 34.246033, 100],
        [108.864122, 34.246149, 100],
        [108.864857, 34.24555, 100],
        [108.864165, 34.245616, 100],
        [108.863564, 34.245608, 100]
      ],
      rippleEffect: {
        scale: 6,
        brushType: "stroke"
      },
      hoverAnimation: true //是否开启鼠标 hover 的提示动画效果。
    };
    let nomal_3 = {
      type: "effectScatter",
      zlevel: 5,
      // 使用百度地图坐标系
      coordinateSystem: "amap",
      //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      // symbol: 'image://http://localhost:3000/src/assets/video.png',
      symbol: "triangle",
      // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
      symbolSize: [10, 10],
      itemStyle: {
        normal: {
          color: "#FF5722" //标志颜色
        }
      },
      // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
      data: [
        [108.864487, 34.246033, 100],
        [108.864122, 34.246149, 100],
        [108.864857, 34.24555, 100],
        [108.864165, 34.245616, 100],
        [108.863564, 34.245608, 100],
        [108.863596, 34.246109, 100],
        [108.863183, 34.246242, 100],
        [108.863172, 34.246743, 100],
        [108.863253, 34.247182, 100],
        [108.865114, 34.245497, 100],
        [108.865935, 34.24618, 100],
        [108.866547, 34.24696, 100],
        [108.865071, 34.247164, 100],
        [108.867308, 34.24665, 100],
        [108.867641, 34.247226, 100],
        [108.864819, 34.246645, 100]
      ],
      rippleEffect: {
        scale: 6,
        brushType: "stroke"
      },
      hoverAnimation: true //是否开启鼠标 hover 的提示动画效果。
    };
    let nomal_4 = {
      type: "effectScatter",
      zlevel: 5,
      // 使用百度地图坐标系
      coordinateSystem: "amap",
      //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      // symbol: 'image://http://localhost:3000/src/assets/video.png',
      symbol: "circle",
      // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
      symbolSize: [10, 10],
      itemStyle: {
        normal: {
          color: "#FF8A26" //标志颜色
        }
      },
      // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
      data: [
        [108.865976, 34.246629, 100],
        [108.863215, 34.247483, 100],
        [108.863854, 34.247443, 100],
        [108.864685, 34.247647, 100],
        [108.864932, 34.247572, 100],
        [108.865742, 34.247656, 100],
        [108.866133, 34.247426, 100],
        [108.866858, 34.247492, 100],
        [108.867185, 34.247665, 100],
        [108.866681, 34.246991, 100],
        [108.866257, 34.246969, 100],
        [108.866268, 34.2468, 100],
        [108.86572, 34.246814, 100],
        [108.86534, 34.246636, 100],
        [108.86498, 34.246752, 100],
        [108.864578, 34.246938, 100],
        [108.864224, 34.246849, 100],
        [108.864487, 34.246033, 100],
        [108.864122, 34.246149, 100]
      ],
      rippleEffect: {
        scale: 6,
        brushType: "stroke"
      },
      hoverAnimation: true //是否开启鼠标 hover 的提示动画效果。
    };
    let nomal_5 = {
      type: "effectScatter",
      zlevel: 5,
      // 使用百度地图坐标系
      coordinateSystem: "amap",
      //设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      // symbol: 'image://http://localhost:3000/src/assets/video.png',
      symbol: "rect",
      // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
      symbolSize: [10, 10],
      itemStyle: {
        normal: {
          color: "#01AAED" //标志颜色
        }
      },
      // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
      data: [
        [108.865976, 34.246629, 100],
        [108.867319, 34.246131, 100],
        [108.868075, 34.24708, 100],
        [108.868746, 34.246951, 100],
        [108.868435, 34.246091, 100],
        [108.868365, 34.245568, 100],
        [108.867636, 34.245883, 100],
        [108.866718, 34.246011, 100],
        [108.866278, 34.246002, 100],
        [108.86572, 34.246814, 100],
        [108.86534, 34.246636, 100],
        [108.86498, 34.246752, 100],
        [108.864578, 34.246938, 100],
        [108.864224, 34.246849, 100],
        [108.864487, 34.246033, 100],
        [108.864122, 34.246149, 100],
        [108.864857, 34.24555, 100],
        [108.865071, 34.247164, 100],
        [108.867308, 34.24665, 100],
        [108.867641, 34.247226, 100],
        [108.864819, 34.246645, 100]
      ],
      rippleEffect: {
        scale: 6,
        brushType: "stroke"
      },
      hoverAnimation: true //是否开启鼠标 hover 的提示动画效果。
    };

    let option = {
      amap: {
        rotateEnable: true,
        pitchEnable: true,
        pitch: 45,
        showIndoorMap: true,
        showLabel: true,
        rotation: 0,
        // 3D模式，无论你使用的是1.x版本还是2.x版本，都建议开启此项以获得更好的渲染体验
        viewMode: "3D",
        // 高德地图支持的初始化地图配置
        // 高德地图初始中心经纬度
        center: [108.865976, 34.246629],
        // 高德地图初始缩放级别
        zoom: 17.7,
        // 是否开启resize
        resizeEnable: true,
        // 自定义地图样式主题
        // features: ['bg', 'point', 'road'],
        mapStyle: "amap://styles/darkblue",
        // 移动过程中实时渲染 默认为true 如数据量较大 建议置为false
        renderOnMoving: true,
        // ECharts 图层的 zIndex 默认 2000
        // 从 v1.9.0 起 此配置项已被弃用 请使用 `echartsLayerInteractive` 代替
        echartsLayerZIndex: 2019,
        // 设置 ECharts 图层是否可交互 默认为 true
        // 设置为 false 可实现高德地图自身图层交互
        // 此配置项从 v1.9.0 起开始支持
        echartsLayerInteractive: true,
        // 是否启用大数据模式 默认为 false
        // 此配置项从 v1.9.0 起开始支持
        largeMode: false
        // 说明：如果想要添加卫星、路网等图层
        // 暂时先不要使用layers配置，因为存在Bug
        // 建议使用amap.add的方式，使用方式参见最下方代码
      },
      series: [nomal_1, nomal_2, nomal_3, nomal_4, nomal_5]
    };
    // 使用刚指定的配置项和数据显示图表。
    let mapchart = $echarts.init(document.getElementById(ele));
    mapchart.setOption(option);

    // 获取 ECharts 高德地图组件
    let amapComponent = mapchart.getModel().getComponent("amap");
    // 获取高德地图实例，使用高德地图自带的控件(需要在高德地图js API script标签手动引入)
    let amap = amapComponent.getAMap();
    // 添加控件
    amap.addControl(new AMap.Scale());
    amap.addControl(new AMap.ToolBar());
    amap.addControl(new AMap.ControlBar());
    // 禁用 ECharts 图层交互，从而使高德地图图层可以点击交互
    // amapComponent.setEChartsLayerInteractive(false);

    let buildingLayer = new AMap.Buildings({
      zIndex: 130,
      merge: false,
      sort: false,
      // opacity:1,
      // heightFactor:	Number	高度比例系数，可控制3D视图下的楼块高度
      zooms: [17, 20]
    });
    let options = {
      hideWithoutStyle: false, //是否隐藏设定区域外的楼块
      areas: [
        {
          //围栏1
          //visible:false,//是否可见
          rejectTexture: false, //是否屏蔽自定义地图的纹理
          color1: "fac858ff", //楼顶颜色
          color2: "FF5722ff", //楼面颜色
          path: [
            [108.862912, 34.247715],
            [108.862982, 34.245228],
            [108.868947, 34.245219],
            [108.868921, 34.247237],
            [108.86737, 34.247294],
            [108.867365, 34.247764],
            [108.862912, 34.247715]
          ]
        }
      ]
    };
    buildingLayer.setStyle(options); //此配色优先级高于自定义mapStyle

    amap.setLayers([new AMap.TileLayer(), buildingLayer]);

    let polygon = new AMap.Polygon({
      path: options.areas[0].path,
      strokeColor: "#FF5252",
      strokeWeight: 6,
      strokeOpacity: 0.1,
      fillOpacity: 0.3,
      fillColor: "#FF5252",
      zIndex: 50,
      bubble: true
    });
    amap.add([polygon]);
  },
  initPieChart: (option, category, values) => {
    let datas = [];
    category.forEach((item, index) => {
      datas.push({
        value: values[index],
        name: item
      });
    });
    let option_ = {
      color: config.colors,
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      legend: {
        right: "10",
        y: "center",
        data: category,
        orient: "vertical",
        textStyle: {
          color: "#fff"
        },
        itemGap: 10
      },
      series: [
        {
          name: "告警级别分布",
          type: "pie",
          center: ["40%", "50%"],
          radius: ["85%", "65%"],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 15,
            borderColor: "rgba(200,200,200,0.3)",
            borderWidth: 0,
            shadowColor: "rgba(200, 200, 200, 0.5)",
            shadowBlur: 5
          },
          label: {
            show: true,
            color: "#fff",
            position: "outside",
            fontSize: 14,
            textBorderWidth: 0
            // textShadowBlur:0
          },
          labelLine: {
            show: true,
            length: 20,
            length2: 30,
            lineStyle: {
              width: 2
            }
          },
          data: datas
        }
      ]
    };
    for (let key in option_) {
      option[key] = option_[key];
    }
  },
  initBarChart: (option, category, values, color, title) => {
    // let title_ = utils.createChartTitle(title);
    let option_ = {
      backgroundColor: "#000000",
      // title:title_,
      grid: utils.createChartGaid("40vh", "10vh", "15vh", "30vh"),
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getChartXColor()
          }
        },
        axisLabel: {
          color: utils.getChartXTextColor()
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: category,
        type: "category"
      },
      yAxis: {
        axisLabel: {
          color: utils.getChartYTextColor()
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getChartXColor()
          }
        },
        splitLine: {
          lineStyle: {
            color: utils.getChartYColor(),
            type: "dashed"
          }
        },
        name: ""
      },
      series: [
        {
          name: "打分",
          data: values,
          type: "bar",
          barWidth: "20vh",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: color + "ff"
              },
              {
                offset: 1,
                color: color + "bb"
              }
            ]),
            barBorderRadius: 20
          },
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontSize: "1.2rem",
              color: "#fff"
            }
          }
        }
      ]
    };
    for (let key in option_) {
      option[key] = option_[key];
    }
  },
  initLineChart: (option, category, values, color) => {
    let option_ = {
      backgroundColor: "#000000",
      grid: utils.createChartGaid("40vw", null, "8vh", "20vh"),
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getChartXColor()
          }
        },
        axisLabel: {
          color: utils.getChartXTextColor()
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: category,
        boundaryGap: false,
        type: "category"
      },
      yAxis: {
        axisLabel: {
          color: utils.getChartYTextColor()
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getChartXColor()
          }
        },
        splitLine: {
          lineStyle: {
            color: utils.getChartYColor(),
            type: "dashed"
          }
        },
        name: ""
      },
      series: [
        {
          name: "打分",
          data: values,
          type: "line",
          itemStyle: {
            normal: {
              color: color, //改变折线点的颜色
              lineStyle: {
                width: 1,
                color: color // 线条颜色
              }
            }
          },
          lineStyle: {
            width: 1,
            color: color
          },
          areaStyle: {
            //折线图颜色半透明
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: color + "ff" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: color + "00" // 0% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          },
          label: {
            show: true,
            color: "#fff",
            position: "top"
          }
        }
      ]
    };
    for (let key in option_) {
      option[key] = option_[key];
    }
  },
  initRadarChart: (option, category, values) => {
    var indicator = [];
    category.forEach((item, index) => {
      indicator.push({
        text: item,
        min: 0,
        max: 1000
      });
    });
    let option_ = {
      hoverAnimation: true,
      tooltip: {
        trigger: "item"
      },
      radar: {
        nameGap: 6, // 图中工艺等字距离图的距离
        radius: "80%",
        center: ["50%", "50%"],
        name: {
          textStyle: {
            color: "#fff",
            fontSize: 14
          }
        },
        indicator: indicator,
        axisLine: {
          //指向外圈文本的分隔线样式
          lineStyle: {
            color: "rgba(245, 166, 35, 0.3)"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(245, 166, 35, 0.3)", // 分隔线颜色
            width: 1 // 分隔线线宽
          }
        },
        splitArea: {
          // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: {
            // 分隔区域的样式设置。
            color: ["rgba(255,255,255,0)", "rgba(255,255,255,0)"] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          }
        }
      },
      series: [
        {
          type: "radar",
          z: 1,
          data: [
            {
              value: values
            }
          ],
          name: "告警数量",
          symbol: "circle",
          symbolSize: 5,
          areaStyle: {
            normal: {
              color: "rgba(245, 166, 35, 0.2)"
            }
          },
          itemStyle: {
            color: "rgba(245, 166, 35, 1)",
            borderColor: "rgba(245, 166, 35, 0.3)",
            borderWidth: 10
          },
          lineStyle: {
            normal: {
              type: "dashed",

              color: "rgba(245, 166, 35, 1)",
              width: 1
            }
          }
        }
      ]
    };
    for (let key in option_) {
      option[key] = option_[key];
    }
  },
  initPictorialBar: (option, category, values) => {
    let option_ = {
      backgroundColor: "#000000",
      grid: utils.createChartGaid("40vh", "10vh", "20vh", "30vh"),
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getChartXColor()
          }
        },
        axisLabel: {
          color: utils.getChartXTextColor()
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: category,
        type: "category"
      },
      yAxis: {
        axisLabel: {
          color: utils.getChartYTextColor()
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getChartXColor()
          }
        },
        splitLine: {
          lineStyle: {
            color: utils.getChartYColor(),
            type: "dashed"
          }
        },
        name: ""
      },
      series: [
        {
          type: "pictorialBar",
          itemStyle: {
            normal: {
              color: "#FF5252"
            }
          },
          symbolRepeat: "fixed",
          symbolMargin: 4,
          symbol: "roundRect",
          symbolClip: true,
          symbolSize: [20, 8],
          symbolPosition: "start",
          symbolOffset: [0, -1],
          barBorderRadius: 20,
          data: values,
          z: 0,
          zlevel: 8,
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontSize: "1.2rem",
              color: "#fff"
            }
          }
        }
      ]
    };
    for (let key in option_) {
      option[key] = option_[key];
    }
  }
};
