<template>
  <div class="model">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="search_group" ref="search">
      <div class="search">
        <van-field v-model="search_value" placeholder="输入想要搜索的机型" />
        <img src="~assets/img/icon/search.png" />
      </div>
    </div>
    <div
      class="model_scroll"
      :style="{ height: scroll_height.toFixed(3) + 'rem' }"
    >
      <div class="menu_group" ref="goodMenu">
        <div
          :class="['menu', menuActive == index ? 'menu_active' : '']"
          v-for="(item, index) in model_list"
          :key="item.id"
          @click="onMenuClick(index)"
        >
          {{ item.model }}
        </div>
      </div>
      <div class="submenu_group" @scroll="listScroll($event)" ref="goodList">
        <div v-for="item in model_list" :key="item.id" ref="submenu">
          <div
            class="model_series"
            v-for="serie in item.series_list"
            :key="serie.id"
          >
            <div>{{ serie.series }}</div>
            <ul class="device_group">
              <router-link
                to="/customize/phone"
                tag="li"
                v-for="device_item in serie.device_list"
                :key="device_item.id"
                >{{ device_item.device }}</router-link
              >
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  data() {
    return {
      search_value: "",
      scroll_height: 0,
      model_list: [
        {
          id: 1,
          model: "华为",
          series_list: [
            {
              id: 1,
              series: "HUAWEI  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "华为mate20pro"
                },
                {
                  id: 2,
                  device: "华为as"
                },
                {
                  id: 3,
                  device: "华为as"
                },
                {
                  id: 4,
                  device: "华为mate20pro"
                }
              ]
            },
            {
              id: 2,
              series: "HUAWEI  Mate 系列一",
              device_list: [
                {
                  id: 1,
                  device: "华为mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          model: "OPPO",
          series_list: [
            {
              id: 1,
              series: "OPPO  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "OPPO mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 3,
          model: "vivo",
          series_list: [
            {
              id: 1,
              series: "vivo  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "vivo mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 4,
          model: "iPhone",
          series_list: [
            {
              id: 1,
              series: "iPhone  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "iPhone mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 5,
          model: "小米",
          series_list: [
            {
              id: 1,
              series: "MI  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "MI mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 6,
          model: "魅族",
          series_list: [
            {
              id: 1,
              series: "魅族  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "魅族 mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 7,
          model: "三星",
          series_list: [
            {
              id: 1,
              series: "三星  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "三星 mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 8,
          model: "一加",
          series_list: [
            {
              id: 1,
              series: "一加  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "一加 mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 9,
          model: "一加",
          series_list: [
            {
              id: 1,
              series: "一加  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "一加 mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 10,
          model: "一加",
          series_list: [
            {
              id: 1,
              series: "一加  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "一加 mate20pro"
                }
              ]
            }
          ]
        },
        {
          id: 11,
          model: "一加",
          series_list: [
            {
              id: 1,
              series: "一加  Mate 系列",
              device_list: [
                {
                  id: 1,
                  device: "一加 mate20pro"
                }
              ]
            }
          ]
        }
      ],
      heightList: [0],
      menuActive: 0
    };
  },
  methods: {
    onClickReturn() {
      return this.$router.push("/customizeList");
    },
    onMenuClick(index) {
      this.$refs.goodList.scrollTop = this.heightList[index] + 30;
      this.menuActive = index;
    },
    listScroll($event) {
      let scrollTop = $event.target.scrollTop;
      this.heightList.map((item, index) => {
        if (scrollTop >= item && scrollTop < this.heightList[index + 1]) {
          this.menuActive = index;
        }
      });
    },
    getHeight() {
      let height = 0;
      this.$refs.submenu.forEach(item => {
        height += item.clientHeight;
        this.heightList.push(height);
      });
    }
  },
  created() {
    this.$nextTick(() => {
      this.getHeight();
    });
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickReturn, false); //false阻止默认事件
    }
    const windowHeight = window.outerHeight
      ? window.outerHeight * window.dpr
      : window.innerHeight;
    const search_height = this.$refs.search.offsetHeight;
    this.scroll_height = (windowHeight - search_height) / window.rem;
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
.model {
  .search_group {
    padding: 20px 30px;
    .search {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 70px;
      padding: 12px 38px;
      border-radius: 35px;
      border: solid 2px #1b1b1b;
      .van-cell {
        padding: 0;
        font-size: 30px;
        &::after {
          border: none;
        }
      }
      img {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
      }
    }
  }
  .model_scroll {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    overflow: hidden;
    .menu_group {
      width: 230px;
      height: 100%;
      background-color: #f6f6f6;
      border-top: solid 2px #eeeeee;
      overflow-x: hidden;
      .menu {
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;

        &.menu_active {
          position: relative;
          background-color: #ffffff;
          font-weight: 700;
          color: #ff7301;

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 6px;
            height: 57px;
            background-color: #ff7024;
            border-radius: 3px;
          }
        }
      }
    }
    .submenu_group {
      flex: 1;
      height: 100%;
      padding: 0 30px;
      border-top: solid 2px #eeeeee;
      overflow-x: hidden;
      scroll-behavior: smooth;
      .model_series {
        margin-top: 30px;
        font-weight: 700;
        .device_group {
          display: flex;
          flex-flow: wrap;
          font-weight: 300;
          li {
            padding: 14px;
            margin-top: 30px;
            margin-right: 20px;
            background-color: #ffffff;
            box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
          }
        }
      }
    }
  }
}
</style>
