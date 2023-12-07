<template>
  <div class="flylineDiagram">
    <div class="flylineDiagram_left">
      <chartpanel title="各类人员占比" class="flex-1 chart">
        <v-chart :option="option1" style="height: 90%"></v-chart>
      </chartpanel>
      <chartpanel title="流动人员占比" class="flex-1 chart">
        <v-chart :option="option2" style="height: 90%"></v-chart>
      </chartpanel>
      <div class="flex-1">
        <chartpanel title="小区人员动态">
          <vue3-seamless-scroll :list="newsdatas" class="indexscroll">
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
      </div>
    </div>
    <div class="flylineDiagram_content">
      <Map @sendMessageToParent="handleMessageFromChild"></Map>
    </div>
    <div class="flylineDiagram_right">
      <chartpanel class="flex-1 chart" title="设备状态">
        <div class="device">
          <div class="device-item" v-for="item in device" :key="item.name">
            <div class="device-item-name">{{ item.name }}</div>
            <div class="device-item-ok">正常：{{ item.ok }}</div>
            <div class="device-item-bad">损坏：{{ item.bad }}</div>
            <div class="device-item-red">离线：{{ item.red }}</div>
          </div>
        </div>
      </chartpanel>
      <chartpanel title="流动人口统计" class="flex-1 chart">
        <v-chart :option="option5" style="height: 90%"></v-chart>
      </chartpanel>
      <div class="flex-1">
        <chartpanel title="搬离人员">
          <vue3-seamless-scroll :list="newsdatas" class="indexscroll">
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
      </div>
    </div>
  </div>
</template>

<script  setup>
import { onMounted, reactive, ref } from "vue";
import { faceList } from "../api/face";
import Map from "../views/Map.vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import chartpanel from "@/components/chartpanel.vue";
import { ElMessage } from "element-plus";

let option1 = reactive({
  title: {
    text: "人口占比比例",
    textStyle: {
      color: "#fff",
    },
    show: false,
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
    textStyle: {
      color: "#fff", // 设置标题文字颜色为白色
    },
  },
  textStyle: {
    color: "#fff",
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#060E3F",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
        textStyle: {
          // 设置字体样式
          color: "#fff", // 设置字体颜色为白色
        },
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 12000, name: "常住人口" },
        { value: 800, name: "流出人口" },
        { value: 900, name: "重点人员" },
        { value: 8000, name: "流入人口" },
      ],
    },
  ],
});

let option2 = reactive({
  title: {
    text: "各类人口占比",
    textStyle: {
      color: "#fff",
    },
    show: false,
  },
  series: [
    {
      type: "pie",
      label: {
        color: "#fff",
        fontStyle: "normal",
        fontWeight: "bolder",
      },
      data: [
        { name: "流入人口", value: 2000 },
        { name: "流出人口", value: 3000 },
      ],
      insideLabel: {
        show: true,
      },
    },
  ],
});

let option3 = reactive({
  title: {
    text: "常住人口统计",
    textStyle: {
      color: "#fff",
    },
    show: false,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      areaStyle: {},
    },
  ],
});

// 设备状态
let device = ref([
  { name: "摄像机", ok: "1000", bad: "0", red: "0" },
  { name: "传感器", ok: "2000", bad: "0", red: "0" },
  { name: "路由器", ok: "123", bad: "0", red: "0" },
]);

let option5 = reactive({
  title: {
    text: "流动人口统计",
    textStyle: {
      color: "#fff",
    },
    show: false,
  },
  textStyle: {
    color: "#fff",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
});

//社区动态数据
const newsdatas = ref([
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
]);

const getList = async () => {};

// 数据初始化全国数据
const initialization = () => {
  // 如果消息不是 "历下区"，则恢复 option2 到默认值

  option1.series[0].data = [
    { value: 12000, name: "常住人口" },
    { value: 800, name: "流出人口" },
    { value: 900, name: "重点人员" },
    { value: 8000, name: "流入人口" },
  ];

  // 各类人口占比
  option2.series[0].data = [
    { name: "流入人口", value: 2000 },
    { name: "流出人口", value: 3000 },
  ];

  // 常住人口统计初始化
  option3.series[0].data = [820, 932, 901, 934, 1290, 1330, 1320];

  // 流动人口统计初始化
  option5.series[0].data = [120, 200, 150, 80, 70, 110, 130];

  //社区动态数据初始化
  newsdatas.value = [
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
    { title: "我王佳乐", date: "2023-01-01", status: "进小区" },
  ];

  // 设备状态
  device.value = [
    { name: "摄像机", ok: "1000", bad: "0", red: "0" },
    { name: "传感器", ok: "2000", bad: "0", red: "0" },
    { name: "路由器", ok: "123", bad: "0", red: "0" },
  ];
};

// 控制根据地图数据进行改变图标信息
const handleMessageFromChild = (message) => {
  if (message === "历下区") {
    option1.series[0].data = [
      { value: 1048, name: "常住人口" },
      { value: 735, name: "流出人口" },
      { value: 484, name: "重点人员" },
      { value: 300, name: "流入人口" },
    ];

    // 人口比例
    option2.title.text = "各类人口占比1";
    option2.series[0].data = [
      { name: "流入人口", value: 3000 },
      { name: "流出人口", value: 3000 },
    ];
    // 常住人口统计初始化
    option3.series[0].data = [1330, 1330, 1330, 1330, 1330, 1330, 1320];

    // 设备状态
    device.value = [
      { name: "摄像机", ok: "100", bad: "0", red: "0" },
      { name: "传感器", ok: "200", bad: "0", red: "0" },
      { name: "路由器", ok: "50", bad: "0", red: "0" },
    ];

    // 流动人口统计初始化
    option5.series[0].data = [200, 200, 200, 200, 200, 200, 200];

    //社区动态数据初始化
    newsdatas.value = [
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
      { title: "李小龙", date: "2023-01-01", status: "进小区" },
    ];
  } else if (message === "全国") {
    initialization();
  } else {
    ElMessage.warning("没有数据");
  }
};

onMounted(() => {
  // getList();
});
</script>


<style scoped>
.flylineDiagram {
  display: flex;
  flex-direction: row;
  height: 92.5vh;
  overflow: hidden;
  margin: 0px;
  padding: 0;
  /* margin-top: 1vh; */
}

.flylineDiagram_left,
.flylineDiagram_content,
.flylineDiagram_right {
  /* position: absolute; */
  display: flex;
  flex-direction: column;
}

.flylineDiagram_left {
  display: flex;
  height: 100%;
  width: 25%;
  padding: 5px;
}

.flylineDiagram_content {
  flex: auto;
}

.flylineDiagram_right {
  display: flex;
  height: 100%;
  width: 25%;
  padding: 5px;
}

.flex-1 {
  flex: 1;
  margin: 5px 0;
}

.indexscroll {
  height: 25vh;
  width: 100%;
  overflow: hidden;
}

.indexscroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1vh 0.8vh;
  font-size: 1.4rem;
  border-radius: 0.5vh;
}

.indexscroll .item:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}

.indexscroll .item .date {
  width: 10vw;
}

.indexscroll .item .status {
  width: 3vw;
  /* color: #ff0157; */
}
.titleStyle {
  text-align: center;
  color: antiquewhite;
}

.device {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 20px;
  width: 100%;
  height: 90%;
}

.device-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 1.3rem;
}

.device-item-ok {
  color: green;
}

.device-item-bad {
  color: yellow;
}

.device-item-red {
  color: red;
}
</style>