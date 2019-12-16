<template>
  <div class="my_team">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="my_team_grade">
      <span :class="{ active: grade_active }" @click="onSwitch(true)"
        >一级会员</span
      >
      <span :class="{ active: !grade_active }" @click="onSwitch(false)"
        >二级会员</span
      >
    </div>
    <div class="placeholder"></div>
    <div class="my_team_item" v-for="item in my_team_list" :key="item.id">
      <img :src="item.avatar" />
      <div>
        <div class="my_team_item_content">
          <span class="my_team_name">{{ item.nickname }}</span>
          <van-button
            v-if="item.isvip"
            type="primary"
            text="VIP用户"
            color="#1b1b1b"
            round
          />
          <van-button
            v-else-if="!item.isvip && item.isrecommend"
            type="primary"
            text="推广大使"
            color="#1b1b1b"
            round
          />
          <van-button
            v-else
            type="primary"
            text="普通会员"
            color="#1b1b1b"
            round
          />
        </div>
        <span class="my_team_time">{{ item.agenttime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { MyAgent1, MyAgent2 } from "network/profile";
export default {
  data() {
    return {
      my_team_list: [],
      isrequest: true,
      page: 1,
      grade_active: true
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/promotionCenter");
    },
    onSwitch(type) {
      this.grade_active = type;
      this.my_team_list = [];
      this.page = 1;
      this.isrequest = true;
      if (this.grade_active) this._MyAgent1();
      else this._MyAgent2();
    },
    // 网络请求
    _MyAgent1() {
      if (this.isrequest) {
        MyAgent1(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.my_team_list = this.my_team_list.concat(res.list);
        });
      }
    },
    _MyAgent2() {
      if (this.isrequest) {
        MyAgent2(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          this.my_team_list = this.my_team_list.concat(res.list);
        });
      }
    }
  },
  created() {
    this._MyAgent1();
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
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.my_team {
  padding: 0 30px;
  .my_team_grade {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    font-size: 30px;
    line-height: 70px;
    z-index: 2;
    .active {
      color: #ff7301;
      font-weight: 700;
    }
  }
  .placeholder {
    width: 100%;
    height: 70px;
  }
  .my_team_item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 150px;
    padding: 35px;
    margin-top: 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    img {
      width: 80px;
      height: 80px;
      margin-right: 30px;
      background: #dcdcdc;
      border-radius: 50%;
    }
    .my_team_item_content {
      display: flex;
      flex-direction: row;
      align-items: center;
      .my_team_name {
        font-size: 30px;
      }
      .van-button {
        min-width: 112px;
        height: 30px;
        padding: 6px 20px;
        margin-left: 18px;
        font-size: 18px;
        line-height: 21px;
        .van-button__text {
          color: #ffc9a0;
        }
        &::before {
          display: none;
        }
      }
    }
    .my_team_time {
      font-size: 22px;
      color: #cccccc;
    }
  }
}
</style>
