import axios from "axios";
import router from "../router";
import { Toast } from "vant";

// ES6 Promise的封装
export function request(options) {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: "加载中..."
  });
  return new Promise(resolve => {
    // 1.创建axios的实例对象
    const instance = axios.create({
      baseURL: "http://zbx.yuncshop.com/api",
      timeout: 30000
    });

    // 过滤器(拦截器)
    instance.interceptors.response.use(res => {
      return res.data;
    });

    // 通过实例发送网络请求
    instance(options)
      .then(res => {
        Toast.clear();
        if (res.code == 1) resolve(res.data);
        else if (res.code == -100) {
          Toast("该账号在别处登录");
          setTimeout(
            () => (window.location.href = "/index/index/getWechatAuth"),
            1000
          );
        } else if (res.msg == "参数错误") router.push("/home");
        else Toast("网络错误，请稍后重试");
      })
      .catch(() => {
        Toast("网络不问题,请使用其他网络环境");
      });
  });
}
