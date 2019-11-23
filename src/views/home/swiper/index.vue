<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="item in slides" :key="item"
      ><img src="~assets/img/home/banner.png"
    /></swiper-slide>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      currentTab: 1,
      slides: [1, 2, 3, 4],
      swiperOption: {
        initialSlide: 1,
        debugger: true,
        autoplay: false,
        loop: false,
        slidesPerView: "auto",
        centeredSlides: true,
        hashNavigation: true
      }
    };
  },
  created() {
    this.swiperOption = {
      ...this.swiperOption,
      autoplay: this.slides.length > 1 ? true : false,
      loop: this.slides.length > 1 ? true : false
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
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
