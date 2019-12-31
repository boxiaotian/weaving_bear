<template>
  <div class="customize">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="customize_group">
      <div
        class="customize_commodity"
        :style="{ minHeight: customize_height.toFixed(3) + 'rem' }"
      >
        <div
          class="commodity_img"
          :style="{ minHeight: customize_info_height.toFixed(3) + 'rem' }"
        >
          <!-- <div class="pillow_front_back" v-if="custom_info.isdoble">
            <div :class="[isfront && 'pillow_front']" @click="onPillowFront">
              正面
            </div>
            <div :class="[isback && 'pillow_back']" @click="onPillowBack">
              反面
            </div>
          </div> -->
          <phone-case
            v-if="custom_info.customize_type == 1"
            :custom_info="custom_info"
            :uploaded_picture="uploaded_picture"
          />
          <pillow
            v-else-if="custom_info.customize_type == 2"
            :custom_info="custom_info"
            :uploaded_picture="uploaded_picture"
          />
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
          <stationery-box
            v-else-if="custom_info.customize_type == 5"
            :custom_info="custom_info"
            :uploaded_picture="uploaded_picture"
            :ismirror="ismirror"
          />
        </div>
        <div class="customize_info" ref="customize_info">
          <div v-if="custom_info.customize_type == 1">
            <img src="~assets/img/icon/phone.png" />
            <router-link to="/model" tag="span">换机型</router-link>
            > {{ custom_info.title }}
          </div>
          <div v-else>
            <img
              src="~assets/img/icon/pillow.png"
              v-if="custom_info.customize_type == 2"
            />
            <img
              src="~assets/img/icon/satchel.png"
              v-if="custom_info.customize_type == 3"
            />
            <img
              src="~assets/img/icon/cup.png"
              v-if="custom_info.customize_type == 4"
            />
            <img
              src="~assets/img/icon/stationery_box.png"
              v-if="custom_info.customize_type == 5"
            />
            {{ custom_info.title }}
          </div>
          <div class="customize_next" @click="onNextStep">下一步</div>
          <van-checkbox
            v-if="custom_info.customize_type == 5"
            v-model="ismirror"
            checked-color="#ffffff"
            @change="onMirror"
            >制作镜像</van-checkbox
          >
        </div>
      </div>
      <div class="upload_img" ref="upload_img">
        <div class="img_uploader">
          <van-button
            type="primary"
            text="上传图片"
            capture="camera"
            color="#ffa868"
            round
          />
          <input class="input_uploader" @change="onUploaderImg" type="file" />
        </div>
        <div>*请注意所上传图片的清晰度和尺寸大小，以免实物制作效果不佳</div>
      </div>
    </div>
    <img v-show="ismaking" class="making" src="~assets/img/making.gif" />
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import AlloyFinger from "alloyfinger";
import PhoneCase from "./customProducts/phoneCase";
import Pillow from "./customProducts/pillow";
import ShoulderBag from "./customProducts/shoulderBag";
import cup from "./customProducts/cup";
import StationeryBox from "./customProducts/stationeryBox";
import Transform from "common/transform";
import { compress, transformProcess } from "common/utils";
import { ReturnBtn } from "components/index";
import { SubmitInfo } from "network/customize";
import { ImagesUpload } from "network/home";
export default {
  data() {
    return {
      customize_height: 0, // 商品内容高度
      customize_info_height: 0, // 商品图片内容高度
      custom_info: null, // 定制信息
      isfront: true, // 正面
      isback: false, // 反面
      ismaking: false, // 制作动画
      flags: false, // 是否开启拖到图片
      ismirror: false, // 是否开启镜像
      clearget_timer: null, // 清除定时器
      uploaded_picture: "", // 上传的图片
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
      this.$router.replace("/customizeList");
    },
    // 抱枕正面
    onPillowFront() {
      this.isfront = !this.isfront;
      this.isback = !this.isback;
    },
    // 抱枕反面
    onPillowBack() {
      this.isfront = !this.isfront;
      this.isback = !this.isback;
    },
    // 文具盒镜像
    onMirror() {
      if (this.uploaded_picture) {
        if (this.ismirror) {
          this.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: "镜像制作中..."
          });
          setTimeout(() => this.$toast.clear(), 1000);
        }
      } else {
        this.ismirror = false;
        this.$toast.fail({
          forbidClick: true,
          icon: "cross",
          message: "请上传图片"
        });
      }
    },
    // 上传图片
    onUploaderImg(event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        let imgcode = e.target.result;
        if (file.size < 500000) {
          this.$toast("您上传的图片太小，建议您选择其他图片");
        } else if (file.size > 500000 && file.size < 5200000) {
          if (file.size > 1000000) {
            compress(imgcode, base64 => {
              ImagesUpload({
                file: base64,
                type: "custom_old",
                gid: this.custom_info.id
              }).then(res => (this.uploaded_picture = res.file_path));
            });
          } else {
            ImagesUpload({
              file: imgcode,
              type: "custom_old",
              gid: this.custom_info.id
            }).then(res => (this.uploaded_picture = res.file_path));
          }
        } else {
          this.$toast("您上传的图片太大，请在手机上略微裁剪或选择其他图片");
        }
      };
    },
    // 触摸上传图片
    down() {
      let moveDiv = document.getElementById("phone_case");
      if (moveDiv) {
        this.flags = true;
        var touch;
        if (event.touches) touch = event.touches[0];
        else touch = event;
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
      }
    },
    // 移动上传图片
    move() {
      if (this.flags) {
        var touch;
        if (event.touches) touch = event.touches[0];
        else touch = event;
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        let moveDiv = document.getElementById("phone_case");
        let moveDiv1 = document.getElementById("phone_case1");
        if (moveDiv1) {
          moveDiv1.style.left = this.xPum + "px";
          moveDiv1.style.bottom = this.yPum + "px";
        }
        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";
      }
    },
    // 下一步
    onNextStep() {
      if (this.uploaded_picture) {
        this.ismaking = !this.ismaking;
        html2canvas(document.getElementById("imageWrapper"), {
          useCORS: true,
          allowTaint: true,
          taintTest: false,
          backgroundColor: "rgba(0,0,0,0)",
          logging: false
        }).then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          this.clearget_timer = setTimeout(() => {
            this._ImagesUpload(dataURL);
          }, 3000);
        });
      } else {
        this.$toast.fail({
          forbidClick: true,
          icon: "cross",
          message: "请上传图片"
        });
      }
    },
    // 网络请求
    _ImagesUpload(dataURL) {
      // compress(dataURL, base64 => {
      ImagesUpload({
        file: dataURL,
        type: "custom",
        gid: this.custom_info.id
      }).then(res => this._SubmitInfo(res.file_path));
      // });
    },
    _SubmitInfo(thumb) {
      let { id, gid, name, isextend } = this.custom_info;
      let params = {};
      if (isextend)
        params = { thumb, id, gid, name, old_thumb: this.uploaded_picture };
      else params = { thumb, gid: id, old_thumb: this.uploaded_picture };
      SubmitInfo(params).then(res => {
        this.$router.push({ path: "/customizeDetails", query: { id: res.id } });
        this.ismaking = !this.ismaking;
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
    if (this.$store.state.custom_info && this.$store.state.custom_info.id) {
      this.custom_info = { ...this.$store.state.custom_info };
      document.title = this.custom_info.title;
    } else this.$router.push("/customizeList");
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
    const { upload_img, customize_info } = this.$refs;
    const windowHeight = window.outerHeight
      ? window.outerHeight * window.dpr
      : window.innerHeight;
    const uploadHeight = upload_img.offsetHeight;
    const infoHeight = customize_info.offsetHeight;
    this.customize_height = (windowHeight - uploadHeight) / window.rem;
    this.customize_info_height =
      (windowHeight - uploadHeight - infoHeight) / window.rem;
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
.customize {
  .customize_group {
    .van-checkbox {
      position: absolute;
      top: -30px;
      right: 30px;
      min-width: 160px;
      height: 60px;
      background-color: #ff7024;
      border-radius: 30px;
      font-size: 30px;
      .van-checkbox__icon {
        margin-left: 5px;
        margin-bottom: 3px;
        border-radius: 50%;
        border: 1px solid #ff7024;
      }
      .van-checkbox__label {
        margin-left: 5px;
        font-size: 24px;
        color: #ffffff;
      }
    }
    .upload_img {
      .img_uploader {
        .van-button--normal {
          width: 100%;
          height: 100%;
          font-size: 36px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.customize {
  .customize_group {
    .customize_commodity {
      position: relative;
      margin-top: 10px;
      .commodity_img {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .pillow_front_back {
          width: 400px;
          height: 80px;
          margin-bottom: 114px;
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
      }
      .customize_info {
        position: relative;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 140px;
        padding: 40px 30px;
        font-size: 30px;
        line-height: 60px;
        div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        img {
          width: 35px;
          height: 35px;
          margin-right: 20px;
        }
        .customize_next {
          justify-content: center;
          position: absolute;
          top: 50%;
          right: 30px;
          transform: translateY(-50%);
          width: 160px;
          height: 60px;
          background-color: #ff7024;
          border-radius: 30px;
          color: #ffffff;
        }
      }
    }
    .upload_img {
      width: 100%;
      height: 210px;
      padding: 26px 30px;
      background-color: #ffffff;
      color: #999999;
      font-size: 24px;
      .img_uploader {
        position: relative;
        width: 690px;
        height: 90px;
        margin: 18px 0 28px;
        .input_uploader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
        }
      }
    }
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
