import { request } from "./request";
import $store from "../store";

const {
  zbx_user: { openid, token },
  uniacid
} = $store.state;

// 提交分享信息
export function SubmitInfo(params) {
  return request({
    url: "/Apishare/submitInfo",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
// 获取分享信息内容
export function ShareInfo(sid) {
  return request({
    url: "/Apishare/shareInfo",
    method: "POST",
    data: { openid, token, uniacid, sid }
  });
}
// 提交分享商品信息
export function SubmitShareGoods(id, data) {
  return request({
    url: "/Apishare/submitShareGoods",
    method: "POST",
    data: { openid, token, uniacid, id, data }
  });
}
// 分享商品详情
export function ShareGoodsDetail(shareid, sid, id) {
  return request({
    url: "/Apishare/shareGoodsDetail",
    method: "POST",
    data: { openid, token, uniacid, shareid, sid, id }
  });
}
// 单个分享商品结算信息
export function GoodsOver(params) {
  return request({
    url: "/Apishare/goodsOver",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
// 单个分享商品提交订单
export function AddOrder(params) {
  return request({
    url: "/Apishare/addOrder",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
// 分享商品加入购物车
export function AddCart(params) {
  return request({
    url: "/Apishare/addCart",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
