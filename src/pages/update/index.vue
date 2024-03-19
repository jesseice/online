<template>
  <div class="update">
    <div class="update_drag_title">
      <div style="display: flex; align-items: center; gap: 10px">
        <img src="/logo.svg" style="width: 40px; height: 40px" />
        <h3>Online flower update</h3>
      </div>
      <t-space :size="0">
        <a class="close_btn" @click="minus"> <MinusIcon /> </a>
        <a class="close_btn" @click="close"> <CloseIcon /> </a>
      </t-space>
    </div>
    <div class="update_content">
      <div><t-progress theme="plump" :percentage="state.percent" /></div>
      <div class="background"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MinusIcon, CloseIcon } from "tdesign-icons-vue-next";
import { reactive } from "vue";

const state = reactive({
  percent: 0,
});
const callBack = (_: any, params: { percent: number }) => {
  state.percent = params.percent;
};
window.ipcRenderer.off("update-percent", callBack);
window.ipcRenderer.on("update-percent", callBack);

const close = () => {
  window.ipcRenderer.send("update_closed");
};
const minus = () => {
  window.ipcRenderer.send("update_minus");
};
</script>
<style lang="less" scoped>
.update {
  position: relative;
  background-color: #f2f2f2;
  .update_drag_title {
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    -webkit-app-region: drag;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .close_btn {
      -webkit-app-region: no-drag;
      display: block;
      cursor: pointer;
      font-size: 20px;
      line-height: 20px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      color: black;
      &:hover {
        background: #f2f2f2;
        color: blue;
      }
    }
  }
  .update_content {
    width: 350px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    box-sizing: border-box;
    margin: 0 auto;
    .background {
      margin-top: 10px;
      background-color: #f2f2f2;
      width: 100%;
      height: 100%;
      background-image: url("@/assets/update.gif");
      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: cover;
    }
  }
}
</style>
