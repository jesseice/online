<template>
  <div>
    <!-- <t-button @click="openLogin">登录</t-button> -->
    <p></p>
  </div>
</template>
<script setup lang="ts">
const openLogin = () => {
  window.ipcRenderer.invoke("open_login_win");
};
</script>
