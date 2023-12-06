<template>
  <div class="flylineDiagram">
    <div class="flylineDiagram_left">
      <chartpanel title="流动人口统计" class="flex-1 chart">
        <v-chart :option="option1" style="height: 90%"></v-chart>
      </chartpanel>
      <chartpanel title="各类人员占比" class="flex-1 chart">
        <v-chart :option="option2" style="height: 90%"></v-chart>
      </chartpanel>
      <chartpanel title="流动人口统计" class="flex-1 chart">
        <v-chart :option="option3" style="height: 90%"></v-chart>
      </chartpanel>
    </div>
    <div class="flylineDiagram_content">
      <Map></Map>
    </div>
    <div class="flylineDiagram_right">
      <chartpanel title="流动人口统计" class="flex-1 chart">
        <v-chart :option="option1" style="height: 90%"></v-chart>
      </chartpanel>

      <chartpanel title="各类人口占比" class="flex-1 chart">
        <v-chart :option="option2" style="height: 90%"></v-chart>
      </chartpanel>
      <div class="flex-1">
        <chartpanel title="人员动态">
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

const option2 = {
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
};

//新闻资讯数据
const newsdatas = reactive([]);
const getList = async () => {
  const list = await faceList();
  newsdatas.value = [...list];
  console.log("newsdatas", newsdatas.value);
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
  height: 20vh;
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
  width: 4vw;
}

.indexscroll .item .status {
  width: 3vw;
  color: #ff0157;
}
.titleStyle {
  text-align: center;
  color: antiquewhite;
}
</style>