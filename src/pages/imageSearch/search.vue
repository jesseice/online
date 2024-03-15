<template>
  <div class="search">
    <div class="search_wrap">
      <t-input size="large" placeholder="搜索" v-model="searchText" />
      <t-button shape="circle" @click="emits('search', searchText)">
        <SearchIcon />
      </t-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SearchIcon } from "tdesign-icons-vue-next";
const emits = defineEmits(["search"]);
const searchText = defineModel({
  type: String,
});
</script>
<style lang="less" scoped>
.search {
  padding: 20px 0;
  .search_wrap {
    margin: 0 auto;
    padding: 2px 15px;
    width: 500px;
    background-color: #fff;
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    :deep(.t-input) {
      border: none;
    }
    :deep(.t-input--focused) {
      box-shadow: none;
    }
  }
}
</style>
