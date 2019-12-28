import { request } from "./request";
import $store from "../store";

const {
  zbx_user: { openid, token },
  uniacid
} = $store.state;

// 个人中心主页
export function Index() {
  return request({
    url: "/Apipersonal/index",
    method: "POST",
    data: { openid, token, uniacid }
  });
}
// 帮助中心
export function HelpUs() {
  return request({
    url: "/Apipersonal/helpUs",
    method: "POST",
    data: { openid, token, uniacid }
  });
}
// 关于我们
export function AboutUs() {
  return request({
    url: "/Apipersonal/aboutUs",
    method: "POST",
    data: { openid, token, uniacid }
  });
}

// 我的作品列表
export function ShareList(page) {
  return request({
    url: "/Apipersonal/shareList",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 我的作品（删除）
export function DeleteShare(sid) {
  return request({
    url: "/Apipersonal/deleteShare",
    method: "POST",
    data: { openid, token, uniacid, sid }
  });
}
// 分享作品下的商品列表
export function ShareGoodsList(page, sid) {
  return request({
    url: "/Apipersonal/shareGoodsList",
    method: "POST",
    data: { openid, token, uniacid, page, sid }
  });
}
// 分享作品下的商品（删除）
export function DeleteShareGoods(sid, id) {
  return request({
    url: "/Apipersonal/deleteShareGoods",
    method: "POST",
    data: { openid, token, uniacid, sid, id }
  });
}
// 分享商品购买记录
export function ShareGoodsBuyDetail(page, sid, sgid) {
  return request({
    url: "/Apipersonal/shareGoodsBuyDetail",
    method: "POST",
    data: { openid, token, uniacid, page, sid, sgid }
  });
}

// 绑定分享者为上级
export function BindAgent(shareid) {
  return request({
    url: "/Apipersonal/bindAgent",
    method: "POST",
    data: { openid, token, uniacid, shareid }
  });
}
// 分享奖励列表
export function ShareCommission(page) {
  return request({
    url: "/Apipersonal/shareCommission",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 我的证书列表
export function PublicCert(page) {
  return request({
    url: "/Apipersonal/publicCert",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}

// 申请成为推广大使
export function ApplyRecommend(name) {
  return request({
    url: "/Apipersonal/applyRecommend",
    method: "POST",
    data: { openid, token, uniacid, name }
  });
}

// 获取VIP配置信息
export function GetVipSet() {
  return request({
    url: "/Apipersonal/getVipSet",
    method: "POST",
    data: { openid, token, uniacid, name }
  });
}
// 获取购买VIP支付参数
export function GetVipPayParams() {
  return request({
    url: "/Apipersonal/getVipPayParams",
    method: "POST",
    data: { openid, token, uniacid }
  });
}
// 已经是VIP的时候获取对应的VIP信息
export function GetMyVipInfo() {
  return request({
    url: "/Apipersonal/getMyVipInfo",
    method: "POST",
    data: { openid, token, uniacid }
  });
}
// 推广中心主页
export function PromotionCenter() {
  return request({
    url: "/Apipersonal/promotionCenter",
    method: "POST",
    data: { openid, token, uniacid }
  });
}
// 我的团队一级会员
export function MyAgent1(page) {
  return request({
    url: "/Apipersonal/myAgent1",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 我的团队二级会员
export function MyAgent2(page) {
  return request({
    url: "/Apipersonal/myAgent2",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 推广订单
export function RecommendOrder(page, type) {
  return request({
    url: "/Apipersonal/recommendOrder",
    method: "POST",
    data: { openid, token, uniacid, page, type }
  });
}
// 推广奖励
export function RecommendOrderMoney(page) {
  return request({
    url: "/Apipersonal/recommendOrderMoney",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 获取推广二维码
export function GetRecommendCode() {
  return request({
    url: "/Apipersonal/getRecommendCode",
    method: "POST",
    data: { openid, token, uniacid }
  });
}

// 购物车商品列表
export function MyCartList(page) {
  return request({
    url: "/Apipersonal/myCartList",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 删除购物车信息
export function DeleteCart(ids) {
  return request({
    url: "/Apipersonal/deleteCart",
    method: "POST",
    data: { openid, token, uniacid, all: 2, ids }
  });
}
// 购物车（选中、取消选中、全选、全不选）
export function ChangeSelected(parmas) {
  return request({
    url: "/Apipersonal/changeSelected",
    method: "POST",
    data: { openid, token, uniacid, ...parmas }
  });
}
// 购物车结算信息
export function GoodsOver() {
  return request({
    url: "/Apipersonal/goodsOver",
    method: "POST",
    data: { openid, token, uniacid }
  });
}
// 购物车结算提交订单
export function AddOrder(parmas) {
  return request({
    url: "/Apipersonal/addOrder",
    method: "POST",
    data: { openid, token, uniacid, ...parmas }
  });
}
// 根据支付单号获取支付金额
export function GetOrderPay(paysn) {
  return request({
    url: "/Apipersonal/getOrderPay",
    method: "POST",
    data: { openid, token, uniacid, paysn }
  });
}
// 根据支付单号完善公益信息
export function OverOrderPublic(parmas) {
  return request({
    url: "/Apipersonal/overOrderPublic",
    method: "POST",
    data: { openid, token, uniacid, ...parmas }
  });
}

// 提现页面余额信息
export function MyMoney() {
  return request({
    url: "/Apipersonal/myMoney",
    method: "POST",
    data: { openid, token, uniacid }
  });
}
// 申请提现
export function AddApply(money) {
  return request({
    url: "/Apipersonal/addApply",
    method: "POST",
    data: { openid, token, uniacid, money }
  });
}
// 提现列表记录
export function ApplyWithdrawList(page) {
  return request({
    url: "/Apipersonal/applyWithdrawList",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}

// 订单列表
export function OrderList(page, type) {
  return request({
    url: "/Apipersonal/orderList",
    method: "POST",
    data: { openid, token, uniacid, page, type }
  });
}
// 订单详情
export function OrderDetail(id) {
  return request({
    url: "/Apipersonal/orderDetail",
    method: "POST",
    data: { openid, token, uniacid, id }
  });
}
// 确认收货
export function OrderOver(id) {
  return request({
    url: "/Apipersonal/orderOver",
    method: "POST",
    data: { openid, token, uniacid, id }
  });
}
// 订单列表或者详情获取支付参数
export function GetOrderPayParams(id) {
  return request({
    url: "/Apipersonal/getOrderPayParams",
    method: "POST",
    data: { openid, token, uniacid, id }
  });
}
// 查看物流
export function GetLogistics(parmas) {
  return request({
    url: "/Apipersonal/getLogistics",
    method: "POST",
    data: { openid, token, uniacid, ...parmas }
  });
}
