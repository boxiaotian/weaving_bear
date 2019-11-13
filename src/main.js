import Vue from "vue";
import vueWechatTitle from "vue-wechat-title";
import VueAwesomeSwiper from "vue-awesome-swiper";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Button } from "vant";

import "lib-flexible";
import "./common/vant";
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper);
Vue.use(vueWechatTitle);
Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
