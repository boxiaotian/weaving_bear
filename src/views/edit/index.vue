<template>
  <div class="edit" :style="{ height: edit_height.toFixed(3) + 'rem' }">
    <return-btn @onClickReturn="onClickReturn" />
    <img
      class="save"
      src="~assets/img/customize/save_btn.png"
      @click="onSaveEdit"
    />
    <div class="pillow_front_back" v-if="custom_info.customize_type == 2">
      <div :class="[isfront && 'pillow_front']" @click="onPillowFront">
        正面
      </div>
      <div :class="[isback && 'pillow_back']" @click="onPillowBack">
        反面
      </div>
    </div>
    <!-- 定制手机壳 -->
    <div
      v-if="custom_info.customize_type == 1"
      class="phone_case_group"
      :style="phoneCaseModel"
      :id="'imageWrapper' + custom_info.customize_type"
    >
      <img
        class="camera"
        :style="cameraModel"
        :src="custom_info.camera_thumb"
      />
      <img
        class="fingerprint"
        :style="fingerprintModel"
        :src="custom_info.fingerprint_thumb"
      />
      <img
        v-if="uploaded_picture"
        id="phone_case"
        :src="uploaded_picture"
        @touchstart="down"
        @touchmove="move"
        @touchend="flags == false"
      />
    </div>
    <!-- 定制抱枕 -->
    <div
      class="pillow_group"
      v-else-if="custom_info.customize_type == 2"
      :id="'imageWrapper' + custom_info.customize_type"
    >
      <img class="model_img" :src="custom_info.thumb" />
      <div
        class="pillow_mask"
        @touchstart="down"
        @touchmove="move"
        @touchend="flags == false"
      ></div>
      <div>
        <img v-if="uploaded_picture" id="phone_case" :src="uploaded_picture" />
      </div>
    </div>
    <!-- 定制挎包 -->
    <div
      class="shoulder_bag_group"
      v-else-if="custom_info.customize_type == 3"
      :id="'imageWrapper' + custom_info.customize_type"
    >
      <img class="model_img" :src="custom_info.thumb" />
      <div
        class="shoulder_bag_mask"
        @touchstart="down"
        @touchmove="move"
        @touchend="flags == false"
      ></div>
      <div>
        <img v-if="uploaded_picture" id="phone_case" :src="uploaded_picture" />
      </div>
    </div>
    <!-- <div class="edit_group">
      <img
        v-if="$route.params.type == 'phone'"
        src="~assets/img/customize/phone_case_big.png"
      />
      <img
        v-if="$route.params.type == 'cup'"
        src="~assets/img/customize/cup_big.png"
      />
      <img
        v-if="$route.params.type == 'pillow'"
        src="~assets/img/customize/pillow_big.png"
      />
      <img
        v-if="$route.params.type == 'satchel'"
        src="~assets/img/customize/satchel_big.png"
      />
    </div> -->
    <img v-show="ismaking" class="making" src="~assets/img/making.gif" />
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
      edit_height: 0,
      custom_info: null, // 定制信息
      isfront: true, // 正面
      isback: false, // 反面
      ismaking: false, // 制作动画
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
  computed: {
    phoneCaseModel: function() {
      let width = (this.custom_info.width / 2 / 44).toFixed(3);
      let height = (this.custom_info.height / 2 / 44).toFixed(3);
      return `width:${width}rem;height:${height}rem`;
    },
    cameraModel: function() {
      let width = (this.custom_info.camera_width / 2 / 44).toFixed(3);
      let height = (this.custom_info.camera_height / 2 / 44).toFixed(3);
      let top = (this.custom_info.camera_top / 2 / 44).toFixed(3);
      let left = (this.custom_info.camera_left / 2 / 44).toFixed(3);
      return `width:${width}rem;height:${height}rem;top:${top}rem;left:${left}rem`;
    },
    fingerprintModel: function() {
      let width = (this.custom_info.fingerprint_width / 2 / 44).toFixed(3);
      let height = (this.custom_info.fingerprint_height / 2 / 44).toFixed(3);
      let top = (this.custom_info.fingerprint_top / 2 / 44).toFixed(3);
      let left = (this.custom_info.fingerprint_left / 2 / 44).toFixed(3);
      return `width:${width}rem;height:${height}rem;top:${top}rem;left:${left}rem`;
    }
  },
  methods: {
    onClickReturn() {
      this.$router.push("/shareList");
    },
    onSaveEdit() {
      this.ismaking = !this.ismaking;
      let imageWrapper = document.getElementById(
        "imageWrapper" + this.custom_info.customize_type
      );
      html2canvas(imageWrapper, {
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
    // 抱枕正反面
    onPillowFront() {
      this.isfront = !this.isfront;
      this.isback = !this.isback;
    },
    onPillowBack() {
      this.isfront = !this.isfront;
      this.isback = !this.isback;
    },
    // 触摸上传图片
    down() {
      this.flags = true;
      var touch;
      if (event.touches) touch = event.touches[0];
      else touch = event;
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      let moveDiv = document.getElementById("phone_case");
      this.dx = moveDiv.offsetLeft;
      this.dy = moveDiv.offsetTop;
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
        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";
      }
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
      compress(dataURL, 1.5, base64 => {
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
    ReturnBtn
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
    #phone_case {
      position: absolute;
      left: 0;
      top: 0;
      width: auto;
      max-height: 100%;
      /* z-index: 9; */
    }
  }
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
        width: auto;
        max-height: 100%;
      }
    }
    .pillow_mask {
      background: url("~assets/img/customize/pillow_mask.png") no-repeat;
      background-size: cover;
      z-index: 2;
    }
  }
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
        width: auto;
        max-height: 100%;
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
