<template>
  <div class="charity_pool">
    <return-btn @onClickReturn="onClickReturn" />
    <router-link
      v-for="item in public_lool_list"
      :key="item.id"
      :to="{ path: '/foundation', query: { pid: item.id } }"
      class="charity_pool_item"
      >{{ item.name }}</router-link
    >
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { PublicPoolList } from "network/charityPool";
export default {
  data() {
    return {
      public_lool_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      this.$router.push("/home");
    },
    // 网络请求
    _PublicPoolList() {
      if (this.isrequest) {
        PublicPoolList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.public_lool_list = this.public_lool_list.concat(res.list);
        });
      }
    },
    // 可滚动容器的高度
    onScroll() {
      let innerHeight = document.querySelector("#app").clientHeight;
      let outerHeight = document.documentElement.clientHeight;
      let scrollTop = document.documentElement.scrollTop;
      if (innerHeight - outerHeight - 50 < scrollTop) {
        this._PublicPoolList();
      }
    }
  },
  created() {
    this._PublicPoolList();
    window.addEventListener("scroll", this.onScroll);
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
