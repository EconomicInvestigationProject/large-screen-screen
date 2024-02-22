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
        class="flex_1 chart"
        rightTitle="详情"
        :my-method="keypersonneClick"
      >
        <keyPersonnelDiscount
          class="keyPersonnelDiscount_view"
        ></keyPersonnelDiscount>
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
import MapComponent from "./Map.vue";
import gauge from "./Gauge.vue";
import discount from "./Discount.vue";
import keyPersonnelDiscount from "./KeyPersonnelDiscount.vue";
import histogram from "./Histogram.vue";
import variousPeople from "./VariousPeople.vue";
import peopleinandout from "./Peopleinandout.vue";
import chartpanel from "@/components/chartpanel.vue";
import { ElMessage } from "element-plus";

// 实例化路由
const router = useRouter();

// 搬入搬离管理页面
const peopleinandoutClick = () => {
  router.push({ name: "MoveInOut" });
};

// 重点人管理页面
const keypersonneClick = () => {
  router.push({ name: "Abnormal" });
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

onMounted(() => {});
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

  .histogram_view {
    height: 90%;
  }
  .discount_view {
    height: 90%;
  }
}
</style>