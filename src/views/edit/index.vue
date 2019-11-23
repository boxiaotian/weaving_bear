<template>
  <div class="edit" :style="{ height: edit_height.toFixed(3) + 'rem' }">
    <return-btn @onClickReturn="onClickReturn" />
    <img
      class="save"
      src="~assets/img/customize/save_btn.png"
      @click="onSaveEdit"
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
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  data() {
    return {
      edit_height: 0,
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
    const windowHeight = window.outerHeight
      ? window.outerHeight * window.dpr
      : window.innerHeight;
    this.edit_height = windowHeight / window.rem;
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
  },
  components: {
    ReturnBtn
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
      font-weight: 700;
      width: 60px;
      height: 60px;
      line-height: 60px;
      .van-nav-bar__text {
        padding: 0;
        color: #ff7301;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.edit {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pillow_front_back {
    position: absolute;
    top: 80px;
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
    width: 600px;
    height: 600px;
    img {
      display: inline-block;
      width: auto;
      height: 600px;
    }
  }
  .save {
    position: fixed;
    right: 0;
    bottom: 300px;
    width: 150px;
    height: 150px;
  }
}
</style>
