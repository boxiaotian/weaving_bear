<template>
  <div class="i_want_promotion">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="i_want_promotion_group" id="imageWrapper">
      <div class="i_want_promotion_content">
        <h5>{{ want_info.title }}</h5>
        <img :src="want_info.file_url" />
        <van-button
          type="primary"
          text="扫描加入成为公益大使"
          color="#ff7301"
          round
        />
      </div>
    </div>
    <van-button
      class="share_now"
      type="primary"
      text="分享二维码"
      color="#ff7301"
      @click="onShareNow"
      round
    />
    <van-overlay :show="show_certificate" @click="show_certificate = false">
      <img :src="share_img" />
      <div>长按保存该图片，分享给好友或朋友圈</div>
      <van-icon
        class="certificate_box_close"
        name="close"
        color="#ffffff"
        @click="show_certificate = false"
      />
    </van-overlay>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { compress } from "common/utils";
import { ReturnBtn } from "components/index";
import { ImagesUpload } from "network/home";
import { GetRecommendCode } from "network/profile";
export default {
  data() {
    return {
      want_info: {},
      show_certificate: false,
      share_img: ""
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/promotionCenter");
    },
    onShareNow() {
      if (this.share_img) this.show_certificate = true;
      else
        html2canvas(document.getElementById("imageWrapper"), {
          useCORS: true,
          allowTaint: true,
          taintTest: false,
          backgroundColor: "rgba(0,0,0,0)",
          logging: false
        }).then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          this._ImagesUpload(dataURL);
        });
    },
    // 网络请求
    _GetRecommendCode() {
      GetRecommendCode().then(res => (this.want_info = res));
    },
    _ImagesUpload(dataURL) {
      compress(dataURL, base64 => {
        ImagesUpload({ file: base64, type: "share" }).then(res => {
          this.share_img = res.file_url;
          this.show_certificate = !this.show_certificate;
        });
      });
    }
  },
  created() {
    this._GetRecommendCode();
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.i_want_promotion {
  display: flex;
  flex-direction: column;
  align-items: center;
  .i_want_promotion_group {
    width: 600px;
    height: 960px;
    margin-top: 50px;
    background: url("~assets/img/profile/promotion_img.png") no-repeat;
    background-size: cover;
    .i_want_promotion_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 463px;
      height: 581px;
      margin: 260px auto 0;
      border-radius: 82px;
      font-size: 34px;
      img {
        width: 168px;
        height: 168px;
        margin: 60px;
      }
    }
  }
  .share_now {
    width: 400px;
    height: 100px;
    margin-top: 60px;
  }
  .van-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    img {
      width: auto;
      height: 84%;
    }
    div {
      margin: 30px auto;
      font-size: 24px;
      color: #ffffff;
    }
    .certificate_box_close {
      font-size: 60px;
    }
  }
}
</style>
