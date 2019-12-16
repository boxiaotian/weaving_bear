import { request } from "./request";
import $store from "../store";

const {
  zbx_user: { openid, token },
  uniacid
} = $store.state;

// 公益池列表
export function PublicPoolList(page) {
  return request({
    url: "/Apiindex/publicPoolList",
    method: "POST",
    data: { openid, token, uniacid, page }
  });
}
// 公益池详情
export function PublicPoolDetail(pid) {
  return request({
    url: "/Apiindex/publicPoolDetail",
    method: "POST",
    data: { openid, token, uniacid, pid }
  });
}
