import Vue from "vue";
import { Button, Cell, CellGroup, Icon, Popup } from "vant";
import {
  Checkbox,
  CheckboxGroup,
  Field,
  NumberKeyboard,
  RadioGroup,
  Radio,
  Picker,
  Stepper,
  Uploader
} from "vant";
import { Dialog, DropdownMenu, DropdownItem, Overlay } from "vant";
import { Collapse, CollapseItem, Step, Steps, Swipe, SwipeItem } from "vant";
import { Grid, GridItem, NavBar, Tab, Tabs } from "vant";
import {
  AddressEdit,
  Area,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from "vant";

// 基础组件
Vue.use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Popup);
// 表单组件
Vue.use(Checkbox)
  .use(CheckboxGroup)
  .use(Field)
  .use(NumberKeyboard)
  .use(RadioGroup)
  .use(Radio)
  .use(Picker)
  .use(Stepper)
  .use(Uploader);
// 反馈组件
Vue.use(Dialog)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Overlay);
// 展示组件
Vue.use(Collapse)
  .use(CollapseItem)
  .use(Step)
  .use(Steps)
  .use(Swipe)
  .use(SwipeItem);
// 导航组件
Vue.use(Grid)
  .use(GridItem)
  .use(NavBar)
  .use(Tab)
  .use(Tabs);
// 业务组件
Vue.use(AddressEdit)
  .use(Area)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton);
