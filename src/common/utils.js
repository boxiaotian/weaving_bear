/* eslint-disable prettier/prettier */
export const pushHistory = () => {
  let state = { title: "", url: "" };
  window.history.pushState(state, state.title, state.url);
};

// 定义网络图转base64的方法
export function getBase64(url) {
  return new Promise(resolve => {
    var canvas = document.createElement("canvas"); //创建canvas DOM元素
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      canvas.width = img.width; //指定画板的宽度，自定义
      canvas.height = img.height; //指定画板的高度,自定义
      ctx.drawImage(img, 0, 0, img.width, img.height); //参数可自定义
      var dataURL = canvas.toDataURL("image/" + "png");
      resolve(dataURL);
      // callback.call(this, dataURL); //回掉函数获取Base64编码
      canvas = null;
    };
  });
}
// 获取链接后面的参数
export function getUrlKey(e) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + e + "=([^&;]+?)(&|#|;|$)").exec(
        window.location.href
      ) || ["", ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}
/* 压缩base64图片，怎么压缩base64是题外话，这里不赘述 */
// 原图片 缩放比例 回调
export function compress(base64, callback) {
  //处理缩放，转格式
  var _img = new Image();
  _img.src = base64;
  _img.onload = function () {
    var _canvas = document.createElement("canvas");
    var w = this.width;
    var h = this.height;
    _canvas.setAttribute("width", w);
    _canvas.setAttribute("height", h);
    _canvas.strokeStyle = 'white';
    _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
    var base64 = _canvas.toDataURL("image/jpeg");
    _canvas.toBlob(function () {
      callback(base64);
    }, "image/jpeg");
  };
}
// 支付sdk准备完成
export function onBridgeReady(WeixinParameter) {
  return new Promise(resolve => {
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
        document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
      }
    } else {
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke("getBrandWCPayRequest", WeixinParameter, res => {
        return resolve(res);
      });
    }
  });
}

// transform样式处理方法
export function transformProcess(element) {
  let transform_array = element.style.transform.replace(/\s+/g, "").split(",");
  let transform_str = "";
  transform_array.map((item, index) => {
    if (index == 5) transform_str += `-${item},`;
    else if (index == 13 && item.indexOf("-") != -1) {
      transform_str += `${item.replace(/-/g, "")},`;
    } else if (index == 13 && item.indexOf("-") == -1) {
      transform_str += `-${item},`;
    } else transform_str += `${item},`;
  });
  if (transform_str.length) {
    transform_str = transform_str.substr(0, transform_str.length - 1);
  }
  return transform_str;
}
