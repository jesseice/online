<template>
  <div class="layout_aside">
    <div class="logo_wrap">
      <img src="/logo.svg" style="height: 40px; width: 40px" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.layout_aside {
  height: 100%;
  user-select: none;
  background-color: #2e2e2e;
  .logo_wrap {
    -webkit-app-region: drag;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
