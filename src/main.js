import { createApp } from 'vue'

// 引入网络请求
import axios from 'axios';

// 引入echarts
import * as echarts from 'echarts'

// 引入elementui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import Index from './pages/Index.vue'
import Device from './pages/Device.vue'
import Video from './pages/Video.vue'
import Car from './pages/Car.vue'

//定义路由相关代码
import {
	createRouter,
	createWebHashHistory
} from "vue-router";

const routes = [{
		path: '/',
		redirect: "/Index"
	},
	{
		name: 'Index',
		path: '/Index',
		component: Index
	},
	{
		name: 'Device',
		path: '/Device',
		component: Device
	},
	{
		name: 'Video',
		path: '/Video',
		component: Video
	},
	{
		name: 'Car',
		path: '/Car',
		component: Car
	}
]
const router = createRouter({
	// 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
	history: createWebHashHistory(),
	routes, // `routes: routes` 的缩写
})


const app =  createApp(App);

// vue3 给原型上挂载属性
app.config.globalProperties.$echarts = echarts;

//引入element的图标
for (const name in ElIcons) {
	app.component(name, ElIcons[name])
}
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});

app.mount('#app');
