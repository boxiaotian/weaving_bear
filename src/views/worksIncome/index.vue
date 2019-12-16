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
        <!-- <span>收入：￥5.76</span> -->
      </div>
      <div class="works_income_source" v-for="item in 2" :key="item">
        <div class="commodity_info">
          <div class="commodity_info_left">
            <div class="commodity_img_group">
              <img src="~assets/img/customize/phone_case.png" />
            </div>
            <div style="width:78%">
              <h5>定制手机壳定制手机壳定制手机壳定制手机壳</h5>
              <h6>高清彩印 来图定制高清彩印 来图定制高清彩印 来图定制</h6>
            </div>
          </div>
          <div class="reward_price">+200.88</div>
        </div>
        <div class="buyers">
          <div>
            <img src="" />
            <span>购买者</span>
          </div>
          <div><span>2019.10.26</span><span>15:59</span></div>
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
      works_income_list: [
        {
          id: 1,
          date: "2019/10",
          gthumb: "/uploads/20191129/FoOm6lUStodHwkqD20ebEFYn1oQc.jpg",
          gtitle: "华为畅享 9S",
          descri: "华为畅享 9S",
          ulogo:
            "http://thirdwx.qlogo.cn/mmopen/mONcle9pic3z4IuujpVH8ia8bBeCvf65n8ckCnfYyNzAEgT36liclicv0YyaIlrkR3icEkbYPRmW8Jb9E3RLvKTIWKINMtUUrRbFI/132",
          uname: "小田",
          createtime: "2019.12.10 16.36",
          reward: "200.00"
        },
        {
          id: 2,
          date: "2019/09",
          gthumb: "/uploads/20191129/FoOm6lUStodHwkqD20ebEFYn1oQc.jpg",
          gtitle: "华为畅享 9S",
          descri: "华为畅享 9S",
          ulogo:
            "http://thirdwx.qlogo.cn/mmopen/mONcle9pic3z4IuujpVH8ia8bBeCvf65n8ckCnfYyNzAEgT36liclicv0YyaIlrkR3icEkbYPRmW8Jb9E3RLvKTIWKINMtUUrRbFI/132",
          uname: "小田",
          createtime: "2019.12.10 16.36",
          reward: "200.00"
        },
        {
          id: 3,
          date: "2019/08",
          gthumb: "/uploads/20191129/FoOm6lUStodHwkqD20ebEFYn1oQc.jpg",
          gtitle: "华为畅享 9S",
          descri: "华为畅享 9S",
          ulogo:
            "http://thirdwx.qlogo.cn/mmopen/mONcle9pic3z4IuujpVH8ia8bBeCvf65n8ckCnfYyNzAEgT36liclicv0YyaIlrkR3icEkbYPRmW8Jb9E3RLvKTIWKINMtUUrRbFI/132",
          uname: "小田",
          createtime: "2019.12.10 16.36",
          reward: "200.00"
        }
      ]
    };
  },
  methods: {
    onClickReturn() {
      this.$router.push("/works");
    },
    // 网络请求
    _ShareGoodsBuyDetail() {
      let { sid, sgid } = this.$route.query;
      ShareGoodsBuyDetail(1, sid, sgid).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this._ShareGoodsBuyDetail();
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
            min-width: 78px;
            min-height: 78px;
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
