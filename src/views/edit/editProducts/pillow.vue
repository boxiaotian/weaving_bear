<template>
  <!-- 抱枕 -->
  <div class="pillow_group" id="imageWrapper">
    <img
      class="model_img"
      :src="$store.state.interface_domain + custom_info.thumb"
    />
    <div class="pillow_mask" />
    <div>
      <img v-if="uploaded_picture" id="operatingImg" :src="uploaded_picture" />
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
    top: 0;
    left: 0;
    width: 650px;
    height: 650px;
    overflow: hidden;
    z-index: 1;
    img {
      position: absolute;
      left: 50px;
      top: 70px;
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
