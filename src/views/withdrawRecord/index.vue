<template>
  <div class="withdraw_record">
    <return-btn @onClickReturn="onClickReturn" />
    <van-cell-group
      :title="thisMonth(item.month)"
      v-for="item in withdraw_list"
      :key="item.id"
      border
    >
      <van-cell
        title-class="withdraw_record_title"
        label-class="withdraw_record_label"
        title="提现"
        :label="item1.createtime"
        v-for="item1 in item.list"
        :key="item1.id"
      >
        <template slot="default">
          <div class="withdraw_record_amount">{{ item1.price }}</div>
          <div
            class="withdraw_record_status"
            :style="{ color: recordStatus(item1.status).color }"
          >
            {{ recordStatus(item1.status).text }}
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { ApplyWithdrawList } from "network/profile";
export default {
  data() {
    return {
      withdraw_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      this.$router.back(-1);
    },
    recordStatus(index) {
      if (index == 1 || index == 2) return { color: "#ff0000", text: "提现中" };
      else if (index == 3) return { color: "#ff7301", text: "已打款" };
      else return { color: "#999999", text: "打款失败" };
    },
    thisMonth(month) {
      let date = new Date();
      let year_month = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      return month == year_month ? "本月" : month;
    },
    // 网络请求
    _ApplyWithdrawList() {
      if (this.isrequest) {
        ApplyWithdrawList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          let withdraw_data = {};
          while (res.list.length) {
            let current = res.list.pop(); // 会影响原数组
            withdraw_data[current.month] = withdraw_data[current.month] || [];
            withdraw_data[current.month].push(current);
          }
          Object.keys(withdraw_data).map((key, index) => {
            this.withdraw_list.push({
              id: index + 1,
              month: key,
              list: withdraw_data[key]
            });
          });
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
        this._ApplyWithdrawList();
      }
    }
  },
  created() {
    this._ApplyWithdrawList();
    window.onscroll = () => this.onScroll();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
  },
  beforeDestroy() {
    window.onscroll = "";
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
