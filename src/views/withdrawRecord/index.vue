<template>
  <div class="withdraw_record">
    <return-btn @onClickReturn="onClickReturn" />
    <van-cell-group title="分组1" v-for="item in 3" :key="item" border>
      <van-cell
        title-class="withdraw_record_title"
        label-class="withdraw_record_label"
        title="提现"
        label="2019.10.23  11:36"
        v-for="item in 3"
        :key="item"
      >
        <template slot="default">
          <div class="withdraw_record_amount">300.00</div>
          <div
            class="withdraw_record_status"
            :style="{ color: recordStatus(item).color }"
          >
            {{ recordStatus(item).text }}
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.go(-1);
    },
    recordStatus(index) {
      if (index == 1) return { color: "#ff0000", text: "提现中" };
      else if (index == 2) return { color: "#ff7301", text: "提现中" };
      else return { color: "#999999", text: "提现中" };
    }
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

<style lang="less" scoped>
.withdraw_record {
  .van-cell-group__title {
    padding: 34px 30px 20px;
    font-size: 30px;
    line-height: 50px;
    color: #666666;
  }
  .van-cell-group {
    .van-cell {
      padding: 30px;
      &::after {
        width: 92%;
        border-bottom: solid 2px #f6f6f6;
      }
      .withdraw_record_title {
        font-size: 36px;
        font-weight: 700;
        color: #000000;
        .withdraw_record_label {
          font-size: 24px;
          color: #999999;
        }
      }
      .van-cell__value {
        .withdraw_record_amount {
          font-family: "DIN-Black";
          font-size: 36px;
          color: #000000;
        }
        .withdraw_record_status {
          font-size: 24px;
          color: #999999;
        }
      }
    }
  }
  .withdraw_record_item {
    .withdraw_record_month {
      padding: 34px 30px 20px;
      font-size: 30px;
      color: #666666;
    }
    .withdraw_record_list {
      width: 100%;
      padding: 0 30px;
      background-color: #ffffff;
      div {
        width: 100%;
        height: 134px;
        padding: 30px 0;
        border-bottom: solid 2px #f6f6f6;
      }
    }
  }
}
</style>
