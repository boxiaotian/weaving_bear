<template>
  <div class="promotion_reward">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="promotion_reward_top">
      <h1>{{ allmoney }}</h1>
      <p>累计收入（元）</p>
    </div>
    <van-cell-group title="明细" :border="false">
      <van-cell
        title-class="promotion_reward_title"
        value-class="promotion_reward_value"
        label-class="promotion_reward_label"
        v-for="item in reward_list"
        :key="item.id"
        :title="item.nickname"
        :value="totalRewards(item.agentprice1, item.agentprice2)"
        :label="item.overtime"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { RecommendOrderMoney } from "network/profile";
export default {
  data() {
    return {
      allmoney: "",
      reward_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/promotionCenter");
    },
    // 奖励合计
    totalRewards(agentprice1, agentprice2) {
      let total = parseFloat(agentprice1) + parseFloat(agentprice2);
      return "+" + total.toFixed(2);
    },
    // 网络请求
    _RecommendOrderMoney() {
      if (this.isrequest) {
        RecommendOrderMoney(this.page++).then(res => {
          if (res.info.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          if (this.page == 2) this.allmoney = res.info.allmoney;
          this.reward_list = this.reward_list.concat(res.info.list);
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
        this._RecommendOrderMoney();
      }
    }
  },
  created() {
    this._RecommendOrderMoney();
    window.onscroll = () => this.onScroll();
  },
  beforeDestroy() {
    window.onscroll = "";
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
