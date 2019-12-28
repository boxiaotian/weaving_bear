<template>
  <div class="foundation">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="public_welfare_amount_stand_by">
      <div>
        <p class="amount_number">{{ info.price }}</p>
        <p>金额（元）</p>
      </div>
      <div>
        <p class="stand_by_number">{{ info.num }}</p>
        <p>支持人数</p>
      </div>
    </div>
    <div v-html="info.details" />
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { PublicPoolDetail } from "network/charityPool";
export default {
  data() {
    return {
      info: {}
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
        this.info = res.info;
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
  .public_welfare_amount_stand_by {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    margin-bottom: 40px;
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    color: #999999;
    .amount_number,
    .stand_by_number {
      margin-bottom: 24px;
      font-family: "DIN-Black";
      font-size: 48px;
      line-height: 56px;
      color: #ff7301;
    }
  }
  p {
    text-indent: 0;
  }
  img {
    max-width: 100%;
    max-height: auto;
  }
}
</style>
