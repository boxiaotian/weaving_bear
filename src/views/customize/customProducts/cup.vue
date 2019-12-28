<template>
  <div class="cup_group" id="imageWrapper">
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
.cup_group {
  position: relative;
  width: 700px;
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
    left: -1px;
    width: 700px;
    height: 650px;
    overflow: hidden;
    z-index: 1;
    img {
      position: absolute;
      top: 50px;
      left: 10px;
      width: auto;
      height: 100%;
    }
  }
  .pillow_mask {
    background: url("~assets/img/customize/cup_mask.png") no-repeat;
    background-size: cover;
    z-index: 2;
  }
}
</style>
