<template>
  <!-- 挎包 -->
  <div class="shoulder_bag_group" id="imageWrapper">
    <div class="shoulder_bag_mask" />
    <img
      class="model_img"
      :src="$store.state.interface_domain + custom_info.thumb"
    />
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
.shoulder_bag_group {
  position: relative;
  width: 80%;
  height: 70.54%;
  background-repeat: no-repeat;
  background-size: cover;
  .model_img {
    width: 100%;
    height: 100%;
  }
  div {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 68.6%;
    overflow: hidden;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
    }
  }
  .shoulder_bag_mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("~assets/img/customize/satchel_mask.png") no-repeat;
    background-size: cover;
    z-index: 2;
  }
}
</style>
