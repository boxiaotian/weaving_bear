<template>
  <div class="confirm_order">
    <return-btn @onClickReturn="onClickReturn" />
    <div
      class="swipe_group"
      :style="{ height: swipeHeight.toFixed(3) + 'rem' }"
    >
      <van-swipe :autoplay="3000" indicator-color="#ff7301">
        <van-swipe-item v-for="(item, index) in swipe_list" :key="index">
          <img
            :class="[details.isextend ? 'border_radius' : '']"
            :src="$store.state.interface_domain + item"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="commodity_info">
      <div class="commodity_info_name">{{ details.title }}</div>
      <div class="commodity_info_brief">
        {{ details.descri }}
      </div>
      <div class="commodity_info_price">¥{{ selected_norm.price }}</div>
    </div>
    <div class="commodity_graphic">
      <div class="commodity_graphic_title">图文详情</div>
      <div class="commodity_graphic_details" v-html="details.details"></div>
    </div>
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
        @click="onClickIcon(1)"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="onClickIcon(0)"
      />
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
        {{ details.title }}
      </div>
      <div class="commodity_info_brief">
        {{ details.descri }}
      </div>
      <div class="commodity_overall_norm">
        <!-- <div>
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
        </div> -->
        <!-- <div> -->
        <h6>规格</h6>
        <div class="commodity_norm_select" @click="onNormSelect">
          {{ selected_norm.name }}
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
        <!-- </div> -->
      </div>
      <!-- <div class="charitable_projects">
        <h6>
          选择公益项目支持 <span>（平台将以您的名义给所选公益项目捐赠）</span>
        </h6>
        <div class="commodity_charitable_select" @click="onCharitableSelect">
          {{ selected_public.name }}
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
            :columns-placeholder="[public_tips]"
            :columns-num="1"
          />
          <div class="load_more" @click="onLoadMore">
            <span v-if="isrequest">点击加载更多</span>
            <span v-else>暂无更多～</span>
          </div>
        </van-popup>
      </div> -->
      <van-cell title="商品备注" :border="false">
        <van-field
          v-model="product_notes"
          placeholder="如是手机壳请填写您的机型"
        />
      </van-cell>
      <van-cell title="选择数量" :border="false">
        <van-stepper slot="right-icon" v-model="number_value" integer />
      </van-cell>
      <van-cell title="价格" :border="false">
        <div slot="right-icon" class="commodity_info_price">
          ￥{{ (selected_norm.price * number_value).toFixed(2) }}
        </div>
      </van-cell>
      <van-button
        class="commodity_shopping"
        type="primary"
        text="立即购买"
        color="#ff7301"
        v-if="isbuy"
        @click="onBuy"
        round
      />
      <van-button
        class="commodity_shopping"
        type="primary"
        text="加入购物车"
        color="#ff7301"
        @click="onCart"
        v-else
        round
      />
    </van-popup>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
