import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const home = () => import("@/views/home/Home");
const category = () => import("@/views/category/Category");
const profile = () => import("@/views/profile/Profile");
const shopcart = () => import("@/views/shopcart/Shopcart");
const detail = () => import("@/views/detail/Detail");

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: home
  },
  {
    path: "/category",
    component: category
  },
  {
    path: "/shopcart",
    component: shopcart
  },
  {
    path: "/profile",
    component: profile
  },
  {
    path: "/detail/:id",
    component: detail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
