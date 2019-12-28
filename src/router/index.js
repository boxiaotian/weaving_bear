import Vue from "vue";
import VueRouter from "vue-router";
import { setCookie, getCookie } from "@/common/cookie";
import { setStore, getStore, removeStore } from "@/common/localstorage";
import store from "../store";
import { getUrlKey } from "common/utils";

Vue.use(VueRouter);
Vue.prototype.$cookieStore = { setCookie, getCookie };

const Home = () => import("@/views/home/index");
const Profile = () => import("@/views/profile/index");

const CustomizeList = () => import("@/views/customizeList/index"); // 选择定制商品
const Model = () => import("@/views/model/index"); // 选择机型
const Customize = () => import("@/views/customize/index"); // 定制商品
const CustomizeDetails = () => import("@/views/customizeDetails/index"); // 商品详情
const SubmitOrder = () => import("@/views/submitOrder/index"); // 提交订单
const PaySuccess = () => import("@/views/paySuccess/index"); // 支付成功
const SingleCharityPool = () => import("@/views/singleCharityPool/index"); // 单选公益池

const IShare = () => import("@/views/iShare/index"); // 分享输入信息
const ShareList = () => import("@/views/shareList/index"); // 分享的商品
const Edit = () => import("@/views/edit/index"); // 编辑
const Share = () => import("@/views/share/index"); // 分享
const ShareGenerate = () => import("@/views/shareGenerate/index"); // 分享进入页面
const ShareDetails = () => import("@/views/shareDetails/index"); // 分享详情

const Artist = () => import("@/views/artist/index"); // 艺术家
const ArtistWorks = () => import("@/views/artistWorks/index"); // 艺术家作品
const ArtistDetails = () => import("@/views/artistDetails/index"); // 艺术家商品详情

const CharityPool = () => import("@/views/charityPool/index"); // 公益池
const Foundation = () => import("@/views/foundation/index"); // 公益详情

const Distributor = () => import("@/views/distributor/index"); // 申请推广大使
const SharingRewards = () => import("@/views/sharingRewards/index"); // 分享奖励

const MyCreation = () => import("@/views/myCreation/index"); // 我的作品
const Works = () => import("@/views/works/index"); // 我的作品列表
const WorksIncome = () => import("@/views/worksIncome/index"); // 作品收入

const MyCertificate = () => import("@/views/myCertificate/index"); // 我的证书
const ShoppingCart = () => import("@/views/shoppingCart/index"); // 购物车
const ShoppingCartOrder = () => import("@/views/shoppingCartOrder/index"); // 提交订单

const VipService = () => import("@/views/vipService/index"); // 购买VIP服务
const VipServiceInfo = () => import("@/views/vipServiceInfo/index"); // VIP服务

const Withdraw = () => import("@/views/withdraw/index"); // 提现
const WithdrawRecord = () => import("@/views/withdrawRecord/index"); // 提现记录

const PromotionCenter = () => import("@/views/promotionCenter/index"); // 推广中心
const MyTeam = () => import("@/views/myTeam/index"); // 我的团队
const PromotionOrder = () => import("@/views/promotionOrder/index"); // 推广订单
const PromotionReward = () => import("@/views/promotionReward/index"); // 推广奖励
const IWantPromotion = () => import("@/views/iWantPromotion/index"); // 我要推广

const MyAddress = () => import("@/views/myAddress/index"); // 我的地址
const HelpCenter = () => import("@/views/helpCenter/index"); // 帮助中心
const AboutUs = () => import("@/views/aboutUs/index"); // 关于我们

