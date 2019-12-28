<template>
  <div class="promotion_order">
    <return-btn @onClickReturn="onClickReturn" />
    <van-tabs
      v-model="order_active"
      title-active-color="#FF7301"
      line-width="0"
      @click="onOederTab"
    >
      <van-tab :title="`全部(${promotion_num.a})`" />
      <van-tab :title="`待奖励(${promotion_num.b})`" />
      <van-tab :title="`已奖励(${promotion_num.c})`" />
      <van-tab :title="`已取消(${promotion_num.d})`" />
    </van-tabs>
    <div
      class="promotion_order_item"
      v-for="item in promotion_list"
      :key="item.id"
    >
      <div class="promotion_order_item_top">
        <span>订单号：{{ item.ordersn }}</span>
        <span class="promotion_order_status">{{
          orderStatus(item.status)
        }}</span>
      </div>
      <div class="promotion_order_item_center">
        <div class="promotion_order_item_left">
          <img :src="$store.state.interface_domain + item.gthumb" />
        </div>
        <div class="promotion_order_item_right">
          <h6 style="color: #333333;">{{ item.gtitle }}</h6>
          <span>{{ item.gdescri }}</span>
          <p>¥{{ item.specitemprice }}</p>
        </div>
        <div class="estimated_reward">预估奖励:￥{{ item.agentprice1 }}</div>
      </div>
      <div class="promotion_order_item_bottom">
        <div>
          <img :src="item.avatar" />
          <span>{{ item.nickname }}</span>
        </div>
        <div>下单时间：{{ item.overtime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { RecommendOrder } from "network/profile";
export default {
  data() {
    return {
      promotion_list: [],
      promotion_num: {},
      order_active: 0,
      page: 1,
      isrequest: true
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/promotionCenter");
    },
    onOederTab(order_active) {
      this.order_active = order_active;
      this.promotion_list = [];
      this.isrequest = true;
      this.page = 1;
      this._RecommendOrder();
    },
    // 订单状态
    orderStatus(status) {
      let status_text;
      if (status == 1) status_text = "待奖励";
      else if (status == 2) status_text = "已奖励";
      else if (status == 3) status_text = "已取消";
      return status_text;
    },
    // 网络请求
    _RecommendOrder() {
      if (this.isrequest) {
        RecommendOrder(this.page++, this.order_active).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          if (this.page == 2) {
            let { a, b, c, d } = res;
            this.promotion_num = { a, b, c, d };
          }
          this.promotion_list = this.promotion_list.concat(res.list);
          console.log(res);
        });
      }
    },
    // 可滚动容器的高度
    onScroll() {
      let innerHeight = document.querySelector("#app").clientHeight;
      let outerHeight = document.documentElement.clientHeight;
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      if (innerHeight - outerHeight - 50 < scrollTop) {
        this._RecommendOrder();
      }
    }
  },
  created() {
    this._RecommendOrder();
    window.onscroll = () => this.onScroll();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
  },
  beforeDestroy() {
    window.onscroll = "";
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
        overflow: hidden;
        min-width: 122px;
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
      .promotion_order_item_right {
        h6 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        span {
          font-size: 24px;
          color: #cccccc;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
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
