import { createApp } from "vue";

// 引入elementui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "@/App.vue";
import DataVVue3 from "@kjgl77/datav-vue3";

// 路由引入
import router from "@/router";
// 接口请求
import request from "@/utils/request.js";
// 持久化文件
import storage from "@/utils/storage.js";
// 接口文件
import api from "@/api/index.js";
// vuex文件
import store from "@/store/index.js";
// 引入echarts
import "echarts";
import * as echarts from "echarts";
// 引入vue-echarts
import VCharts from "vue-echarts";

const app = createApp(App);

// 全局挂载request
app.config.globalProperties.$request = request;
//全局挂载api
app.config.globalProperties.$api = api;
// 全局挂载storage
app.config.globalProperties.$storage = storage;
// vue3 给原型上挂载echarts属性
app.config.globalProperties.$echarts = echarts;

// 全局注册组件（也可以使用局部注册）
app.component("v-chart", VCharts);

// 路由文件挂载
app.use(router);

// vuex挂载
app.use(store);

//引入element的图标
for (const name in ElIcons) {
  app.component(name, ElIcons[name]);
}

app.use(ElementPlus, {
  locale: zhCn
});

//挂在dataV
app.use(DataVVue3);

app.mount("#app");
