<template>
  <div class="vip_service_info">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="vip_service_info_top">
      <img class="vip_user_img" :src="info.avatar" />
      <div class="vip_user_name">{{ info.nickname }}</div>
      <div class="vip_user_mark">{{ info.isvip ? "VIP用户" : "普通用户" }}</div>
      <div class="vip_expire_date" v-if="info.vipendtime">
        到期时间：{{ info.vipendtime }}
      </div>
    </div>
    <van-cell-group>
      <van-cell
        title-class="title_info"
        title="后台地址"
        label-class="label_info"
      >
        <template slot="label">
          <input type="text" :value="info.adminurl" readonly />
        </template>
      </van-cell>
      <van-cell title-class="title_info" title="账号" label-class="label_info">
        <template slot="label">
          <input type="text" :value="info.adminaccount" readonly />
        </template>
      </van-cell>
      <van-cell title-class="title_info" label-class="label_info">
        <template slot="label">
          <input type="text" :value="info.admintoken" readonly />
        </template>
        <template slot="title">
          密码<b>(展示默认密码，如忘记自己修改的密码概不负责)</b>
        </template>
      </van-cell>
      <van-cell
        title-class="title_info"
        label-class="label_info"
        title="公众号挂号地址"
      >
        <template slot="label">
          <input type="text" :value="info.wechaturl" readonly />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="vip_service_title">*该账号密码支持以下权益：</div>
    <ul>
      <li>支持商城投放自己的轮播广告</li>
      <li>支持放公司的logo</li>
      <li>支持挂到自己的公众号</li>
      <li>支持上传公司图文简介</li>
    </ul>
    <textarea
      type="text"
      v-model="copyContent"
      id="copy_text"
      class="copyValue"
      readonly
    />
    <van-button
      class="a_key_to_copy"
      type="primary"
      text="一键复制"
      color="#ff7024"
      data-clipboard-action="copy"
      data-clipboard-target="#copy_text"
      @click="onCopy"
      round
    />
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { ReturnBtn } from "components/index";
import { GetMyVipInfo } from "network/profile";
export default {
  data() {
    return {
      copyContent: "",
      info: {},
      clearget_timer: null
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    // 复制内容
    onCopy() {
      var clipboard = new Clipboard(".a_key_to_copy");
      clipboard.on("success", () => {
        this.$toast("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        this.$toast("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    }
  },
  created() {
    GetMyVipInfo().then(res => {
      if (res.info.isvip) {
        this.info = res.info;
        this.copyContent = `后台账号：${res.info.adminurl}；
                            账号：${res.info.adminaccount}；
                            密码：${res.info.admintoken}；
                            公众号挂号链接：${res.info.wechaturl}`;
      } else {
        this.$toast("您不是VIP用户");
        this.clearget_timer = setTimeout(
          () => this.$router.replace("/vipService"),
          1000
        );
      }
    });
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
  },
  beforeDestroy() {
    clearInterval(this.clearget_timer);
    this.clearget_timer = null;
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
.vip_service_info {
  .vip_service_info_top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 390px;
    padding-bottom: 46px;
    margin-bottom: 20px;
    background-color: #ffffff;
    .vip_user_img {
      width: 120px;
      height: 120px;
      margin-bottom: 40px;
      border-radius: 50%;
    }
    .vip_user_name {
      font-size: 30px;
      font-weight: 700;
    }
    .vip_user_mark {
      width: 112px;
      height: 30px;
      margin: 18px 0 24px;
      background-color: #1b1b1b;
      border-radius: 15px;
      font-size: 18px;
      line-height: 34px;
      color: #ffc9a0;
      text-align: center;
    }
    .vip_expire_date {
      font-size: 24px;
      color: #999999;
    }
  }
  .van-cell-group {
    .van-cell {
      position: relative;
      width: 100%;
      height: 110px;
      padding: 10px 30px;
      line-height: 40px;
      &::after {
        border-bottom: 2px solid #eeeeee;
      }
      .title_info {
        font-size: 30px;
        color: #000000;
        input {
          width: 100%;
        }
        b {
          color: #999999;
          font-size: 24px;
          vertical-align: text-bottom;
        }
      }
      .label_info {
        font-size: 28px;
        color: #000000;
      }
      .value_info {
        position: absolute;
        top: 5px;
        left: 100px;
        color: #999999;
        font-size: 22px;
        flex: none;
      }
    }
  }
  .vip_service_title {
    padding: 30px;
    font-size: 24px;
    color: #999999;
  }
  ul {
    padding: 0 60px;
    font-size: 24px;
    line-height: 40px;
    color: #999999;
    list-style: decimal;
  }
  .copyValue {
    width: 100%;
    opacity: 0;
    text-align: left;
  }
  .a_key_to_copy {
    display: block;
    width: 500px;
    height: 100px;
    margin: 0 auto;
    font-size: 36px;
    font-weight: 700;
  }
}
</style>
