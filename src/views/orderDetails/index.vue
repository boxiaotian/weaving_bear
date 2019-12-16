<template>
  <div class="order_details">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="order_details_top">
      <div>
        <span>{{ orderStatus(order_details.status) }}</span>
        <van-button
          v-if="order_details.status == 2 || order_details.status == 3"
          type="primary"
          size="mini"
          text="查看物流 >"
          color="#1a2228"
          @click="onViewLogistics"
          plain
          round
        />
      </div>
      <img src="~assets/img/order/order_car.png" />
    </div>
    <div class="order_details_address">
      <h6>
        {{ order_details.name }} <span>{{ order_details.mobile }}</span>
      </h6>
      <p>
        {{
          order_details.address && order_details.address.replace(/，/g, "  ")
        }}
      </p>
    </div>
    <div class="order_details_commodity">
      <div class="order_details_commodity_top">
        <div class="order_details_commodity_img">
          <img src="~assets/img/customize/phone_case_big.png" />
        </div>
        <div class="order_details_commodity_content">
          <h6>
            {{
              order_details.cname
                ? order_details.cname + "手机壳"
                : order_details.gtitle
            }}
          </h6>
          <p>{{ order_details.gdescri }}</p>
          <span>规格:{{ order_details.specitemname }}</span>
        </div>
        <div>
          <div class="order_details_commodity_price">
            ¥{{ order_details.specitemprice }}
          </div>
          <div class="order_details_commodity_number">x1</div>
        </div>
      </div>
      <div class="order_details_commodity_bottom">
        <div>
          <span style="color:#999999">共{{ order_details.num }}件</span>
          <span
            >小计：<b>{{ order_details.goodsprice }}元</b></span
          >
        </div>
        <van-button
          v-if="order_details.status == 1"
          type="primary"
          size="mini"
          text="立即付款"
          color="#1b1b1b"
          plain
          round
        />
      </div>
    </div>
    <div class="order_details_info">
      <van-cell-group title="订单详情" :border="false">
        <van-cell
          title="订单编号"
          :value="order_details.ordersn"
          :border="false"
        />
        <van-cell
          title="下单时间"
          :value="order_details.createtime"
          :border="false"
        />
        <van-cell
          title="订单状态"
          :value="orderStatus(order_details.status)"
          :border="false"
        />
      </van-cell-group>
    </div>
    <div class="order_details_certificate">
      <h6>公益证书</h6>
      <div class="certificate_box">
        <img src="~assets/img/profile/certificate_box.png" />
        <div class="winner">张三</div>
        <div class="award_info">
          <span>2019.11.06</span>
          <span>红十字公益基金会</span>
        </div>
        <img class="chapter" src="~assets/img/profile/chapter.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { OrderDetail } from "network/profile";
export default {
  data() {
    return {
      order_details: {}
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/myOrder");
    },
    onViewLogistics() {
      this.$router.push("/viewLogistics");
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
    // 网络请求
    _OrderDetail() {
      OrderDetail(this.$route.query.id).then(
        res => (this.order_details = res.info)
      );
    }
  },
  created() {
    this._OrderDetail();
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.order_details {
  .order_details_top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 222px;
    padding: 0 68px 0 30px;
    background: linear-gradient(-31deg, #ffa868 0%, #ffc8a0 100%);
    font-size: 30px;
    font-weight: 700;
    .van-button--mini {
      display: block;
      width: 150px;
      height: 40px;
      margin-top: 30px;
      background-color: rgba(0, 0, 0, 0);
      border: 1px solid rgba(27, 27, 27, 1);
      border-radius: 20px;
      font-size: 24px;
    }
    img {
      align-self: flex-end;
      width: 296px;
      height: 192px;
    }
  }
  .order_details_address {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 150px;
    padding: 0 30px 0 104px;
    margin-bottom: 20px;
    background: url("~assets/img/icon/address.png") 35px center no-repeat;
    background-color: #ffffff;
    background-size: 5%;
    font-size: 30px;
    span {
      margin-left: 30px;
    }
    p {
      font-size: 24px;
      color: #999999;
    }
  }
  .order_details_commodity {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 300px;
    padding: 34px 30px;
    margin-bottom: 20px;
    background-color: #ffffff;
    .order_details_commodity_top {
      display: flex;
      flex-direction: row;
      .order_details_commodity_img {
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
      .order_details_commodity_content {
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
      .order_details_commodity_price {
        font-size: 30px;
      }
      .order_details_commodity_number {
        font-size: 22px;
        color: #999999;
        text-align: right;
      }
    }
    .order_details_commodity_bottom {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 24px;
      div {
        span {
          margin-left: 30px;
          b {
            font-size: 30px;
          }
        }
      }
      .van-button {
        width: 150px;
        height: 40px;
        margin-top: 40px;
        font-size: 24px;
      }
    }
  }
  .order_details_info {
    width: 100%;
    height: 300px;
    padding: 40px 0;
    margin-bottom: 20px;
    background-color: #ffffff;
    .van-cell-group__title {
      padding: 0 30px;
      margin-bottom: 20px;
      font-size: 30px;
      font-weight: 700;
      color: #000000;
    }
    .van-cell-group {
      .van-cell {
        padding: 4px 30px;
        font-size: 30px;
        .van-cell__title {
          color: #999999;
        }
        .van-cell__value {
          color: #000000;
        }
      }
    }
  }
  .order_details_certificate {
    padding: 40px 30px;
    background-color: #ffffff;
    font-size: 30px;
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
  }
}
</style>
