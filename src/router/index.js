//定义路由相关代码
import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/Index"
  },
  {
    name: "Index",
    path: "/Index",
    component: () => import("@/views/Index.vue")
  },
  {
    name: "Device",
    path: "/Device",
    component: () => import("@/views/Device.vue")
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页'
    },
    component: () => import('@/views/Login.vue'),
  }
];
const router = createRouter({
  //内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
});

export default router;
