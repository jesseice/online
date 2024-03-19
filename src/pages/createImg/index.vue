<template>
  <div class="input_wrap">
    <t-form :data="formData" colon @submit="handleSubmit" :label-width="0">
      <t-form-item name="msg">
        <t-input v-model="formData.msg" placeholder="绘画内容" />
      </t-form-item>
      <t-form-item name="img">
        <t-input v-model="formData.img" placeholder="图片地址" />
      </t-form-item>
      <t-form-item name="mode">
        <t-space>
          <t-select
            v-model="formData.mode"
            :options="modeOptions"
            placeholder="模型"
          />
          <t-button type="submit" :loading="loading" style="width: 120px">
            开始绘画
          </t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </div>
  <t-image-viewer :images="[src]" v-if="src">
    <template #trigger="{ open }">
      <div class="img_wrap">
        <img :src="src" class="img_item" />
        <div class="img_mask" @click="open">
          <span><BrowseIcon size="1.4em" /> 预览</span>
        </div>
      </div>
    </template>
  </t-image-viewer>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
const modeOptions = [
  { label: "动漫", value: "动漫" },
  { label: "写实", value: "写实" },
];
const src = ref("");
const loading = ref(false);
const formData = reactive(
  // {
  //   msg: "花朵",
  //   img: "https://seopic.699pic.com/photo/10028/5740.jpg_wh1200.jpg",
  //   mode: "动漫",
  // }
  {
    msg: "可爱的萝莉",
    img: "https://gchat.qpic.cn/gchatpic_new/0/0-0-705F3B27B378074BFAFD41471B252050/0",
    mode: "写实",
  }
);
const handleSubmit = async () => {
  const { msg, img, mode } = formData;
  console.log("[formData] ---> ", formData);
  loading.value = true;
  const url = img
    ? `https://api.lolimi.cn/API/AI/isd.php?msg=${msg}&img=${img}&mode=${mode}`
    : `https://api.lolimi.cn/API/AI/sd.php?msg=${msg}&mode=${mode}`;
  const res = await fetch(url);
  const response = await res.blob();
  loading.value = false;
  src.value = URL.createObjectURL(response);
};
</script>
<style lang="less" scoped>
.input_wrap {
  width: 330px;
  margin: 30px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: 0.3s;
}

.img_wrap {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto;
  width: 330px;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  position: relative;
  .img_item {
    width: 100%;
    height: 100%;
  }
  .img_mask {
    display: none;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover {
    .img_mask {
      display: flex !important;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
