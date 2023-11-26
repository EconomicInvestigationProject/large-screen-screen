<template>
  <el-row :gutter="20" style="margin: 0; padding: 0; margin-top: 1vh">
    <el-col :span="3" style="padding-right: 0px">
      <!-- 楼栋选择 -->
      <div class="building">
        <div style="height: 4.5vh">
          <el-input
            v-model="keywords"
            class="keywords"
            placeholder="请输入搜索内容"
            :suffix-icon="Search"
          />
        </div>
        <el-scrollbar height="87vh">
          <el-tree
            :data="data"
            node-key="id"
            :props="defaultProps"
            default-expand-all
            highlight-current="true"
            @check-change="handleCheckChange"
          >
            <template #default="{ node, data }">
              <div class="custom-tree-node flex">
                <div
                  v-if="data.leaf"
                  style="
                    width: 10%;
                    text-align: center;
                    padding-right: 0.9375rem;
                  "
                >
                  <el-icon
                    style="position: relative; top: 0.125rem; font-size: 1.6rem"
                    ><video-camera
                  /></el-icon>
                </div>
                <div class="flex_item">{{ node.label }}</div>
                <div
                  style="
                    width: 10%;
                    text-align: right;
                    padding-right: 0.9375rem;
                  "
                >
                  <el-icon><arrow-right /></el-icon>
                </div>
              </div>
            </template>
          </el-tree>
        </el-scrollbar>
      </div>
    </el-col>
    <el-col :span="21">
      <div style="height: 60vh">
        <!-- 视频信息 -->
        <chartpanel title="监控摄像头001" style="height: 59vh">
          <el-row :gutter="20" style="margin: 0; padding: 0; height: 26vh">
            <el-col :span="8">
              <img
                src="../assets/images/community/2.webp"
                style="width: 100%; height: 26vh"
              />
            </el-col>
            <el-col :span="8">
              <img
                src="../assets/images/community/3.webp"
                style="width: 100%; height: 26vh"
              />
            </el-col>
            <el-col :span="8">
              <img
                src="../assets/images/community/4.webp"
                style="width: 100%; height: 26vh"
              />
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            style="margin: 0; padding: 0; margin-top: 1vh; height: 26vh"
          >
            <el-col :span="8">
              <img
                src="../assets/images/community/5.webp"
                style="width: 100%; height: 26vh"
              />
            </el-col>
            <el-col :span="8">
              <img
                src="../assets/images/community/6.webp"
                style="width: 100%; height: 26vh"
              />
            </el-col>
            <el-col :span="8">
              <img
                src="../assets/images/community/7.webp"
                style="width: 100%; height: 26vh"
              />
            </el-col>
          </el-row>
        </chartpanel>
      </div>
      <div style="height: 31.5vh; mmargin-top: 1vh">
        <el-row :gutter="20" style="margin: 0; padding: 0">
          <el-col :span="12" style="padding-left: 0px">
            <chartpanel title="报警中心" style="height: 31.5vh">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <!-- <div class="item flex" v-for="(item, index) in videos" :key="index">
										<div class="swiper-slide">
											<img :src="'./src'+item" style="width: 100%;height:100%;">
										</div>
									</div> -->
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/11.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/10.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/9.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/8.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/7.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/6.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/5.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/4.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/3.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div class="swiper-slide">
                    <img
                      src="../assets/images/community/2.webp"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                </div>
              </div>
            </chartpanel>
          </el-col>
          <el-col :span="12">
            <chartpanel title="值班管理" style="height: 31.5vh">
              <div class="video">
                <div class="flex" style="margin-top: 2vh">
                  <div class="flex_item">
                    <div class="status_item">
                      <div class="iconpanel">
                        <img
                          src="@/assets/images/community/img016.png"
                          style="width: 50%"
                        />
                      </div>
                      <div class="">
                        <div class="statusitem">
                          <span class="status status_1"></span>
                          <span class="status_label">监控中心值班员</span>
                        </div>
                        <div class="statusitem">
                          登录时间：2022-05-08 19:22:11
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="split_line_h"></div>
                  <div class="flex_item">
                    <div class="status_item">
                      <div class="iconpanel">
                        <img
                          src="@/assets/images/community/img016.png"
                          style="width: 50%"
                        />
                      </div>
                      <div class="">
                        <div class="statusitem">
                          <span class="status status_1"></span>
                          <span class="status_label">门卫值班员</span>
                        </div>
                        <div class="statusitem">
                          登录时间：2022-05-08 19:22:11
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="split_line_h"></div>
                  <div class="flex_item">
                    <div class="status_item">
                      <div class="iconpanel">
                        <img
                          src="@/assets/images/community/img016.png"
                          style="width: 50%"
                        />
                      </div>
                      <div class="">
                        <div class="statusitem">
                          <span class="status status_1"></span>
                          <span class="status_label">消防值班员</span>
                        </div>
                        <div class="statusitem">
                          登录时间：2022-05-08 19:22:11
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="split_line_h"></div>
                  <div class="flex_item">
                    <div class="status_item">
                      <div class="iconpanel">
                        <img
                          src="@/assets/images/community/img016.png"
                          style="width: 50%"
                        />
                      </div>
                      <div class="">
                        <div class="statusitem">
                          <span class="status status_1"></span>
                          <span class="status_label">停车场值班员</span>
                        </div>
                        <div class="statusitem">
                          登录时间：2022-05-08 19:22:11
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="legend flex">
                  <div class="flex_item">
                    <span class="status status_1"></span>
                    <span class="status_label">在岗</span>
                  </div>
                  <div class="flex_item">
                    <span class="status status_2"></span>
                    <span class="status_label">脱岗</span>
                  </div>
                  <div class="flex_item">
                    <span class="status status_3"></span>
                    <span class="status_label">离岗</span>
                  </div>
                </div>
              </div>
            </chartpanel>
          </el-col>
        </el-row>
      </div>
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

