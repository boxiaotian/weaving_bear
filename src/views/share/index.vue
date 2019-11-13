<template>
  <div class="share">
    <main-nav-bar @onClickReturn="onClickReturn" />
    <div class="share_group">
      <h6>江西工业工程职业技术学院</h6>
      <img class="share_drawing" src="~assets/img/share/user_img.png" />
      <div class="works_group">
        <div>
          <img src="~/assets/img/customize/phone_case.png" />
        </div>
        <div>
          <img src="~/assets/img/customize/cup.png" />
        </div>
        <div>
          <img src="~/assets/img/customize/pillow.png" />
        </div>
        <div>
          <img src="~/assets/img/customize/satchel.png" />
        </div>
      </div>
      <div class="maker_info">
        <div>
          <h6>学生名称</h6>
          <div>
            <p>我正在参与***公益</p>
            <p>希望各位哥哥姐姐多多支持我哦！</p>
          </div>
        </div>
        <img src="~/assets/img/customize/pillow.png" />
      </div>
    </div>
    <van-button
      class="share_now"
      type="primary"
      text="立即分享"
      color="#ff7301"
      @click="onShareNow"
      round
    />
  </div>
</template>

<script>
import { MainNavBar } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.push("/shareList");
    },
    onShareNow() {
      this.$router.push("/shareGenerate");
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
    MainNavBar
  }
};
</script>

<style lang="less" scoped>
.share {
  padding: 88px 30px 0;
  .share_group {
    width: 100%;
    min-height: 914px;
    padding: 62px 50px 80px;
    margin: 60px auto 70px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 50px;
    h6 {
      font-size: 36px;
      line-height: 44px;
      font-weight: 500;
    }
    .share_drawing {
      width: 100%;
      height: auto;
      margin-top: 68px;
    }
    .works_group {
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      div {
        width: 270px;
        height: 200px;
        padding: 30px 0;
        margin-top: 46px;
        background-color: #e6e6e6;
        img {
          display: block;
          width: auto;
          height: 140px;
          margin: auto;
        }
      }
    }
    .maker_info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 68px;
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 24px;
        line-height: 32px;
        h6 {
          font-size: 30px;
          font-weight: 500;
        }
      }
      img {
        width: 162px;
        height: 162px;
        background-color: #0d0d0d;
      }
    }
  }
  .share_now {
    display: block;
    width: 500px;
    height: 100px;
    margin: 0 auto 65px;
    font-size: 36px;
    font-weight: 500;
  }
}
</style>
