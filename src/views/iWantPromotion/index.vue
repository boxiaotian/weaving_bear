<template>
  <div class="i_want_promotion">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="i_want_promotion_group">
      <div class="i_want_promotion_content">
        <h5>江西工业工程职业技术学院</h5>
        <img src="~assets/img/profile/erweima.png" />
        <van-button
          type="primary"
          text="扫描加入成为公益大使"
          color="#ff7301"
          round
        />
      </div>
    </div>
    <div class="i_want_promotion_prompt">
      长按保存该图片，分享给好友或朋友圈
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.replace("/promotionCenter");
    }
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.i_want_promotion {
  display: flex;
  flex-direction: column;
  align-items: center;
  .i_want_promotion_group {
    width: 600px;
    height: 960px;
    margin-top: 140px;
    background: url("~assets/img/profile/promotion_img.png") no-repeat;
    background-size: cover;
    .i_want_promotion_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 463px;
      height: 581px;
      margin: 260px auto 0;
      border-radius: 82px;
      font-size: 34px;
      img {
        width: 168px;
        height: 168px;
        margin: 60px;
      }
    }
  }
  .i_want_promotion_prompt {
    font-size: 24px;
    line-height: 140px;
    color: #999999;
  }
}
</style>
