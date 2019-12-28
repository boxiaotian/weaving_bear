<template>
  <div class="charity_pool">
    <return-btn @onClickReturn="onClickReturn" />
    <van-radio-group v-model="radio">
      <van-radio
        v-for="item in public_lool_list"
        :key="item.id"
        :name="item.id"
        checked-color="#ff7301"
      >
        <div class="charity_pool_item" @click.stop="onCharityPool(item.id)">
          <img
            class="charity_pool_img"
            :src="$store.state.interface_domain + item.banner"
          />
          <div class="charity_pool_content">
            <div class="charity_pool_descri">
              {{ item.descri }}
            </div>
            <div class="charity_pool_name">{{ item.name }}</div>
          </div>
        </div>
      </van-radio>
    </van-radio-group>
    <div class="charity_pool_btn">
      <van-button
        type="default"
        text="我建议选这个"
        color="#ff7301"
        @click="onSingle"
        round
      />
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { PublicPoolList } from "network/charityPool";
import { OverOrderPublic } from "network/profile";
export default {
  data() {
    return {
      public_lool_list: [],
      isrequest: true,
      page: 1,
      radio: 0
    };
  },
  methods: {
    onClickReturn() {
      this.$router.back(-1);
    },
    onCharityPool(pid) {
      this.$router.push({ path: "/foundation", query: { pid } });
    },
    onSingle() {
      this.public_lool_list.map(item => {
        if (item.id == this.radio) {
          this.$dialog
            .confirm({
              title: `您确定${item.name}公益项目`,
              confirmButtonColor: "#ff7301"
            })
            .then(() => {
              this._OverOrderPublic({
                paysn: this.$route.query.paysn,
                pid: item.id,
                pname: item.name
              });
            })
            .catch(() => {});
        }
      });
    },
    // 网络请求
    _PublicPoolList() {
      if (this.isrequest) {
        PublicPoolList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.public_lool_list = this.public_lool_list.concat(res.list);
          this.radio = this.public_lool_list[0].id;
        });
      }
    },
    _OverOrderPublic(params) {
      OverOrderPublic(params).then(res => {
        this.$store.commit("pInfo", {
          id: params.pid,
          name: params.pname,
          price: res.pprice,
          type: 0
        });
        this.$router.back(-1);
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
        this._PublicPoolList();
      }
    }
  },
  created() {
    this._PublicPoolList();
    window.onscroll = () => this.onScroll();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
  },
  beforeDestroy() {
    window.onscroll = "";
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
.charity_pool {
  .van-radio-group {
    .van-radio {
      width: 100%;
      height: 200px;
      padding: 40px 30px;
      margin-bottom: 30px;
      background-color: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
      border-radius: 18px;
      .van-radio__label {
        width: 100%;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.charity_pool {
  padding: 30px;
  .charity_pool_item {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    line-height: 38px;
    font-weight: 700;
    color: #333333;
    .charity_pool_img {
      min-width: 120px;
      height: 120px;
      margin-right: 26px;
      background-color: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
      border-radius: 18px;
    }
    .charity_pool_content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .charity_pool_descri {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
      }
      .charity_pool_name {
        font-size: 24px;
        color: #ff7301;
      }
    }
  }
  .charity_pool_btn {
    width: 100%;
    height: 17.09vh;
    padding: 70px 0;
    .van-button {
      display: block;
      width: 500px;
      margin: auto;
      font-size: 36px;
      font-weight: bold;
    }
  }
}
</style>
