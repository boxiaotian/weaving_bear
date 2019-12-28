<template>
  <div class="model">
    <return-btn @onClickReturn="onClickReturn" />
    <!-- <div class="search_group" ref="search">
      <div class="search">
        <van-field v-model="search_value" placeholder="输入想要搜索的机型" />
        <img src="~assets/img/icon/search.png" />
      </div>
    </div> -->
    <div
      class="model_scroll"
      :style="{ height: scroll_height.toFixed(3) + 'rem' }"
    >
      <div class="menu_group" ref="goodMenu">
        <div
          :class="['menu', menuActive == index ? 'menu_active' : '']"
          v-for="(item, index) in model_list_data"
          :key="item.id"
          @click="onMenuClick(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="submenu_group" @scroll="listScroll($event)" ref="goodList">
        <div v-for="item in model_list_data" :key="item.id" ref="submenu">
          <div
            class="model_series"
            v-for="serie in item.series_list"
            :key="serie.id"
          >
            <div>{{ serie.name }}</div>
            <ul class="device_group">
              <li
                v-for="device_item in serie.child"
                :key="device_item.id"
                @click="onCustomize(device_item)"
              >
                {{ device_item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { CustomGoodsMobileClass } from "network/customize";
export default {
  data() {
    return {
      search_value: "",
      scroll_height: 0,
      model_list_data: [],
      heightList: [0],
      menuActive: 0,
      clearget_timer: null // 清除定时器
    };
  },
  methods: {
    onClickReturn() {
      if (this.$route.query.type == "share") this.$router.push("/shareList");
      else this.$router.push("/customizeList");
    },
    // 点击菜单
    onMenuClick(index) {
      this.$refs.goodList.scrollTop = this.heightList[index] + index * 30;
      this.menuActive = index;
    },
    // 滚动显示对应菜单
    listScroll($event) {
      let scrollTop = $event.target.scrollTop;
      this.heightList.map((item, index) => {
        if (scrollTop >= item && scrollTop < this.heightList[index + 1]) {
          this.menuActive = index;
        }
      });
    },
    // 获取每个子菜单高度
    getHeight() {
      this.clearget_timer = setTimeout(() => {
        let height = 0;
        this.$refs.submenu &&
          this.$refs.submenu.forEach(item => {
            height += item.clientHeight;
            this.heightList.push(height);
          });
      }, 1000);
    },
    // 制作手机壳
    onCustomize(obj) {
      this.$store.commit("customInfo", {
        ...obj,
        gid: this.$route.query.id,
        isextend: 1,
        isdoble: 0,
        customize_type: 1,
        title: obj.name
      });
      if (this.$route.query.type == "share") this.$router.push("/edit");
      else this.$router.push("/customize");
    },
    // 网络请求
    _CustomGoodsMobileClass() {
      // 请求一级分类数据
      CustomGoodsMobileClass()
        .then(res => {
          // 一级分类循环并push
          res.list.map(model => {
            this.model_list_data.push({
              id: model.id,
              name: model.name,
              series_list: []
            });
          });
        })
        .then(() => {
          // 一级分类循环
          this.model_list_data.map(model => {
            let model_item = model;
            CustomGoodsMobileClass(model_item.id).then(series_res => {
              // 循环子类
              series_res.list.map(series => {
                let { pid, id, name, child } = series;
                // 子类与父类id对比
                if (series.pid == model.id)
                  model_item.series_list.push({ pid, id, name, child });
              });
            });
          });
        });
    }
  },
  created() {
    this._CustomGoodsMobileClass();
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
    // const search_height = this.$refs.search.offsetHeight;
    // this.scroll_height = (windowHeight - search_height) / window.rem;
    this.scroll_height = windowHeight / window.rem;
  },
  beforeDestroy() {
    clearInterval(this.clearget_timer);
    this.clearget_timer = null;
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
      width: 167px;
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
      padding: 0 15px 10px;
      border-top: solid 2px #eeeeee;
      overflow-x: hidden;
      scroll-behavior: smooth;
      .model_series {
        // margin-top: 30px;
        font-weight: 700;
        .device_group {
          display: flex;
          flex-flow: wrap;
          margin-bottom: 30px;
          font-weight: 300;
          li {
            padding: 11px;
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
