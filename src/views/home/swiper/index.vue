<template>
  <swiper v-if="isSwiper" :options="swiperOption">
    <swiper-slide v-for="item in swiper_list" :key="item.id">
      <a v-if="item.linktype" :href="item.linkcontent">
        <img
          v-if="item.linktype == 1"
          :src="$store.state.interface_domain + item.thumb"
        />
      </a>
      <img v-else :src="$store.state.interface_domain + item.thumb" />
    </swiper-slide>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      currentTab: 1,
      swiperOption: {
        initialSlide: 1,
        debugger: true,
        autoplay: true,
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        hashNavigation: true
      },
      isSwiper: false
    };
  },
  props: {
    swiper_list: Array
  },
  methods: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    setTimeout(() => {
      this.isSwiper = true;
    }, 500);
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="less" scoped>
.swiper-container {
  .swiper-wrapper {
    .swiper-slide {
      position: relative;
      width: 690px;
      height: 600px;
      border-radius: 18px;
      img {
        width: 100%;
        height: 560px;
        margin: 20px auto;
        transition: all 0.5s ease 0s;
        background-color: #ffffff;
        border-radius: 18px;
      }
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 560px;
        margin: 20px auto 0;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 18px;
      }
      &.swiper-slide-active {
        &::before {
          content: "";
          display: none;
        }
        img {
          margin-top: 0;
          width: 100%;
          height: 100%;
          box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
}
</style>
