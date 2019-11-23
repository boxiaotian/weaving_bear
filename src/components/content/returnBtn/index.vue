<template>
  <img
    class="return_btn"
    src="~assets/img/return_btn.png"
    @click="onClickReturn"
  />
</template>

<script>
export default {
  methods: {
    onClickReturn() {
      this.$emit("onClickReturn");
    }
  }
};
</script>

<style lang="less" scoped>
.return_btn {
  position: fixed;
  right: 0;
  bottom: 100px;
  width: 150px;
  height: 150px;
  z-index: 1000;
}
</style>
