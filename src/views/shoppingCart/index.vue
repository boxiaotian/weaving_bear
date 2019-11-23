<template>
  <div class="shopping_cart">
    <return-btn @onClickReturn="onClickReturn" />
    <img
      class="management"
      src="~assets/img/management_btn.png"
      @click="onManagement"
    />
    <van-checkbox-group
      v-model="cart"
      ref="checkboxGroup"
      checked-color="#ff7301"
    >
      <van-checkbox
        class="commodity_item"
        v-for="item in 3"
        :key="item"
        :name="item"
      >
        <div class="commodity_item_content">
          <div class="commodity_item_img_group">
            <img src="~assets/img/customize/phone_case_big.png" />
          </div>
          <div>
            <h6>定制手机壳</h6>
            <div class="commodity_item_synopsis">高清彩印 来图定制</div>
            <div>￥28.88</div>
          </div>
          <div class="commodity_item_number">x{{ item }}0</div>
        </div>
      </van-checkbox>
    </van-checkbox-group>
    <div class="shopping_cart_footer">
      <van-checkbox
        v-model="select_all"
        checked-color="#ff7301"
        @click="onSelectAll"
        >全选</van-checkbox
      >
      <!-- <span v-show="isdelete">删除</span> -->
      <div class="shopping_cart_footer_right">
        <div class="free_shipping">不含运费</div>
        <div class="shopping_cart_total">合计：<span>¥1000.00</span></div>
        <van-button
          type="primary"
          color="#ff7301"
          :text="'结算(' + 1 + ')'"
          round
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  data() {
    return {
      cart: [],
      select_all: false,
      isdelete: false
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onManagement() {
      this.isdelete = !this.isdelete;
    },
    onSelectAll() {
      this.$refs.checkboxGroup.toggleAll(!this.select_all);
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

<style lang="less">
.shopping_cart {
  .van-nav-bar {
    .van-nav-bar__right {
      bottom: 50%;
      right: 30px;
      transform: translateY(50%);
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      .van-nav-bar__text {
        padding: 0;
        color: #000000;
      }
    }
  }
  .van-checkbox-group {
    .commodity_item {
      .van-checkbox__label {
        flex: 1;
      }
    }
  }
  .shopping_cart_footer {
    .van-checkbox {
      display: inline-block;
      .van-checkbox__icon {
        display: inline-block;
        vertical-align: top;
      }
      .van-checkbox__label {
        margin-left: 20px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.shopping_cart {
  padding: 30px;
  .management {
    position: fixed;
    right: 0;
    bottom: 300px;
    width: 150px;
    height: 150px;
  }
  .van-checkbox-group {
    .commodity_item {
      width: 100%;
      height: 200px;
      padding: 30px 20px 50px;
      margin-bottom: 30px;
      background-color: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
      border-radius: 18px;
      .van-checkbox__icon {
        font-size: 30px;
      }
      .van-checkbox__label {
        flex: 1;
        .commodity_item_content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 30px;
          line-height: 30px;
          & > div:nth-child(2) {
            width: 65%;
          }
          .commodity_item_img_group {
            width: 120px;
            height: 120px;
            padding: 20px 0;
            margin-right: 40px;
            box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
            border-radius: 18px;
            img {
              display: block;
              width: auto;
              height: 100%;
              margin: auto;
            }
          }
          .commodity_item_synopsis {
            margin: 14px 0;
            font-size: 24px;
            color: #cccccc;
          }
          .commodity_item_number {
            font-size: 24px;
            color: #999999;
          }
        }
      }
    }
  }
  .shopping_cart_footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    padding: 20px 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    font-size: 28px;
    .shopping_cart_footer_right {
      display: flex;
      flex-direction: row;
      align-items: center;
      .free_shipping {
        font-size: 18px;
        color: #999999;
      }
      .shopping_cart_total {
        margin: 0 16px 0 20px;
        font-size: 30px;
        font-weight: 700;
        span {
          font-size: 36px;
          color: #ff7301;
        }
      }
      .van-button {
        width: 150px;
        height: 60px;
        line-height: 60px;
        padding: 0;
      }
    }
  }
}
</style>
