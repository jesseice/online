import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    component: () => import("../pages/home/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login/index.vue"),
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes,
});

export default router;
