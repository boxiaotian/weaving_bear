<template>
  <div class="works">
    <return-btn @onClickReturn="onClickReturn" />
    <router-link
      to="/worksIncome"
      tag="div"
      class="works_item"
      v-for="item in 3"
      :key="item"
    >
      <div class="works_item_info">
        <img src="~assets/img/customize/phone_case.png" />
        <h5>手机壳名称手机壳名称手机壳名称手机壳名称</h5>
        <span>红十字基金会</span>
      </div>
      <div class="works_item_bottom">
        <div>
          <img src="~assets/img/icon/people.png" />
          <span>5</span>
        </div>
        <div>
          <img src="~assets/img/icon/bonus.png" />
          <span>￥30.25</span>
        </div>
      </div>
      <van-icon
        name="delete"
        @click.stop="onDelete"
        color="#000000"
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
      this.$router.push("/myCreation");
    },
    onDelete() {
      this.$dialog
        .confirm({
          title: "您确定删除该作品",
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
    .van-icon {
      position: absolute;
      top: 17px;
      right: 24px;
    }
  }
}
</style>
