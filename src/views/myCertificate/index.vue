<template>
  <div
    class="my_certificate"
    :style="{ height: window_height.toFixed(3) + 'rem' }"
  >
    <return-btn @onClickReturn="onClickReturn" />
    <div class="my_certificate_top" ref="my_certificate_top">
      <div class="my_certificate_info">
        <img class="profile_avatar" :src="user_info.avatar" />
        <div class="profile_info">
          <div class="profile_name">{{ user_info.nickname }}</div>
          <div>已获得证书：{{ user_info.certNum }}</div>
        </div>
      </div>
      <div
        class="my_certificate_group"
        ref="my_certificate_group"
        @scroll="listScroll($event)"
        :style="{ height: certificate_height.toFixed(3) + 'rem' }"
      >
        <div class="my_certificate_content" id="my_certificate_group">
          <div
            class="my_certificate_item"
            v-for="item in certificccate_list"
            :key="item.id"
            @click="onViewCertificate(item.id)"
          >
            <img
              class="my_certificate_img"
              src="~assets/img/profile/certificate.png"
            />
            <h6>{{ item.name }}</h6>
            <div>{{ item.createtime }}</div>
            <!-- <van-overlay :show="item.id == 15"> -->
            <div class="certificate_box" :id="'imageWrapper' + item.id">
              <img src="~assets/img/profile/certificate_box.png" />
              <span class="winner">{{ user_info.nickname }}</span>
              <span class="award_info">{{ item.createtime }}</span>
            </div>
            <!-- </van-overlay> -->
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show_certificate" @click="show_certificate = false">
      <img class="certificate_box_img" :src="certificate_img" />
      <van-icon
        class="certificate_box_close"
        name="close"
        color="#ffffff"
        @click="show_certificate = false"
      />
    </van-overlay>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { ReturnBtn } from "components/index";
import { PublicCert } from "network/profile";
export default {
  data() {
    return {
      window_height: 0,
      certificate_height: 0,
      show_certificate: false, // 查看证书
      certificate_img: "", // 证书大图
      user_info: {}, // 用户信息
      certificccate_list: [], // 证书列表
      isrequest: true, //是否请求
      page: 1 // 分页
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    },
    onViewCertificate(id) {
      html2canvas(document.getElementById("imageWrapper" + id), {
        useCORS: true,
        allowTaint: true,
        taintTest: false,
        backgroundColor: "rgba(0,0,0,0)",
        logging: false
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.show_certificate = !this.show_certificate;
        this.certificate_img = dataURL;
      });
    },
    // 网络请求
    _PublicCert() {
      if (this.isrequest) {
        PublicCert(this.page++).then(res => {
          if (res.list.length == 10) this.isrequest = true;
          else this.isrequest = false;
          if (this.page == 2) this.user_info = res.uinfo;
          this.certificccate_list = this.certificccate_list.concat(res.list);
        });
      }
    },
    // 可滚动容器的高度
    listScroll($event) {
      let innerHeight = document.getElementById("my_certificate_group")
        .clientHeight;
      let outerHeight = this.$refs.my_certificate_group.clientHeight;
      let scrollTop = $event.target.scrollTop;
      if (innerHeight - outerHeight - 50 < scrollTop) {
        this._PublicCert();
      }
    }
  },
  created() {
    this._PublicCert();
  },
  mounted() {
    const windowHeight = window.outerHeight
      ? window.outerHeight * window.dpr
      : window.innerHeight;
    const certificateHeight = this.$refs.my_certificate_top.offsetHeight;
    this.certificate_height =
      (windowHeight - certificateHeight + 40) / window.rem;
    this.window_height = windowHeight / window.rem;
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.my_certificate {
  .my_certificate_top {
    position: relative;
    display: flex;
    width: 100%;
    height: 272px;
    padding: 0 30px 128px;
    background-image: linear-gradient(-31deg, #ffa868 0%, #ffc8a0 100%);
    .my_certificate_info {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #ffffff;
      font-size: 24px;
      .profile_avatar {
        width: 100px;
        height: 100px;
        margin-right: 30px;
        border-radius: 50%;
      }
      .profile_info {
        .profile_name {
          font-size: 36px;
          line-height: 68px;
          font-weight: 700;
        }
      }
    }
    .my_certificate_group {
      overflow-y: auto;
      position: absolute;
      left: 0;
      top: 232px;
      width: 100%;
      height: auto;
      padding: 78px 30px 36px;
      background-color: #ffffff;
      border-radius: 50px 50px 0px 0px;
      .my_certificate_content {
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        .my_certificate_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 330px;
          height: 400px;
          margin-bottom: 30px;
          background-color: #ffffff;
          box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
          border-radius: 18px;
          font-size: 18px;
          color: #384346;
          .my_certificate_img {
            width: 120px;
            height: 176px;
            margin: 40px 0;
          }
          h6 {
            margin: 20px 0;
            font-size: 30px;
            font-weight: 300;
            line-height: 30px;
          }
        }
      }
    }
  }
  .van-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    .certificate_box_img {
      width: 690px;
      height: 1030px;
    }
    .certificate_box_close {
      margin-top: 58px;
      font-size: 60px;
    }
  }
  .certificate_box {
    position: fixed;
    width: 690px;
    height: 1030px;
    background-color: #ffffff;
    color: #854e00;
    font-size: 24px;
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
    }
    .winner {
      position: absolute;
      top: 326px;
      left: 94px;
    }
    .award_info {
      position: absolute;
      right: 100px;
      bottom: 154px;
      z-index: 1;
      font-size: 18px;
    }
  }
}
</style>
