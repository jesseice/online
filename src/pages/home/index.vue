<template>
  <div>
    <t-button @click="openLogin">登录页</t-button>
  </div>
</template>
<script setup lang="ts">
const openLogin = () => {
  window.ipcRenderer.invoke("open_login_win", location.origin + "/#login");
};
</script>
