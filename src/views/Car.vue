<template>
  <el-row :gutter="20" style="margin: 0; padding: 0; margin-top: 1vh">
    <el-col :span="16" style="padding-left: 0">
      <!-- 入口监控视频 -->
      <el-row :gutter="20" style="margin: 0; padding: 0">
        <el-col :span="12">
          <img
            src="../assets/images/community/5.webp"
            style="width: 100%; height: 45vh"
          />
        </el-col>
        <el-col :span="12">
          <img
            src="../assets/images/community/6.webp"
            style="width: 100%; height: 45vh"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 0; padding: 0; margin-top: 1vh">
        <el-col :span="12">
          <img
            src="../assets/images/community/7.webp"
            style="width: 100%; height: 45vh"
          />
        </el-col>
        <el-col :span="12">
          <img
            src="../assets/images/community/8.webp"
            style="width: 100%; height: 45vh"
          />
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <!-- 实时车位信息 -->
      <chartpanel title="小区人员信息" style="height: 29.5vh">
        <vue3-seamless-scroll :list="newsdatas" class="carscroll">
          <div
            class="item flex"
            v-for="(item, index) in newsdatas"
            :key="index"
          >
            <div class="flex_item">{{ item.title }}</div>
            <div class="date">{{ item.date }}</div>
            <div class="status">{{ item.status }}</div>
          </div>
        </vue3-seamless-scroll>
      </chartpanel>
      <!-- 小区车位基本信息 -->
      <chartpanel
        title="小区人员基本信息"
        style="height: 29.5vh; margin-top: 1vh"
      >
        <div class="flex" style="margin-top: 1vh">
          <div class="flex_item">
            <div class="baseitem text_color_1">
              <div class="value">{{ baseinfo.count }}</div>
              <div class="label">小区总人数</div>
            </div>
          </div>
          <div class="split_line_h"></div>
          <div class="flex_item">
            <div class="baseitem text_color_2">
              <div class="value">{{ baseinfo.owner }}</div>
              <div class="label">异常人数</div>
            </div>
          </div>
        </div>
        <div class="split_line_w"></div>
        <div class="flex" style="margin-top: 1vh">
          <div class="flex_item">
            <div class="baseitem text_color_3">
              <div class="value">{{ baseinfo.empty }}</div>
              <div class="label">常住人口</div>
            </div>
          </div>
          <div class="split_line_h"></div>
          <div class="flex_item">
            <div class="baseitem text_color_4">
              <div class="value">{{ baseinfo.used }}</div>
              <div class="label">流动人口</div>
            </div>
          </div>
        </div>
      </chartpanel>
      <!-- 进出统计 -->
      <chartpanel title="人员进出统计" style="height: 29.5vh; margin-top: 1vh">
        <v-chart
          ref="devicechart"
          style="height: 25vh"
          :option="devicechartoption"
        />
      </chartpanel>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from "vue";

import VChart, { THEME_KEY } from "vue-echarts";

import config from "@/config/index.js";
import utils from "@/utils/utils.js";
import chartutils from "@/utils/chartutils.js";

import * as echarts from "echarts";
import "echarts-extension-amap";
import "echarts-wordcloud";
import "echarts-liquidfill";

import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

import chartpanel from "@/components/chartpanel.vue";

const $echarts = echarts;

//基本信息数据
const baseinfo = reactive({
  count: utils.random(1000),
  owner: utils.random(100),
  empty: utils.random(1000),
  used: utils.random(1000),
});

//实时数据
const newsdatas = reactive([
  {
    title: "张三进入小区",
    date: "15:11",
    status: "已完成",
  },
  {
    title: "李四临时出入",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "张三离开",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "南门口有异常人员进人",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "李四离开小区",
    date: "15:11",
    status: "已完成",
  },
  {
    title: "王佳乐重点人员进入小区",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "王五搬家",
    date: "15:11",
    status: "待处理",
  },
  {
    title: "王佳乐重点人员离开小区",
    date: "15:11",
    status: "待处理",
  },
]);

let devicechart = ref();
let devicechartoption = reactive({});
let devicechartcategory = reactive([]);
let devicechartvalues = reactive([]);

//初始化图标
const initCharts = () => {
  let start = new Date();
  start.setDate(start.getDate() - 7);
  for (
    let i = new Date(start.getTime());
    i.getTime() < new Date().getTime();
    i.setDate(i.getDate() + 1)
  ) {
    devicechartcategory.push(i.format("MM-dd"));
    devicechartvalues.push(utils.random(1000));
  }
  chartutils.initLineChart(
    devicechartoption,
    devicechartcategory,
    devicechartvalues,
    "#01AAED"
  );
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

    (baseinfo.count = utils.random(1000)),
      (baseinfo.empty = utils.random(1000)),
      (baseinfo.owner = utils.random(100)),
      (baseinfo.used = utils.random(1000));
  }, refreshtime);
};

//挂
onMounted(() => {
  initCharts();
  startRefreshChart();

  //图表尺寸自适应
  window.onresize = () => {
    devicechart && devicechart.resize();
  };
});
onBeforeUnmount(() => {
  timer && clearInterval(timer);
});
</script>

<style>
.carscroll {
  height: 25vh;
  width: 100%;
  overflow: hidden;
}

.carscroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 0.8vh;
  font-size: 1.4rem;
  border-radius: 0.5vh;
}

.carscroll .item:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}

.carscroll .item .date {
  width: 4vw;
}

.carscroll .item .status {
  width: 3vw;
  color: #ff0157;
}
</style>
