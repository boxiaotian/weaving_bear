<template>
  <div class="good_item" @click="onCustomize">
    <slot name="good_img" />
    <div class="good_item_title">{{ good.title }}</div>
    <div class="good_item_detail">高清彩印 来图定制</div>
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
  min-height: 400px;
  margin-bottom: 30px;
  background-color: #ffffff;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  font-weight: 500;

  img {
    width: 280px;
    height: 280px;
  }

  .good_item_title {
    font-size: 30px;
    line-height: 38px;
    color: #333333;
  }

  .good_item_detail {
    margin-top: 8px;
    font-size: 24px;
    line-height: 32px;
    color: #cccccc;
  }
}
</style>
