<template>
  <div class="i_share">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="i_share_form_group">
      <div class="share_form_title">
        <span>姓名</span>
        <!-- （公益证书上名称将以该名称为准，请认真填写哦） -->
      </div>
      <van-field v-model="share_name" placeholder="请输入姓名" @blur="onBlur" />
    </div>
    <div class="i_share_form_group">
      <div class="share_form_title">
        <span>选择公益</span>（织布熊将根据您的建议给所选公益项目捐赠）
      </div>
      <van-dropdown-menu active-color="#ff7301">
        <van-dropdown-item v-model="public_value" :options="public_option" />
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
      <van-field
        v-model="share_descri"
        placeholder="请输入留言"
        rows="1"
        type="textarea"
        autosize
      />
    </div>
    <div class="i_share_next_step" @click="onNextStep">下一步</div>
  </div>
</template>

<script>
import { compress } from "common/utils";
import { ReturnBtn } from "components/index";
import { PublicPoolList } from "network/charityPool";
import { ImagesUpload } from "network/home";
import { SubmitInfo } from "network/share";
export default {
  data() {
    return {
      share_name: "",
      public_value: 0,
      public_option: [{ text: "不选择", value: 0 }],
      file_list: [],
      share_descri: ""
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.replace("/home");
    },
    onBlur() {
      if (this.share_name) {
        if (this.public_value) {
          this.public_option.map(item => {
            if (item.value == this.public_value) {
              this.share_descri = `尊敬的各位亲朋好友，我是${this.share_name}，我在用自己设计的作品支持${item.text}公益项目。我承诺将版权费捐赠给${item.text}公益项目。

积小流，聚江海。一点点小的善意也会化作星光照亮前行的路，星辰大海永远不会被现实消磨，希望可以获得每一个充满善意的心的支持。`;
            }
          });
        } else {
          this.share_descri = `尊敬的各位亲朋好友，我是${this.share_name}，这是我设计的美术衍生品。每销售一款我设计的作品，织布熊都将捐赠一定的金额给公益项目。您可以建议织布熊将款项捐赠给您支持的项目。

积小流，聚江海。一点点小的善意也会化作星光照亮前行的路，星辰大海永远不会被现实消磨，希望可以获得每一个充满善意的心的支持。`;
        }
      } else this.share_descri = "";
    },
    afterRead() {},
    onNextStep() {
      let size = this.file_list[0];
      this.$store.commit("shareGoods", []);
      if (!this.share_name) this.$toast("请输入你的姓名");
      else if (!this.file_list.length) this.$toast("请上传你的作品");
      else if (size > 500000) {
        this.$toast("您上传的图片太小，建议您选择其他图片");
      } else if (size > 500000 && size < 5200000) {
        this.$toast("您上传的图片太大，请在手机上略微裁剪或选择其他图片");
      } else {
        if (size > 1000000) {
          compress(this.file_list[0].content, base64 => {
            this._ImagesUpload(base64);
          });
        } else this._ImagesUpload(this.file_list[0].content);
      }
    },
    // 网络请求
    // 公益列表
    _PublicPoolList() {
      PublicPoolList(1, 20).then(res => {
        res.list.map(item => {
          this.public_option.push({
            text: item.name,
            value: item.id
          });
        });
      });
    },
    // 上传图片
    _ImagesUpload(dataURL) {
      ImagesUpload({ file: dataURL, type: "share" }).then(res =>
        this._SubmitInfo(res.file_path)
      );
    },
    // 提交分享信息
    _SubmitInfo(thumb) {
      let params = {
        name: this.share_name,
        pid: this.public_value,
        thumb: thumb,
        descri: this.share_descri
      };
      SubmitInfo(params).then(res => {
        this.$store.commit("shareInfoId", res.id);
        this.$router.push({ path: "/shareList" });
      });
    }
  },
  watch: {
    public_value: function() {
      if (this.share_name) {
        if (this.public_value) {
          this.public_option.map(item => {
            if (item.value == this.public_value) {
              this.share_descri = `尊敬的各位亲朋好友，我是${this.share_name}，我在用自己设计的作品支持${item.text}公益项目。我承诺将版权费捐赠给${item.text}公益项目。

积小流，聚江海。一点点小的善意也会化作星光照亮前行的路，星辰大海永远不会被现实消磨，希望可以获得每一个充满善意的心的支持。`;
            }
          });
        } else {
          this.share_descri = `尊敬的各位亲朋好友，我是${this.share_name}，这是我设计的美术衍生品。每销售一款我设计的作品，织布熊都将捐赠一定的金额给公益项目。您可以建议织布熊将款项捐赠给您支持的项目。

积小流，聚江海。一点点小的善意也会化作星光照亮前行的路，星辰大海永远不会被现实消磨，希望可以获得每一个充满善意的心的支持。`;
        }
      } else this.share_descri = "";
    }
  },
  created() {
    this._PublicPoolList();
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
            padding: 0;
            font-size: 30px;
            line-height: 60px;
          }
        }
      }
    }
    .van-uploader {
      margin-top: 38px;
      .van-uploader__wrapper {
        .van-uploader__input-wrapper {
          img {
            width: 120px;
            height: 150px;
          }
        }
        .van-uploader__preview {
          .van-uploader__preview-image {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 120px;
            height: 150px;
            border-radius: 18px;
            border: solid 1px #1b1b1b;
            img {
              width: 100%;
              height: auto;
            }
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
  padding: 0 30px;
  .i_share_form_group {
    padding-top: 64px;
    &:last-child {
      margin-top: 58px;
    }
    .share_form_title {
      font-size: 18px;
      color: #999999;
      span {
        font-size: 36px;
        font-weight: 700;
        line-height: 36px;
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
      line-height: 50px;
      &::after {
        border: none;
      }
    }
  }
  .i_share_form_description {
    width: 100%;
    min-height: 188px;
    padding: 30px 20px;
    margin: 20px auto 53px;
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
