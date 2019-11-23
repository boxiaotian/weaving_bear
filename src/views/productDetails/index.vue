<template>
  <div class="confirm_order">
    <return-btn @onClickReturn="onClickReturn" />
    <div
      class="swipe_group"
      :style="{ height: swipeHeight.toFixed(3) + 'rem' }"
    >
      <van-swipe :autoplay="3000" indicator-color="#ff7301">
        <van-swipe-item v-for="item in swipe_list" :key="item">
          <img src="~assets/img/customize/phone_case_big.png" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="commodity_info">
      <div class="commodity_info_name">定制手机壳</div>
      <div class="commodity_info_brief">
        商品简介商品简介商品简介商品简介商品简介
      </div>
      <div class="commodity_info_price">¥28.88</div>
    </div>
    <div class="commodity_graphic">
      <div class="commodity_graphic_title">图文详情</div>
      <div>
        产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情产品图文详情
      </div>
    </div>
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        color="linear-gradient(-90deg,#ffa200 0%,#ffcc44 100%)"
        @click="onShowPopup(false)"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        color="#ff7301"
        @click="onShowPopup(true)"
      />
    </van-goods-action>
    <van-popup
      v-model="show_popup"
      position="bottom"
      round
      safe-area-inset-bottom
    >
      <div class="commodity_info_name">
        定制手机壳
      </div>
      <div class="commodity_info_brief">
        1.商品简介商品简介商品简介2.商品简介商品简介商品简介3.商品简介商品简介商品简介
      </div>
      <div class="commodity_overall_norm">
        <div>
          <h6>机型</h6>
          <div class="commodity_norm_select" @click="onModelSelect">
            iPhone6/iPhone6s
          </div>
          <van-popup
            v-model="show_model"
            position="bottom"
            round
            safe-area-inset-bottom
          >
            <van-area
              :area-list="model_list"
              title="机型"
              @confirm="onModelConfirm"
              @cancel="show_model = !show_model"
            />
          </van-popup>
        </div>
        <div>
          <h6>规格</h6>
          <div class="commodity_norm_select" @click="onNormSelect">
            请选择规格
          </div>
          <van-popup
            v-model="show_norm"
            position="bottom"
            round
            safe-area-inset-bottom
          >
            <van-area
              title="规格"
              @confirm="onNormConfirm"
              @cancel="show_norm = !show_norm"
              :area-list="norm_list"
              :columns-num="1"
            />
          </van-popup>
        </div>
      </div>
      <div class="charitable_projects">
        <h6>
          选择公益项目支持 <span>（平台将以您的名义给所选公益项目捐赠）</span>
        </h6>
        <div class="commodity_charitable_select" @click="onCharitableSelect">
          不选择
        </div>
        <van-popup
          v-model="show_charitable"
          position="bottom"
          round
          safe-area-inset-bottom
        >
          <van-area
            title="公益项目"
            @confirm="onCharitableConfirm"
            @cancel="show_charitable = !show_charitable"
            :area-list="charitable_list"
            :columns-num="1"
          />
        </van-popup>
      </div>
      <van-cell title="选择数量">
        <van-stepper slot="right-icon" v-model="number_value" integer />
      </van-cell>
      <van-cell title="价格">
        <div slot="right-icon" class="commodity_info_price">￥28.88</div>
      </van-cell>
      <div class="commodity_shopping" @click="oncartBuy">
        {{ isbuy ? "立即购买" : "加入购物车" }}
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  data() {
    return {
      swipeHeight: 0, // 轮播图高度
      swipe_list: [1, 2, 3, 4, 5],
      show_popup: false, // 弹窗
      show_model: false, //机型弹窗
      model_list: {
        province_list: {
          110000: "北京市",
          120000: "天津市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
        }
      }, // 机型数据
      show_norm: false, // 规格弹窗
      norm_list: {
        province_list: {
          110000: "北京市",
          120000: "天津市"
        }
      }, // 规格数据
      show_charitable: false, // 公益弹窗
      charitable_list: {
        province_list: {
          110000: "北京市",
          120000: "天津市"
        }
      }, // 公益数据
      number_value: 1, // 购买值
      isbuy: true
    };
  },
  created() {
    console.log(this.$route.params.id);
  },
  methods: {
    onClickReturn() {
      return this.$router.back();
    },
    onClickIcon() {
      console.log("点击图标");
    },
    // 显示购买弹出层
    onShowPopup(type) {
      this.show_popup = !this.show_popup;
      this.isbuy = type;
    },
    // 选择机型
    onModelSelect() {
      this.show_model = !this.show_model;
    },
    onModelConfirm(obj) {
      this.show_model = !this.show_model;
      console.log(obj);
    },
    // 选择规格
    onNormSelect() {
      this.show_norm = !this.show_norm;
    },
    onNormConfirm(obj) {
      this.show_norm = !this.show_norm;
      console.log(obj);
    },
    // 选择公益项目
    onCharitableSelect() {
      this.show_charitable = !this.show_charitable;
    },
    onCharitableConfirm(obj) {
      this.show_charitable = !this.show_charitable;
      console.log(obj);
    },
    // 加入购物车或购买
    oncartBuy() {
      if (this.isbuy) {
        this.$router.push("/submitOrder");
      }
    }
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
    this.swipeHeight = (window.outerWidth * window.dpr) / window.rem;
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
.confirm_order {
  .swipe_group {
    .van-swipe {
      .van-swipe__indicators {
        bottom: 30px;
        .van-swipe__indicator {
          width: 12px;
          height: 12px;
          margin-right: 14px;
          background-color: #a0a0a0;
        }
      }
    }
  }
  .van-goods-action {
    .van-goods-action-icon {
      .van-goods-action-icon__icon {
        font-size: 30px;
        color: #000000;
      }
    }
  }
  .van-popup--bottom {
    &.van-popup--round {
      .commodity_overall_norm,
      .charitable_projects {
        .van-popup--bottom {
          &.van-popup--round {
            padding: 0;
            .van-picker {
              .van-hairline--top-bottom {
                height: 90px;
                line-height: 90px;
                .van-picker__cancel,
                .van-picker__title,
                .van-picker__confirm {
                  font-size: 36px;
                }
                .van-picker__cancel,
                .van-picker__confirm {
                  color: #ff7301;
                }
              }
              .van-picker__columns {
                height: 808px !important;
                .van-picker-column {
                  font-size: 30px;
                  .van-picker-column__wrapper {
                    .van-picker-column__item {
                      height: 60px !important;
                      line-height: 60px;
                      border-bottom: solid 1px #eeeeee; /* px */
                    }
                    .van-picker-column__item--selected {
                      color: #ff7301;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .van-cell {
        .van-stepper {
          .van-stepper__minus,
          .van-stepper__plus {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            background-color: #ff7301;
            font-size: 30px;
            font-weight: 700;
            color: #ffffff;
            vertical-align: top;
            &::after {
              width: 4px;
              height: 15px;
            }
            &::before {
              width: 15px;
              height: 4px;
            }
          }
          .van-stepper__minus--disabled {
            width: 40px;
            height: 40px;
            background-color: #ffffff;
            border: solid 1px #ff7301;
            color: #ff7301;
          }
          .van-stepper__input {
            vertical-align: top;
            width: 66px;
            height: 40px;
            margin: 0;
            background-color: #ffffff;
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.confirm_order {
  .swipe_group {
    width: 100%;
    height: 750px;
    background-color: #eeeeee;
    .van-swipe {
      width: 100%;
      height: 100%;
      .van-swipe__track {
        .van-swipe-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img {
            width: 40%;
            height: auto;
          }
        }
      }
      .van-swipe__indicators {
        .van-swipe__indicator {
          width: 12px;
          height: 12px;
          background-color: #a0a0a0;
        }
      }
    }
  }
  .commodity_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 246px;
    padding: 40px 30px;
    background-color: #ffffff;
    font-size: 36px;
    line-height: 44px;
    font-weight: 700;
    color: #333333;
    .commodity_info_name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .commodity_info_brief {
      font-size: 28px;
      line-height: 36px;
      color: #ababab;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    .commodity_info_price {
      color: #ff0000;
    }
  }
  .commodity_graphic {
    width: 100%;
    height: 400px;
    padding: 30px;
    margin: 20px auto 110px;
    background-color: #ffffff;
    font-size: 24px;
    line-height: 32px;
    .commodity_graphic_title {
      margin: 56px 0;
      font-size: 30px;
      line-height: 38px;
    }
  }
  .van-goods-action {
    width: 100%;
    height: 110px;
    padding-right: 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    .van-goods-action-icon {
      width: 108px;
      height: 110px;
      font-size: 30px;
      color: #000000;
    }
    .van-goods-action-button--first {
      height: 70px;
      border-radius: 35px 0 0 35px;
      font-size: 30px;
    }
    .van-goods-action-button--last {
      height: 70px;
      border-radius: 0px 35px 35px 0px;
      font-size: 30px;
    }
  }
  .van-popup--bottom {
    &.van-popup--round {
      width: 100%;
      height: 950px;
      padding: 56px 40px;
      background-color: #ffffff;
      border-radius: 30px 30px 0 0;
      .commodity_info_name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 36px;
        line-height: 44px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 14px;
      }
      .commodity_info_brief {
        width: 100%;
        height: 110px;
        font-size: 28px;
        line-height: 36px;
        color: #ababab;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .commodity_overall_norm {
        display: flex;
        flex-direction: row;
        & > div {
          &:nth-child(1) {
            min-width: 50%;
            margin-right: 30px;
          }
        }
        h6 {
          font-size: 28px;
          line-height: 28px;
          color: #333333;
        }
      }
      .charitable_projects {
        border-bottom: solid 1px #dbdbdb; /* px */
        h6 {
          font-size: 28px;
          line-height: 28px;
          color: #333333;
          span {
            font-size: 18px;
            line-height: 26px;
            color: #999999;
          }
        }
        .commodity_charitable_select {
          display: inline-block;
          margin: 26px 0 48px;
        }
      }
      .commodity_norm_select,
      .commodity_charitable_select {
        display: inline-block;
        position: relative;
        min-width: 240px;
        height: 50px;
        padding: 0 40px 0 20px;
        margin: 26px 0 58px;
        background-color: #eeeeee;
        border-radius: 25px;
        font-size: 30px;
        line-height: 50px;
        text-align: center;

        &::after {
          content: "\25BC";
          position: absolute;
          top: 50%;
          right: 20px;
          width: 16px;
          height: 14px;
          font-size: 16px;
          line-height: 14px;
          transform: translateY(-50%);
        }
      }
      .van-cell {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        margin-top: 60px;
        font-size: 28px;
        color: #333333;
        &:last-child {
          margin-top: 52px;
        }
        .van-stepper {
          width: 150px;
          height: 40px;
        }
        .commodity_info_price {
          font-size: 36px;
          font-weight: 700;
          color: #ff0000;
        }
      }
      .commodity_shopping {
        width: 95.2%;
        height: 88px;
        margin: 46px auto 0;
        background-color: #ff7301;
        box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.05);
        border-radius: 44px;
        font-size: 36px;
        line-height: 88px;
        font-weight: 700;
        color: #ffffff;
        text-align: center;
      }
    }
  }
}
</style>
