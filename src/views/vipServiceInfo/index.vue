<template>
  <div class="vip_service_info">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="vip_service_info_top">
      <img class="vip_user_img" src="~assets/img/home/artist_three.png" />
      <div class="vip_user_name">宅在家里的旅行家</div>
      <div class="vip_user_mark">VIP用户</div>
      <div class="vip_expire_date">到期时间：2020-11-04</div>
    </div>
    <van-cell-group>
      <van-cell title="后台地址" value="www.dsafda.com" />
      <van-cell title="账号" value="madin" />
      <van-cell title="密码" value="123456" />
    </van-cell-group>
    <div class="vip_service_title">*该账号密码支持以下权益：</div>
    <ul>
      <li>支持商城投放自己的轮播广告</li>
      <li>支持放公司的logo</li>
      <li>支持挂到自己的公众号</li>
      <li>支持上传公司图文简介</li>
    </ul>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
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
.vip_service_info {
  .vip_service_info_top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 390px;
    padding-bottom: 46px;
    margin-bottom: 20px;
    background-color: #ffffff;
    .vip_user_img {
      width: 120px;
      height: 120px;
      margin-bottom: 40px;
      border-radius: 50%;
    }
    .vip_user_name {
      font-size: 30px;
      font-weight: 700;
    }
    .vip_user_mark {
      width: 112px;
      height: 30px;
      margin: 18px 0 24px;
      background-color: #1b1b1b;
      border-radius: 15px;
      font-size: 18px;
      line-height: 34px;
      color: #ffc9a0;
      text-align: center;
    }
    .vip_expire_date {
      font-size: 24px;
      color: #999999;
    }
  }
  .van-cell-group {
    .van-cell {
      width: 100%;
      height: 100px;
      padding: 30px;
      font-size: 30px;
      line-height: 40px;
      .van-cell__title,
      .van-cell__value {
        span {
          color: #000000;
        }
      }
    }
  }
  .vip_service_title {
    padding: 30px;
    font-size: 24px;
    color: #999999;
  }
  ul {
    padding: 0 60px;
    font-size: 24px;
    line-height: 40px;
    color: #999999;
    list-style: decimal;
  }
}
</style>
