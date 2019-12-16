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
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例对象
    const instance = axios.create({
      baseURL: "http://zbx.yuncshop.com/api",
      timeout: 5000
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
        else if (res.msg == "参数错误") router.push("/home");
        else if (res.msg == "无效数据，请重新授权") {
          Toast(res.msg);
          setTimeout(() => router.push("/home"), 1000);
        } else Toast(res.msg);
      })
      .catch(err => {
        reject(err);
      });
  });
}