import chartpanel from "@/components/chartpanel.vue";

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

const $echarts = echarts;

const defaultProps = {
  children: "children",
  label: "label",
};
const data = [
  {
    id: 1,
    label: "楼栋监控",
    leaf: false,
    children: [
      {
        id: 4,
        label: "1号楼",
        leaf: false,
        children: [
          {
            id: 9,
            leaf: true,
            label: "门口监控点",
          },
          {
            id: 10,
            leaf: true,
            label: "1楼监控点",
          },
          {
            id: 11,
            leaf: true,
            label: "2楼监控点",
          },
          {
            id: 13,
            leaf: true,
            label: "3楼监控点",
          },
          {
            id: 14,
            leaf: true,
            label: "4楼监控点",
          },
          {
            id: 15,
            leaf: true,
            label: "5楼监控点",
          },
        ],
      },
      {
        id: 44,
        label: "2号楼",
        leaf: false,
        children: [
          {
            id: 91,
            leaf: true,
            label: "门口监控点",
          },
          {
            id: 101,
            leaf: true,
            label: "1楼监控点",
          },
          {
            id: 111,
            leaf: true,
            label: "2楼监控点",
          },
          {
            id: 131,
            leaf: true,
            label: "3楼监控点",
          },
          {
            id: 141,
            leaf: true,
            label: "4楼监控点",
          },
          {
            id: 151,
            leaf: true,
            label: "5楼监控点",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "大门监控",
    leaf: false,
    children: [
      {
        id: 5,
        leaf: true,
        label: "正门监控点",
      },
      {
        id: 6,
        leaf: true,
        label: "西门监控点",
      },
      {
        id: 62,
        leaf: true,
        label: "北门监控点",
      },
      {
        id: 63,
        leaf: true,
        label: "南门监控点",
      },
    ],
  },
  {
    id: 3,
    label: "电梯监控",
    leaf: false,
    children: [
      {
        id: 7,
        leaf: true,
        label: "1-1-1号电梯",
      },
      {
        id: 8,
        leaf: true,
        label: "1-1-2号电梯",
      },
    ],
  },
  {
    id: 4,
    label: "其它监控",
    leaf: false,
    children: [
      {
        id: 7,
        leaf: true,
        label: "车库监控点001",
      },
      {
        id: 8,
        leaf: true,
        label: "车库监控点002",
      },
    ],
  },
];

//视频监控
let swiper = null;

//初始化图标
const initCharts = () => {
  setTimeout(() => {
    swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 20,
      freeMode: true,
      autoplay: 1000,
      loop: true,
    });
  }, 300);
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

  timer = setInterval(function () {}, refreshtime);
};

//挂
onMounted(() => {
  initCharts();
  startRefreshChart();

  //图表尺寸自适应
  window.onresize = () => {};
});
onBeforeUnmount(() => {
  timer && clearInterval(timer);
});
</script>

<style >
.keywords .el-input__wrapper {
  background: transparent;
  box-shadow: none;
}
.keywords .el-input__wrapper .el-input__inner {
  background: transparent;
  width: 50%;
  margin: 0.5vh auto;
  height: 3vh;
  display: inline-block;
  border: 0.0625rem solid #efefef22;
  border-radius: 1.875rem;
  text-align: center;
  color: #fff;
}
.building {
  border: 0.0625rem solid #2196f366;
}
.el-tree {
  background: transparent;
  color: #fff;
}
.el-tree__empty-text {
  background: transparent;
  color: #fff;
}
.el-tree-node__content:hover {
  background: #2aa7ee;
}
.el-tree-node:focus > .el-tree-node__content {
  background: #2aa7ee;
}
.el-tree-node__content {
  color: #fff;
  line-height: 3.5vh;
  height: 3.5vh;
  font-size: 1.4rem;
}
.custom-tree-node {
  width: 100%;
}
.el-tree-node__expand-icon {
  color: #fff;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background: #2aa7ee;
}

.swiper-container {
  width: 100%;
  height: 27vh;
  margin: 0vw auto;
}
.swiper-slide {
  text-align: center;
  font-size: 1.8rem;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.video .status_item {
  width: 100%;
  margin: 0 auto;
  margin-top: 3vh;
}
.video .status_item .iconpanel {
  width: 100%;
  text-align: center;
}
.video .status_item .statusitem {
  line-height: 3vh;
  text-align: center;
}
.video .status_item .statusitem .status {
  display: inline-block;
  width: 1vh;
  height: 1vh;
}
.video .status_item .statusitem .status_1 {
  background: #01aaed;
}
.video .status_item .statusitem .status_2 {
  background: #fac858;
}
.video .status_item .statusitem .status_3 {
  background: #ff5722;
}
.video .status_item .statusitem .status_label {
  display: inline-block;
  margin-left: 1vh;
}
.video .legend {
  position: absolute;
  right: 1vw;
  top: 3vh;
  width: 10vw;
  height: 3vh;
  text-align: center;
}

.video .legend .status {
  display: inline-block;
  width: 1vh;
  height: 1vh;
  margin-right: 1vh;
}
.video .legend .status_1 {
  background: #01aaed;
}
.video .legend .status_2 {
  background: #fac858;
}
.video .legend .status_3 {
  background: #ff5722;
}
.video .split_line_h {
  height: 25vh;
  width: 0.12vh;
}
</style>
