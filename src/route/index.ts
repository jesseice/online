import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import { ImageIcon, FillColor1Icon, Filter3Icon } from "tdesign-icons-vue-next";
export const menuRoutes: RouteRecordRaw[] = [
  // {
  //   path: "/imageSearch",
  //   name: "imageSearch",
  //   meta: { title: "图片检索", icon: ImageIcon },
  //   component: () => import("@/pages/imageSearch/index.vue"),
  // },
  {
    path: "/createImg",
    name: "createImg",
    meta: { title: "文生图", icon: ImageIcon },
    component: () => import("@/pages/createImg/index.vue"),
  },
  {
    path: "/cosplay",
    name: "cosplay",
    meta: { title: "随机cosplay", icon: Filter3Icon },
    component: () => import("@/pages/cosplay/index.vue"),
  },
  {
    path: "/girlWrap",
    name: "girlWrap",
    meta: { title: "被girl包围了", icon: Filter3Icon },
    component: () => import("@/pages/girlWrap/index.vue"),
  },
  {
    path: "/home1",
    name: "home1",
    meta: { title: "更多内容", icon: FillColor1Icon },
    component: () => import("@/pages/home1/index.vue"),
  },
];
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/createImg",
    children: [...menuRoutes],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/update",
    name: "update",
    component: () => import("@/pages/update/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
