<template>
  <div class="customize_list">
    <main-nav-bar @onClickReturn="onClickReturn" />
    <div class="customize_list_group">
      <good-item
        v-for="item in customize_list"
        :key="item.id"
        :good="item"
        @customize="onCustomize(item.id)"
      >
        <template slot="good_img">
          <img
            v-if="item.id == 1"
            src="~/assets/img/customize/phone_case.png"
          />
          <img v-else-if="item.id == 2" src="~/assets/img/customize/cup.png" />
          <img
            v-else-if="item.id == 3"
            src="~/assets/img/customize/pillow.png"
          />
          <img v-else src="~/assets/img/customize/satchel.png" />
        </template>
      </good-item>
    </div>
  </div>
</template>

<script>
import { MainNavBar, GoodItem } from "components/index";
export default {
  data() {
    return {
      customize_list: [
        {
          id: 1,
          title: "手机壳"
        },
        {
          id: 2,
          title: "情侣变色杯"
        },
        {
          id: 3,
          title: "抱枕"
        },
        {
          id: 4,
          title: "单肩挎包"
        }
      ]
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.push("/home");
    },
    onCustomize(id) {
      switch (id) {
        case 1:
          this.$router.push("/model");
          break;
        case 2:
          this.$router.push("/customize/cup");
          break;
        case 3:
          this.$router.push("/customize/pillow");
          break;
        case 4:
          this.$router.push("/customize/satchel");
          break;
        default:
          this.$router.push("/model");
          break;
      }
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
    MainNavBar,
    GoodItem
  }
};
</script>

<style lang="less" scoped>
.customize_list {
  padding: 88px 0 98px;
  .customize_list_group {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    padding: 22px 30px;
  }
}
</style>
