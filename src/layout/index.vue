<template>
  <t-layout>
    <t-aside width="54px">
      <AsideLayout />
    </t-aside>
    <t-layout>
      <t-header height="40px">
        <HeaderLayout />
      </t-header>
      <t-content class="layout_content">
        <router-view></router-view>
      </t-content>
    </t-layout>
  </t-layout>
</template>
<script setup lang="ts">
import HeaderLayout from "./header.vue";
import AsideLayout from "./aside.vue";
</script>
<style scoped>
.layout_content {
  height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 5px 0 0 5px;
  box-sizing: border-box;
}
</style>
