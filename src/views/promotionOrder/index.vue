<template>
  <div class="promotion_order">
    <return-btn @onClickReturn="onClickReturn" />
    <van-tabs
      v-model="order_active"
      title-active-color="#FF7301"
      line-width="0"
    >
      <van-tab :title="'全部(3)'" />
      <van-tab :title="'待奖励(3)'" />
      <van-tab :title="'已奖励(3)'" />
      <van-tab :title="'已取消(3)'" />
    </van-tabs>
    <div class="promotion_order_item" v-for="item in 6" :key="item">
      <div class="promotion_order_item_top">
        <span>订单号：YZ5610345</span>
        <span class="promotion_order_status">待奖励</span>
      </div>
      <div class="promotion_order_item_center">
        <div class="promotion_order_item_left">
          <img src="~assets/img/customize/phone_case_big.png" />
        </div>
        <div class="promotion_order_item_right">
          <h6 style="color: #333333;">定制手机壳</h6>
          <span>高清彩印 来图定制</span>
          <p>¥28.88</p>
        </div>
        <div class="estimated_reward">预估奖励:￥2.88</div>
      </div>
      <div class="promotion_order_item_bottom">
        <div>
          <img src="" />
          <span>购物者昵称</span>
        </div>
        <div>下单时间：2019.10.26 15:59</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  data() {
    return {
      order_active: 0
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/promotionCenter");
    }
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
.promotion_order {
  padding: 88px 30px;
  .van-tabs {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
  }
  .promotion_order_item {
    width: 100%;
    height: 330px;
    padding: 0 30px;
    margin-top: 30px;
    border-radius: 18px;
    background-color: #ffffff;
    .promotion_order_item_top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-size: 30px;
      line-height: 80px;
      .promotion_order_status {
        font-size: 24px;
        color: #ff7301;
      }
    }
    .promotion_order_item_center {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      width: 100%;
      height: 162px;
      padding: 8px 0 40px;
      .promotion_order_item_left {
        width: 122px;
        height: 122px;
        padding: 20px 0;
        margin-right: 40px;
        background: #ffffff;
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
        border-radius: 18px;
        font-size: 30px;
        img {
          display: block;
          width: auto;
          height: 100%;
          margin: auto;
        }
      }
      span {
        font-size: 24px;
        color: #cccccc;
      }
      .estimated_reward {
        position: absolute;
        right: -30px;
        bottom: 26px;
        width: 204px;
        height: 50px;
        background: #ff7301;
        border-radius: 25px 0px 0px 25px;
        font-size: 24px;
        font-weight: 700;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
      }
    }
    .promotion_order_item_bottom {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 88px;
      border-top: solid 1px #f6f6f6;
      font-size: 24px;
      color: #333333;
      img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
        background-color: #ff7301;
        border-radius: 50%;
      }
      span {
        width: 10%;
      }
    }
  }
}
</style>
