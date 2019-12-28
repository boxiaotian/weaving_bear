<template>
  <!-- 手机壳 -->
  <div class="phone_case_group" id="imageWrapper" :style="phoneCaseModel">
    <img
      class="camera"
      :src="$store.state.interface_domain + custom_info.camera_thumb"
      :style="cameraModel"
    />
    <img
      class="fingerprint"
      :src="$store.state.interface_domain + custom_info.fingerprint_thumb"
      :style="fingerprintModel"
    />
    <img v-if="uploaded_picture" id="operatingImg" :src="uploaded_picture" />
  </div>
</template>

<script>
export default {
  props: ["custom_info", "uploaded_picture"],
  computed: {
    phoneCaseModel: function() {
      let width = (this.custom_info.width / 2 / 54).toFixed(3);
      let height = (this.custom_info.height / 2 / 54).toFixed(3);
      return `width:${width}rem;height:${height}rem`;
    },
    cameraModel: function() {
      let width = (this.custom_info.camera_width / 2 / 54).toFixed(3);
      let height = (this.custom_info.camera_height / 2 / 54).toFixed(3);
      let top = (this.custom_info.camera_top / 2 / 54).toFixed(3);
      let left = (this.custom_info.camera_left / 2 / 54).toFixed(3);
      return `width:${width}rem;height:${height}rem;top:${top}rem;left:${left}rem`;
    },
    fingerprintModel: function() {
      let width = (this.custom_info.fingerprint_width / 2 / 54).toFixed(3);
      let height = (this.custom_info.fingerprint_height / 2 / 54).toFixed(3);
      let top = (this.custom_info.fingerprint_top / 2 / 54).toFixed(3);
      let left = (this.custom_info.fingerprint_left / 2 / 54).toFixed(3);
      return `width:${width}rem;height:${height}rem;top:${top}rem;left:${left}rem`;
    }
  }
};
</script>

<style lang="less" scoped>
.phone_case_group {
  position: relative;
  width: 316.5px;
  height: 652px;
  background-color: #000000;
  border-radius: 30px;
  overflow: hidden;
  .camera {
    position: absolute;
    top: 77px;
    left: 110.5px;
    width: 96px;
    height: 92px;
    z-index: 1;
  }
  .fingerprint {
    position: absolute;
    top: 177.5px;
    left: 133px;
    width: 51px;
    height: 51px;
    z-index: 1;
  }
  #operatingImg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    /* z-index: 9; */
  }
}
</style>
