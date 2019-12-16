<template>
  <div class="works">
    <return-btn @onClickReturn="onClickReturn" />
    <div
      class="works_item"
      v-for="item in works_list"
      :key="item.id"
      @click="onWorksIncome(item.id)"
    >
      <div class="works_item_info">
        <img :src="$store.state.interface_domain + item.thumb" />
        <h5>{{ item.title }}</h5>
        <span v-if="pinfo.id">pinfo.name</span>
        <span style="color:#999999" v-else>未参与公益</span>
      </div>
      <div class="works_item_bottom">
        <div>
          <img src="~assets/img/icon/people.png" />
          <span>{{ item.buynum }}</span>
        </div>
        <div>
          <img src="~assets/img/icon/bonus.png" />
          <span>￥{{ item.allprice }}</span>
        </div>
      </div>
      <img
        class="works_delete"
        src="~assets/img/icon/w_delete.png"
        @click.stop="onDeleteWorks(item.id)"
      />
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { ShareGoodsList, DeleteShareGoods } from "network/profile";
export default {
  data() {
    return {
      works_list: [],
      pinfo: {},
      isrequest: true,
      page: 1
    };
  },
  methods: {
    // 返回上一页
    onClickReturn() {
      this.$router.replace("/myCreation");
    },
    // 商品购买记录
    onWorksIncome(sgid) {
      this.$router.push({
        path: "/worksIncome",
        query: {
          sid: this.$route.query.sid,
          id: this.pinfo.id ? this.pinfo.id : 0,
          sgid
        }
      });
    },
    // 删除商品
    onDeleteWorks(id) {
      this.$dialog
        .confirm({
          title: "您确定删除该作品",
          confirmButtonColor: "#ff7301"
        })
        .then(() => this._DeleteShareGoods(id))
        .catch(() => {});
    },
    // 网络请求
    _ShareGoodsList() {
      if (this.isrequest) {
        ShareGoodsList(this.page++, this.$route.query.sid).then(res => {
          this.pinfo = res.pinfo;
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.works_list = this.works_list.concat(res.list);
        });
      }
    },
    _DeleteShareGoods(id) {
      DeleteShareGoods(this.$route.query.sid, id).then(() => {
        this.$toast("删除成功");
        this.clearget_timer = setTimeout(() => {
          this.works_list = [];
          this.page = 1;
          this.isrequest = true;
          this._ShareGoodsList();
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
        this._ShareGoodsList();
      }
    }
  },
  created() {
    this._ShareGoodsList();
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    clearInterval(this.clearget_timer);
    this.clearget_timer = null;
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.works {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 0 30px;
  .works_item {
    position: relative;
    width: 330px;
    height: 450px;
    padding: 0 25px;
    margin-top: 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    font-size: 24px;
    line-height: 32px;
    color: #ff7301;
    .works_item_info {
      text-align: center;
      img {
        width: auto;
        height: 280px;
      }
      h5 {
        font-size: 30px;
        line-height: 58px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      margin-bottom: 22px;
    }
    .works_item_bottom {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 60px;
      border-top: solid 2px #f6f6f6;
      img {
        width: 22px;
        height: 22px;
        margin-right: 20px;
      }
    }
    // img {
    //   width: 330px;
    //   height: 365px;
    //   border-radius: 18px 18px 0 0;
    // }
    // div {
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: space-between;
    //   padding: 0 20px;
    // }
    .works_delete {
      position: absolute;
      top: 17px;
      right: 24px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
