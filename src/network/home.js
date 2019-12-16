import { request } from "./request";
import $store from "../store";

const {
  zbx_user: { openid, token },
  uniacid
} = $store.state;

export function Index() {
  console.log($store.state);

  return request({
    url: "/Apiindex/index",
    method: "POST",
    data: { openid, token, uniacid }
  });
}
// 图片上传
export function ImagesUpload(params) {
  return request({
    url: "/Apiupload/imagesUpload",
    method: "POST",
    data: { openid, token, uniacid, ...params }
  });
}
