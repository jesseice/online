<template>
  <div class="header">
    <h3>{{ AppTitle }}</h3>
    <t-space :size="0">
      <a class="close_btn" @click="minus"> <MinusIcon /> </a>
      <a class="close_btn" style="font-size: 14px" @click="max">
        <RectangleIcon />
      </a>
      <a class="close_btn" @click="close"> <CloseIcon /> </a>
    </t-space>
  </div>
</template>
<script setup lang="ts">
import { AppTitle } from "@/utils/global";
import { MinusIcon, CloseIcon, RectangleIcon } from "tdesign-icons-vue-next";

const minus = () => window.ipcRenderer.send("min");
const max = () => window.ipcRenderer.send("max");
const close = () => window.ipcRenderer.send("close");
</script>
<style lang="less" scoped>
.header {
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  h3 {
    margin: 0;
    padding-left: 10px;
  }
  .close_btn {
    -webkit-app-region: no-drag;
    display: block;
    cursor: pointer;
    line-height: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: black;
    &:hover {
      background: #f2f2f2;
      color: blue;
    }
  }
}
</style>
