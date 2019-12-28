<template>
  <div class="share_generate">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="share_generate_group">
      <div class="my_descri">
        <p>{{ share_info.descri }}</p>
        <p v-if="share_info.descri1">{{ share_info.descri1 }}</p>
      </div>
      <div class="share_top_group">
        <div class="share_works">
          <div>
            <img :src="$store.state.interface_domain + share_info.thumb" />
          </div>
        </div>
      </div>
      <div class="share_center_group">
        <div
          class="customize_product"
          v-for="(item, index) in share_info.goods"
          :key="item.id"
          :style="{
            backgroundColor: color_array[index].bg,
            color: color_array[index].color
          }"
        >
          <div class="product_title">{{ item.title }}</div>
          <div class="product_descri">{{ item.descri }}</div>
          <div class="product_img_group">
            <div>
              <img
                :class="[item.isextend ? 'border_radius' : '']"
                :src="$store.state.interface_domain + item.thumb"
              />
            </div>
          </div>
          <van-button
            class="buy_now"
            text="立即支持"
            :style="{ color: color_array[index].color }"
            @click="onBuyNow(item.id)"
            round
          />
        </div>
      </div>
      <div class="charitable_school">
        <h6 v-if="Object.keys(share_info.pinfo).length != 0">
          公益图文详情
        </h6>
        <div v-html="share_info.pinfo.details" />
        <h6 v-if="share_info.aboutus">学校图文详情</h6>
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
      share_info: {
        pinfo: {}
      },
      color_array: [
        {
          bg: "#c7f4ff",
          color: "#3093ac"
        },
        {
          bg: "#ffe7a7",
          color: "#af8f3a"
        },
        {
          bg: "#b8d1ff",
          color: "#4266a9"
        },
        {
          bg: "#feecd2",
          color: "#c68f40"
        },
        {
          bg: "#fbd2ff",
          color: "#7e3bb2"
        }
      ]
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
      ShareInfo(this.$route.query.sid).then(res => {
        if (res.info.descri.indexOf("积小流") != -1) {
          if (Object.keys(res.info.pinfo).length) {
            let descri_array = res.info.descri.split("。");
            this.share_info = {
              ...res.info,
              descri: `${descri_array[0]}。${descri_array[1]}。`,
              descri1: `${descri_array[2]}。${descri_array[3]}。`
            };
          } else {
            let descri_array = res.info.descri.split("。");
            this.share_info = {
              ...res.info,
              descri: `${descri_array[0]}。${descri_array[1]}。${
                descri_array[2]
              }。`,
              descri1: `${descri_array[3]}。${descri_array[4]}。`
            };
          }
        } else this.share_info = res.info;
      });
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
      h6 {
        margin: 100px 0 30px;
        font-size: 30px;
        font-weight: bold;
      }
      padding: 0 40px;
      div {
        p {
          text-indent: 0;
        }
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
  .share_generate_group {
    margin-bottom: 50px;
    .my_descri {
      margin: 60px 40px;
      font-size: 30px;
      line-height: 48px;
      p {
        margin-bottom: 20px;
      }
    }
    .share_top_group {
      width: 100%;
      height: 668px;
      padding: 40px 0;
      background: #ffd0d6;
      .share_works {
        width: 532px;
        height: 532px;
        padding: 76px;
        margin: 0 auto 20px;
        background: url("~assets/img/share/share_bg_d.png") no-repeat;
        background-size: cover;
        background-color: #ffffff;
        div {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: auto;
            max-height: 100%;
          }
        }
      }
    }
    .share_center_group {
      font-size: 36px;
      color: #3093ac;
      .customize_product {
        position: relative;
        width: 750px;
        height: 500px;
        padding: 0 30px;
        background-color: #c7f4ff;
        .product_title {
          width: 50%;
          padding-top: 126px;
          font-weight: bold;
        }
        .product_descri {
          width: 50%;
          margin: 18px 0;
          font-size: 24px;
        }
        .buy_now {
          width: 140px;
          height: 42px;
          padding: 0;
          box-shadow: 0px 7px 13px 0px rgba(92, 10, 23, 0.1);
          border-radius: 20px;
          font-size: 24px;
          font-weight: bold;
          line-height: 42px;
        }
        .product_img_group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 30px;
          width: 320px;
          height: 100%;
          border-right: 5px solid #ffffff;
          border-left: 5px solid #ffffff;
          box-shadow: 0px 7px -27px 0px rgba(58, 53, 54, 0.1);
          div {
            width: 250px;
            height: 250px;
            padding: 10px 0;
            background: #eeeeee;
            img {
              display: block;
              width: auto;
              max-height: 100%;
              margin: auto;
            }
            .border_radius {
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
