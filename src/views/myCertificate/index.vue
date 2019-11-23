<template>
  <div
    class="my_certificate"
    :style="{ height: window_height.toFixed(3) + 'rem' }"
  >
    <return-btn @onClickReturn="onClickReturn" />
    <div class="my_certificate_top" ref="my_certificate_top">
      <div class="my_certificate_info">
        <img class="profile_avatar" src="~assets/img/home/artist_three.png" />
        <div class="profile_info">
          <div class="profile_name">宅在家里的旅行家</div>
          <div>已获得证书：4</div>
        </div>
      </div>
      <div
        class="my_certificate_group"
        :style="{ height: certificate_height.toFixed(3) + 'rem' }"
      >
        <div
          class="my_certificate_item"
          v-for="item in 6"
          :key="item"
          @click="onViewCertificate"
        >
          <img
            class="my_certificate_img"
            src="~assets/img/profile/certificate.png"
          />
          <h6>红十字基金会</h6>
          <div>2019.11.06</div>
        </div>
      </div>
    </div>
    <van-overlay :show="show_certificate" @click="show_certificate = false">
      <div class="certificate_box">
        <img src="~assets/img/profile/certificate_box.png" />
        <div class="winner">张三</div>
        <div class="award_info">
          <span>2019.11.06</span>
          <span>红十字公益基金会</span>
        </div>
        <img class="chapter" src="~assets/img/profile/chapter.png" />
      </div>
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
import { ReturnBtn } from "components/index";
export default {
  data() {
    return {
      window_height: 0,
      certificate_height: 0,
      show_certificate: false
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onViewCertificate() {
      this.show_certificate = !this.show_certificate;
    }
  },
  mounted() {
    const windowHeight = window.outerHeight
      ? window.outerHeight * window.dpr
      : window.innerHeight;
    const certificateHeight = this.$refs.my_certificate_top.offsetHeight;
    this.certificate_height =
      (windowHeight - certificateHeight + 40) / window.rem;
    this.window_height = windowHeight / window.rem;
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less">
.my_certificate {
  .my_certificate_top {
    .van-nav-bar {
      background-color: rgba(0, 0, 0, 0);
      .van-nav-bar__left {
        .van-nav-bar__arrow {
          background: url("~assets/img/return_arrow_w.png") no-repeat;
          background-size: cover;
        }
      }
      .van-nav-bar__title {
        color: #ffffff;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.my_certificate {
  .my_certificate_top {
    position: relative;
    display: flex;
    width: 100%;
    height: 272px;
    padding: 0 30px 128px;
    background-image: linear-gradient(-31deg, #ffa868 0%, #ffc8a0 100%);
    .my_certificate_info {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #ffffff;
      font-size: 24px;
      .profile_avatar {
        width: 100px;
        height: 100px;
        margin-right: 30px;
        border-radius: 50%;
      }
      .profile_info {
        .profile_name {
          font-size: 36px;
          line-height: 68px;
          font-weight: 700;
        }
      }
    }
    .my_certificate_group {
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      overflow-y: auto;
      position: absolute;
      left: 0;
      top: 232px;
      width: 100%;
      height: auto;
      padding: 78px 30px 36px;
      border-radius: 50px 50px 0px 0px;
      background-color: #ffffff;
      .my_certificate_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 330px;
        height: 400px;
        margin-bottom: 30px;
        background-color: #ffffff;
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
        border-radius: 18px;
        font-size: 18px;
        color: #384346;
        .my_certificate_img {
          width: 120px;
          height: 176px;
          margin: 40px 0;
        }
        h6 {
          margin: 20px 0;
          font-size: 30px;
          font-weight: 300;
          line-height: 30px;
        }
      }
    }
  }
  .van-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    .certificate_box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      width: 690px;
      height: 1002px;
      padding: 22px 16px;
      background-color: #ffffff;
      color: #384346;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
      .winner {
        position: absolute;
        top: 400px;
        right: 0;
        left: 0;
        font-size: 30px;
        line-height: 54px;
      }
      .award_info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        right: 76px;
        bottom: 130px;
        left: 92px;
        z-index: 1;
        // padding: 0 16px 0 32px;
        font-size: 24px;
        line-height: 24px;
      }
      .chapter {
        position: absolute;
        right: 104px;
        bottom: 104px;
        width: 140px;
        height: 140px;
      }
    }
    .certificate_box_close {
      margin-top: 58px;
      font-size: 60px;
    }
  }
}
</style>
