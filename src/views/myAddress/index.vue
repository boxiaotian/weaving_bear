<template>
  <div class="my_address">
    <return-btn @onClickReturn="onClickReturn" />
    <div
      class="my_address_item"
      v-for="item in address_list"
      :key="item.id"
      @click="onSwathAddress(item.id)"
    >
      <div class="my_address_item_content">
        <div>
          {{ item.name }}<span>{{ item.mobile }}</span
          ><span class="default" v-show="item.isdefault">默认</span>
        </div>
        <p>{{ item.province + item.city + item.county + item.address }}</p>
      </div>
      <div>
        <img
          @click.stop="onEditAddress(item)"
          src="~assets/img/icon/bianji.png"
        />
        <img
          @click.stop="onDeleteAddress(item.id)"
          src="~assets/img/icon/cha.png"
        />
      </div>
    </div>
    <van-button
      type="primary"
      text="新建地址"
      color="#ff7301"
      size="large"
      @click="onNewAddress"
    />
    <van-popup
      v-model="show_address"
      closeable
      safe-area-inset-bottom
      position="bottom"
    >
      <h6>{{ address_title }}</h6>
      <van-address-edit
        :area-list="areaList"
        :address-info="address_info"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        show-set-default
        show-search-result
        @save="onSave"
      />
    </van-popup>
  </div>
</template>

<script>
import areaList from "common/area";
import { ReturnBtn } from "components/index";
import {
  AddAddress,
  AddressList,
  EditAddress,
  DeleteAddress
} from "network/address";
export default {
  data() {
    return {
      address_list: [],
      isrequest: true,
      page: 1,
      show_address: false,
      areaList,
      address_title: "新增地址",
      address_info: {},
      clearget_timer: null // 清除定时器
    };
  },
  methods: {
    // 返回上一页
    onClickReturn() {
      this.$router.back(-1);
    },
    // 切换收货地址
    onSwathAddress(addressid) {
      this.$router.replace({
        path:
          this.$route.query.type == "shopping"
            ? "/shoppingCartOrder"
            : "/submitOrder",
        query: { addressid }
      });
    },
    // 新增收货地址
    onNewAddress() {
      this.address_title = "新增地址";
      this.address_info = {};
      this.show_address = !this.show_address;
    },
    // 修改收货地址
    onEditAddress(obj) {
      this.address_title = "编辑地址";
      var county_arr = Object.entries(areaList.county_list);
      county_arr.map(item => {
        if (obj.county == item[1]) {
          this.address_info = {
            id: obj.id,
            name: obj.name,
            tel: obj.mobile,
            province: obj.province,
            city: obj.city,
            county: obj.county,
            areaCode: item[0],
            addressDetail: obj.address,
            isDefault: obj.isdefault ? true : false
          };
        }
      });
      this.show_address = !this.show_address;
    },
    // 删除4收货地址
    onDeleteAddress(id) {
      this.$dialog
        .confirm({
          title: "您确定删除该地址吗？",
          confirmButtonColor: "#ff7301"
        })
        .then(() => this._DeleteAddress(id))
        .catch(() => {});
    },
    onSave(value) {
      this.show_address = !this.show_address;
      let params = {
        id: value.id,
        name: value.name,
        province: value.province,
        city: value.city,
        county: value.county,
        mobile: value.tel,
        address: value.addressDetail,
        isdefault: value.isDefault ? 1 : 0
      };
      if (this.address_title == "新增地址") this._AddAddress(params);
      else this._EditAddress(params);
    },
    // 网络请求
    _AddressList() {
      if (this.isrequest) {
        AddressList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.address_list = this.address_list.concat(res.list);
        });
      }
    },
    _AddAddress(params) {
      AddAddress(params).then(() => {
        this.address_list = [];
        this.page = 1;
        this.isrequest = true;
        this._AddressList();
      });
    },
    _EditAddress(params) {
      EditAddress(params).then(() => {
        this.address_list = [];
        this.page = 1;
        this.isrequest = true;
        this._AddressList();
      });
    },
    _DeleteAddress(id) {
      DeleteAddress(id).then(() => {
        this.$toast("删除成功");
        this.clearget_timer = setTimeout(() => {
          this.address_list = [];
          this.page = 1;
          this.isrequest = true;
          this._AddressList();
        }, 1000);
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
        this._AddressList();
      }
    }
  },
  created() {
    this._AddressList();
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    clearInterval(this.clearget_timer);
    this.clearget_timer = null;
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less">
.my_address {
  .van-popup {
    .van-address-edit {
      position: relative;
      width: 100%;
      height: 693px;
      .van-cell {
        padding: 30px;
        font-size: 30px;
        &::after {
          display: none;
        }
        &.van-address-edit-detail {
          .van-cell__value {
            .van-cell {
              padding: 0;
            }
          }
        }
        &.van-switch-cell {
          .van-cell__value {
            .van-switch {
              background-color: #d2d2d2;
            }
            .van-switch--on {
              background-color: #ff7301;
            }
          }
        }
      }
      .van-address-edit__buttons {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 0;
        .van-button {
          margin-bottom: 0;
          background-color: #ff7301;
          border-radius: 0;
          font-size: 36px;
          font-weight: 700;
        }
      }
    }
    .van-popup__close-icon--top-right {
      top: 44px;
    }
  }
}
.van-picker {
  width: 100%;
  height: 817px;
  .van-picker__toolbar {
    .van-picker__cancel,
    .van-picker__confirm {
      color: #ff7301;
    }
  }
}
</style>
<style lang="less" scoped>
.my_address {
  padding-bottom: 100px;
  .my_address_item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 178px;
    padding: 30px;
    border-top: solid 1px #f6f6f6;
    background-color: #ffffff;
    .my_address_item_content {
      width: 76%;
      height: 100%;
      font-size: 30px;
      font-weight: 700;
      div {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          margin-left: 30px;
          font-weight: 400;
        }
        .default {
          display: inline-block;
          width: 80px;
          height: 30px;
          background: #ffa868;
          border-radius: 15px;
          font-size: 18px;
          line-height: 34px;
          color: #ffffff;
          text-align: center;
        }
      }
      p {
        font-size: 24px;
        font-weight: 400;
        color: #999999;
      }
    }
    img {
      width: 26px;
      height: 26px;
      margin-left: 40px;
    }
  }
  .van-button {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .van-popup {
    width: 100%;
    height: 817px;
    h6 {
      border-bottom: solid 1px #f6f6f6;
      font-size: 36px;
      line-height: 124px;
      text-align: center;
    }
  }
}
</style>
