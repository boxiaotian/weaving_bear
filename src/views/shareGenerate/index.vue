<template>
  <div class="share_generate">
    <main-nav-bar @onClickReturn="onClickReturn" />
    <div class="share_generate_group">
      <h6>学生名称</h6>
      <div>
        <p>我正在参与***公益</p>
        <p>希望各位哥哥姐姐多多支持我哦！</p>
      </div>
      <img class="share_drawing" src="~assets/img/share/user_img.png" />
      <h5>定制产品</h5>
      <div class="customize_product">
        <div>
          <img src="~/assets/img/customize/phone_case_big.png" />
        </div>
        <van-button
          class="buy_now"
          type="primary"
          text="立即购买"
          color="#ff7301"
          @click="onBuyNow"
          round
        />
      </div>
      <div class="customize_product">
        <div>
          <img src="~/assets/img/customize/cup_big.png" />
        </div>
        <van-button
          class="buy_now"
          type="primary"
          text="立即购买"
          color="#ff7301"
          @click="onBuyNow"
          round
        />
      </div>
      <div class="customize_product">
        <div>
          <img src="~/assets/img/customize/pillow_big.png" />
        </div>
        <van-button
          class="buy_now"
          type="primary"
          text="立即购买"
          color="#ff7301"
          @click="onBuyNow"
          round
        />
      </div>
      <div class="customize_product">
        <div>
          <img src="~/assets/img/customize/satchel_big.png" />
        </div>
        <van-button
          class="buy_now"
          type="primary"
          text="立即购买"
          color="#ff7301"
          @click="onBuyNow"
          round
        />
      </div>
      <div class="charitable_school">
        <h6>公益图文详情</h6>
        <div>
          公益图文详情公益图文详情公益图文详情公益图文详情公益图文
          详情公益图文详情公益图文详情公益图文详情公益图文详情公益
          图文详情公益图文详情公益图文详情公益图文详情公益图文详情
          公益图文详情公益图文详情公益图文详情公益图文详情公益图文 详情
        </div>
        <h6>学校图文详情</h6>
        <div>
          学校图文详情学校图文详情学校图文详情学校图文详情学校图文
          详情学校图文详情学校图文详情学校图文详情学校图文详情学校
          图文详情学校图文详情学校图文详情学校图文详情学校图文详情
          学校图文详情学校图文详情学校图文详情学校图文详情学校图文 详情
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MainNavBar } from "components/index";
export default {
  methods: {
    onClickReturn() {
      return this.$router.push("/shareList");
    },
    onBuyNow() {}
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
    MainNavBar
  }
};
</script>

<style lang="less" scoped>
.share_generate {
  padding: 88px 30px 0;
  .share_generate_group {
    h6 {
      font-size: 30px;
      font-weight: 500;
      line-height: 90px;
    }
    .share_drawing {
      width: 100%;
      height: auto;
      margin: 44px auto 62px;
    }
    h5 {
      font-size: 36px;
      font-weight: 500;
      line-height: 36px;
      text-align: center;
    }
    .customize_product {
      div {
        width: 100%;
        height: 400px;
        padding: 40px 0;
        margin: 40px auto;
        background-color: #e5e5e5;
        img {
          display: block;
          width: auto;
          height: 100%;
          margin: auto;
        }
      }
      .buy_now {
        display: block;
        width: 500px;
        height: 80px;
        margin: auto;
        font-size: 36px;
        font-weight: 500;
      }
    }
    .charitable_school {
      div {
        margin-bottom: 90px;
      }
    }
  }
}
</style>
