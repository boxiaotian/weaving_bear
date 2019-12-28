<template>
  <div class="help_center">
    <return-btn @onClickReturn="onClickReturn" />
    <div v-html="details" />
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { HelpUs } from "network/profile";
export default {
  data() {
    return {
      activeNames: [],
      details: ""
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    }
  },
  created() {
    HelpUs().then(res => (this.details = res.info));
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less">
.help_center {
  // padding-top: 30px;
  padding: 0 30px;
  p {
    text-indent: 0;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .van-hairline--top-bottom {
    .van-collapse-item {
      .van-cell {
        padding: 30px;
        .van-cell__title {
          .help_center_icon {
            display: inline-block;
            width: 34px;
            height: 34px;
            margin-right: 24px;
            background: url("~assets/img/icon/help.png") no-repeat;
            background-size: cover;
            font-size: 20px;
            line-height: 33px;
            color: #ffffff;
            text-align: center;
            vertical-align: middle;
          }
        }
      }
      .van-collapse-item__wrapper {
        .van-collapse-item__content {
          padding-left: 87px;
          font-size: 24px;
          color: #999999;
        }
      }
    }
  }
}
</style>
