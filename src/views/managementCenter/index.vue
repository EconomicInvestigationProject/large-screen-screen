<template>
  <div class="managementCenter">
    <div class="managementCenter_back">
      <el-icon @click="back"><CaretLeft /></el-icon>
      <span class="managementCenter_back_title">管理中心</span>
    </div>
    <div class="managementCenter_content">
      <!-- <div class="managementCenter_content_item">
        <el-icon size="50" class="icon_img"><OfficeBuilding /></el-icon>
        <span class="icon_name">社区人分析</span>
      </div> -->
      <div class="managementCenter_content_item" @click="goAbnormal">
        <el-icon size="50" class="icon_img"><UserFilled /></el-icon>
        <span class="icon_name">重点人员</span>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const back = () => {
  router.push("/index");
};

// 重点人员管理
const goAbnormal = () => {
  router.push("/Abnormal");
};

onMounted(() => {});
</script>
  
  <style lang="scss" scoped>
.managementCenter {
  display: flex;
  flex-direction: column;
  height: 92.5vh;
  overflow: hidden;
  margin: 0px;
  padding: 0;
  background-color: #010936;
}

.managementCenter_back {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10rem;
  font-size: 2rem;
  height: 5rem;
}

.managementCenter_back_title {
  margin-left: 2rem;
}

.managementCenter_content {
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
}
.managementCenter_content_item {
  margin: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10rem;
  height: 10rem;
  transition: all 0.3s; /* 添加过渡效果，让颜色变化更平滑 */
}

.managementCenter_content_item:hover > .icon_img,
.managementCenter_content_item:hover > .icon_name {
  color: #409efc;
}

.icon_img {
  padding: 1rem;
  border-radius: 1rem;
  /* 检查是否通过 border 属性设置边框颜色 */
  border: 1px solid #fff;
  /* 添加过渡效果，让颜色变化更平滑 */
  transition: all 0.3s;
}

.icon_img:hover {
  /* 颜色变化 */
  border: 1px solid #409efc;
}

.icon_name {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #fff;
}
</style>