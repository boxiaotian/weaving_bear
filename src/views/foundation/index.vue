<template>
  <div class="foundation">
    <return-btn @onClickReturn="onClickReturn" />
    <div v-html="foundation_details" />
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { PublicPoolDetail } from "network/charityPool";
export default {
  data() {
    return {
      foundation_details: ""
    };
  },
  methods: {
    onClickReturn() {
      this.$router.back();
    },
    // 网络请求
    _PublicPoolDetail() {
      const { pid } = this.$route.query;
      PublicPoolDetail(pid).then(res => {
        document.title = res.info.name;
        this.foundation_details = res.info.details;
      });
    }
  },
  created() {
    this._PublicPoolDetail();
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

<style lang="less">
.foundation {
  padding: 50px 30px;
  img {
    max-width: 100%;
    max-height: auto;
  }
}
</style>