const MyOrder = () => import("@/views/myOrder/index"); // 我的订单
const OrderDetails = () => import("@/views/orderDetails/index"); // 订单详情
const ViewLogistics = () => import("@/views/viewLogistics/index"); // 查看物流
const aa = () => import("../views/aa/index");
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/aa",
    name: "aa",
    meta: {
      title: "织布熊"
    },
    component: aa
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
    path: "/customize",
    name: "customize",
    meta: {
      title: "定制商品"
    },
    component: Customize
  },
  {
    path: "/customizeDetails",
    name: "customizeDetails",
    meta: {
      title: "定制商品详情"
    },
    component: CustomizeDetails
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
    path: "/singleCharityPool",
    name: "singleCharityPool",
    meta: {
      title: "选择公益"
    },
    component: SingleCharityPool
  },
  {
    path: "/iShare",
    name: "iShare",
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
    path: "/edit",
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
    path: "/shareDetails",
    name: "shareDetails",
    meta: {
      title: "分享详情"
    },
    component: ShareDetails
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
    path: "/artistDetails",
    name: "artistDetails",
    meta: {
      title: "商品详情"
    },
    component: ArtistDetails
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
    path: "/foundation",
    name: "foundation",
    meta: {
      title: "公益详情"
    },
    component: Foundation
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/distributor",
    name: "distributor",
    meta: {
      title: "注册成为分销商"
    },
    component: Distributor
  },
  {
    path: "/sharingRewards",
    name: "sharingRewards",
    meta: {
      title: "分享奖励"
    },
    component: SharingRewards
  },
  {
    path: "/myCreation",
    name: "myCreation",
    meta: {
      title: "我的作品"
    },
    component: MyCreation
  },
  {
    path: "/works",
    name: "works",
    meta: {
      title: "作品"
    },
    component: Works
  },
  {
    path: "/worksIncome",
    name: "worksIncome",
    meta: {
      title: "作品收入"
    },
    component: WorksIncome
  },
  {
    path: "/myCertificate",
    name: "myCertificate",
    meta: {
      title: "我的证书"
    },
    component: MyCertificate
  },
  {
    path: "/shoppingCart",
    name: "shoppingCart",
    meta: {
      title: "购物车"
    },
    component: ShoppingCart
  },
  {
    path: "/shoppingCartOrder",
    name: "shoppingCartOrder",
    meta: {
      title: "购物车订单"
    },
    component: ShoppingCartOrder
  },
  {
    path: "/vipService",
    name: "vipService",
    meta: {
      title: "VIP服务"
    },
    component: VipService
  },
  {
    path: "/vipServiceInfo",
    name: "vipServiceInfo",
    meta: {
      title: "VIP服务"
    },
    component: VipServiceInfo
  },
  {
    path: "/withdraw",
    name: "withdraw",
    meta: {
      title: "提现"
    },
    component: Withdraw
  },
  {
    path: "/withdrawRecord",
    name: "withdrawRecord",
    meta: {
      title: "提现记录"
    },
    component: WithdrawRecord
  },
  {
    path: "/promotionCenter",
    name: "promotionCenter",
    meta: {
      title: "推广中心"
    },
    component: PromotionCenter
  },
  {
    path: "/myTeam",
    name: "myTeam",
    meta: {
      title: "我的团队"
    },
    component: MyTeam
  },
  {
    path: "/promotionOrder",
    name: "promotionOrder",
    meta: {
      title: "推广订单"
    },
    component: PromotionOrder
  },
  {
    path: "/promotionReward",
    name: "promotionReward",
    meta: {
      title: "推广奖励"
    },
    component: PromotionReward
  },
  {
    path: "/iWantPromotion",
    name: "iWantPromotion",
    meta: {
      title: "我要推广"
    },
    component: IWantPromotion
  },
  {
    path: "/myAddress",
    name: "myAddress",
    meta: {
      title: "我的地址"
    },
    component: MyAddress
  },
  {
    path: "/helpCenter",
    name: "helpCenter",
    meta: {
      title: "帮助中心"
    },
    component: HelpCenter
  },
  {
    path: "/aboutUs",
    name: "aboutUs",
    meta: {
      title: "关于我们"
    },
    component: AboutUs
  },
  {
    path: "/myOrder",
    name: "myOrder",
    meta: {
      title: "我的订单"
    },
    component: MyOrder
  },
  {
    path: "/orderDetails",
    name: "orderDetails",
    meta: {
      title: "订单详情"
    },
    component: OrderDetails
  },
  {
    path: "/viewLogistics",
    name: "viewLogistics",
    meta: {
      title: "查看物流"
    },
    component: ViewLogistics
  }
];

const router = new VueRouter({
  mode: "history",
  history: false,
  base: process.env.BASE_URL,
  routes
});

// 前置守卫(guard)
router.beforeEach((to, from, next) => {
  store.commit("uniacId", getUrlKey("uniacid") ? getUrlKey("uniacid") : 0);
  if (
    process.env.NODE_ENV != "development" &&
    (to.name == "home" ||
      to.name == "customizeDetails" ||
      to.name == "shareDetails" ||
      to.name == "artistDetails" ||
      to.name == "profile")
  ) {
    if (getCookie("zbx_user")) {
      let zbx_user = getCookie("zbx_user");
      if (getCookie("zbx_user").startsWith("think:"))
        store.commit("zbxUser", JSON.parse(zbx_user.slice(6)));
      else store.commit("zbxUser", JSON.parse(zbx_user));
    } else {
      window.location.href = "/index/index/getWechatAuth";
      setStore("zbx_history_url", window.location.href);
    }
    if (process.env.NODE_ENV != "development" && to.name == "home") {
      if (
        getStore("zbx_history_url") != null &&
        window.location.href != getStore("zbx_history_url")
      ) {
        window.location.href = getStore("zbx_history_url");
        removeStore("zbx_history_url");
      }
    }
  }
  switch (to.name) {
    case "home":
      // to.meta.title = "to.meta.title";
      break;
    case "customize":
    case "edit":
      if (to.params.type == "phone") to.meta.title = "手机壳";
      else if (to.params.type == "cup") to.meta.title = "情侣变色杯";
      else if (to.params.type == "pillow") to.meta.title = "抱枕";
      else if (to.params.type == "satchel") to.meta.title = "单肩挎包";
      setTimeout(() => {
        document.getElementsByTagName("html")[0].style.background = "#eeeeee";
        document.getElementsByTagName("body")[0].style.background = "#eeeeee";
      }, 200);
      break;
    case "customizeDetails":
    case "shareDetails":
    case "artistDetails":
    case "sharingRewards":
    case "vipServiceInfo":
    case "withdrawRecord":
    case "promotionCenter":
    case "promotionOrder":
    case "iWantPromotion":
    case "myAddress":
    case "helpCenter":
    case "orderDetails":
    case "viewLogistics":
    case "myOrder":
      document.getElementsByTagName("html")[0].style.background = "#f6f6f6";
      document.getElementsByTagName("body")[0].style.background = "#f6f6f6";
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
