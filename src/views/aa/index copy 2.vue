<template>
  <div class="container">
    <div class="imageWrapper" ref="imageWrapper">
      <div class="iphone">
        <!-- <img
          src="http://qiniu.zbx.yuncshop.com/uploads/20191129/FoGgdzsZnshzHS73N_4uc489AvfJ.png"
          alt=""
        /> -->
        <!-- <div class="camera"></div>
        <div class="logo"></div> -->
        <div>
          <img
            @touchstart="down"
            @touchmove="move"
            id="test"
            src="~assets/img/return_arrow_r.png"
            @touchend="end"
          />
        </div>
      </div>
      <img v-if="dataURL" class="real_pic" :src="dataURL" />
    </div>
    <button @click="toImage" style="margin: 12px 0;">确定</button>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
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
  methods: {
    toImage() {
      html2canvas(this.$refs.imageWrapper, { scale: 0.5 }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
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
  .imageWrapper {
    .iphone {
      position: relative;
      width: 590px;
      height: 550px;
      background-color: rebeccapurple;
      margin: auto 0;
      img {
        width: 100%;
        height: 100%;
      }
      div {
        position: absolute;
        top: 50px;
        left: 50px;
        width: 494px;
        height: 476px;
        overflow: hidden;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: auto;
          height: 100%;
        }
      }
      // #test {
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   width: 200px;
      //   height: auto;
      //   background-color: #2c3e50;
      //   /* z-index: 9; */
      // }
    }
    .real_pic {
      width: 590px;
      height: 550px;
      margin: 100px 0;
    }
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
