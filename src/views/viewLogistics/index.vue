<template>
  <div class="view_logistics">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="view_logistics_top">
      <div class="view_logistics_img">
        <img src="~assets/img/customize/phone_case_big.png" />
      </div>
      <div class="view_logistics_info">
        <p>物流状态：<span>运输中</span></p>
        <p>承运来源：圆通快递</p>
        <p>运单编号：9865612355</p>
      </div>
    </div>
    <van-steps direction="vertical" active-color="#22C19B">
      <van-step>
        <h3>商家正在通知快递公司揽件</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>您的包裹已出库</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>您的订单开始处理</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.push("/orderDetails");
    }
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
      width: 120px;
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
