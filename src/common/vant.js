import Vue from "vue";
import { Button, Cell, Icon, Popup } from "vant";
import { Field, Picker, Stepper, Uploader } from "vant";
import { DropdownMenu, DropdownItem } from "vant";
import { Swipe, SwipeItem } from "vant";
import { NavBar } from "vant";
import { Area, GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
// 基础组件
Vue.use(Button)
  .use(Cell)
  .use(Icon)
  .use(Popup);
// 表单组件
Vue.use(Field)
  .use(Picker)
  .use(Stepper)
  .use(Uploader);
// 反馈组件
Vue.use(DropdownMenu).use(DropdownItem);
// 展示组件
Vue.use(Swipe).use(SwipeItem);
// 导航组件
Vue.use(NavBar);
// 业务组件
Vue.use(Area)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton);
