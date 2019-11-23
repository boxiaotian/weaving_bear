<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.png" />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png" />
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.png" />
      <img
        slot="item-icon-active"
        src="~assets/img/tabbar/profile_active.png"
      />
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import { TabBar, TabBarItem } from "components/index";

export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped></style>
