<template>
  <div class="home">
    <!-- <main-nav-bar :left_arrow="false" /> -->
    <home-swiper />
    <div class="my_special">
      <router-link to="/customizeList" tag="div">
        <img src="~assets/img/home/i_customize.png" />
      </router-link>
      <router-link to="/iShare" tag="div">
        <img src="~assets/img/home/i_share.png" />
      </router-link>
    </div>
    <div class="artist">
      <div class="artist_top">
        <img src="~assets/img/home/artist.png" />
        <span>公益艺术家</span>
        <router-link to="/artist">查看更多>></router-link>
      </div>
      <div class="artist_group">
        <artist-item
          v-for="item in artist_list"
          :key="item"
          :artist="{ item }"
        />
      </div>
    </div>
    <div class="public_welfare">
      <div class="public_welfare_top">
        <img src="~assets/img/home/public_welfare_pool.png" />
        <span>公益池</span>
        <router-link to="/charityPool">查看更多>></router-link>
      </div>
      <div class="public_welfare_group">
        <div
          class="public_welfare_item"
          v-for="(item, index) in public_welfare_list"
          :key="index"
        >
          <div class="public_welfare_name">
            <span>红十字基金会</span>
          </div>
          <div class="public_welfare_amount_stand_by">
            <div>
              <p class="amount_number">3520.00</p>
              <p>金额（元）</p>
            </div>
            <div>
              <p class="stand_by_number">2563</p>
              <p>支持人数</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_line">--人家是有底线的--</div>
    <main-tab-bar />
  </div>
</template>

<script>
import { ArtistItem, MainTabBar } from "components/index";
import HomeSwiper from "./swiper";
export default {
  data() {
    return {
      artist_list: [1, 2, 3, 4],
      public_welfare_list: [
        {
          name: "红十字基金会",
          amount: "3520.00",
          number: 2563
        },
        {
          name: "留守儿童基金会",
          amount: "6522.00",
          number: 3651
        },
        {
          name: "关爱老人基金会",
          amount: "4535.52",
          number: 2945
        }
      ]
    };
  },
  methods: {},
  components: {
    HomeSwiper,
    ArtistItem,
    MainTabBar
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  padding-bottom: 98px;
  .my_special {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 266px;
    padding: 58px 30px;
    img {
      width: 330px;
      height: 150px;
    }
  }
  .artist,
  .public_welfare {
    padding: 0 30px;
    .artist_top,
    .public_welfare_top {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 30px;
      font-weight: 500;
      line-height: 38px;
      color: #333333;
      img {
        width: 30px;
        height: 30px;
        margin-right: 20px;
      }
      a {
        position: absolute;
        top: 50%;
        right: 0;
        font-size: 24px;
        font-weight: 400;
        line-height: 32px;
        color: #999999;
        transform: translateY(-50%);
      }
    }
    .artist_group {
      display: flex;
      flex-direction: row;
      flex-flow: wrap;
      justify-content: space-between;
    }
  }
  .public_welfare {
    .public_welfare_top {
      margin: 60px auto 8px;
    }
    .public_welfare_group {
      .public_welfare_item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 300px;
        padding: 40px;
        margin-top: 30px;
        background-color: #ffffff;
        box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
        border-radius: 18px;

        .public_welfare_name {
          font-size: 30px;
          line-height: 38px;
          font-weight: 500;
          color: #333333;

          span {
            position: relative;
            &::before {
              content: "";
              position: absolute;
              top: 50%;
              right: -27px;
              transform: translateY(-35%);
              width: 10px;
              height: 18px;
              background: url("~assets/img/icon/arrow_r.png") no-repeat;
              background-size: cover;
            }
          }
        }

        .public_welfare_amount_stand_by {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          text-align: center;
          margin-bottom: 10px;
          font-size: 24px;
          line-height: 32px;
          font-weight: 500;
          color: #999999;
          .amount_number,
          .stand_by_number {
            margin-bottom: 24px;
            font-family: "DIN-Black";
            font-size: 48px;
            line-height: 56px;
            color: #ff7301;
          }
        }
      }
    }
  }
  .bottom_line {
    margin: 30px 0;
    font-size: 24px;
    letter-spacing: 6px;
    color: #999999;
    text-align: center;
  }
}
</style>
