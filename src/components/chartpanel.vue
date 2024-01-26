<template>
  <div class="chart" :style="chartStyles">
    <div class="chart_top">
      <div class="chart_title" :style="customStyles" v-if="title">
        {{ title }}
      </div>
      <div
        class="chart_right"
        :style="customStyles"
        v-if="rightTitle"
        @click="callMyMethod"
      >
        {{ rightTitle }}
      </div>
    </div>
    <div class="chart_content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps } from "vue";

//外部参数
const props = defineProps({
  title: String,
  rightTitle: String,
  chartStyles: Object,
  customStyles: Object,
  // 定义一个名为myMethod的prop，用于接收父组件传递的方法
  myMethod: {
    type: Function,
    required: true,
  },
});

const callMyMethod = () => {
  // 调用父组件传递过来的方法
  props.myMethod();
};
</script>
<style lang="scss" scoped>
.chart {
  position: relative;
  height: 3.875rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: rgba(255, 255, 255, 0.04);
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: 0.1875rem;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
  }

  .chart_top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 3vh;
    height: 3vh;
    background: linear-gradient(
      to left,
      #03a9f4,
      #2196f3,
      #00bcd4,
      #2196f3,
      #3fb579,
      #2196f3,
      #189cdb,
      #1ec5cd
    );
    margin: 0 1rem;
    -webkit-background-clip: text;
    color: transparent;
  }
  .chart_title {
  }

  .chart_right {
    font-size: 1.2rem;
  }

  .chart_content {
    // position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
    }
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #02a6b5;
      border-right: 2px solid #02a6b5;
    }
  }
}
</style>
