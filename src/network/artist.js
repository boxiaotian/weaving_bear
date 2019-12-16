import { request } from "./request";
import $store from "../store";

const {
  zbx_user: { openid, token },
  uniacid
} = $store.state;

// 艺术家列表
export function ArtistList(page) {
  return request({
    url: "/Apiindex/artistList",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 艺术家商品列表
export function ArtistGoodsList(page, artistid) {
  return request({
    url: "/Apiindex/artistGoodsList",
    method: "POST",
    data: { openid, token, uniacid, page, artistid }
  });
}
// 艺术家商品详情
export function ArtistGoodsDetail(artistid, gid) {
  return request({
    url: "/Apiindex/artistGoodsDetail",
    method: "POST",
    data: { openid, token, uniacid, artistid, gid }
  });
}
// 艺术家商品加入购物车
export function AddCart(params) {
  return request({
    url: "/Apiindex/addCart",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
// 艺术家商品结算信息
export function ArtistGoodsOver(params) {
  return request({
    url: "/Apiindex/goodsOver",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
// 单个分享商品提交订单
export function ArtistAddOrder(params) {
  return request({
    url: "/Apiindex/addOrder",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
