<template>
  <div class="customize_list">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="customize_list_group">
      <good-item
        v-for="item in customize_list"
        :key="item.id"
        :good="item"
        @customize="onCustomize(item)"
      >
        <template slot="good_img">
          <img :src="$store.state.interface_domain + item.thumb" />
        </template>
      </good-item>
    </div>
  </div>
</template>

<script>
import { ReturnBtn, GoodItem } from "components/index";
import { CustomGoodsList } from "network/customize";
export default {
  data() {
    return {
      customize_list: [],
      isrequest: true,
      page: 1
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.push("/home");
    },
    onCustomize(obj) {
      const { id, thumb, isextend, isdoble, title } = obj;
      if (isextend)
        this.$router.push({ path: "/model", query: { id, type: "customize" } });
      else {
        let customize_type;
        if (title.includes("壳")) customize_type = 1;
        else if (title.includes("枕")) customize_type = 2;
        else if (title.includes("包")) customize_type = 3;
        else if (title.includes("杯")) customize_type = 4;
        else if (title.includes("盒")) customize_type = 5;
        this.$store.commit("customInfo", {
          id,
          isextend,
          isdoble,
          customize_type,
          title,
          thumb: this.$store.state.interface_domain + thumb
        });
        this.$router.push("/customize");
      }
    },
    // 网络请求
    _CustomGoodsList() {
      if (this.isrequest) {
        CustomGoodsList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.customize_list = this.customize_list.concat(res.list);
        });
      }
    },
    // 可滚动容器的高度
    onScroll() {
      let innerHeight = document.querySelector("#app").clientHeight;
      let outerHeight = document.documentElement.clientHeight;
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      if (innerHeight - outerHeight - 50 < scrollTop) {
        this._CustomGoodsList();
      }
    }
  },
  created() {
    this._CustomGoodsList();
    window.addEventListener("scroll", this.onScroll);
  },
  components: {
    ReturnBtn,
    GoodItem
  }
};
</script>

<style lang="less" scoped>
.customize_list {
  padding: 0 30px;
  .customize_list_group {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }
}
</style>
