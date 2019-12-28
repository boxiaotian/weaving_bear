<template>
  <div class="pay_success">
    <van-icon name="passed" color="#00cc00" size="100" />
    <div class="pay_success_title">订单支付成功</div>
    <div class="pay_success_price">￥{{ money }}</div>
    <div class="pay_success_stocking">我们尽快为您定制</div>
    <p class="prompt_p">
      织布熊将给{{ $store.state.p_info.name }}捐赠{{
        $store.state.p_info.price
      }}元
    </p>
    <div class="pay_success_line"></div>
    <router-link
      :to="{ path: '/singleCharityPool', query: { paysn: $route.query.paysn } }"
    >
      <van-button
        v-if="$store.state.p_info.type"
        class="check_order"
        type="primary"
        color="#ff7301"
        text="您也可以向我们建议接受此捐款的公益项目"
        round
      />
    </router-link>
    <router-link to="/myOrder">
      <van-button
        :class="[$store.state.p_info.type ? 'back_to_home' : 'check_order']"
        type="primary"
        color="#ff7301"
        text="查看订单"
        :plain="$store.state.p_info.type ? true : false"
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
    GetOrderPay(this.$route.query.paysn).then(res => {
      this.money = res.money;
      if (!this.$store.state.p_info) {
        this.$store.commit("pInfo", {
          ...res.pInfo,
          price: res.price,
          type: 1
        });
      }
    });
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
    margin: 30px auto;
    font-size: 30px;
    line-height: 30px;
    color: #999999;
  }
  .prompt_p {
    margin-bottom: 40px;
    font-size: 24px;
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
    min-width: 367px;
    height: 80px;
    margin: 110px auto 30px;
    line-height: 80px;
  }
  .back_to_home {
    margin: 0 auto 30px;
  }
}
</style>
