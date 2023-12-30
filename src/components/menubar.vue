<template>
  <div class="flex title top menubar" style="z-index: 999999999">
    <div class="flex menubar_left">
      <span class="menubar_left_time">{{ time }}</span>
    </div>
    <div class="flex_auto flex-title">智慧小区平台</div>
    <div class="tools flex flex_item flex_item_right">
      <div class="flex_item_right_w">
        <div class="tool_item" @click="goaAbnormal">
          <el-icon><Menu /></el-icon>
          <span>管理</span>
        </div>
      </div>
      <div class="flex_item_right_w">
        <div class="tool_item" @click="screen">
          <el-icon>
            <full-screen />
          </el-icon>
          <span>{{ screenText }}</span>
        </div>
      </div>
      <div class="flex_item_right_w">
        <div class="tool_item" @click="exit">
          <el-icon>
            <switch-button />
          </el-icon>
          <span>退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const emit = defineEmits(["showSettingDialog"]);
const router = useRouter();
const store = useStore();

const showSettingDialog = () => {
  emit("showSettingDialog", {});
};

// 跳转到管理页面
const goaAbnormal = () => {
  router.push('/Abnormal')
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
  // router.push("/login");
  sessionStorage.clear();
  window.location.replace("http://218.56.104.54:8085/logout");
};

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

.menubar_left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
}

.menubar_left_time {
  margin-left: 20%;
  font-size: 1.4rem;
}

.flex_item_right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.flex_item_right_w {
  width: 5vw;
}

/* 当视图宽度小于600像素时应用的样式 */
@media screen and (max-width: 600px) {
  .menubar_left_time {
    display: none;
  }
  .flex_item_right {
    display: none;
  }
}
</style>
