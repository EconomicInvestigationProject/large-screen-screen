<template>
  <div class="chart" :style="chartStyles">
    <div class="chart_title" :style="customStyles" v-if="title">
      {{ title }}
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
  chartStyles: Object,
  customStyles: Object,
});
</script>

<style>
</style>
