<template>
  <div class="good_item" @click="onCustomize">
    <slot name="good_img" />
    <div class="good_item_title">{{ good.title }}</div>
    <div class="good_item_detail">{{ good.descri }}</div>
    <slot name="good_fun" />
  </div>
</template>

<script>
export default {
  props: {
    good: Object
  },
  methods: {
    onCustomize() {
      this.$emit("customize");
    }
  }
};
</script>

<style lang="less" scoped>
.good_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  height: 450px;
  margin-top: 30px;
  background-color: #ffffff;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  font-weight: 700;
  img {
    width: auto;
    height: 190px;
    margin: 45px auto;
  }
  .good_item_title {
    font-size: 30px;
    line-height: 38px;
    padding: 0 10px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .good_item_detail {
    height: 64px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 24px;
    line-height: 32px;
    color: #cccccc;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
}
</style>
