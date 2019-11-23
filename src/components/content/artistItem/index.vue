<template>
  <router-link
    :to="{ path: '/artistWorks', query: { id: artist.item } }"
    tag="div"
    class="artist_item"
  >
    <img src="~assets/img/home/artist_three.png" />
    <div class="title_introduction">
      <div class="title">艺术家</div>
      <div class="introduction">简介{{ artist.item }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    artist: Object
  }
};
</script>

<style lang="less" scoped>
.artist_item {
  width: 330px;
  height: 450px;
  margin-top: 30px;
  background-color: #ffffff;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  font-size: 30px;
  font-weight: 700;
  line-height: 38px;
  color: #333333;
  text-align: center;

  img {
    width: 330px;
    height: 290px;
    border-radius: 18px 18px 0 0;
  }
  .title_introduction {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 160px;
    padding: 0 10px;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .introduction {
    margin-top: 8px;
    font-size: 24px;
    line-height: 32px;
    color: #cccccc;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
}
</style>
