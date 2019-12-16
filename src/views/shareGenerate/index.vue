<template>
  <div class="share_generate">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="share_generate_group">
      <h6>{{ share_info.name }}</h6>
      <div>
        <p v-if="share_info.pinfo && share_info.pinfo.length">
          我正在参与{{ share_info.pinfo.name }}公益
        </p>
        <p>{{ share_info.descri }}</p>
      </div>
      <img
        class="share_drawing"
        :src="$store.state.interface_domain + share_info.thumb"
      />
      <h5>定制产品</h5>
      <div
        class="customize_product"
        v-for="item in share_info.goods"
        :key="item.id"
      >
        <div>
          <img :src="$store.state.interface_domain + item.thumb" />
        </div>
        <van-button
          class="buy_now"
          type="primary"
          text="立即购买"
          color="#ff7301"
          @click="onBuyNow(item.id)"
          round
        />
      </div>
      <div class="charitable_school">
        <h6 v-if="share_info.pinfo && share_info.pinfo.length">公益图文详情</h6>
        <div
          v-if="share_info.pinfo && share_info.pinfo.length"
          v-html="share_info.pinfo.details"
        />
        <h6>学校图文详情</h6>
        <div v-html="share_info.aboutus" />
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { BindAgent } from "network/profile";
import { ShareInfo } from "network/share";
export default {
  data() {
    return {
      share_info: {}
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/home");
    },
    onBuyNow(id) {
      let { uid, sid } = this.$route.query;
      this.$router.replace({ path: "/shareDetails", query: { uid, sid, id } });
    },
    // 网络请求
    _ShareInfo() {
      ShareInfo(this.$route.query.sid).then(
        res => (this.share_info = res.info)
      );
    },
    _BindAgent() {
      BindAgent(this.$route.query.uid ? this.$route.query.uid : 0);
    }
  },
  created() {
    this._ShareInfo();
    this._BindAgent();
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
.share_generate {
  .share_generate_group {
    .charitable_school {
      div {
        margin-bottom: 90px;
        img {
          max-width: 100%;
          max-height: auto;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.share_generate {
  padding: 0 30px;
  .share_generate_group {
    h6 {
      font-size: 30px;
      font-weight: 700;
      line-height: 90px;
    }
    .share_drawing {
      width: 100%;
      height: auto;
      margin: 44px auto 62px;
    }
    h5 {
      font-size: 36px;
      font-weight: 700;
      line-height: 36px;
      text-align: center;
    }
    .customize_product {
      div {
        width: 100%;
        height: 400px;
        padding: 40px 0;
        margin: 40px auto;
        background-color: #e5e5e5;
        img {
          display: block;
          width: auto;
          height: 100%;
          margin: auto;
        }
      }
      .buy_now {
        display: block;
        width: 500px;
        height: 80px;
        margin: auto;
        font-size: 36px;
        font-weight: 700;
      }
    }
  }
}
</style>
