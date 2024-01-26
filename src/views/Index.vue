<template>
  <div class="flylineDiagram">
    <div class="flylineDiagram_left">
      <chartpanel title="各类人员占比" class="flex_1 chart">
        <variousPeople class="variousPeople_view"></variousPeople>
      </chartpanel>
      <chartpanel
        title="搬入搬出人员出占比"
        class="flex_1 chart"
        rightTitle="详情"
        :my-method="peopleinandoutClick"
      >
        <peopleinandout class="peopleinandout_view"></peopleinandout>
      </chartpanel>
      <chartpanel
        title="重点人员动态"
        class="flex_1 chart indexscroll_chart"
        rightTitle="详情"
        :my-method="keypersonneClick"
      >
        <vue3-seamless-scroll :list="newsdatas" class="indexscroll">
          <div
            class="item flex"
            v-for="(item, index) in newsdatas"
            :key="index"
          >
            <div class="name">{{ item.name }}</div>
            <div class="date">{{ item.timeStamp }}</div>
            <div class="status">{{ item.status }}</div>
          </div>
        </vue3-seamless-scroll>
      </chartpanel>
    </div>
    <div class="flylineDiagram_content">
      <MapComponent
        @sendMessageToParent="handleMessageFromChild"
      ></MapComponent>
    </div>
    <div class="flylineDiagram_right">
      <chartpanel class="flex_1 chart" title="设备状态">
        <gauge class="gauge_views"></gauge>
      </chartpanel>
      <chartpanel class="flex_1 chart" title="电梯人口密集度">
        <histogram class="histogram_view"></histogram>
      </chartpanel>
      <chartpanel class="flex_1 chart" title="异常人员">
        <discount class="discount_view"></discount>
      </chartpanel>
    </div>
  </div>
</template>

<script  setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import MapComponent from "./map.vue";
import gauge from "./gauge.vue";
import discount from "./discount.vue";
import histogram from "./histogram.vue";
import variousPeople from "./variousPeople.vue";
import peopleinandout from "./peopleinandout.vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import chartpanel from "@/components/chartpanel.vue";
import { ElMessage } from "element-plus";
import { keypersonnelStatistics } from "../api/keypersonnel";
// 实例化路由
const router = useRouter();

//社区动态数据
const newsdatas = ref([
  { title: "王佳乐", date: "2023-01-01", status: "进小区" },
  { title: "李香琴", date: "2023-01-01", status: "进小区" },
  { title: "王佳乐", date: "2023-01-01", status: "离开小区" },
  { title: "-", date: "2023-01-01", status: "进小区" },
  { title: "-", date: "2023-01-01", status: "离开小区" },
  { title: "-", date: "2023-01-01", status: "进小区" },
  { title: "刘佳", date: "2023-01-01", status: "进小区" },
  { title: "张廷发", date: "2023-01-01", status: "离开小区" },
  { title: "张慢", date: "2023-01-01", status: "进小区" },
  { title: "-", date: "2023-01-01", status: "进小区" },
  { title: "-", date: "2023-01-01", status: "离开小区" },
  { title: "-", date: "2023-01-01", status: "进小区" },
]);

// 搬入搬离管理页面
const peopleinandoutClick = () => {
  router.push({ name: "MoveInOut" });
};

// 重点人管理页面
const keypersonneClick = () => {
  router.push({ name: "Abnormal" });
};

// 小区重点人员
const getList = async () => {
  const res = await keypersonnelStatistics();
  if (res) {
    let data = [];
    data = res;
    data.forEach((item) => {
      if (item.status === "in") {
        item.status = "进入小区";
      } else if (item.status === "out") {
        item.status = "离开小区";
      }
    });
    newsdatas.value = data;
  }
};

// 控制根据地图数据进行改变图标信息
const handleMessageFromChild = (message) => {
  if (message === "历下区") {
    ElMessage.success("现在数据已展示");
  } else if (message === "全国") {
    return;
  } else {
    ElMessage.warning("没有数据");
  }
};

onMounted(() => {
  getList();
});
</script>


<style lang="scss" scoped>
.flylineDiagram {
  display: flex;
  flex-direction: row;
  height: 92.5vh;
  overflow: hidden;
  margin: 0px;
  padding: 0;
}

.flylineDiagram_left,
.flylineDiagram_content,
.flylineDiagram_right {
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
.flex_1 {
  flex: 1;
  margin: 5px 0;
}

.variousPeople_view {
  height: 90%;
}

.peopleinandout_view {
  height: 90%;
}

.histogram_view {
  height: 90%;
}

.discount_view {
  height: 88%;
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

.indexscroll .item .name {
  width: auto;
  min-width: 5vw;
}

.indexscroll .item .date {
  width: auto;
  min-width: 5vw;
}

.indexscroll .item .status {
  width: auto;
  min-width: 5vw;
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

/* 当视图宽度小于600像素时应用的样式 */
@media screen and (max-width: 630px) {
  /* 在这里添加你希望在小屏幕上应用的样式和布局 */
  .flylineDiagram {
    display: flex;
    flex-direction: column;
    align-content: center;
    height: 92.5vh;
    width: 100vw;
    overflow: hidden;
    overflow-y: scroll;
    margin: 0px;
    padding: 0;
    /* 隐藏默认的滚动条样式 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .flylineDiagram::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }

  .flex_1 {
    margin: 5px;
  }

  .chart {
    min-height: 320px;
  }

  .flylineDiagram_left {
    display: flex;
    height: auto;
    padding: 5px;
    width: 100%;
    padding: 0px;
  }

  .flylineDiagram_content {
    min-height: 400px;
    width: 100%;
    padding: 0px;
  }

  .flylineDiagram_content .back {
    margin: 10px;
  }

  .flylineDiagram_right {
    width: 100%;
    padding: 0px;
  }

  .indexscroll {
    height: 30vh;
  }

  .histogram_view {
    height: 90%;
  }
  .discount_view {
    height: 90%;
  }
}
</style>