<template>
  <div class="pay_success">
    <van-icon name="passed" color="#00cc00" size="100" />
    <div class="pay_success_title">订单支付成功</div>
    <div class="pay_success_price">￥{{ money }}</div>
    <div class="pay_success_stocking">仓库正在为您备货中</div>
    <div class="pay_success_line"></div>
    <router-link to="/myOrder">
      <van-button
        class="check_order"
        type="primary"
        color="#ff7301"
        text="查看订单"
        round
      />
    </router-link>
    <router-link to="/">
      <van-button
        class="back_to_home"
        type="primary"
        color="#ff7301"
        text="返回首页"
        plain
        round
    /></router-link>
  </div>
</template>

<script>
import { GetOrderPay } from "network/profile";
export default {
  data() {
    return {
      money: ""
    };
  },
  created() {
    GetOrderPay(this.$route.query.paysn).then(res => (this.money = res.money));
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
  }
};
</script>

<style lang="less" scoped>
.pay_success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 88px;
  font-size: 36px;
  .van-icon {
    margin-top: 118px;
  }
  .pay_success_title {
    margin: 70px auto;
    line-height: 36px;
    font-weight: 700;
  }
  .pay_success_price {
    font-size: 72px;
    line-height: 72px;
    font-weight: 700;
  }
  .pay_success_stocking {
    margin: 30px auto 68px;
    font-size: 30px;
    line-height: 30px;
    color: #999999;
  }
  .pay_success_line {
    width: 73%;
    height: 2px;
    margin: 0 100px;
    background-color: #e5e5e5;
  }
  .check_order,
  .back_to_home {
    width: 367px;
    height: 80px;
    margin: 110px auto 30px;
    line-height: 80px;
  }
  .back_to_home {
    margin: 0;
  }
}
</style>
