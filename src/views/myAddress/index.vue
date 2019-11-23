<template>
  <div class="my_address">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="my_address_item" v-for="item in 10" :key="item">
      <div class="my_address_item_content">
        <div>
          张三<span>18274862815</span
          ><span class="default" v-show="item == 1">默认</span>
        </div>
        <p>浙江省杭州市西湖区文三路138号东方通信大厦7楼501室</p>
      </div>
      <div>
        <img @click="onEditAddress(item)" src="~assets/img/icon/bianji.png" />
        <img @click="onDeleteAddress(item)" src="~assets/img/icon/cha.png" />
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
      <h6>新增地址</h6>
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
export default {
  data() {
    return {
      show_address: false,
      areaList,
      address_info: {
        id: 1,
        name: "张三",
        tel: "18274862815",
        province: "江西省",
        city: "萍乡市",
        county: "安源区",
        areaCode: "360302",
        addressDetail: "东大街迎风巷",
        isDefault: true
      }
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onEditAddress() {
      this.show_address = !this.show_address;
    },
    onDeleteAddress() {
      this.$dialog
        .confirm({
          title: "您确定删除该地址吗？",
          confirmButtonColor: "#ff7301"
        })
        .then(() => {
          // on confirm
        });
    },
    onSave(value) {
      console.log(value);
    },
    onNewAddress() {
      this.show_address = !this.show_address;
    }
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
          background: rgba(255, 168, 104, 1);
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
