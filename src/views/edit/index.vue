<template>
  <div class="edit" :style="{ height: edit_height.toFixed(3) + 'rem' }">
    <return-btn @onClickReturn="onClickReturn" />
    <div v-if="custom_info.customize_type == 5">
      <img
        v-if="ismirror"
        class="mirror"
        src="~assets/img/icon/ismirror.png"
        @click="onMirror"
      />
      <img
        v-else
        class="mirror"
        src="~assets/img/icon/mirror.png"
        @click="onMirror"
      />
    </div>
    <img
      class="save"
      src="~assets/img/customize/save_btn.png"
      @click="onSaveEdit"
    />
    <!-- <div class="pillow_front_back" v-if="custom_info.customize_type == 2">
      <div :class="[isfront && 'pillow_front']" @click="onPillowFront">
        正面
      </div>
      <div :class="[isback && 'pillow_back']" @click="onPillowBack">
        反面
      </div>
    </div> -->
    <!-- 定制手机壳 -->
    <phone-case
      v-if="custom_info.customize_type == 1"
      :custom_info="custom_info"
      :uploaded_picture="uploaded_picture"
    />
    <!-- 定制抱枕 -->
    <pillow
      v-else-if="custom_info.customize_type == 2"
      :custom_info="custom_info"
      :uploaded_picture="uploaded_picture"
    />
    <!-- 定制挎包 -->
    <shoulder-bag
      v-else-if="custom_info.customize_type == 3"
      :custom_info="custom_info"
      :uploaded_picture="uploaded_picture"
    />
    <cup
      v-else-if="custom_info.customize_type == 4"
      :custom_info="custom_info"
      :uploaded_picture="uploaded_picture"
    />
    <!-- 定制文具盒 -->
    <stationery-box
      v-else-if="custom_info.customize_type == 5"
      :custom_info="custom_info"
      :uploaded_picture="uploaded_picture"
      :ismirror="ismirror"
    />
    <img v-show="ismaking" class="making" src="~assets/img/making.gif" />
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import AlloyFinger from "alloyfinger";
import PhoneCase from "./editProducts/phoneCase";
import Pillow from "./editProducts/pillow";
import ShoulderBag from "./editProducts/shoulderBag";
import cup from "./editProducts/cup";
import StationeryBox from "./editProducts/stationeryBox";
import Transform from "common/transform";
import { compress, transformProcess } from "common/utils";
import { ReturnBtn } from "components/index";
import { ImagesUpload } from "network/home";
import { ShareInfo } from "network/share";
export default {
  data() {
    return {
      edit_height: 0,
      custom_info: null, // 定制信息
      isfront: true, // 正面
      isback: false, // 反面
      ismaking: false, // 制作动画
      flags: false, // 是否开启拖到图片
      ismirror: false, // 是否开启镜像
      uploaded_picture: "", // 推动图片
      clearget_timer: null, // 清除定时器
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: ""
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/shareList");
    },
    // 抱枕正反面
    onPillowFront() {
      this.isfront = !this.isfront;
      this.isback = !this.isback;
    },
    onPillowBack() {
      this.isfront = !this.isfront;
      this.isback = !this.isback;
    },
    // 文具盒镜像
    onMirror() {
      this.ismirror = !this.ismirror;
      if (this.ismirror) {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "镜像制作中..."
        });
        setTimeout(() => this.$toast.clear(), 1000);
      }
    },
    // 保存编辑
    onSaveEdit() {
      this.ismaking = !this.ismaking;
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
    _ShareInfo() {
      ShareInfo(this.$store.state.sid).then(
        res =>
          (this.uploaded_picture =
            this.$store.state.interface_domain + res.info.thumb)
      );
    },
    _ImagesUpload(dataURL) {
      compress(dataURL, base64 => {
        ImagesUpload({ file: base64, type: "share" }).then(res => {
          let { id, gid, name, isextend } = this.custom_info;
          this.$store.commit("shareGoods", {
            gid: isextend ? gid : id,
            cid: isextend ? id : "",
            cname: isextend ? name : "",
            thumb: res.file_path
          });
          this.$router.push("/shareList");
          this.ismaking = !this.ismaking;
        });
      });
    }
  },
  watch: {
    uploaded_picture: function() {
      this.$nextTick(function() {
        var that = this;
        // 对上传的图片进行手势操作
        var imageWrapper = document.getElementById("imageWrapper");
        var pinchRotateImg = document.getElementById("operatingImg");
        // var pinchRotateImg1 = document.getElementById("operatingImg1");
        Transform(pinchRotateImg);
        // if (pinchRotateImg1) Transform(pinchRotateImg1);
        new AlloyFinger(imageWrapper, {
          rotate: function(evt) {
            pinchRotateImg.rotateZ += evt.angle;
          },
          multipointStart: function() {
            that.initScale = pinchRotateImg.scaleX;
          },
          pinch: function(evt) {
            pinchRotateImg.scaleX = pinchRotateImg.scaleY =
              that.initScale * evt.zoom;
          },
          pressMove: function(evt) {
            pinchRotateImg.translateX += evt.deltaX;
            pinchRotateImg.translateY += evt.deltaY;
            evt.preventDefault();
          }
        });
      });
    },
    ismirror: function() {
      var that = this;
      if (this.uploaded_picture) {
        this.$nextTick(function() {
          // 对上传的图片进行手势操作
          var imageWrapper = document.getElementById("imageWrapper");
          var pinchRotateImg = document.getElementById("operatingImg");
          var pinchRotateImg1 = document.getElementById("operatingImg1");
          Transform(pinchRotateImg);
          if (this.ismirror && pinchRotateImg1) {
            pinchRotateImg1.style.transform = transformProcess(pinchRotateImg);
          }
          new AlloyFinger(imageWrapper, {
            rotate: function(evt) {
              if (!that.ismirror) pinchRotateImg.rotateZ += evt.angle;
            },
            multipointStart: function() {
              that.initScale = pinchRotateImg.scaleX;
              if (that.ismirror && pinchRotateImg1) {
                pinchRotateImg1.style.transform = transformProcess(
                  pinchRotateImg
                );
              }
            },
            pinch: function(evt) {
              pinchRotateImg.scaleX = pinchRotateImg.scaleY =
                that.initScale * evt.zoom;
              if (that.ismirror) {
                pinchRotateImg1.style.transform = transformProcess(
                  pinchRotateImg
                );
              }
            },
            pressMove: function(evt) {
              pinchRotateImg.translateX += evt.deltaX;
              pinchRotateImg.translateY += evt.deltaY;
              if (that.ismirror && pinchRotateImg1) {
                pinchRotateImg1.style.transform = transformProcess(
                  pinchRotateImg
                );
              }
              evt.preventDefault();
            }
          });
        });
      }
    }
  },
  created() {
    this._ShareInfo();
    if (this.$store.state.custom_info && this.$store.state.custom_info.id) {
      this.custom_info = { ...this.$store.state.custom_info };
      document.title = "编辑" + this.custom_info.title;
    } else this.$router.push("/shareList");
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
    const windowHeight = window.outerHeight
      ? window.outerHeight * window.dpr
      : window.innerHeight;
    this.edit_height = windowHeight / window.rem;
  },
  beforeDestroy() {
    clearInterval(this.clearget_timer);
    this.clearget_timer = null;
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
  },
  components: {
    ReturnBtn,
    PhoneCase, // 手机壳
    Pillow, // 抱枕
    cup, // 杯子
    ShoulderBag, // 挎包
    StationeryBox // 文具盒
  }
};
</script>

