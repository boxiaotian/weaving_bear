<template>
  <div class="view_logistics">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="view_logistics_top">
      <div class="view_logistics_img">
        <img :src="$store.state.interface_domain + order_details.gthumb" />
      </div>
      <div class="view_logistics_info">
        <p>
          物流状态：<span>{{ orderStatus(order_details.status) }}</span>
        </p>
        <p v-if="order_details.freight_name">
          承运来源：{{ order_details.freight_name }}
        </p>
        <p v-if="order_details.freight_number">
          运单编号：{{ order_details.freight_number }}
        </p>
      </div>
    </div>
    <van-steps direction="vertical" active-color="#22C19B">
      <van-step v-for="(item, index) in logistics_list" :key="index">
        <h3>{{ item.AcceptStation }}</h3>
        <p>{{ item.AcceptTime }}</p>
      </van-step>
      <van-step v-if="order_details.status > 3">
        <h3>已发货</h3>
        <p>{{ order_details.freight_time }}</p>
      </van-step>
      <van-step v-if="order_details.status > 2">
        <h3>商品制作中</h3>
        <p>{{ order_details.maketime }}</p>
      </van-step>
      <van-step v-if="order_details.status > 1">
        <h3>仓库处理中</h3>
        <p>{{ order_details.createtime }}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { OrderDetail, GetLogistics } from "network/profile";
export default {
  data() {
    return {
      order_details: {},
      logistics_list: []
    };
  },
  methods: {
    onClickReturn() {
      this.$router.back();
    },
    // 订单状态
    orderStatus(status) {
      let status_text;
      if (this.order_details.freight_number) status_text = "运输中";
      else if (status == 2) status_text = "备货中";
      else if (status == 3) status_text = "制作中";
      else if (status == 4) status_text = "已发货";
      return status_text;
    },
    // 网络请求
    _OrderDetail() {
      OrderDetail(this.$route.query.id).then(res => {
        this.order_details = res.info;
        if (res.info.freight_number && res.info.freight_name) {
          this._GetLogistics({
            number: res.info.freight_number,
            name: res.info.freight_name,
            ordersn: res.info.ordersn
          });
        }
      });
    },
    _GetLogistics(params) {
      GetLogistics(params).then(res => (this.logistics_list = res));
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

<style lang="less">
.view_logistics {
  .van-steps {
    .van-step {
      color: #cccccc;
      .van-step__circle-container {
        .van-step__circle {
          width: 20px;
          height: 20px;
          background-color: #cccccc;
        }
      }
      .van-step__line {
        background-color: #cccccc;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.view_logistics {
  .view_logistics_top {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 178px;
    padding: 30px;
    margin-bottom: 20px;
    background-color: #ffffff;
    font-size: 24px;
    line-height: 40px;
    color: #999999;
    .view_logistics_img {
      min-width: 120px;
      height: 120px;
      padding: 20px 0;
      margin-right: 44px;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
      border-radius: 18px;
      img {
        display: block;
        width: auto;
        height: 100%;
        margin: auto;
      }
    }
    p {
      &:nth-child(1) {
        font-weight: 700;
        span {
          color: #22c19b;
        }
      }
    }
  }
}
</style>
