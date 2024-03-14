import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "搜索" },
        component: () => import("@/pages/home/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
