<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>
<style lang="less">
@import "assets/css/base.css";
@import "common/font.css";
</style>
