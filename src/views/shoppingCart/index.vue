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
      @change="onCheckbox"
      ref="checkboxGroup"
      checked-color="#ff7301"
    >
      <van-checkbox
        class="commodity_item"
        v-for="item in cart_list"
        :key="item.id"
        :name="item.id"
        @click="onCheckboxGoods(item.id, item.isselected)"
      >
        <div class="commodity_item_content">
          <div class="commodity_item_img_group">
            <img :src="$store.state.interface_domain + item.thumb" />
          </div>
          <div>
            <h6>{{ item.title }}</h6>
            <div class="commodity_item_synopsis">{{ item.descri }}</div>
            <div>
              <span>规格:{{ item.specitemname }}</span>
              <span>￥{{ item.specitemprice }}</span>
            </div>
          </div>
          <div class="commodity_item_number">x{{ item.num }}</div>
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
      <div class="shopping_cart_footer_right">
        <div class="free_shipping">不含运费</div>
        <div class="shopping_cart_total">
          合计：<span>¥{{ allmoney }}</span>
        </div>
        <van-button
          type="primary"
          color="#ff7301"
          @click="onSettlement"
          :text="'结算(' + cart.length + ')'"
          round
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { MyCartList, DeleteCart, ChangeSelected } from "network/profile";
export default {
  data() {
    return {
      cart_list: [], // 购物车列表
      cart: [], // 选择的商品
      isrequest: true,
      page: 1,
      select_all: true,
      allmoney: "0.00" //  选中的总价格
    };
  },
  methods: {
    // 返回上一页
    onClickReturn() {
      this.$router.back();
    },
    // 是否选中
    onCheckboxGoods(ids, isselected) {
      this._ChangeSelected({
        all: 0,
        ids,
        isselected: isselected == 1 ? 0 : 1
      });
    },
    // 删除选中的商品
    onManagement() {
      if (this.cart.length) {
        let ids = "";
        this.cart.map(item => (ids += item + ","));
        if (ids.length > 0) ids = ids.substr(0, ids.length - 1);
        this.$dialog
          .confirm({
            title: "您确定删除选中的商品吗？",
            confirmButtonColor: "#ff7301"
          })
          .then(() => this._DeleteCart(ids))
          .catch(() => {});
      } else this.$toast("请选择您要删除的商品");
    },
    a(id) {
      console.log(id);
    },
    // 单选
    onCheckbox() {
      let ids = "";
      this.cart.map(item => (ids += item + ","));
      if (ids.length > 0) ids = ids.substr(0, ids.length - 1);
      console.log(1);

      // this._ChangeSelected(ids);
    },
    onSelectAll() {
      let ids = "";
      this.cart.map(item => (ids += item + ","));
      if (ids.length > 0) ids = ids.substr(0, ids.length - 1);
      this.$refs.checkboxGroup.toggleAll(!this.select_all);
      this._ChangeSelected({ all: this.select_all ? 2 : 1 });
    },
    // 结算
    onSettlement() {
      this.$router.push("/shoppingCartOrder");
    },
    // 网络请求
    _MyCartList() {
      if (this.isrequest) {
        MyCartList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.allmoney = res.allmoney;
          res.list.map(item => {
            if (!item.isselected) this.select_all = false;
            if (item.isselected) this.cart.push(item.id);
          });
          this.cart_list = this.cart_list.concat(res.list);
        });
      }
    },
    _DeleteCart(ids) {
      DeleteCart(ids).then(() => {
        this.cart_list = [];
        this.cart = [];
        this.select_all = true;
        this.page = 1;
        this.isrequest = true;
        this._MyCartList();
      });
    },
    _ChangeSelected(params) {
      ChangeSelected(params).then(res => {
        console.log(res);
        this.cart_list = [];
        this.cart = [];
        this.select_all = true;
        this.page = 1;
        this.isrequest = true;
        this._MyCartList();
      });
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
        this._MyCartList();
      }
    }
  },
  created() {
    this._MyCartList();
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
            span:nth-child(1) {
              float: left;
              padding: 5px 20px;
              background-color: #f6f6f6;
              border-radius: 6px;
              font-size: 24px;
              color: #999999;
            }
            span:nth-child(2) {
              float: right;
              margin-right: -40px;
            }
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
