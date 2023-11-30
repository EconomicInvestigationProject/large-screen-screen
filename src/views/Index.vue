<template>
  <el-row :gutter="20" style="margin: 0px; padding: 0; margin-top: 1vh">
    <div class="flylineDiagram">
      <div class="flylineDiagram_left">
        <div style="width: 100%; height: 80%; flex: 1">
          <dv-button
            :border="Border3"
            color="#fff"
            font-color="#fff"
            style="width: 100px"
            >智慧水利</dv-button
          >
          <dv-capsule-chart
            :config="config1"
            style="width: 100%; height: 70%"
          />
        </div>
        <div style="width: 100%; height: 80%; flex: 1">
          <dv-button
            :border="Border3"
            color="#fff"
            font-color="#fff"
            style="width: 100px"
            >智慧水利</dv-button
          >
          <dv-capsule-chart
            :config="config1"
            style="width: 100%; height: 70%"
          />
        </div>
        <div style="width: 100%; height: 80%; flex: 1">
          <dv-button
            :border="Border3"
            color="#fff"
            font-color="#fff"
            style="width: 100px"
            >智慧水利</dv-button
          >
          <dv-capsule-chart
            :config="config1"
            style="width: 100%; height: 70%"
          />
        </div>
      </div>
      <div class="flylineDiagram_content">
        <dv-flyline-chart :config="config4" style="width: 100%; height: 100%" />
      </div>
      <div class="flylineDiagram_right">
        <dv-charts
          :option="option2"
          style="width: 100%; height: 100%; flex: 1"
        />
        <dv-charts
          :option="option2"
          style="width: 100%; height: 100%; flex: 1"
        />
        <dv-charts
          :option="option1"
          style="width: 100%; height: 100%; flex: 1"
        />
      </div>
    </div>
  </el-row>
</template>

<script  setup>
import { reactive } from "vue";

const config1 = reactive({
  data: [
    {
      name: "南阳",
      value: 167,
    },
    {
      name: "周口",
      value: 67,
    },
    {
      name: "漯河",
      value: 123,
    },
    {
      name: "郑州",
      value: 55,
    },
    {
      name: "西峡",
      value: 98,
    },
  ],
});

const option1 = {
  title: {
    text: "周销售额趋势",
  },
  xAxis: {
    name: "第一周",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    name: "销售额",
    data: "value",
  },
  series: [
    {
      data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
      type: "line",
    },
  ],
};

const option2 = {
  title: {
    text: "畅销饮料占比饼状图",
  },
  series: [
    {
      type: "pie",
      data: [
        { name: "可口可乐", value: 93 },
        { name: "百事可乐", value: 32 },
        { name: "哇哈哈", value: 65 },
        { name: "康师傅", value: 44 },
      ],
      insideLabel: {
        show: true,
      },
    },
  ],
};
</script>


<style scoped>
.flylineDiagram {
  /* position: relative; */
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  /* margin-top: 10vh; */
}

.flylineDiagram_left,
.flylineDiagram_content,
.flylineDiagram_right {
  /* position: absolute; */
  display: flex;
  flex-direction: column;
}

.flylineDiagram_left {
  justify-content: space-around;
  width: 25%;
  padding: 5px;
}

.flylineDiagram_content {
  flex: auto;
}

.flylineDiagram_right {
  justify-content: space-around;
  width: 25%;
  padding: 5px;
}
</style>