<template>
  <div class="my_order">
    <return-btn @onClickReturn="onClickReturn" />
    <van-tabs
      v-model="order_active"
      title-active-color="#FF7301"
      line-width="0"
      @click="onOederTab"
    >
      <van-tab title="全部" />
      <van-tab title="待付款" />
      <van-tab title="待发货" />
      <van-tab title="已发货" />
      <van-tab title="已完成" />
    </van-tabs>
    <div
      class="my_order_item"
      v-for="item in order_list"
      :key="item.id"
      @click="onOrderDetails(item.id)"
    >
      <div class="my_order_item_top">
        <span>订单号：{{ item.ordersn }}</span>
        <span class="my_order_status">{{ orderStatus(item.status) }}</span>
      </div>
      <div class="my_order_item_center">
        <div class="my_order_commodity_img">
          <img :src="$store.state.interface_domain + item.gthumb" />
        </div>
        <div class="my_order_commodity_content">
          <h6>{{ item.cname ? item.cname + "手机壳" : item.gtitle }}</h6>
          <p>{{ item.gdescri }}</p>
          <span>规格:{{ item.specitemname }}</span>
        </div>
        <div>
          <div class="my_order_commodity_price">¥{{ item.specitemprice }}</div>
          <div class="my_order_commodity_number">x1</div>
        </div>
      </div>
      <div class="public_interest_name">
        <span>公益宝贝</span>
        <span>{{
          item.pid
            ? `成交后平台将以您的名义捐赠${item.pprice}给${item.pname}`
            : "未参与公益项目"
        }}</span>
      </div>
      <div class="my_order_item_bottom">
        <div>
          <span style="color:#999999">共{{ item.num }}件</span>
          <span
            >小计：<b>{{ item.goodsprice }}元</b></span
          >
        </div>
        <van-button
          type="primary"
          size="mini"
          text="立即付款"
          color="#FF7301"
          v-if="item.status == 1"
          plain
          round
        />
        <van-button
          v-else-if="item.status == 2 || item.status == 3"
          type="primary"
          size="mini"
          text="查看物流"
          color="#FF7301"
          plain
          round
        />
        <van-button
          v-else-if="item.status == 4"
          type="primary"
          size="mini"
          text="确认收货"
          color="#1b1b1b"
          plain
          round
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { OrderList } from "network/profile";
export default {
  data() {
    return {
      order_active: 0,
      order_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onOederTab(order_active) {
      this.order_active = order_active;
      this.order_list = [];
      this.isrequest = true;
      this.page = 1;
      this._OrderList();
    },
    // 订单状态
    orderStatus(status) {
      let status_text;
      if (status == 1) status_text = "待付款";
      else if (status == 2) status_text = "待发货";
      else if (status == 3) status_text = "已发货";
      else if (status == 4) status_text = "已完成";
      return status_text;
    },
    // 订单详情
    onOrderDetails(id) {
      this.$router.push({ path: "/orderDetails", query: { id } });
    },
    // 网络请求
    _OrderList() {
      if (this.isrequest) {
        OrderList(this.page++, this.order_active).then(res => {
          console.log(res.list);

          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.order_list = this.order_list.concat(res.list);
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
        this._OrderList();
      }
    }
  },
  created() {
    this._OrderList();
    window.addEventListener("scroll", this.onScroll);
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less">
.my_order {
  .van-tabs {
    .van-tabs__wrap {
      .van-tabs__nav {
        .van-tab {
          flex: auto;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.my_order {
  padding: 88px 30px;
  .van-tabs {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
  }
  .my_order_item {
    width: 100%;
    min-height: 480px;
    padding: 0 20px 0 40px;
    margin-top: 30px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    .my_order_item_top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 30px;
      line-height: 80px;
      .my_order_status {
        font-size: 24px;
        color: #ff7301;
      }
    }
    .my_order_item_center {
      display: flex;
      flex-direction: row;
      .my_order_commodity_img {
        width: 122px;
        height: 122px;
        padding: 20px 0;
        margin-right: 47px;
        background-color: #ffffff;
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
        border-radius: 18px;
        img {
          display: block;
          width: auto;
          height: 100%;
          margin: auto;
        }
      }
      .my_order_commodity_content {
        width: 58%;
        height: 100%;
        font-size: 30px;
        p {
          font-size: 24px;
          color: #999999;
        }
        span {
          display: inline-block;
          padding: 5px 20px;
          background-color: #f6f6f6;
          border-radius: 6px;
          font-size: 24px;
          color: #999999;
        }
      }
      .my_order_commodity_price {
        font-size: 30px;
      }
      .my_order_commodity_number {
        font-size: 22px;
        color: #999999;
        text-align: right;
      }
    }
    .public_interest_name {
      margin: 46px 0;
      font-size: 24px;
      color: #333333;
      span {
        margin-left: 30px;
        &:nth-child(2) {
          color: #999999;
        }
      }
    }
    .my_order_item_bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 24px;
      span {
        margin-left: 30px;
      }
      b {
        color: #ff7301;
      }
      .van-button {
        width: 150px;
        height: 40px;
        margin: 40px 0 20px 26px;
        font-size: 24px;
        span {
          margin: 0;
        }
      }
    }
  }
}
</style>
