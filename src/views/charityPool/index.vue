<template>
  <div class="charity_pool">
    <main-nav-bar @onClickReturn="onClickReturn" />
    <div class="charity_pool_group">
      <div class="charity_pool_item">
        <div class="charity_pool_name">红十字基金会</div>
      </div>
      <div class="charity_pool_item">
        <div class="charity_pool_name">红十字基金会</div>
      </div>
      <div class="charity_pool_item">
        <div class="charity_pool_name">红十字基金会</div>
      </div>
      <div class="charity_pool_item">
        <div class="charity_pool_name">红十字基金会</div>
      </div>
    </div>
  </div>
</template>

<script>
import { MainNavBar } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.push("/home");
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
.charity_pool {
  padding: 88px 30px 0;
  .charity_pool_group {
    .charity_pool_item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: auto;
      padding: 40px;
      margin-top: 30px;
      background-color: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
      border-radius: 18px;

      .charity_pool_name {
        position: relative;
        font-size: 30px;
        line-height: 38px;
        font-weight: 500;
        color: #333333;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-35%);
          width: 10px;
          height: 18px;
          background: url("~assets/img/icon/arrow_r.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
}
</style>
