<template>
  <div class="promotion_center">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="promotion_center_top">
      <img class="promotion_user_img" src="~assets/img/home/artist_three.png" />
      <div class="promotion_user_name">宅在家里的旅行家</div>
      <div class="promotion_user_mark">公益大使</div>
    </div>
    <div class="promotion_center_content">
      <div class="promotion_center_item" @click="onMyTeam">
        <img src="~assets/img/profile/team.png" />
        <div>
          <h6>我的团队</h6>
          <span>0人</span>
        </div>
      </div>
      <div class="promotion_center_item" @click="onPromotionOrder">
        <img src="~assets/img/profile/order.png" />
        <div>
          <h6>推广订单</h6>
          <span>0笔</span>
        </div>
      </div>
      <div class="promotion_center_item" @click="onPromotionReward">
        <img src="~assets/img/profile/copper_coins.png" />
        <div>
          <h6>推广奖励</h6>
          <span>0元</span>
        </div>
      </div>
      <div class="promotion_center_item" @click="onWithdrawRecord">
        <img src="~assets/img/profile/wallet.png" />
        <div>
          <h6>提现明细</h6>
          <span>0笔</span>
        </div>
      </div>
    </div>
    <van-cell title="我要推广" @click="onIWantPromotion">
      <template slot="icon">
        <img src="~assets/img/profile/promotion.png" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onMyTeam() {
      this.$router.push("/myTeam");
    },
    onPromotionOrder() {
      this.$router.push("/promotionOrder");
    },
    onPromotionReward() {
      this.$router.push("/promotionReward");
    },
    onWithdrawRecord() {
      this.$router.push("/withdrawRecord");
    },
    onIWantPromotion() {
      this.$router.push("/iWantPromotion");
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
.promotion_center {
  .promotion_center_top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 350px;
    padding-bottom: 46px;
    margin-bottom: 20px;
    background-color: #ffffff;
    .promotion_user_img {
      width: 120px;
      height: 120px;
      margin-bottom: 40px;
      border-radius: 50%;
    }
    .promotion_user_name {
      font-size: 30px;
      font-weight: 700;
    }
    .promotion_user_mark {
      width: 112px;
      height: 30px;
      margin-top: 18px;
      background-color: #1b1b1b;
      border-radius: 15px;
      font-size: 18px;
      line-height: 34px;
      color: #ffc9a0;
      text-align: center;
    }
  }
  .promotion_center_content {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    height: 333px;
    padding: 0 30px;
    margin: 20px 0;
    background-color: #ffffff;
    .promotion_center_item {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 50%;
      height: 50%;
      img {
        width: 35px;
        height: 35px;
        margin-right: 30px;
      }
      h6 {
        font-size: 30px;
        font-weight: 400;
      }
      span {
        font-size: 24px;
        color: #999999;
      }
    }
  }
  .van-cell {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 26px;
    }
  }
}
</style>
