<template>
  <div class="customize">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="customize_group">
      <div
        class="customize_commodity"
        :style="{ height: customize_height.toFixed(3) + 'rem' }"
      >
        <div
          class="commodity_img"
          :style="{ height: customize_info_height.toFixed(3) + 'rem' }"
        >
          <div class="pillow_front_back" v-if="$route.params.type == 'pillow'">
            <div :class="[isfront && 'pillow_front']" @click="onPillowFront">
              正面
            </div>
            <div :class="[isback && 'pillow_back']" @click="onPillowBack">
              反面
            </div>
          </div>
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
        </div>
        <div class="customize_info" ref="customize_info">
          <div v-if="$route.params.type == 'phone'">
            <img src="~assets/img/icon/phone.png" />
            <router-link to="/model" tag="span">换机型</router-link>
            > iPhone 6/iPhone 6s
          </div>
          <div v-else>
            <img
              src="~assets/img/icon/cup.png"
              v-if="$route.params.type == 'cup'"
            />
            <img
              src="~assets/img/icon/pillow.png"
              v-if="$route.params.type == 'pillow'"
            />
            <img
              src="~assets/img/icon/satchel.png"
              v-if="$route.params.type == 'satchel'"
            />
            {{ $route.meta.title }}
          </div>
          <div class="customize_next" @click="onNextStep">下一步</div>
        </div>
      </div>
      <div class="upload_img" ref="upload_img">
        <van-uploader :max-count="1" :after-read="afterRead">
          <van-button
            type="primary"
            text="上传图片"
            capture="camera"
            color="#ffa868"
            round
          />
        </van-uploader>
        <div>*请注意所上传图片的清晰度和尺寸大小，以免实物制作效果不佳</div>
      </div>
    </div>
    <img v-show="ismaking" class="making" src="~assets/img/making.gif" />
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  data() {
    return {
      customize_height: 0, // 商品内容
      customize_info_height: 0, // 商品图片内容
      isfront: true,
      isback: false,
      ismaking: false
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.push(
        this.$route.params.type == "phone" ? "/model" : "/customizeList"
      );
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
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.content);
    },
    onNextStep() {
      this.ismaking = !this.ismaking;
      setTimeout(() => {
        this.$router.push("/ProductDetails");
      }, 3000);
    }
  },
  created() {
    console.log(this.$route.params.type);
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
  destroyed() {
    window.removeEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
  },
  components: {
    ReturnBtn
  }
};
</script>
<style lang="less">
.customize {
  .customize_group {
    .upload_img {
      .van-uploader {
        .van-uploader__wrapper,
        .van-uploader__input-wrapper,
        .van-button--normal {
          width: 100%;
          height: 100%;
        }
        .van-uploader__wrapper {
          .van-uploader__input-wrapper {
            .van-button--normal {
              font-size: 36px;
              font-weight: 700;
            }
          }
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
        img {
          width: auto;
          height: 56%;
        }
      }
      .customize_info {
        position: absolute;
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
      .van-uploader {
        width: 690px;
        height: 90px;
        margin: 18px 0 28px;
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
  }
}
</style>
