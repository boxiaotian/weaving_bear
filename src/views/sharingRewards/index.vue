<template>
  <div class="sharing_rewards">
    <return-btn @onClickReturn="onClickReturn" />
    <div
      class="sharing_rewards_item"
      v-for="item in share_commission_list"
      :key="item.id"
    >
      <div class="sharing_rewards_month">
        <span>{{ item.date }}</span>
        <!-- <span>收入：￥5.76</span> -->
      </div>
      <div
        class="sharing_rewards_source"
        v-for="item1 in item.list"
        :key="item1.id"
      >
        <div class="commodity_info">
          <div class="commodity_info_left">
            <div class="commodity_img_group">
              <img :src="$store.state.interface_domain + item1.gthumb" />
            </div>
            <div style="width:78%">
              <h5>{{ item1.gtitle }}</h5>
              <h6>{{ item1.gdescri }}</h6>
            </div>
          </div>
          <div class="reward_price">+{{ item1.shareprice }}</div>
        </div>
        <div class="buyers">
          <div>
            <img :src="item1.avatar" />
            <span>{{ item1.nickname }}</span>
          </div>
          <div>{{ item1.overtime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { ShareCommission } from "network/profile";
export default {
  data() {
    return {
      share_commission_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    // 网络请求
    _ShareCommission() {
      if (this.isrequest) {
        ShareCommission(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          let share_data = {};
          while (res.list.length) {
            let current = res.list.pop(); // 会影响原数组
            share_data[current.date] = share_data[current.date] || [];
            share_data[current.date].push(current);
          }
          Object.keys(share_data).map((key, index) => {
            this.share_commission_list.push({
              id: index + 1,
              date: key,
              list: share_data[key]
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
        this._ShareCommission();
      }
    }
  },
  created() {
    this._ShareCommission();
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
.sharing_rewards {
  padding: 0 30px;
  .sharing_rewards_item {
    .sharing_rewards_month {
      font-size: 30px;
      font-weight: 700;
      line-height: 60px;
      color: #999999;
      span {
        margin-right: 26px;
      }
    }
    .sharing_rewards_source {
      width: 100%;
      height: 230px;
      padding: 0 30px;
      margin-bottom: 10px;
      background-color: #ffffff;
      border-radius: 18px;
      .commodity_info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 150px;
        padding: 34px 0;
        border-bottom: solid 1px #f6f6f6;
        .commodity_info_left {
          display: flex;
          flex-direction: row;
          width: 75%;
          .commodity_img_group {
            width: 78px;
            height: 78px;
            margin-right: 30px;
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
          h5 {
            font-size: 30px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          h6 {
            font-size: 24px;
            font-weight: 400;
            color: #cccccc;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .reward_price {
          width: 25%;
          font-size: 36px;
          font-weight: 700;
          color: #ff7301;
          text-align: right;
        }
      }
      .buyers {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 80px;
        border-top: solid 1px #f6f6f6;
        font-size: 24px;
        color: #333333;
        img {
          width: 40px;
          height: 40px;
          background-color: #ff7301;
          border-radius: 50%;
        }
        span {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
