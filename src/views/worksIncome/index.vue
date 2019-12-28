<template>
  <div class="works_income">
    <return-btn @onClickReturn="onClickReturn" />
    <div
      class="works_income_item"
      v-for="item in works_income_list"
      :key="item.id"
    >
      <div class="works_income_month">
        <span>{{ item.date }}</span>
      </div>
      <div
        class="works_income_source"
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
          <div class="reward_price">+{{ item1.cInfo.shareprice }}</div>
        </div>
        <div class="buyers">
          <div>
            <img :src="item1.ulogo" />
            <span>{{ item1.uname }}</span>
          </div>
          <div>{{ item1.paytime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { ShareGoodsBuyDetail } from "network/profile";
export default {
  data() {
    return {
      works_income_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      this.$router.push("/works");
    },
    // 网络请求
    _ShareGoodsBuyDetail() {
      let { sid, sgid } = this.$route.query;
      if (this.isrequest) {
        ShareGoodsBuyDetail(this.page++, sid, sgid).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          let works_data = {};
          while (res.list.length) {
            let current = res.list.pop(); // 会影响原数组
            works_data[current.date] = works_data[current.date] || [];
            works_data[current.date].push(current);
          }
          Object.keys(works_data).map((key, index) => {
            this.works_income_list.push({
              id: index + 1,
              date: key,
              list: works_data[key]
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
        this._ShareGoodsBuyDetail();
      }
    }
  },
  created() {
    this._ShareGoodsBuyDetail();
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
.works_income {
  padding: 0 30px;
  .works_income_item {
    .works_income_month {
      font-size: 30px;
      font-weight: 700;
      line-height: 60px;
      color: #999999;
      span {
        margin-right: 26px;
      }
    }
    .works_income_source {
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          max-width: 158px;
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
