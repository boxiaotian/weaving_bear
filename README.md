# weaving_bear

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### SVN 地址

H5 链接：http://zbx.yuncshop.com
svn 地址：svn://zbx.yuncshop.com/zbx/
账号：zhangpuxi,boxiaotian
密码：abcd1234

// 触摸上传图片
down() {
let moveDiv = document.getElementById("phone_case");
if (moveDiv) {
this.flags = true;
var touch;
if (event.touches) touch = event.touches[0];
else touch = event;
this.position.x = touch.clientX;
this.position.y = touch.clientY;
this.dx = moveDiv.offsetLeft;
this.dy = moveDiv.offsetTop;
}
},
// 移动上传图片
move() {
if (this.flags) {
var touch;
if (event.touches) touch = event.touches[0];
else touch = event;
this.nx = touch.clientX - this.position.x;
this.ny = touch.clientY - this.position.y;
this.xPum = this.dx + this.nx;
this.yPum = this.dy + this.ny;
let moveDiv = document.getElementById("phone_case");
moveDiv.style.left = this.xPum + "px";
moveDiv.style.top = this.yPum + "px";
let moveDiv1 = document.getElementById("phone_case1");
if (moveDiv1) {
moveDiv1.style.left = this.xPum + "px";
moveDiv1.style.bottom = this.yPum + "px";
}
}
},
