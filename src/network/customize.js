import { request } from "./request";
import $store from "../store";

const {
  zbx_user: { openid, token },
  uniacid
} = $store.state;

// 定制商品列表
export function CustomGoodsList(page) {
  return request({
    url: "/Apiindex/customGoodsList",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 定制手机壳机型
export function CustomGoodsMobileClass(pid) {
  return request({
    url: "/Apiindex/customGoodsMobileClass",
    method: "POST",
    data: { openid, token, uniacid, pid }
  });
}
//定制商品提交
export function SubmitInfo(params) {
  return request({
    url: "/Apicustom/submitInfo",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
// 定制商品详情
export function CustomGoodsDetail(shareid, id) {
  return request({
    url: "/Apicustom/customGoodsDetail",
    method: "POST",
    data: { openid, token, uniacid, shareid, id }
  });
}
// 完善定制商品信息
export function EditInfo(params) {
  return request({
    url: "/Apicustom/editInfo",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
// 立即购买结算信息
export function CustomGoodsOver(id, num) {
  return request({
    url: "/Apicustom/goodsOver",
    method: "POST",
    data: { openid, token, uniacid, id, num }
  });
}
// 定制商品立即购买提交订单
export function CustomAddOrder(params) {
  return request({
    url: "/Apicustom/addOrder",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
// 定制商品加入购物车
export function AddCart(params) {
  return request({
    url: "/Apicustom/addCart",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
