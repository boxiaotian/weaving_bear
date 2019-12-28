<template>
  <!-- 抱枕 -->
  <div class="pillow_group" id="imageWrapper">
    <img
      class="model_img"
      :src="$store.state.interface_domain + custom_info.thumb"
    />
    <div class="pillow_mask" />
    <div>
      <img
        id="operatingImg"
        v-if="uploaded_picture"
        :src="$store.state.interface_domain + uploaded_picture"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["custom_info", "uploaded_picture"]
};
</script>

<style lang="less" scoped>
.pillow_group {
  position: relative;
  width: 650px;
  height: 650px;
  background-repeat: no-repeat;
  background-size: cover;
  .model_img {
    width: 100%;
    height: 100%;
  }
  div {
    position: absolute;
    top: 1px;
    left: 0;
    width: 650px;
    height: 650px;
    overflow: hidden;
    z-index: 1;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
    }
  }
  .pillow_mask {
    background: url("~assets/img/customize/pillow_mask.png") no-repeat;
    background-size: cover;
    z-index: 2;
  }
}
</style>
