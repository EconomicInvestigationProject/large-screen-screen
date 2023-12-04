<template>
  <div class="flylineDiagram">
    <div class="flylineDiagram_left">
      <v-chart :option="option1" class="flex-1"></v-chart>
      <v-chart :option="option2" class="flex-1"></v-chart>
      <v-chart :option="option3" class="flex-1"></v-chart>
    </div>
    <div class="flylineDiagram_content">
      <Map></Map>
    </div>
    <div class="flylineDiagram_right">
      <v-chart :option="option1" class="flex-1"></v-chart>
      <v-chart :option="option2" class="flex-1"></v-chart>
      <v-chart :option="option3" class="flex-1"></v-chart>
    </div>
  </div>
</template>

<script  setup>
import { onMounted, reactive, ref } from "vue";
import { faceList } from "../api/face";
import Map from "../views/Map.vue";
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

const option1 = ref({
  title: {
    text: "流动人口统计",
    textStyle: {
      color: "#fff",
    },
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

const option2 = {
  title: {
    text: "各类人口占比",
    textStyle: {
      color: "#fff",
    },
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
        { name: "常住人口", value: 93 },
        { name: "重点人口", value: 32 },
        { name: "暂住人口", value: 65 },
        { name: "异常人口", value: 44 },
      ],
      insideLabel: {
        show: true,
      },
    },
  ],
};

let option3 = {
  title: {
    text: "常住人口统计",
    textStyle: {
      color: "#fff",
    },
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
};

const getList = async () => {
  // const list = await faceList();
  // console.log("list", list);
};

const initWebsocket = () => {
  var ws = new WebSocket("ws://127.0.0.1:8090"); //连接成功触发
  ws.onopen = function () {
    falert("连接成功");
  };
  //接收消息触发
  ws.onmessage = function (data) {
    console.log(data);
  };
};
onMounted(() => {
  getList();
  // initWebsocket();
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
  justify-content: space-around;
  width: 25%;
  padding: 0 0 0 30px;
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
  margin-top: 20px;
}
</style>