<template>
  <div class="distributor">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="distributor_group">
      <img class="envoy_banner" src="~assets/img/profile/envoy_banner.png" />
      <div class="distributor_application">
        <van-field
          placeholder="请输入学校或您个人名称"
          v-model="ambassador_name"
          :border="false"
          :disabled="isedit"
          autofocus
        >
          <img
            slot="right-icon"
            src="~assets/img/icon/edit.png"
            @click="onEdit"
          />
        </van-field>
      </div>
    </div>
    <van-button
      type="primary"
      text="提交"
      color="#ff7301"
      @click="onSubmit"
      round
    />
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { ApplyRecommend } from "network/profile";
export default {
  data() {
    return {
      ambassador_name: "",
      isedit: true
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onEdit() {
      this.isedit = false;
    },
    onSubmit() {
      if (this.ambassador_name) this._ApplyRecommend();
      else this.$toast("请输入您的大使名称");
    },
    // 网络请求
    _ApplyRecommend() {
      ApplyRecommend(this.ambassador_name).then(() => {
        if (this.$store.state.promoter_name.isrecommend)
          this.$toast("修改成功");
        else this.$toast("申请成功");
        this.$store.commit("promoterName", {
          isrecommend: 1,
          name: this.ambassador_name
        });
      });
    }
  },
  created() {
    if (this.$store.state.promoter_name.isrecommend) {
      this.ambassador_name = this.$store.state.promoter_name.name;
      this.isedit = true;
    } else this.isedit = false;
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.distributor {
  .distributor_group {
    position: relative;
    width: 100%;
    height: 475px;
    padding-top: 55px;
    background-image: linear-gradient(-31deg, #ffa868 0%, #ffc8a0 100%);
    .envoy_banner {
      display: block;
      width: 674px;
      height: 120px;
      margin: auto;
    }
    .distributor_application {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      bottom: -98px;
      left: 50%;
      transform: translateX(-50%);
      width: 92%;
      height: 250px;
      padding: 45px;
      background-color: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
      border-radius: 18px;
      .van-cell {
        font-size: 44px;
        font-weight: 700;
        padding-bottom: 40px;
        border-bottom: solid 2px #f6f6f6;
        .van-cell__value {
          .van-field__body {
            .van-field__right-icon {
              img {
                width: 35px;
                height: 35px;
              }
            }
          }
        }
      }
    }
  }
  .van-button {
    display: block;
    width: 500px;
    height: 100px;
    margin: 377px auto;
    font-size: 36px;
    font-weight: 700;
  }
}
</style>
