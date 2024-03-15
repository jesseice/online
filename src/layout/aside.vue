<template>
  <div class="layout_aside">
    <div class="logo_wrap">
      <img src="/logo.svg" style="height: 40px; width: 40px" />
    </div>
    <div class="menu_wrap">
      <div
        :class="{ menu_item: true, active: item.path === curPath }"
        v-for="item in menuRoutes"
        :key="item.path"
        @click="$router.push(item.path)"
      >
        <t-tooltip :content="item.meta?.title" placement="bottom">
          <component :is="item.meta?.icon" />
        </t-tooltip>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { menuRoutes } from "@/route/index";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const getActive = (): string => {
  if (!route.path) return "";
  return route.path
    .split("/")
    .filter((_item: string, index: number) => index > 0)
    .map((item: any) => `/${item}`)
    .join("");
};

const curPath = computed(() => getActive());
</script>
<style lang="less" scoped>
.layout_aside {
  height: 100%;
  user-select: none;
  background-color: #2e2e2e;
  display: flex;
  flex-direction: column;
  .logo_wrap {
    -webkit-app-region: drag;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu_wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .menu_item {
      color: #b4b4b4;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      cursor: pointer;
      font-size: 18px;
      &:hover {
        color: #fff;
      }
    }
    .active {
      color: green !important;
    }
  }
}
</style>
