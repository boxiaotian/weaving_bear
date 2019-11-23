import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes", isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    string: ""
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
          count: state.count
        };
      }
    })
  ],
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    myString: (state, value) =>
      value ? (state.string = value) : (state.string = "")
  },
  actions: {},
  modules: {}
});
