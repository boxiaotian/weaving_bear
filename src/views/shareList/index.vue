<template>
  <div class="share_list">
    <return-btn @onClickReturn="onClickReturn" />
    <good-item v-for="item in customize_list" :key="item.id" :good="item">
      <template slot="good_img">
        <img v-if="item.id == 1" src="~/assets/img/customize/phone_case.png" />
        <img v-else-if="item.id == 2" src="~/assets/img/customize/cup.png" />
        <img v-else-if="item.id == 3" src="~/assets/img/customize/pillow.png" />
        <img v-else src="~/assets/img/customize/satchel.png" />
      </template>
      <template slot="good_fun">
        <div class="good_fun_group">
          <van-button
            type="primary"
            text="去编辑"
            color="#ff7301"
            @click="onEdit(item.id)"
            plain
            round
          />
          <van-button
            type="primary"
            color="#ff7024"
            class="good_choose"
            :text="item.ischoose ? '已选择' : '选择'"
            :disabled="item.ischoose"
            @click="onChoose"
            round
          />
        </div>
      </template>
    </good-item>
    <van-button
      class="share_now"
      type="primary"
      size="large"
      color="#ff7024"
      text="立即分享"
      @click="onShare"
    />
  </div>
</template>

<script>
import { ReturnBtn, GoodItem } from "components/index";
export default {
  data() {
    return {
      customize_list: [
        {
          id: 1,
          title: "手机壳",
          ischoose: true
        },
        {
          id: 2,
          title: "情侣变色杯",
          ischoose: false
        },
        {
          id: 3,
          title: "抱枕",
          ischoose: false
        },
        {
          id: 4,
          title: "单肩挎包",
          ischoose: false
        }
      ]
    };
  },
  computed: {},
  methods: {
    onClickReturn() {
      return this.$router.push("/iShare");
    },
    // 选择商品编辑
    onEdit(id) {
      switch (id) {
        case 1:
          this.$router.push("/edit/phone");
          break;
        case 2:
          this.$router.push("/edit/cup");
          break;
        case 3:
          this.$router.push("/edit/pillow");
          break;
        case 4:
          this.$router.push("/edit/satchel");
          break;
        default:
          this.$router.push("/edit/phone");
          break;
      }
    },
    // 选择商品分享
    onChoose() {},
    // 立即分享
    onShare() {
      return this.$router.push("/share");
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
    ReturnBtn,
    GoodItem
  }
};
</script>

<style lang="less"></style>
<style lang="less" scoped>
.share_list {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 0 30px;
  padding-bottom: 100px;
  .good_fun_group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 90px;
    padding: 20px;
    text-align: center;
    .van-button {
      width: 100px;
      height: 50px;
      padding: 0;
      line-height: 50px;
      font-size: 24px;
    }
    .good_choose {
      width: 150px;
      &.van-button--disabled {
        opacity: 1;
        background-color: #d2d2d2 !important;
        border: solid 1px #d2d2d2 !important;
      }
    }
  }
  .share_now {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    font-size: 36px;
    font-weight: 700;
    line-height: 100px;
  }
}
</style>
