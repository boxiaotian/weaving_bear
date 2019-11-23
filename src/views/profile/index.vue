<template>
  <div class="personal_center">
    <div class="personal_center_info">
      <router-link to="/distributor" tag="div" class="envoy">
        <van-button
          type="primary"
          text="成为公益推广大使"
          color="#ff7301"
          round
        />
      </router-link>
      <div class="profile_info_group">
        <img class="profile_avatar" src="~assets/img/home/artist_three.png" />
        <div class="profile_info">
          <div class="profile_name">宅在家里的旅行家</div>
          <div>
            <van-button
              class="profile_grade"
              type="primary"
              text="普通用户"
              color="#1b1b1b"
              round
            />
            <router-link to="/sharingRewards" tag="div" class="sharing_rewards">
              <van-button
                type="primary"
                text="分享奖励 >"
                color="#ffffff"
                round
              />
            </router-link>
          </div>
        </div>
      </div>
      <van-grid class="my_module" :border="false" square>
        <van-grid-item @click="onJumpLink('myCreation')">
          <div class="my_module_number">2</div>
          <div>我的作品</div>
        </van-grid-item>
        <van-grid-item @click="onJumpLink('myCertificate')">
          <div class="my_module_number">5</div>
          <div>公益证书</div>
        </van-grid-item>
        <van-grid-item @click="onJumpLink('shoppingCart')">
          <div class="my_module_number">53</div>
          <div>购物车</div>
        </van-grid-item>
      </van-grid>
      <router-link to="/vipService" tag="div" class="buy_vip">
        <img class="vip_img" src="~assets/img/icon/VIP.png" />
        <span>升级VIP享受更多权益</span>
        <img class="arrow_o" src="~assets/img/icon/arrow_o.png" />
      </router-link>
    </div>
    <div class="total_amount">
      <div>
        <h5>2352.00</h5>
        <h6 style="color: #999999;">可提现金额（元）</h6>
      </div>
      <van-button
        class="withdraw"
        type="primary"
        text="我要提现 >"
        color="linear-gradient(-31deg,#ffa868 0%,#ffc8a0 100%)"
        round
        @click="onJumpLink('withdraw')"
      />
    </div>
    <div class="my_order_group">
      <div class="my_order_title">
        我的订单
        <router-link to="/myOrder">查看所有订单></router-link>
        <!-- <a href="javascript:;">查看所有订单></a> -->
      </div>
      <van-grid :border="false" square>
        <van-grid-item>
          <img src="~assets/img/profile/pending_pay.png" />
          <div>待付款</div>
        </van-grid-item>
        <van-grid-item>
          <img src="~assets/img/profile/pending_receipt.png" />
          <div>待发货</div>
        </van-grid-item>
        <van-grid-item>
          <img src="~assets/img/profile/shipped.png" />
          <div>已发货</div>
        </van-grid-item>
        <van-grid-item>
          <img src="~assets/img/profile/completed.png" />
          <div>已完成</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="my_tools_group">
      <div class="my_tools_title">我的工具</div>
      <van-grid :border="false">
        <van-grid-item @click="onJumpLink('promotionCenter')">
          <img src="~assets/img/profile/promotion_center.png" />
          <span>推广中心</span>
        </van-grid-item>
        <van-grid-item @click="onJumpLink('myAddress')">
          <img src="~assets/img/profile/my_address.png" />
          <span>我的地址</span>
        </van-grid-item>
        <van-grid-item>
          <img src="~assets/img/profile/contact_service.png" />
          <span>联系客服</span>
        </van-grid-item>
        <van-grid-item @click="onJumpLink('helpCenter')">
          <img src="~assets/img/profile/help_center.png" />
          <span>帮助中心</span>
        </van-grid-item>
        <van-grid-item @click="onJumpLink('aboutUs')">
          <img src="~assets/img/profile/about_us.png" />
          <span>关于我们</span>
        </van-grid-item>
      </van-grid>
    </div>
    <main-tab-bar />
  </div>
</template>

<script>
import { MainTabBar } from "components/index";
export default {
  methods: {
    onJumpLink(type) {
      this.$router.push(`/${type}`);
    }
  },
  components: {
    MainTabBar
  }
};
</script>

<style lang="less">
.personal_center {
  .personal_center_info {
    .my_module {
      .van-grid-item {
        .van-grid-item__content--center {
          background: none;
          font-weight: 700;
        }
      }
    }
  }
  .my_order_group,
  .my_tools_group {
    .van-grid {
      .van-grid-item {
        .van-grid-item__content--center {
          justify-content: space-around;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.personal_center {
  padding-bottom: 98px;
  .personal_center_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 500px;
    padding: 0 30px;
    background-image: linear-gradient(-31deg, #ffa868 0%, #ffc8a0 100%);
    .envoy {
      align-self: flex-end;
      margin-top: 30px;
      margin-right: -30px;
      .van-button {
        width: 230px;
        height: 50px;
        padding: 0;
        border-radius: 25px 0px 0px 25px;
        font-size: 24px;
        font-weight: 700;
        line-height: 24px;
        color: #ffffff;
      }
    }
    .profile_info_group {
      display: flex;
      flex-direction: row;
      align-items: center;
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
          color: #ffffff;
        }
        .profile_grade,
        .sharing_rewards .van-button {
          min-width: 112px;
          height: 30px;
          padding: 6px 20px;
          margin-right: 14px;
          border: none;
          font-size: 18px;
          line-height: 22px;
        }
        .profile_grade {
          color: #ffc9a0 !important;
        }
        .sharing_rewards {
          display: inline-block;
          .van-button {
            color: #ff7301 !important;
          }
        }
      }
    }
    .my_module {
      justify-content: space-between;
      .van-grid-item {
        width: 96px;
        height: 96px;
        background: none !important;
        color: #ffffff;
        .van-grid-item__content--center {
          .my_module_number {
            font-family: "DIN-Black";
            font-size: 48px;
          }
        }
      }
    }
    .buy_vip {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 90px;
      padding: 0 27px;
      background-color: #1b1b1b;
      border-radius: 18px 18px 0px 0px;
      color: #ffd67f;
      .vip_img {
        width: 76px;
        height: 30px;
        margin: 0 33px 0 7px;
      }
      .arrow_o {
        position: absolute;
        top: 50%;
        right: 33px;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
      }
    }
  }
  .total_amount {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 92%;
    height: 175px;
    padding: 0 30px;
    margin: auto;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 0px 0px 18px 18px;
    h5 {
      font-family: "DIN-Black";
      font-size: 48px;
    }
    .withdraw {
      width: 200px;
      height: 60px;
      line-height: 60px;
      font-size: 30px;
    }
  }
  .my_order_group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 92%;
    height: 250px;
    padding: 30px 24px 0;
    margin: 30px auto;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    .my_order_title {
      font-size: 30px;
      line-height: 30px;
      a {
        float: right;
        font-size: 24px;
        color: #333333;
      }
    }
    img {
      width: 46px;
      height: 36px;
    }
  }
  .my_tools_group {
    width: 92%;
    height: 414px;
    padding: 30px 24px 0;
    margin: 30px auto;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    .my_tools_title {
      margin-bottom: 42px;
      font-size: 30px;
      line-height: 30px;
    }
    .van-grid {
      width: 100%;
      height: 310px;
      color: #666666;
      img {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>
