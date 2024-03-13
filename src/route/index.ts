import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

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
  history: createWebHashHistory(),
  routes,
});

export default router;
