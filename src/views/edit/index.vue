<template>
  <div class="edit">
    <main-nav-bar
      :title="`编辑${$route.meta.title}`"
      right_text="保存"
      @onClickReturn="onClickReturn"
      @onClickRight="onSaveEdit"
    />
    <div class="pillow_front_back" v-if="$route.params.type == 'pillow'">
      <div :class="[isfront && 'pillow_front']" @click="onPillowFront">
        正面
      </div>
      <div :class="[isback && 'pillow_back']" @click="onPillowBack">
        反面
      </div>
    </div>
    <div class="edit_group">
      <div>
        <img
          v-if="$route.params.type == 'phone'"
          src="~assets/img/customize/phone_case_big.png"
        />
        <img
          v-if="$route.params.type == 'cup'"
          src="~assets/img/customize/cup_big.png"
        />
        <img
          v-if="$route.params.type == 'pillow'"
          src="~assets/img/customize/pillow_big.png"
        />
        <img
          v-if="$route.params.type == 'satchel'"
          src="~assets/img/customize/satchel_big.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { MainNavBar } from "components/index";
export default {
  data() {
    return {
      isfront: true,
      isback: false
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.push("/shareList");
    },
    onSaveEdit() {
      // return this.$router.push("/shareList");
      return this.$router.replace("/shareList");
    },
    // 抱枕正反面
    onPillowFront() {
      this.isfront = !this.isfront;
      this.isback = !this.isback;
    },
    onPillowBack() {
      this.isfront = !this.isfront;
      this.isback = !this.isback;
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
    MainNavBar
  }
};
</script>

<style lang="less">
.edit {
  .van-nav-bar {
    .van-nav-bar__right {
      bottom: 50%;
      right: 30px;
      transform: translateY(50%);
      font-size: 30px;
      font-weight: 500;
      width: 60px;
      height: 60px;
      .van-nav-bar__text {
        padding: 0;
        font-size: 30px;
        line-height: 60px;
        color: #ff7301;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.edit {
  position: relative;
  padding-top: 88px;
  .pillow_front_back {
    position: absolute;
    top: 168px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 80px;
    border-radius: 40px;
    border: solid 2px #ff7024;
    font-size: 36px;
    color: #ff7024;
    line-height: 80px;
    text-align: center;
    div {
      float: left;
      width: 50%;
      height: 100%;
      &.pillow_front {
        border-radius: 40px 0 0 40px;
        color: #ffffff;
        background-color: #ff7024;
      }
      &.pillow_back {
        border-radius: 0 40px 40px 0;
        color: #ffffff;
        background-color: #ff7024;
      }
    }
  }
  .edit_group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 500px;
    margin-top: 330px;
    img {
      width: auto;
      height: 500px;
    }
  }
}
</style>
