<template>
  <div class="my_creation">
    <return-btn @onClickReturn="onClickReturn" />
    <router-link
      class="my_creation_item"
      :to="{ path: '/works', query: { sid: item.id } }"
      tag="div"
      v-for="item in creation_list"
      :key="item.id"
    >
      <img :src="$store.state.interface_domain + item.thumb" />
      <div>
        <span>作品数：{{ item.goodsnum }}</span
        ><span>{{ item.createtime }}</span>
      </div>
      <img
        class="my_creation_delete"
        src="~assets/img/icon/delete.png"
        @click.stop="onDeleteCreation(item.id)"
      />
    </router-link>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { ShareList, DeleteShare } from "network/profile";
export default {
  data() {
    return {
      creation_list: [],
      isrequest: true,
      page: 1,
      clearget_timer: null // 清除定时器
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onDeleteCreation(sid) {
      this.$dialog
        .confirm({
          title: "您确定删除你的作品",
          confirmButtonColor: "#ff7301"
        })
        .then(() => this._DeleteShare(sid))
        .catch(() => {});
    },
    // 网络请求
    _ShareList() {
      if (this.isrequest) {
        ShareList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.creation_list = this.creation_list.concat(res.list);
        });
      }
    },
    _DeleteShare(sid) {
      DeleteShare(sid).then(() => {
        this.$toast("删除成功");
        this.clearget_timer = setTimeout(() => {
          this.creation_list = [];
          this.page = 1;
          this.isrequest = true;
          this._ShareList();
        }, 1000);
      });
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
        this._ShareList();
      }
    }
  },
  created() {
    this._ShareList();
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    clearInterval(this.clearget_timer);
    this.clearget_timer = null;
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
    overflow: hidden;
    img {
      display: block;
      width: auto;
      height: 365px;
      margin: auto;
    }
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 20px;
    }
    .my_creation_delete {
      position: absolute;
      top: 17px;
      right: 24px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
