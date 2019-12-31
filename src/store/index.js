import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    interface_domain: "http://qiniu.zbx.yuncshop.com", // 接口域名
    custom_info: null,
    zbx_user: {}, // 用户信息
    count: 0,
    string: "",
    uniacid: 0,
    sid: "", // 分享信息id
    share_goods: [], // 选中的分享商品
    promoter_name: {}, // 推厂商名称
    submit_info: {}, // 提交单个商品订单信息
    p_info: "" // 下单完成选择的公益信息
  },
  plugins: [
    createPersistedState({
      key: "WEAVING_BEAR",
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      },
      reducer(state) {
        return {
          count: state.count,
          custom_info: state.custom_info,
          zbx_user: state.zbx_user,
          // zbx_user: {
          //   openid: "ouObrvttwYH79Eb5ct8AB95lNZ5g",
          //   token: "e07ec50c2c7f77b98f0d047feebc96ac"
          // },
          uniacid: state.uniacid,
          sid: state.sid,
          promoter_name: state.promoter_name,
          submit_info: state.submit_info,
          p_info: state.p_info
        };
      }
    })
  ],
  mutations: {
    customInfo: (state, value) =>
      value ? (state.custom_info = value) : (state.custom_info = ""),
    zbxUser: (state, value) =>
      value ? (state.zbx_user = value) : (state.zbx_user = {}),
    shareInfoId: (state, value) =>
      value ? (state.sid = value) : (state.sid = ""),
    shareGoods: (state, value) => {
      if (Object.keys(value).length) {
        if (state.share_goods.length) {
          state.share_goods.map((item, index) => {
            if (value.gid == item.gid) state.share_goods.splice(index, 1);
          });
          state.share_goods.push({ ...value });
        } else state.share_goods.push({ ...value });
      } else state.share_goods = [];
    },
    uniacId: (state, value) => {
      value ? (state.uniacid = value) : (state.uniacid = 0);
    },
    promoterName: (state, value) =>
      value ? (state.promoter_name = value) : (state.promoter_name = {}),
    submitInfo: (state, value) =>
      value ? (state.submit_info = value) : (state.submit_info = {}),
    pInfo: (state, value) => {
      value ? (state.p_info = value) : (state.p_info = "");
    }
  },
  actions: {},
  modules: {}
});
