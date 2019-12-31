<template>
  <div class="withdraw">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="withdraw_group">
      <div>
        <span>账户余额将提现到微信</span>
        <span style="color:#001fa4" @click="onWithdrawRecord">提现记录</span>
      </div>
      <div>
        <van-field
          label="¥"
          placeholder="请输入提现金额"
          @touchstart.native.stop="show_keyboard = true"
          v-model="amount_value"
        />
      </div>
      <div>
        <span>可提现金额：￥{{ money }}</span>
        <span style="color:#001fa4" @click="onWithdrawAll">全部提现</span>
      </div>
    </div>
    <van-button
      type="primary"
      text="提现到微信"
      color="#ff7301"
      size="large"
      @click="onWithdrawWeChat"
      round
    />
    <van-number-keyboard
      v-model="amount_value"
      :show="show_keyboard"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="show_keyboard = false"
      @input="onInput"
      @delete="onDelete"
      safe-area-inset-bottom
    />
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { MyMoney, AddApply } from "network/profile";
export default {
  data() {
    return {
      money: "0.00",
      amount_value: "",
      show_keyboard: false
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onWithdrawRecord() {
      this.$router.push("/withdrawRecord");
    },
    onWithdrawAll() {
      if (this.money > 0) this.amount_value = this.money;
      else this.$toast("抱歉，暂无可提现余额");
    },
    onWithdrawWeChat() {
      if (!this.amount_value) this.$toast("请输入提现余额");
      else if (this.amount_value <= 0) this.$toast("可提现余额不足");
      else if (this.amount_value > this.money) this.$toast("超出可提现范围");
      else this._AddApply();
    },
    onInput() {},
    onDelete() {},
    // 网络请求
    _MyMoney() {
      MyMoney().then(res => (this.money = res.info.money));
    },
    _AddApply() {
      AddApply(this.amount_value).then(() => {
        this.$toast("提现成功");
        this.amount_value = "";
        this._MyMoney();
      });
    }
  },
  created() {
    this._MyMoney();
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

<style lang="less">
.withdraw {
  .van-nav-bar {
    .van-nav-bar__right {
      bottom: 50%;
      right: 30px;
      transform: translateY(50%);
      width: 100px;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      .van-nav-bar__text {
        padding: 0;
        color: #001fa4;
      }
    }
  }
  .withdraw_group {
    .van-cell {
      .van-field__label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 72px;
        font-size: 48px;
      }
      .van-cell__value {
        input {
          font-size: 72px;
          line-height: 72px;
          font-family: "DIN-Black";
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.withdraw {
  height: 1000px;
  padding: 0 30px;
  .withdraw_group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 350px;
    padding: 40px;
    margin: 24px auto 126px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    font-size: 24px;
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .van-cell {
        padding: 0;
        padding-bottom: 30px;
        border-bottom: solid 2px #e6e6e6;
      }
    }
  }
}
</style>
