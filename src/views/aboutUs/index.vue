<template>
  <div class="about_us">
    <return-btn @onClickReturn="onClickReturn" />
    <div v-html="details" />
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
import { AboutUs } from "network/profile";
export default {
  data() {
    return {
      details: ""
    };
  },
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    }
  },
  created() {
    AboutUs().then(res => (this.details = res.info));
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less">
.about_us {
  padding: 0 30px;
  p {
    text-indent: 0;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .weaving_bear,
  .platform {
    padding-top: 60px;
    font-size: 24px;
    color: #343434;
    p {
      margin-bottom: 20px;
      font-size: 30px;
      color: #e83928;
    }
  }
}
</style>
