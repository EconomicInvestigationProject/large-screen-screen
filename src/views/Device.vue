<template>
  <el-row :gutter="20" style="margin: 0px; padding: 0; margin-top: 1vh">
    <el-col :span="16">
      <!-- 地图展示各个设备的分布信息 -->
      <div style="position: relative">
        <div
          ref="mapchart"
          id="mapchart"
          style="height: 92.5vh; position: relative"
        ></div>
        <div class="mapselect flex">
          <div class="flex_item">
            <div class="mapselectitem">
              <div class="icon">
                <el-icon>
                  <coin />
                </el-icon>
              </div>
              <div class="label">电梯设备</div>
            </div>
          </div>
          <div class="flex_item">
            <div class="mapselectitem">
              <div class="icon">
                <el-icon>
                  <video-camera />
                </el-icon>
              </div>
              <div class="label">监控设备</div>
            </div>
          </div>
          <div class="flex_item">
            <div class="mapselectitem">
              <div class="icon">
                <el-icon>
                  <lock />
                </el-icon>
              </div>
              <div class="label">门禁设备</div>
            </div>
          </div>
          <div class="flex_item">
            <div class="mapselectitem">
              <div class="icon">
                <el-icon>
                  <school />
                </el-icon>
              </div>
              <div class="label">消防设备</div>
            </div>
          </div>
          <div class="flex_item">
            <div class="mapselectitem">
              <div class="icon">
                <el-icon>
                  <first-aid-kit />
                </el-icon>
              </div>
              <div class="label">安防设备</div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <!-- 设备分类统计 -->
      <chartpanel title="设备分类统计" style="height: 22vh">
        <v-chart
          ref="devicechart"
          style="height: 18vh"
          :option="devicechartoption"
        />
      </chartpanel>
      <!-- 设备状态统计 -->
      <chartpanel title="设备状态统计" style="height: 22vh; margin-top: 1vh">
        <v-chart
          ref="statuschart"
          style="height: 18vh"
          :option="statuschartoption"
        />
      </chartpanel>
      <!-- 消防管理 -->
      <chartpanel title="消防管理" style="height: 22vh; margin-top: 1vh">
        <div class="statuspanel">
          <div class="flex" style="margin-top: 2vh">
            <div class="flex_item">
              <div class="status_item flex">
                <div class="iconpanel">
                  <div class="icon">
                    <el-icon><drizzling /></el-icon>
                  </div>
                  <div class="label">烟雾感应</div>
                </div>
                <div class="flex_item">
                  <div class="statusitem">
                    <span class="status status_1"></span>
                    <span class="status_label">{{ value[0][0] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_2"></span>
                    <span class="status_label">{{ value[0][1] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_3"></span>
                    <span class="status_label">{{ value[0][2] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="split_line_h"></div>
            <div class="flex_item">
              <div class="status_item flex">
                <div class="iconpanel">
                  <div class="icon">
                    <el-icon><aim /></el-icon>
                  </div>
                  <div class="label">温度感应</div>
                </div>
                <div class="flex_item">
                  <div class="statusitem">
                    <span class="status status_1"></span>
                    <span class="status_label">{{ value[1][0] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_2"></span>
                    <span class="status_label">{{ value[1][1] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_3"></span>
                    <span class="status_label">{{ value[1][2] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="split_line_h"></div>
            <div class="flex_item">
              <div class="status_item flex">
                <div class="iconpanel">
                  <div class="icon">
                    <el-icon><cherry /></el-icon>
                  </div>
                  <div class="label">电弧感应</div>
                </div>
                <div class="flex_item">
                  <div class="statusitem">
                    <span class="status status_1"></span>
                    <span class="status_label">{{ value[2][0] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_2"></span>
                    <span class="status_label">{{ value[2][1] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_3"></span>
                    <span class="status_label">{{ value[2][2] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="split_line_h"></div>
            <div class="flex_item">
              <div class="status_item flex">
                <div class="iconpanel">
                  <div class="icon">
                    <el-icon><data-analysis /></el-icon>
                  </div>
                  <div class="label">电气异常</div>
                </div>
                <div class="flex_item">
                  <div class="statusitem">
                    <span class="status status_1"></span>
                    <span class="status_label">{{ value[3][0] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_2"></span>
                    <span class="status_label">{{ value[3][1] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_3"></span>
                    <span class="status_label">{{ value[3][2] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="split_line_w"></div>
          <div class="flex" style="margin-top: 1vh">
            <div class="flex_item">
              <div class="status_item flex">
                <div class="iconpanel">
                  <div class="icon">
                    <el-icon><office-building /></el-icon>
                  </div>
                  <div class="label">消防水压</div>
                </div>
                <div class="flex_item">
                  <div class="statusitem">
                    <span class="status status_1"></span>
                    <span class="status_label">{{ value[4][0] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_2"></span>
                    <span class="status_label">{{ value[4][1] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_3"></span>
                    <span class="status_label">{{ value[4][2] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="split_line_h"></div>
            <div class="flex_item">
              <div class="status_item flex">
                <div class="iconpanel">
                  <div class="icon">
                    <el-icon><iphone /></el-icon>
                  </div>
                  <div class="label">消防通道</div>
                </div>
                <div class="flex_item">
                  <div class="statusitem">
                    <span class="status status_1"></span>
                    <span class="status_label">{{ value[5][0] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_2"></span>
                    <span class="status_label">{{ value[5][1] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_3"></span>
                    <span class="status_label">{{ value[5][2] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="split_line_h"></div>
            <div class="flex_item">
              <div class="status_item flex">
                <div class="iconpanel">
                  <div class="icon">
                    <el-icon><element-plus /></el-icon>
                  </div>
                  <div class="label">消防主机</div>
                </div>
                <div class="flex_item">
                  <div class="statusitem">
                    <span class="status status_1"></span>
                    <span class="status_label">{{ value[6][0] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_2"></span>
                    <span class="status_label">{{ value[6][1] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_3"></span>
                    <span class="status_label">{{ value[6][2] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="split_line_h"></div>
            <div class="flex_item">
              <div class="status_item flex">
                <div class="iconpanel">
                  <div class="icon">
                    <el-icon><basketball /></el-icon>
                  </div>
                  <div class="label">充电监控</div>
                </div>
                <div class="flex_item">
                  <div class="statusitem">
                    <span class="status status_1"></span>
                    <span class="status_label">{{ value[7][0] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_2"></span>
                    <span class="status_label">{{ value[7][1] }}</span>
                  </div>
                  <div class="statusitem">
                    <span class="status status_3"></span>
                    <span class="status_label">{{ value[7][2] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="legend flex">
            <div class="flex_item">
              <span class="status status_1"></span>
              <span class="status_label">正常</span>
            </div>
            <div class="flex_item">
              <span class="status status_2"></span>
              <span class="status_label">故障</span>
            </div>
            <div class="flex_item">
              <span class="status status_3"></span>
              <span class="status_label">告警</span>
            </div>
          </div>
        </div>
      </chartpanel>
      <!-- 报修管理 -->
      <chartpanel title="报修管理" style="height: 22vh; margin-top: 1vh">
        <vue3-seamless-scroll :list="updatedatas" class="scroll">
          <div
            class="item flex"
            v-for="(item, index) in updatedatas"
            :key="index"
          >
            <div class="flex_item">{{ item.title }}</div>
            <div class="date">{{ item.date }}</div>
            <div class="status">{{ item.status }}</div>
          </div>
        </vue3-seamless-scroll>
      </chartpanel>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from "vue";

import VChart, { THEME_KEY } from "vue-echarts";

import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

import config from "@/config/index.js";
import utils from "@/utils/utils.js";
import chartutils from "@/utils/chartutils.js";

import * as echarts from "echarts";
import "echarts-extension-amap";
import "echarts-wordcloud";
import "echarts-liquidfill";

import chartpanel from "@/components/chartpanel.vue";

const $echarts = echarts;

//地图
let mapchart = null;

//设备统计
let devicechart = ref();
let devicechartoption = reactive({});
let devicechartcategory = reactive([
  "监控设备",
  "电梯设备",
  "门磁设备",
  "安防设备",
  "消防设备",
]);
let devicechartvalues = reactive([]);

//设备状态
let statuschart = ref();
let statuschartoption = reactive({});
let statuschartcategory = reactive(["正常", "离线", "故障", "告警"]);
let statuschartvalues = reactive([]);

//报修管理数据
const updatedatas = reactive([
  {
    title: "1号楼摄像头故障",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "3号楼门磁失效",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "4号楼电梯故障",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "花园消防栓漏水",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "3号楼门磁失效",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "4号楼电梯故障",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "花园消防栓漏水",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "3号楼门磁失效",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "4号楼电梯故障",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "花园消防栓漏水",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "3号楼门磁失效",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "4号楼电梯故障",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "花园消防栓漏水",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "3号楼门磁失效",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "4号楼电梯故障",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "花园消防栓漏水",
    date: "15:11",
    status: "待处理",
  },
]);

//消防监控数据
let value = reactive([
  [utils.random(100), utils.random(100), utils.random(100)],
  [utils.random(100), utils.random(100), utils.random(100)],
  [utils.random(100), utils.random(100), utils.random(100)],
  [utils.random(100), utils.random(100), utils.random(100)],
  [utils.random(100), utils.random(100), utils.random(100)],
  [utils.random(100), utils.random(100), utils.random(100)],
  [utils.random(100), utils.random(100), utils.random(100)],
  [utils.random(100), utils.random(100), utils.random(100)],
]);

//初始化图标
const initCharts = () => {
  // title, values, ele
  chartutils.initMapChart("mapchart");

  // option, category, values, color, title
  devicechartcategory.forEach((item, index) => {
    devicechartvalues.push(utils.random(1000));
  });
  chartutils.initBarChart(
    devicechartoption,
    devicechartcategory,
    devicechartvalues,
    "#01AAED"
  );

  initStatusChart();
};

let timer = null;
const startRefreshChart = () => {
  timer && clearInterval(timer);

  //获取刷新周期，TODO 配置变动时，此处需自动更新
  let refreshtime = 60 * 1000;
  config.getConfig().forEach(function (item, index) {
    if (item.key == "refreshtime") {
      refreshtime = item.value;
    }
  });

  timer = setInterval(function () {
    devicechartvalues.forEach((item, index) => {
      devicechartvalues[index] = utils.random(1000);
    });

    statuschartvalues.forEach((item, index) => {
      statuschartvalues[index] = utils.random(100);
    });
    statuschartoption.title.forEach((item, index) => {
      item.text =
        statuschartvalues[index] + "\n\n" + statuschartcategory[index];
    });
    let i = 0;
    statuschartoption.series.forEach((item, index) => {
      if (item.type == "bar") {
        item.data[0] = statuschartvalues[i];
        i++;
      }
    });

    value.forEach((item, index) => {
      for (let i = 0; i < item.length; i++) {
        item[i] = utils.random(1000);
      }
    });
  }, refreshtime);
};

//挂
onMounted(() => {
  initCharts();
  startRefreshChart();

  //图表尺寸自适应
  window.onresize = () => {
    mapchart && mapchart.resize();

    devicechart && devicechart.resize();
    statuschart && statuschart.resize();
  };
});
onBeforeUnmount(() => {
  timer && clearInterval(timer);
});

const initStatusChart = () => {
  statuschartcategory.forEach((item, index) => {
    statuschartvalues.push(utils.random(100));
  });
  let angleAxis = [];
  let titles = [];
  let radiusAxis = [];
  let polar = [];
  let series = [];
  statuschartcategory.forEach((item, index) => {
    titles.push({
      text: statuschartvalues[index] + "\n\n" + item,
      textStyle: {
        color: config.colors[index % config.colors.length],
        fontSize: 18,
      },
      textAlign: "center",
      itemGap: 20,
      left: (index + 1) * 25 - 13 + "%",
      top: "30%",
    });
    angleAxis.push({
      id: index + 1,
      max: 100,
      clockwise: false, // 逆时针
      // 隐藏刻度线
      show: false,
      startAngle: 120,
      polarId: index + 1,
    });
    radiusAxis.push({
      type: "category",
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      polarId: index + 1,
    });
    polar.push({
      id: index + 1,
      center: [(index + 1) * 25 - 12.5 + "%", "50%"], //中心点位置
      radius: "140%", //图形大小
    });
    series.push({
      type: "bar",
      z: 10,
      data: [statuschartvalues[index]],
      polarIndex: index,
      showBackground: false,
      coordinateSystem: "polar",
      roundCap: true,
      barWidth: 15,
      itemStyle: {
        normal: {
          opacity: 1,
          color: config.colors[index % config.colors.length],
          shadowBlur: 5,
          shadowColor: config.colors[index % config.colors.length],
        },
      },
    });
    series.push({
      type: "pie",
      name: "内层细圆环",
      radius: ["65%", "75%"],
      center: [(index + 1) * 25 - 12.5 + "%", "50%"],
      startAngle: 120,
      hoverAnimation: false,
      clockWise: true,
      itemStyle: {
        normal: {
          color: config.colors[index % config.colors.length] + "55",
        },
      },
      tooltip: {
        show: false,
      },
      label: {
        show: false,
      },
      data: [100],
    });
  });
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
  for (let key in option) {
    statuschartoption[key] = option[key];
  }
};
</script>

<style>
.mapselect {
  position: absolute;
  top: 2%;
  left: 25%;
  width: 50%;
  height: 6%;
  background: #38cafb66;
  border-radius: 0.5vh;
}

.mapselectitem {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}

.mapselectitem .icon {
  font-size: 1.8rem;
  padding-top: 0.5vh;
}

.mapselectitem .label {
  line-height: 2vh;
  font-size: 1.4rem;
}

.mapselectitem:hover {
  color: #38cafb;
}

.scroll {
  height: 18vh;
  width: 100%;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 0.8vh;
  font-size: 1.4rem;
  border-radius: 0.5vh;
}

.scroll .item:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}

.scroll .item .date {
  width: 4vw;
}

.scroll .item .status {
  width: 3vw;
  color: #ff0157;
}

.status_item {
  width: 90%;
  margin: 0 auto;
}
.status_item .icon {
  font-size: 2.4rem;
  text-align: center;
  padding-top: 0.2vh;
  color: #00fac1;
}
.status_item .label {
  font-size: 1.4rem;
  text-align: center;
  line-height: 2vh;
}
.status_item .iconpanel {
  width: 60%;
  text-align: center;
}
.status_item .statusitem {
  line-height: 2vh;
  text-align: left;
  padding-left: 1vh;
}
.status_item .statusitem .status {
  display: inline-block;
  width: 1vh;
  height: 1vh;
}
.status_item .statusitem .status_1 {
  background: #01aaed;
}
.status_item .statusitem .status_2 {
  background: #fac858;
}
.status_item .statusitem .status_3 {
  background: #ff5722;
}
.status_item .statusitem .status_label {
  display: inline-block;
  margin-left: 1vh;
}
.legend {
  position: absolute;
  right: 1vw;
  top: 3vh;
  width: 10vw;
  height: 3vh;
  text-align: center;
}

.legend .status {
  display: inline-block;
  width: 1vh;
  height: 1vh;
  margin-right: 1vh;
}
.legend .status_1 {
  background: #01aaed;
}
.legend .status_2 {
  background: #fac858;
}
.legend .status_3 {
  background: #ff5722;
}
.statuspanel .split_line_h {
  height: 6vh;
  width: 0.15vh;
}
.statuspanel .split_line_w {
  height: 0.1vh;
}
</style>