// import { PublicPoolList } from "network/charityPool";
import { ShareGoodsDetail, GoodsOver, AddCart } from "network/share";
export default {
  data() {
    return {
      swipeHeight: 0, // 轮播图高度
      details: {}, // 商品详情
      swipe_list: [],
      show_popup: false, // 弹窗
      show_model: false, //机型弹窗
      show_norm: false, // 规格弹窗
      selected_norm: {}, // 选中的规格
      norm_list: {}, // 规格数据
      product_notes: "", // 商品备注
      number_value: 1, // 购买值
      isbuy: true
      // public_lool_list: [], // 公益列表
      // show_charitable: false, // 公益弹窗
      // selected_public: { id: 0, name: "不选择" }, //选中的公益
      // charitable_list: { province_list: {} }, // 公益数据
      // public_tips: "暂无公益支持", // 公益提示,
      // isrequest: true, // 是否请求公益
      // isload: false, // 是否显示加载
      // page: 1, // 公益分页
    };
  },
  methods: {
    onClickReturn() {
      this.$router.go(-1);
    },
    onClickIcon(type) {
      if (type) this.$toast("联系客服");
      else this.$router.push("/shoppingCart");
    },
    // 显示购买弹出层
    onShowPopup(type) {
      this.show_popup = !this.show_popup;
      this.isbuy = type;
    },
    // 选择规格
    onNormSelect() {
      this.show_norm = !this.show_norm;
    },
    onNormConfirm(obj) {
      this.show_norm = !this.show_norm;
      this.details.specs[0].item.map(item => {
        if (obj[0].code == item.id) this.selected_norm = item;
      });
    },
    // // 选择公益项目
    // onCharitableSelect() {
    //   if (this.details.ispublic) {
    //     this._PublicPoolList();
    //     this.show_charitable = !this.show_charitable;
    //   } else this.$toast("抱歉，该商品未参与公益");
    // },
    // onCharitableConfirm(obj) {
    //   this.show_charitable = !this.show_charitable;
    //   if (obj[0].code) {
    //     this.public_lool_list.map(item => {
    //       if (obj[0].code == item.id) this.selected_public = item;
    //     });
    //   } else this.selected_public = { id: 0, name: "不选择" };
    // },
    // // 点击加载更多
    // onLoadMore() {
    //   if (this.isrequest) this._PublicPoolList();
    //   else this.$toast("暂无更多");
    // },
    // 立即购买
    onBuy() {
      let data = {
        shareid: this.$route.query.uid,
        sid: this.$route.query.sid,
        id: this.$route.query.id,
        spec_item_id: this.selected_norm.id,
        spec_item_name: this.selected_norm.name,
        spec_item_price: this.selected_norm.price,
        num: this.number_value,
        remark: this.product_notes
      };
      if (this.details.isextend && this.product_notes) {
        this.$toast("请备注你的手机壳机型");
      } else {
        this.$store.commit("submitInfo", { data, type: "share" });
        this.$router.push("/submitOrder");
      }
    },
    // 加入购物车
    onCart() {
      let data = {
        shareid: this.$route.query.uid,
        sid: this.$route.query.sid,
        id: this.$route.query.id,
        spec_item_id: this.selected_norm.id,
        spec_item_name: this.selected_norm.name,
        spec_item_price: this.selected_norm.price,
        num: this.number_value,
        remark: this.product_notes
      };
      if (this.details.isextend && this.product_notes) {
        this.$toast("请备注你的手机壳机型");
      } else this._AddCart(data);
    },
    // 网络请求
    _ShareGoodsDetail() {
      const { uid, sid, id } = this.$route.query;
      ShareGoodsDetail(uid, sid, id).then(res => {
        this.details = res.info;
        // if (this.details.ispublic) this.public_tips = "不选择";
        document.title = this.details.title;
        this.swipe_list = res.info.images.split(",");
        // 规格信息
        this.selected_norm = res.info.specs[0].item[0];
        let province_list = {};
        res.info.specs[0].item.map(item => {
          province_list[item.id] = item.name;
        });
        this.norm_list = { province_list };
      });
    },
    _GoodsOver(params) {
      GoodsOver(params).then(res => {
        console.log(res);
      });
    },
    _AddCart(params) {
      AddCart(params).then(() => this.$toast("加入购物车成功"));
    }
    // _PublicPoolList() {
    //   if (this.isrequest) {
    //     PublicPoolList(this.page++).then(res => {
    //       if (res.list.length == 10) this.isrequest = true;
    //       else this.isrequest = false;
    //       this.public_lool_list = this.public_lool_list.concat(res.list);
    //       let province_list = this.charitable_list.province_list;
    //       res.list.map(item => (province_list[item.id] = item.name));
    //       this.charitable_list = { province_list };
    //     });
    //   }
    // }
  },
  created() {
    this._ShareGoodsDetail();
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
  .commodity_graphic {
    .commodity_graphic_details {
      margin-bottom: 110px;
      p {
        text-indent: 0;
      }
      img {
        max-width: 100%;
        max-height: auto;
      }
    }
  }
  .van-goods-action {
    .van-goods-action-icon {
      .van-goods-action-icon__icon {
        font-size: 40px;
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
              height: 90%;
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
                .van-picker-column {
                  font-size: 30px;
                  .van-picker-column__wrapper {
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
            width: auto;
            height: 95%;
          }
          .border_radius {
            border-radius: 25px;
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
    margin: 20px auto;
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
      height: 840px;
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
        // display: flex;
        // flex-direction: row;
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
        margin-top: 26px;
        background-color: #eeeeee;
        border-radius: 25px;
        font-size: 30px;
        line-height: 54px;
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
      & > .van-cell {
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
        .van-cell__title {
          flex: none;
          width: 115px;
        }
        .van-cell__value {
          .van-cell {
            padding: 0 20px;
          }
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
        margin: 46px auto 0;
        box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.05);
        font-size: 36px;
        font-weight: 700;
      }
    }
    .load_more {
      width: 100%;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
  }
}
</style>
