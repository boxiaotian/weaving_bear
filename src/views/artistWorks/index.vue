<template>
  <div class="artist_works">
    <return-btn @onClickReturn="onClickReturn" />
    <good-item
      v-for="item in customize_list"
      :key="item.id"
      :good="{ ...item }"
      @customize="onDetails(item.id)"
    >
      <template slot="good_img">
        <img :src="$store.state.interface_domain + item.thumb" />
      </template>
      <template slot="good_fun">
        <div class="good_price"><span>￥</span>{{ item.price }}</div>
      </template>
    </good-item>
  </div>
</template>

<script>
import { ReturnBtn, GoodItem } from "components/index";
import { ArtistGoodsList } from "network/artist";
export default {
  data() {
    return {
      customize_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      this.$router.back();
    },
    onDetails(gid) {
      this.$router.push({
        path: "/artistDetails",
        query: { artistid: this.$route.query.id, gid }
      });
    },
    // 网络请求
    _ArtistGoodsList() {
      if (this.isrequest) {
        ArtistGoodsList(this.page++, this.$route.query.id).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.customize_list = this.customize_list.concat(res.list);
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
        this._ArtistGoodsList();
      }
    }
  },
  created() {
    document.title = this.$route.query.name;
    this._ArtistGoodsList();
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
    ReturnBtn,
    GoodItem
  }
};
</script>

<style lang="less" scoped>
.artist_works {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 0 30px;
  .good_item {
    margin: 30px 0;
    .good_price {
      margin: 30px auto;
      font-size: 36px;
      font-weight: 700;
      color: #ff7024;
      span {
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
}
</style>
