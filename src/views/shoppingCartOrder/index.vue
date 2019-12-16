<template>
  <div class="submit_order">
    <return-btn @onClickReturn="onClickReturn" />
    <router-link
      :to="{ path: '/myAddress', query: { type: 'shopping' } }"
      tag="div"
      class="receipt_info"
    >
      <img class="address" src="@/assets/img/icon/address.png" />
      <div v-if="address_info && Object.keys(address_info).length">
        <h6 class="receipt_info_name">{{ address_info.name }}</h6>
        <p class="receipt_info_address">{{ addressInfo }}</p>
      </div>
      <span v-else>请添加收货地址</span>
      <img class="arrow_r" src="@/assets/img/icon/arrow_r.png" />
    </router-link>
    <div class="order_item_group">
      <div class="order_item" v-for="item in order_info.list" :key="item.id">
        <div class="order_number">
          <img src="~assets/img/icon/school.png" />
          <span>{{ item.aname }}</span>
        </div>
        <div class="order_item_info">
          <div class="order_item_info_left">
            <div class="order_item_img_group">
              <img :src="$store.state.interface_domain + item.thumb" />
            </div>
            <div style="max-width:67%">
              <div class="order_item_title">{{ item.title }}</div>
              <div class="order_item_present">{{ item.descri }}</div>
              <div class="order_item_norm">规格：{{ item.specitemname }}</div>
            </div>
          </div>
          <div class="order_item_info_right">
            <div>￥{{ item.specitemprice }}</div>
            <div style="color:#999999">x1</div>
          </div>
        </div>
        <div class="order_charitable">
          <span>公益宝贝</span>
          <span>{{
            item.pid
              ? `成交后平台将以您的名义捐赠${item.pprice}给${item.pname}`
              : "未参与公益项目"
          }}</span>
        </div>
        <div class="order_quantity_subtotal">
          <span>共{{ item.num }}件</span>
          小计：<span>￥{{ item.allmoney }}</span>
        </div>
      </div>
    </div>
    <div class="submit_order_footer">
      <div style="color:#999999; margin-right:13px;">
        共{{ order_info.allnum }}件
      </div>
      <div>合计：</div>
      <div class="submit_order_total">
        ¥<span
          >{{ allTotal }} <i>含运费:{{ freight }}</i></span
        >
      </div>
      <div class="submit_order_btn" @click="onSubmitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { onBridgeReady } from "common/utils";
import { ReturnBtn } from "components/index";
import { AddressDetail, GetFreight } from "network/address";
import { GoodsOver, AddOrder } from "network/profile";
export default {
  data() {
    return {
      order_info: {}, // 订单信息
      address_info: {}, // 地址信息
      freight: ""
    };
  },
  computed: {
    addressInfo: function() {
      let { province, city, county, address } = this.address_info;
      let address_info = province + city + county + address;
      return address_info;
    },
    allTotal: function() {
      let all_total =
        Math.floor(
          (parseFloat(this.order_info.allmoney) + parseFloat(this.freight)) *
            100
        ) / 100;
      return all_total;
    }
  },
  methods: {
    // 返回上一页
    onClickReturn() {
      this.$router.back(-1);
    },
    // 提交订单
    onSubmitOrder() {
      let addressid = this.$route.query.addressid
        ? this.$route.query.addressid
        : this.address_info.id;
      this._AddOrder({
        freight: this.freight,
        addressid,
        orderprice: this.allTotal
      });
    },
    // 网络请求
    _GoodsOver() {
      GoodsOver().then(res => {
        this.order_info = res.info;
        // 是否去选择了收货地址
        if (this.$route.query.addressid) {
          this._AddressDetail(this.$route.query.addressid);
          this._GetFreight(this.$route.query.addressid);
        } else {
          if (Object.keys(res.info.address).length) {
            this.address_info = res.info.address;
            this._GetFreight(res.info.address.id);
          } else {
            this.address_info = {};
            this.freight = res.info.freight ? res.info.freight : "0.00";
          }
        }
      });
    },
    _AddOrder(parmas) {
      AddOrder(parmas).then(res => {
        onBridgeReady(res.params).then(res_pay => {
          if (res_pay.err_msg == "get_brand_wcpay_request:ok") {
            this.$router.replace({
              path: "/paySuccess",
              query: { paysn: res.paysn }
            });
          }
        });
      });
    },
    _AddressDetail(id) {
      AddressDetail(id).then(res => (this.address_info = res.info));
    },
    _GetFreight(addressid) {
      GetFreight(addressid).then(res => {
        this.freight = res.freight
          ? res.freight * this.order_info.list.length
          : "0.00";
      });
    }
  },
  created() {
    this._GoodsOver();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
    this.swipeHeight = (window.outerWidth * window.dpr) / window.rem;
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
.submit_order {
  padding: 0 30px;
  padding-bottom: 100px;
  .receipt_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 180px;
    padding: 0 30px 0 24px;
    margin: 24px 0;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    font-size: 36px;
    div {
      flex: 1;
    }
    .address {
      width: 40px;
      height: 40px;
    }
    .arrow_r {
      width: 14px;
      height: 26px;
    }
    .receipt_info_name {
      margin-left: 36px;
      font-size: 30px;
    }
    .receipt_info_address {
      margin: 14px 36px;
      font-size: 24px;
      line-height: 32px;
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
  .order_item_group {
    .order_item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 420px;
      padding: 28px 18px 40px 40px;
      margin-top: 24px;
      background-color: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
      border-radius: 18px;
      font-size: 24px;
      line-height: 32px;
      .order_number {
        font-size: 30px;
        line-height: 38px;
        img {
          width: 30px;
          height: 30px;
          margin-right: 20px;
        }
      }
      .order_item_info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin: 30px auto 50px;
        .order_item_info_left {
          display: flex;
          flex-direction: row;
          max-width: 79%;
          .order_item_img_group {
            width: 122px;
            height: 122px;
            padding: 20px;
            margin-right: 40px;
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
          .order_item_title {
            font-size: 30px;
            line-height: 38px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .order_item_present {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #cccccc;
            margin: 6px 0;
          }
          .order_item_norm {
            display: inline-block;
            padding: 5px 24px;
            background-color: #f6f6f6;
            border-radius: 6px;
            color: #999999;
          }
        }
        .order_item_info_right {
          text-align: right;
          div {
            &:nth-child(1) {
              font-size: 30px;
              line-height: 38px;
            }
          }
        }
      }
      .order_charitable {
        display: flex;
        flex-direction: row;
        span {
          color: #999999;
          &:nth-child(1) {
            width: 115px;
            margin: 0 40px 0 24px;
            color: #333333;
          }
        }
      }
      .order_quantity_subtotal {
        margin-top: 30px;
        text-align: right;
        span {
          color: #ff7301;
          &:nth-child(1) {
            margin-right: 22px;
            color: #999999;
          }
        }
      }
    }
  }
  .submit_order_footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    padding: 0 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    font-size: 24px;
    div {
      &:nth-child(2),
      &:nth-child(3) {
        font-size: 30px;
      }
    }
    .submit_order_total {
      font-weight: 700;
      color: #ff7301;
      span {
        font-size: 36px;
        i {
          color: #999999;
          font-size: 20px;
        }
      }
    }
    .submit_order_btn {
      width: 150px;
      height: 60px;
      margin-left: 20px;
      background-color: #ff7301;
      color: #ffffff;
      border-radius: 30px;
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>
