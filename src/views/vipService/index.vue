<template>
  <div class="vip_service">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="vip_service_group">
      <div class="vip_service_info">
        <div>
          <h3>购买VIP</h3>
          <h6>购买vip享受更多权益</h6>
        </div>
        <h1>365/年</h1>
      </div>
      <div class="rights_interests_list">
        <div
          class="rights_interests"
          v-for="(item, index) in rights_interests_list"
          :key="item"
        >
          <span>{{ index + 1 }}</span>
          {{ item }}
        </div>
      </div>
    </div>
    <van-button
      class="vip_service_btn"
      type="primary"
      color="#ff7301"
      text="立即购买"
      size="large"
      @click="onVIP"
    />
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  data() {
    return {
      rights_interests_list: [
        "支持商城投放自己的轮播广告",
        "支持放公司的logo",
        "支持挂到自己的公众号",
        "支持上传公司图文简介"
      ]
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onVIP() {
      this.$router.push("/vipServiceInfo");
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

<style lang="less" scoped>
.vip_service {
  padding: 0 30px;
  padding-bottom: 100px;
  .vip_service_group {
    .vip_service_info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 180px;
      h3 {
        font-size: 48px;
        line-height: 110px;
        font-weight: 300;
      }
      h6 {
        font-size: 24px;
        font-weight: 300;
      }
      h1 {
        font-size: 60px;
        color: #ff7301;
      }
    }
    .rights_interests_list {
      .rights_interests {
        width: 100%;
        height: 180px;
        padding: 60px 55px;
        margin-top: 20px;
        background-color: #ffffff;
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
        border-radius: 18px;
        font-size: 30px;
        line-height: 60px;
        span {
          display: inline-block;
          width: 60px;
          height: 60px;
          margin-right: 40px;
          border: solid 2px #0d0d0d;
          border-radius: 50%;
          font-size: 36px;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }
  .vip_service_btn {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 36px;
  }
}
</style>
