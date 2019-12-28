<template>
  <div class="stationery_box_group" id="imageWrapper">
    <img
      class="model_img"
      :src="$store.state.interface_domain + custom_info.thumb"
    />
    <div class="stationery_box_mask" />
    <div v-if="ismirror" class="mirror">
      <img
        id="operatingImg"
        v-if="uploaded_picture"
        :src="$store.state.interface_domain + uploaded_picture"
      />
    </div>
    <div v-if="ismirror" class="mirror1" id="container">
      <img
        id="operatingImg1"
        v-if="uploaded_picture"
        :src="$store.state.interface_domain + uploaded_picture"
      />
    </div>
    <div v-if="!ismirror">
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
  props: ["custom_info", "uploaded_picture", "ismirror"]
};
</script>

<style lang="less" scoped>
.stationery_box_group {
  position: relative;
  width: 42.59%;
  height: 95%;
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
    height: 100%;
    overflow: hidden;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
    }
  }
  .mirror {
    top: 0;
    width: 100%;
    height: 50%;
  }
  .mirror1 {
    width: 100%;
    height: 50%;
    img {
      top: auto;
      bottom: 0;
      transform: scale(1, -1);
    }
  }
  .stationery_box_mask {
    background: url("~assets/img/customize/stationery_box_mask.png") no-repeat;
    background-size: cover;
    z-index: 2;
  }
}
</style>
