<template>
  <ul class="tab-bar">
    <slot></slot>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 98px;
  background-color: #ffffff;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
}
</style>
