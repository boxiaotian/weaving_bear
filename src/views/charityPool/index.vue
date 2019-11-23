<template>
  <div class="charity_pool">
    <return-btn @onClickReturn="onClickReturn" />
    <router-link to="/foundation" class="charity_pool_item"
      >红十字基金会</router-link
    >
    <router-link to="/foundation" class="charity_pool_item"
      >红十字基金会</router-link
    >
    <router-link to="/foundation" class="charity_pool_item"
      >红十字基金会</router-link
    >
    <router-link to="/foundation" class="charity_pool_item"
      >红十字基金会</router-link
    >
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
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
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.charity_pool {
  padding: 30px;
  .charity_pool_item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: auto;
    padding: 40px;
    margin-bottom: 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    font-size: 30px;
    line-height: 38px;
    font-weight: 700;
    color: #333333;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 25px;
      transform: translateY(-35%);
      width: 10px;
      height: 18px;
      background: url("~assets/img/icon/arrow_r.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>
