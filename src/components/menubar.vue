<template>
  <div class="flex title top" style="z-index: 999999999">
    <div style="width: 30vw" class="flex">
      <div class="time_div">
        <div class="time">
          <span>{{ time }}</span>
        </div>
      </div>
    </div>
    <div class="flex_auto flex-title">智慧小区平台</div>
    <div class="flex_item flex">
      <div class="menus flex_item flex" style="width: 20vw">
        <div class="menus_div flex">
          <div class="flex_item" v-for="item in menus" :key="item.sid">
            <div
              v-if="item.isShow"
              :class="[
                'menu_item',
                curpage,
                curpage == item.sid ? 'menu_item_selected' : '',
              ]"
              @click="turnPage(item.path)"
            >
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex_item" style="width: 10vw">
        <div class="time_div flex_item flex">
          <div class="tools flex flex_item">
            <div class="flex_item flex_item_left">
              <div class="tool_item" @click="screen">
                <el-icon>
                  <full-screen />
                </el-icon>
                <span>{{ screenText }}</span>
              </div>
            </div>
            <div class="flex_item flex_item_left">
              <div class="tool_item" @click="exit">
                <el-icon>
                  <switch-button />
                </el-icon>
                <span>退出</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const emit = defineEmits(["showSettingDialog"]);
const router = useRouter();
const store = useStore();

const menus = reactive([
  // {
  //   sid: "Index",
  //   name: "综合监控",
  //   path: "/Index",
  //   isShow: true,
  // },
  // {
  //   sid: "Device",
  //   name: "可视化数据",
  //   path: "/Device",
  //   isShow: true,
  // },
]);

const showSettingDialog = () => {
  emit("showSettingDialog", {});
};

//全屏
let screenText = ref("全屏");
const isfullscreen = ref(false);
const screen = () => {
  if (isfullscreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    screenText.value = "全屏";
  } else {
    var element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    screenText.value = "恢复";
  }
  isfullscreen.value = !isfullscreen.value;
};

//退出
const exit = () => {
  // 设置localStorage数据为空
  store.commit("saveUserInfo", "");
  // 清空当前数据
  router.push("/login");
};

const curpage = ref("index");
const turnPage = (path) => {
  router.push(path);
};
router.beforeResolve(async (to) => {
  curpage.value = to.name;
});

//定时器
let time = ref(new Date().format("yyyy年MM月dd日 hh:mm:ss"));
const timer = setInterval(function () {
  time.value = new Date().format("yyyy年MM月dd日 hh:mm:ss");
}, 1000);

onMounted(() => {});
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style>
.top {
  background-image: url("../assets/images/top.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 当视图宽度小于600像素时应用的样式 */
@media screen and (max-width: 600px) {
  .dark .title .time {
    display: none;
  }
  .flex_item_left {
    display: none;
  }
}
</style>
