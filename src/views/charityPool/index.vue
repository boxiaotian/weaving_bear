<template>
  <div class="charity_pool">
    <return-btn @onClickReturn="onClickReturn" />
    <router-link
      v-for="item in public_lool_list"
      :key="item.id"
      :to="{ path: '/foundation', query: { pid: item.id } }"
      class="charity_pool_item"
      tag="div"
    >
      <img
        class="charity_pool_img"
        :src="$store.state.interface_domain + item.banner"
      />
      <div class="charity_pool_content">
        <div class="charity_pool_descri">
          {{ item.descri }}
        </div>
        <div class="charity_pool_name">{{ item.name }}</div>
      </div>
    </router-link>
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
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      if (innerHeight - outerHeight - 50 < scrollTop) {
        this._PublicPoolList();
      }
    }
  },
  created() {
    this._PublicPoolList();
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

<style lang="less" scoped>
.charity_pool {
  padding: 30px;
  .charity_pool_item {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 200px;
    padding: 40px 30px;
    margin-bottom: 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    font-size: 30px;
    line-height: 38px;
    font-weight: 700;
    color: #333333;
    .charity_pool_img {
      min-width: 120px;
      height: 120px;
      margin-right: 26px;
      background-color: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
      border-radius: 18px;
    }
    .charity_pool_content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .charity_pool_descri {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
      }
      .charity_pool_name {
        font-size: 24px;
        color: #ff7301;
      }
    }
  }
}
</style>
