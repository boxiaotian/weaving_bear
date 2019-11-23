<template>
  <div class="artist_works">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="artist_work">
      <good-item
        v-for="item in customize_list"
        :key="item.id"
        :good="item"
        @customize="onDetails(item.id)"
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
        <template slot="good_fun">
          <div class="good_price"><span>￥</span>300</div>
        </template>
      </good-item>
    </div>
  </div>
</template>

<script>
import { ReturnBtn, GoodItem } from "components/index";
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
      return this.$router.back();
    },
    onDetails(id) {
      this.$router.push({
        name: "productDetails",
        params: { id }
      });
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
    ReturnBtn,
    GoodItem
  }
};
</script>

<style lang="less" scoped>
.artist_works {
  padding: 0 30px;
  .artist_work {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    .good_item {
      margin: 30px 0;
      .good_price {
        margin: 30px auto;
        font-size: 36px;
        font-weight: 700;
        color: #ff7024;
        span {
          font-size: 24px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
