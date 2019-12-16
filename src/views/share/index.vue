<template>
  <div class="share">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="share_group" id="imageWrapper">
      <h6>{{ share_info.title }}</h6>
      <img
        class="share_drawing"
        :src="$store.state.interface_domain + share_info.thumb"
      />
      <div class="works_group">
        <div v-for="item in share_info.goods" :key="item.id">
          <img :src="$store.state.interface_domain + item.thumb" />
        </div>
      </div>
      <div class="maker_info">
        <div>
          <h6>{{ share_info.name }}</h6>
          <div>
            <p v-if="share_info.pinfo && share_info.pinfo.length">
              我正在参与{{ share_info.pinfo.name }}公益
            </p>
            <p>{{ share_info.descri }}</p>
          </div>
        </div>
        <img :src="$store.state.interface_domain + share_info.qrcode" />
      </div>
    </div>
    <van-button
      class="share_now"
      type="primary"
      text="立即分享"
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
import { ShareInfo } from "network/share";
export default {
  data() {
    return {
      share_info: {},
      show_certificate: false,
      share_img: ""
    };
  },
  methods: {
    onClickReturn() {
      this.$router.push("/iShare");
    },
    onShareNow() {
      if (this.share_img) this.show_certificate = true;
      else {
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
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
      }
    },
    // 网络请求
    _ShareInfo() {
      ShareInfo(this.$route.query.id).then(res => (this.share_info = res.info));
    },
    _ImagesUpload(dataURL) {
      compress(dataURL, 1.5, base64 => {
        ImagesUpload({ file: base64, type: "share" }).then(res => {
          this.share_img = res.file_url;
          this.show_certificate = !this.show_certificate;
        });
      });
    }
  },
  created() {
    this._ShareInfo();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.share {
  padding: 60px 30px;
  .share_group {
    width: 100%;
    min-height: 914px;
    padding: 62px 50px 80px;
    margin-bottom: 70px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 50px;
    h6 {
      font-size: 36px;
      line-height: 44px;
      font-weight: 700;
    }
    .share_drawing {
      display: block;
      max-width: 100%;
      height: auto;
      margin: 68px auto 0;
    }
    .works_group {
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      div {
        width: 270px;
        height: 200px;
        padding: 30px 0;
        margin-top: 46px;
        background-color: #e6e6e6;
        img {
          display: block;
          width: auto;
          height: 140px;
          margin: auto;
        }
      }
    }
    .maker_info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 68px;
      div {
        font-size: 24px;
        line-height: 32px;
        h6 {
          margin-bottom: 50px;
          font-size: 30px;
          font-weight: 700;
        }
      }
      img {
        width: 162px;
        height: 162px;
      }
    }
  }
  .share_now {
    display: block;
    width: 500px;
    height: 100px;
    margin: 0 auto;
    font-size: 36px;
    font-weight: 700;
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
