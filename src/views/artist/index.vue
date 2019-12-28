<template>
  <div class="artist">
    <return-btn @onClickReturn="onClickReturn" />
    <artist-item
      v-for="item in artist_list"
      :key="item.id"
      :artist="{ ...item }"
    />
  </div>
</template>

<script>
import { ReturnBtn, ArtistItem } from "components/index";
import { ArtistList } from "network/artist";
export default {
  data() {
    return {
      artist_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.push("/home");
    },
    // 网络请求
    _ArtistList() {
      if (this.isrequest) {
        ArtistList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.artist_list = this.artist_list.concat(res.list);
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
        this._ArtistList();
      }
    }
  },
  created() {
    this._ArtistList();
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
    ReturnBtn,
    ArtistItem
  }
};
</script>

<style lang="less" scoped>
.artist {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 0 30px;
}
</style>
