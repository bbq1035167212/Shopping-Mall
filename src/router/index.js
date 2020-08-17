import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);


const home = () => import('@/views/home/index.vue')
const category = () => import('@/views/category/')
const profile = () => import('@/views/profile/')
const shopcart = () => import('@/views/shopcart/')

const routes = [
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
  }
  , {
    path: "/profile",
    component: profile
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
