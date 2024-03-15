<template>
  <div class="imageSeach">
    <Search @search="search" />
    <div class="image_content">
      
    </div>
  </div>
</template>
<script setup lang="ts">
import Search from "./search.vue";

const search = (str: string) => {
  console.log("[str] ---> ", str);
  window.ipcRenderer.invoke('text_to_image', '21312')
};

const data = Array(20).fill(0).map((_, index) => ({ id: index, imageUrl: index }))
</script>
<style lang="less" scoped>
.imageSeach {
  .image_content {
    min-height: 500px;
    background-color: aqua;
  }
}
</style>
