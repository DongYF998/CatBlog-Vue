import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../src/assets/css/global.css";
import axios from "axios";

Vue.config.productionTip = false;
//挂载ElementUI所有的组件
Vue.use(ElementUI);

//设置axios的基础请求路径,并将其设置为默认的请求工具
//在全局可以使用this.$http调用axios进行http请求
axios.defaults.baseURL = "http://localhost:8080/api";

//配置axios, 给每次请求header添加Authorization字段携带token令牌
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
