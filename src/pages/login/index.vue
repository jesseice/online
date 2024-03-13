<template>
  <div class="login">
    <div class="login_drag_title">
      <div style="display: flex; align-items: center; gap: 10px">
        <img src="/logo.svg" style="width: 40px; height: 40px" />
        <h3>Online flower</h3>
      </div>
      <t-space :size="0">
        <a class="close_btn" @click="minus"> <MinusIcon /> </a>
        <a class="close_btn" @click="close"> <CloseIcon /> </a>
      </t-space>
    </div>
    <div class="login_content">
      <h3>账号登录</h3>
      <t-form
        :data="formData"
        :label-width="0"
        style="width: 80%"
        @submit="onSubmit"
      >
        <t-form-item name="account">
          <t-input
            v-model="formData.account"
            clearable
            placeholder="请输入账户名"
            size="large"
          >
            <template #prefix-icon>
              <desktop-icon />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item name="password">
          <t-input
            v-model="formData.password"
            type="password"
            clearable
            placeholder="请输入密码"
            size="large"
          >
            <template #prefix-icon>
              <lock-on-icon />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item>
          <t-button theme="primary" type="submit" block size="large">
            登录
          </t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MinusIcon, CloseIcon } from "tdesign-icons-vue-next";
import { MessagePlugin } from "tdesign-vue-next";
import { reactive } from "vue";

const close = () => {
  window.ipcRenderer.send("login_closed");
};
const minus = () => {
  window.ipcRenderer.send("login_minus");
};

const formData = reactive({
  account: undefined,
  password: undefined,
});

const onSubmit = () => {
  const { account, password } = formData;
  if (!account) return MessagePlugin.error("请输入账号");
  if (!password) return MessagePlugin.error("请输入密码");
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
  .login_drag_title {
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
  .login_content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    align-items: center;
    box-sizing: border-box;
  }
}
</style>
