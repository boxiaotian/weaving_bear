<template>
  <div class="promotion_reward">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="promotion_reward_top">
      <h1>1530.00</h1>
      <p>累计收入（元）</p>
    </div>
    <van-cell-group title="明细" :border="false">
      <van-cell
        title-class="promotion_reward_title"
        value-class="promotion_reward_value"
        label-class="promotion_reward_label"
        title="购买者名称"
        value="+2.88"
        label="11月2日  15:59"
        v-for="item in 6"
        :key="item"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.replace("/promotionCenter");
    }
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.promotion_reward {
  .promotion_reward_top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 750px;
    height: 350px;
    margin-bottom: 35px;
    background: linear-gradient(-31deg, #ffa868 0%, #ffc8a0 100%);
    font-size: 30px;
    color: #ffffff;
    text-align: center;
    h1 {
      font-size: 72px;
      font-weight: 700;
    }
  }
  .van-cell-group__title {
    font-size: 36px;
    font-weight: 700;
    color: #000000;
  }
  .van-cell-group {
    .van-cell {
      .promotion_reward_title {
        font-size: 30px;
        .promotion_reward_label {
          font-size: 18px;
          color: #999999;
        }
      }
      .promotion_reward_value {
        font-size: 36px;
        color: #ff8e3c;
      }
    }
  }
}
</style>
