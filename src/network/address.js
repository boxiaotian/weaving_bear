import { request } from "./request";
import $store from "../store";

const {
  zbx_user: { openid, token },
  uniacid
} = $store.state;

// 添加收货地址
export function AddAddress(params) {
  return request({
    url: "/Apiaddress/addAddress",
    method: "POST",
    data: { openid, token, uniacid, sex: 0, ...params }
  });
}
// 收货地址列表
export function AddressList(page) {
  return request({
    url: "/Apiaddress/addressList",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 编辑地址信息
export function EditAddress(params) {
  return request({
    url: "/Apiaddress/editAddress",
    method: "POST",
    data: { openid, token, uniacid, sex: 0, ...params }
  });
}
// 删除地址
export function DeleteAddress(id) {
  return request({
    url: "/Apiaddress/deleteAddress",
    method: "POST",
    data: { openid, token, uniacid, id }
  });
}
// 查看地址详情
export function AddressDetail(id) {
  return request({
    url: "/Apiaddress/addressDetail",
    method: "POST",
    data: { openid, token, uniacid, id }
  });
}
// 根据选择的地址获取运费信息
export function GetFreight(addressid) {
  return request({
    url: "/Apiindex/getFreight",
    method: "POST",
    data: { openid, token, uniacid, addressid }
  });
}