<style lang="less">
.edit {
  .van-nav-bar {
    .van-nav-bar__right {
      bottom: 50%;
      right: 30px;
      transform: translateY(50%);
      font-size: 30px;
      font-weight: 700;
      width: 60px;
      height: 60px;
      line-height: 60px;
      .van-nav-bar__text {
        padding: 0;
        color: #ff7301;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.edit {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pillow_front_back {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 80px;
    border-radius: 40px;
    border: solid 2px #ff7024;
    font-size: 36px;
    color: #ff7024;
    line-height: 80px;
    text-align: center;
    div {
      float: left;
      width: 50%;
      height: 100%;
      &.pillow_front {
        border-radius: 40px 0 0 40px;
        color: #ffffff;
        background-color: #ff7024;
      }
      &.pillow_back {
        border-radius: 0 40px 40px 0;
        color: #ffffff;
        background-color: #ff7024;
      }
    }
  }
  .edit_group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 600px;
    img {
      display: inline-block;
      width: auto;
      height: 600px;
    }
  }
  .mirror {
    position: fixed;
    right: 0;
    bottom: 500px;
    width: 150px;
    height: 150px;
    z-index: 3;
  }
  .save {
    position: fixed;
    right: 0;
    bottom: 300px;
    width: 150px;
    height: 150px;
    z-index: 3;
  }
  .making {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 400px;
    z-index: 100;
  }
}
</style>
