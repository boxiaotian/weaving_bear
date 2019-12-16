<template>
  <div class="container">
    <div class="iphone" id="imageWrapper">
      <!-- <div class="camera"></div>
        <div class="logo"></div> -->
      <img class="poster-bg" :src="imgURL" />
      <img
        @touchstart="down"
        @touchmove="move"
        id="test"
        src="../../assets/logo.png"
        @touchend="end"
      />
    </div>
    <img v-if="dataURL" class="real_pic" :src="dataURL" />
    <button @click="toImage" style="margin: 12px 0;">确定</button>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { getBase64 } from "common/utils";
export default {
  data() {
    return {
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      dataURL: ""
    };
  },
  computed: {
    imgURL: function() {
      return getBase64(
        "http://qiniu.zbx.yuncshop.com/uploads/20191129/FoGgdzsZnshzHS73N_4uc489AvfJ.png"
      );
    }
  },
  methods: {
    toImage() {
      let imageWrapper = document.getElementById("imageWrapper");
      html2canvas(imageWrapper, {}).then(canvas => {
        this.dataURL = canvas.toDataURL();
      });
    },

    down() {
      this.dataURL = "";
      this.flags = true;
      var touch;
      if (event.touches) touch = event.touches[0];
      else touch = event;
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      let moveDiv = document.getElementById("test");
      this.dx = moveDiv.offsetLeft;
      this.dy = moveDiv.offsetTop;
    },

    move() {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        let moveDiv = document.getElementById("test");
        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";
      }
    },
    //鼠标释放时候的函数
    end() {
      // alert("松手，开始处理图层")
      this.flags = false;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .iphone {
    position: relative;
    height: 400px;
    width: 200px;
    background-color: #000000;
    border-radius: 24px;
    overflow: hidden;
    margin: auto 0;
    .poster-bg {
      position: relative;
      height: 400px;
      width: 200px;
    }
    #test {
      position: absolute;
      left: 0;
      top: 0;
      width: 20px;
      height: auto;
      background-color: #2c3e50;
      /* z-index: 9; */
    }
  }
  .real_pic {
    height: 400px;
    width: 200px;
    margin: 100px 0;
  }
}

// .camera {
//   position: absolute;
//   top: 20px;
//   left: 20px;
//   width: 40px;
//   height: 80px;
//   border-radius: 20px;
//   background-color: #000;
//   z-index: 999;
// }

// .logo {
//   position: absolute;
//   top: 120px;
//   left: 80px;
//   width: 40px;
//   height: 40px;
//   border-radius: 25px;
//   background: #000;
//   z-index: 999;
//   border-width: 4px;
//   border-color: #999;
// }
</style>
