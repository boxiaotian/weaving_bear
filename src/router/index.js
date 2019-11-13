import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("@/views/home/index");
const Profile = () => import("@/views/profile/index");
// 我要制作
const CustomizeList = () => import("@/views/customizeList/index");
const Model = () => import("@/views/model/index");
const Customize = () => import("@/views/customize/index");
const ProductDetails = () => import("@/views/productDetails/index");
const SubmitOrder = () => import("@/views/submitOrder/index");
const PaySuccess = () => import("@/views/paySuccess/index");
// 我要分享
const IShare = () => import("@/views/iShare/index");
const ShareList = () => import("@/views/shareList/index");
const Edit = () => import("@/views/edit/index");
const Share = () => import("@/views/share/index");
const ShareGenerate = () => import("@/views/shareGenerate/index");
// 艺术家
const Artist = () => import("@/views/artist/index");
const ArtistWorks = () => import("@/views/artistWorks/index");
// 公益池
const CharityPool = () => import("@/views/charityPool/index");

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "织布熊"
    },
    component: Home
  },
  {
    path: "/customizeList",
    name: "customizeList",
    meta: {
      title: "选择商品定制"
    },
    component: CustomizeList
  },
  {
    path: "/model",
    name: "model",
    meta: {
      title: "选择机型"
    },
    component: Model
  },
  {
    path: "/customize/:type",
    name: "customize",
    meta: {
      title: "选择商品定制"
    },
    component: Customize
  },
  {
    path: "/productDetails",
    name: "productDetails",
    meta: {
      title: "商品详情"
    },
    component: ProductDetails
  },
  {
    path: "/submitOrder",
    name: "submitOrder",
    meta: {
      title: "提交订单"
    },
    component: SubmitOrder
  },
  {
    path: "/paySuccess",
    name: "paySuccess",
    meta: {
      title: "支付成功"
    },
    component: PaySuccess
  },
  {
    path: "/iShare",
    name: "iShare",
    meta: {
      title: "我要分享"
    },
    component: IShare
  },
  {
    path: "/shareList",
    name: "shareList",
    meta: {
      title: "选择商品分享"
    },
    component: ShareList
  },
  {
    path: "/edit/:type",
    name: "edit",
    meta: {
      title: "编辑商品"
    },
    component: Edit
  },
  {
    path: "/share",
    name: "share",
    meta: {
      title: "分享"
    },
    component: Share
  },
  {
    path: "/shareGenerate",
    name: "shareGenerate",
    meta: {
      title: "分享"
    },
    component: ShareGenerate
  },
  {
    path: "/artist",
    name: "artist",
    meta: {
      title: "艺术家"
    },
    component: Artist
  },
  {
    path: "/artistWorks",
    name: "artistWorks",
    meta: {
      title: "艺术家"
    },
    component: ArtistWorks
  },
  {
    path: "/charityPool",
    name: "charityPool",
    meta: {
      title: "公益池"
    },
    component: CharityPool
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 前置守卫(guard)
router.beforeEach((to, from, next) => {
  switch (to.name) {
    case "home":
      document.title = to.meta.title;
      break;
    case "productDetails":
      document.getElementsByTagName("html")[0].style.background = "#eeeeee";
      document.getElementsByTagName("body")[0].style.background = "#eeeeee";
      break;
    case "customize":
    case "edit":
      if (to.params.type == "phone") to.meta.title = "手机壳";
      else if (to.params.type == "cup") to.meta.title = "情侣变色杯";
      else if (to.params.type == "pillow") to.meta.title = "抱枕";
      else if (to.params.type == "satchel") to.meta.title = "单肩挎包";
      document.getElementsByTagName("html")[0].style.background = "#eeeeee";
      document.getElementsByTagName("body")[0].style.background = "#eeeeee";
      break;

    default:
      document.getElementsByTagName("html")[0].style.background = "#ffffff";
      document.getElementsByTagName("body")[0].style.background = "#ffffff";
      document.title = "";
      break;
  }
  next();
});
export default router;
