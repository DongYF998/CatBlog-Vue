import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

import "element-ui/lib/theme-chalk/index.css";

Vue.use(VueRouter);

axios.defaults.baseURL = "http://localhost:8080/api";

const routes = [
  {
    path: "/",
    redirect: "/Login"
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    redirect: "/zone",
    children: [
      {
        path: "/zone",
        component: () => import("../components/users/Zone.vue")
      },
      {
        path: "/safe",
        component: () => import("../components/users/Safe.vue")
      },
      {
        path: "/level",
        component: () => import("../components/users/Level.vue")
      },
      {
        path: "/setting",
        component: () => import("../components/users/Setting.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

//拦截页面跳转, 返回token值到后台检查token的有效性
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register") {
    return next();
  }
  const token = window.sessionStorage.getItem("token");
  if (!token) {
    return next("/login");
  } else {
    axios.get("/account/isTokenLegal?token=" + token).then(response => {
      if (response.data.code === 0) {
        return next();
      } else {
        alert(response.data.data + ",请重新登陆");
        return next("/login");
      }
    });
  }
});

export default router;
