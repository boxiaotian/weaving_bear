<template>
  <div class="my_creation">
    <return-btn @onClickReturn="onClickReturn" />
    <router-link
      class="my_creation_item"
      to="/works"
      tag="div"
      v-for="item in 4"
      :key="item"
    >
      <img src="~assets/img/profile/my_creation.png" />
      <div><span>作品数：3</span><span>2019.11.5</span></div>
      <van-icon
        name="delete"
        @click.stop="onDelete"
        color="#ffffff"
        size="1em"
      />
    </router-link>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onDelete() {
      this.$dialog
        .confirm({
          title: "您确定删除你的作品",
          confirmButtonColor: "#ff7301"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  // mounted() {
  //   if (window.history && window.history.pushState) {
  //     history.pushState(null, null, document.URL);
  //     window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
  //   }
  // },
  // destroyed() {
  //   window.removeEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
  // },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.my_creation {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 0 30px;
  .my_creation_item {
    position: relative;
    width: 330px;
    height: 450px;
    margin-top: 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    font-size: 24px;
    line-height: 85px;
    img {
      width: 330px;
      height: 365px;
      border-radius: 18px 18px 0 0;
    }
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 20px;
    }
    .van-icon {
      position: absolute;
      top: 17px;
      right: 24px;
    }
  }
}
</style>
