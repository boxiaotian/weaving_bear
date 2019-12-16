<template>
  <div class="share_list">
    <return-btn @onClickReturn="onClickReturn" />
    <good-item v-for="item in customize_list" :key="item.id" :good="item">
      <template slot="good_img">
        <img :src="item.thumb" />
      </template>
      <template slot="good_fun">
        <div class="good_fun_group">
          <van-button
            type="primary"
            text="去编辑"
            color="#ff7301"
            @click="onEdit(item)"
            plain
            round
          />
          <van-button
            type="primary"
            :color="item.ischoose ? '#d2d2d2' : '#ff7024'"
            class="good_choose"
            :text="item.ischoose ? '已选择' : '选择'"
            @click="onChoose(item.id)"
            round
          />
        </div>
      </template>
    </good-item>
    <van-button
      class="share_now"
      type="primary"
      size="large"
      color="#ff7024"
      text="立即分享"
      @click="onShare"
    />
  </div>
</template>

<script>
import { ReturnBtn, GoodItem } from "components/index";
import { CustomGoodsList } from "network/customize";
import { SubmitShareGoods } from "network/share";
export default {
  data() {
    return {
      customize_list: [],
      isrequest: true,
      page: 1
    };
  },
  computed: {},
  methods: {
    onClickReturn() {
      return this.$router.push("/iShare");
    },
    // 选择商品编辑
    onEdit(obj) {
      const { id, thumb, isextend, isdoble, title } = obj;
      if (isextend)
        this.$router.push({ path: "/model", query: { id, type: "share" } });
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
          thumb: thumb
        });
        this.$router.push("/edit");
      }
    },
    // 选择商品分享
    onChoose(id) {
      this.customize_list.map(item => {
        if (item.id == id) item.ischoose = !item.ischoose;
      });
    },
    // 立即分享
    onShare() {
      let { sid, share_goods } = this.$store.state;
      let data = [];
      this.customize_list.map(item_list => {
        share_goods.map(item => {
          if (item_list.ischoose && item_list.id == item.gid) {
            data.push({ ...item });
          }
        });
      });
      if (data.length) this._SubmitShareGoods(sid, data);
      else this.$toast("至少选择一样分享作品");
    },
    // 网络请求
    _CustomGoodsList() {
      if (this.isrequest) {
        CustomGoodsList(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          res.list.map(item => {
            this.customize_list.push({
              ...item,
              ischoose: false,
              thumb: this.$store.state.interface_domain + item.thumb
            });
          });
          if (this.$store.state.share_goods.length) {
            this.customize_list.map((item_list, index) => {
              this.$store.state.share_goods.map(item => {
                if (item_list.id == item.gid)
                  this.customize_list[index].thumb =
                    this.$store.state.interface_domain + item.thumb;
              });
            });
          }
        });
      }
    },
    _SubmitShareGoods(id, data) {
      SubmitShareGoods(id, JSON.stringify(data)).then(() =>
        this.$router.push({ path: "/share", query: { id } })
      );
    },
    // 可滚动容器的高度
    onScroll() {
      let innerHeight = document.querySelector("#app").clientHeight;
      let outerHeight = document.documentElement.clientHeight;
      let scrollTop = document.documentElement.scrollTop;
      if (innerHeight - outerHeight - 50 < scrollTop) {
        this._CustomGoodsList();
      }
    }
  },
  created() {
    this._CustomGoodsList();
    window.addEventListener("scroll", this.onScroll);
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

<style lang="less"></style>
<style lang="less" scoped>
.share_list {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 0 30px;
  padding-bottom: 100px;
  .good_fun_group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 90px;
    padding: 20px;
    text-align: center;
    .van-button {
      width: 100px;
      height: 50px;
      padding: 0;
      line-height: 50px;
      font-size: 24px;
    }
    .good_choose {
      width: 150px;
    }
  }
  .share_now {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    font-size: 36px;
    font-weight: 700;
    line-height: 100px;
  }
}
</style>
