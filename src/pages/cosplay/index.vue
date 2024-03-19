<template>
  <t-card>
    <div>
      随机图，不喜欢？<t-button
        variant="text"
        theme="primary"
        :loading="state.loading"
        @click="changeImage"
      >
        换一张
      </t-button>
    </div>
    <div>
      <ImagePreviewGroup>
        <Image
          :width="300"
          v-for="item in state.imageList"
          :key="item"
          :src="item"
        />
      </ImagePreviewGroup>
    </div>
  </t-card>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { ImagePreviewGroup, Image } from "ant-design-vue";
const state = reactive({
  title: undefined,
  imageList: [],
  loading: false,
});
const queryImageList = async () => {
  const res = await fetch("https://api.lolimi.cn/API/cosplay/api.php");
  const response = await res.json();
  if (response.code === "1") {
    state.title = response.data.title;
    state.imageList = response.data.data;
  }
};
onBeforeMount(() => queryImageList());

const changeImage = async () => {
  state.loading = true;
  await queryImageList();
  state.loading = false;
};
</script>
