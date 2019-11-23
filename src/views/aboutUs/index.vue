<template>
  <div class="about_us">
    <return-btn @onClickReturn="onClickReturn" />
    <div class="weaving_bear">
      <p>织布熊</p>
      <div>
        公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍
      </div>
    </div>
    <div class="platform">
      <p>
        公益合作平台
      </p>
      <div>
        信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍
      </div>
    </div>
  </div>
</template>

<script>
import { ReturnBtn } from "components/index";
export default {
  methods: {
    onClickReturn() {
      this.$router.replace("/profile");
    }
  },
  components: {
    ReturnBtn
  }
};
</script>

<style lang="less" scoped>
.about_us {
  padding: 0 30px;
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
