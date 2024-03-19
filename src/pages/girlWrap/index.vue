<template>
  <!-- https://api.lolimi.cn/API/AI/mnbw.php?msg=%E5%A7%90%E5%A7%90%E6%88%91%E6%9D%A5%E4%BA%86&name=%E6%A1%91%E5%B8%9B -->
  <div class="girlWrap">
    <div class="chatWrap"></div>
    <div class="sendWrap">打字</div>
  </div>
</template>
<style lang="less" scoped>
.girlWrap {
  position: relative;
  padding: 10px;
  .chatWrap {
    height: calc(100vh - 80px - 80px - 20px);
    padding-bottom: 100px;
    background: green;
    overflow-y: auto;
  }
  .sendWrap {
    width: calc(100% - 20px);
    height: 80px;
    box-sizing: border-box;
    position: absolute;
    left: 10px;
    bottom: 0;
    background: red;
  }
}
</style>
