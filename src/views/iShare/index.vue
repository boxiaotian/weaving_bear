<template>
  <div class="i_share">
    <main-nav-bar @onClickReturn="onClickReturn" />
    <div class="i_share_form_group">
      <div class="share_form_title">
        <span>姓名</span>（公益证书上名称将以该名称为准，请认真填写哦）
      </div>
      <van-field v-model="share_name" placeholder="请输入姓名" />
    </div>
    <div class="i_share_form_group">
      <div class="share_form_title">
        <span>选择公益</span>（平台将以您的名义给所选公益项目捐赠）
      </div>
      <van-dropdown-menu active-color="#ff7301">
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </div>
    <div class="i_share_form_group">
      <div class="share_form_title">
        <span>上传作品</span
        >（请注意所上传图片的清晰度和尺寸大小，以免实物制作效果不佳）
      </div>
      <van-uploader v-model="file_list" :after-read="afterRead" :max-count="1">
        <img src="~assets/img/share/uploader_img.png" />
      </van-uploader>
    </div>
    <div class="i_share_form_description">
      <van-field rows="1" autosize type="textarea" placeholder="请输入留言" />
    </div>
    <div class="i_share_next_step" @click="onNextStep">下一步</div>
  </div>
</template>

<script>
import { MainNavBar } from "components/index";
export default {
  data() {
    return {
      share_name: "",
      value1: 0,
      option1: [
        { text: "不选择", value: 0 },
        { text: "全部商品", value: 1 },
        { text: "新款商品", value: 2 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 3 },
        { text: "活动商品", value: 3 }
      ],
      file_list: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.push("/home");
    },
    afterRead(file) {
      this.file_list = [{ url: file.content }];
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    onNextStep() {
      this.$router.push("/shareList");
    }
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
    MainNavBar
  }
};
</script>

<style lang="less">
.i_share {
  .i_share_form_group {
    .van-cell {
      .van-cell__value--alone {
        height: 47px;
        .van-field__body {
          .van-field__control {
            height: 47px;
          }
        }
      }
    }
    .van-dropdown-menu {
      .van-dropdown-menu__item {
        position: relative;
        justify-content: flex-start;
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 16px;
          height: 14px;
          background: url("~assets/img/icon/under_triangle.png") no-repeat;
          background-size: cover;
          opacity: 1;
        }
        .van-dropdown-menu__title {
          font-size: 30px;
          line-height: 47px;
          &::after {
            display: none;
          }
        }
      }
      .van-dropdown-item {
        .van-popup--top {
          padding: 0 40px;
          .van-cell {
            width: 100%;
            height: 60px;
            font-size: 30px;
            line-height: 60px;
          }
        }
      }
    }
    .van-uploader {
      .van-uploader__wrapper {
        .van-uploader__preview {
          .van-uploader__preview-image {
            width: 120px;
            height: 150px;
            border-radius: 18px;
            border: solid 1px #1b1b1b;
          }
        }
      }
    }
  }
  .i_share_form_description {
    .van-cell {
      padding: 0;
      .van-cell__value--alone {
        .van-field__body {
          .van-field__control {
            width: 100%;
            min-height: 190px !important;
            font-size: 30px;
            background-color: #f6f6f6;
          }
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.i_share {
  padding: 88px 30px 60px;
  .i_share_form_group {
    margin-top: 50px;
    .share_form_title {
      font-size: 18px;
      line-height: 36px;
      color: #999999;
      span {
        font-size: 36px;
        font-weight: 500;
        color: #000000;
      }
    }
    .van-cell,
    .van-dropdown-menu {
      width: 100%;
      height: 90px;
      padding: 20px 40px;
      margin-top: 40px;
      background-color: #f6f6f6;
      border-radius: 45px;
      font-size: 30px;
      line-height: 47px;
      &::after {
        border: none;
      }
    }
    .van-uploader {
      margin-top: 40px;
      .van-uploader__wrapper {
        .van-uploader__input-wrapper {
          img {
            width: 120px;
            height: 150px;
          }
        }
      }
    }
  }
  .i_share_form_description {
    width: 100%;
    min-height: 190px;
    padding: 30px 20px;
    margin: 50px auto 58px;
    background-color: #f6f6f6;
    border-radius: 18px;
  }
  .i_share_next_step {
    width: 100%;
    height: 90px;
    background-color: #ff7301;
    border-radius: 45px;
    font-size: 36px;
    line-height: 90px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
