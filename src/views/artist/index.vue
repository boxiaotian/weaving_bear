<template>
  <div class="artist">
    <return-btn @onClickReturn="onClickReturn" />
    <artist-item v-for="item in artist_list" :key="item" :artist="{ item }" />
  </div>
</template>

<script>
import { ReturnBtn, ArtistItem } from "components/index";
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
