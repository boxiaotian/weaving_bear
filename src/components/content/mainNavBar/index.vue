<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-arrow="left_arrow"
      :right-text="right_text"
      fixed
      border
      :z-index="2"
      @click-left="onClickReturn"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: function() {
        return this.$route.meta.title;
      }
    },
    left_arrow: {
      type: Boolean,
      default: true
    },
    right_text: String
  },
  methods: {
    onClickReturn() {
      this.$emit("onClickReturn");
    },
    onClickRight() {
      this.$emit("onClickRight");
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  display: flex;
  align-items: center;
  height: 88px;
  &::after {
    display: none;
  }
  .van-nav-bar__left {
    bottom: 50%;
    left: 30px;
    transform: translateY(50%);
    width: 48px;
    height: 33px;
    .van-nav-bar__arrow {
      width: 100%;
      height: 100%;
      background: url("~assets/img/return_arrow.png") no-repeat;
      background-size: cover;
      vertical-align: top;

      &::before {
        display: none;
      }
    }
  }
  .van-nav-bar__title {
    font-size: 36px;
    font-weight: 300;
    color: #000000;
  }
}
</style>
