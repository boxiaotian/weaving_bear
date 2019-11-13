<template>
  <div class="artist">
    <main-nav-bar @onClickReturn="onClickReturn" />
    <div class="artist_group">
      <artist-item v-for="item in artist_list" :key="item" :artist="{ item }" />
    </div>
  </div>
</template>

<script>
import { MainNavBar, ArtistItem } from "components/index";
export default {
  data() {
    return {
      artist_list: [1, 2, 3, 4]
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.push("/home");
    },
    onBuyNow() {}
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
    MainNavBar,
    ArtistItem
  }
};
</script>

<style lang="less" scoped>
.artist {
  padding: 88px 30px 0;
  .artist_group {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }
}
</style>
