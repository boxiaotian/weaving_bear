<template>
  <div class="share">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="share_group" id="imageWrapper">
      <div class="share_top_group">
        <div class="share_works">
          <div>
            <img :src="$store.state.interface_domain + share_info.thumb" />
          </div>
        </div>
        <div>{{ share_info.name }}的作品</div>
      </div>
      <div class="share_center_group">
        <div v-for="item in share_info.goods" :key="item.id">
          <img :src="$store.state.interface_domain + item.thumb" />
        </div>
      </div>
      <div class="share_bottom_group">
        <div>{{ share_info.descri }}</div>
        <div v-if="share_info.descri1">{{ share_info.descri1 }}</div>
      </div>
      <div class="school_qrcode_group">
        <div class="school">
          <img
            v-if="share_info.logo"
            :src="$store.state.interface_domain + share_info.logo"
          />
          <span v-else>{{ share_info.title }}</span>
        </div>
        <div class="qrcode">
          <img :src="$store.state.interface_domain + share_info.qrcode" />
          <span>支持我，帮助Ta</span>
        </div>
      </div>
    </div>
    <van-button
      class="share_now"
      type="primary"
      text="立即分享"
      color="#ffd0d6"
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
      share_info: {
        pinfo: {}
      },
      show_certificate: false,
      share_img: ""
    };
  },
  methods: {
    onClickReturn() {
      this.$router.push("/iShare");
    },
    onShareNow() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "正在生成分享图"
      });
      if (this.share_img) {
        this.$toast.clear();
        this.show_certificate = true;
      } else {
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
          this.$toast.clear();
          this._ImagesUpload(dataURL);
        });
      }
    },
    // 网络请求
    _ShareInfo() {
      ShareInfo(this.$route.query.id).then(res => {
        if (res.info.descri.indexOf("积小流") != -1) {
          if (Object.keys(res.info.pinfo).length) {
            let descri_array = res.info.descri.split("。");
            this.share_info = {
              ...res.info,
              descri: `${descri_array[0]}。${descri_array[1]}。`,
              descri1: `${descri_array[2]}。${descri_array[3]}。`
            };
          } else {
            let descri_array = res.info.descri.split("。");
            this.share_info = {
              ...res.info,
              descri: `${descri_array[0]}。${descri_array[1]}。${
                descri_array[2]
              }。`,
              descri1: `${descri_array[3]}。${descri_array[4]}。`
            };
          }
        } else this.share_info = res.info;
      });
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
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 1230px;
    margin-bottom: 70px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    .share_top_group {
      width: 100%;
      height: 610px;
      padding: 35px 0;
      background: #ffd0d6;
      font-size: 30px;
      color: #a3898c;
      text-align: center;
      .share_works {
        width: 490px;
        height: 490px;
        padding: 72px;
        margin: 0 auto 20px;
        background: url("~assets/img/share/share_bg.png") no-repeat;
        background-size: cover;
        background-color: #ffffff;
        div {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: auto;
            max-height: 100%;
          }
        }
      }
    }
    .share_center_group {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 124px;
      margin: 22px 0;
      div {
        width: 124px;
        height: 124px;
        padding: 20px;
        margin-left: 12px;
        background-color: #eeeeee;
        border-radius: 18px;
        img {
          display: block;
          width: auto;
          height: 100%;
          margin: auto;
        }
      }
    }
    .share_bottom_group {
      padding: 0 50px;
      font-size: 24px;
      color: #977a7e;
      div {
        margin-top: 50px;
      }
      img {
        min-width: 162px;
        height: 162px;
        margin: 0 30px;
      }
    }
    .school_qrcode_group {
      display: flex;
      flex-direction: column;
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 50px 0 20px;
      .school {
        img {
          width: auto;
          height: 100px;
        }
        span {
          display: inline-block;
          padding: 10px;
          background-color: #a3898c;
          font-size: 36px;
          color: #ffffff;
        }
      }
      .qrcode {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #907074;
        font-size: 20px;
        text-align: center;
        img {
          width: 150px;
          height: 150px;
        }
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
