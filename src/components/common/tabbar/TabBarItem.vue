<template>
  <li class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon" /></div>
    <div v-else><slot name="item-icon-active" /></div>
    <div :style="activeStyle"><slot name="item-text" /></div>
  </li>
</template>

<script>
export default {
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 49px;
  font-size: 14px;
  line-height: 22px;
  text-align: center;

  img {
    width: 42px;
    height: 42px;
    vertical-align: middle;
  }
}
</style>
