<template>
  <div id="home">
    <NavBar class="home-nav"> <div slot="center">购物街</div></NavBar>
    <MainSwiper :banners="banners" />
    <Recommend :recommends="recommends" />
    <Features />
    <HomeTabControl class="tab-control" :titles="['流行', '新款', '精选']" />
    <ul>
      <li>我是1</li>
      <li>我是2</li>
      <li>我是3</li>
      <li>我是4</li>
      <li>我是5</li>
      <li>我是6</li>
      <li>我是7</li>
      <li>我是8</li>
      <li>我是9</li>
      <li>我是10</li>
      <li>我是11</li>
      <li>我是12</li>
      <li>我是13</li>
      <li>我是14</li>
      <li>我是15</li>
      <li>我是16</li>
      <li>我是17</li>
      <li>我是18</li>
      <li>我是19</li>
      <li>我是20</li>
      <li>我是21</li>
      <li>我是22</li>
      <li>我是23</li>
      <li>我是24</li>
      <li>我是25</li>
      <li>我是26</li>
      <li>我是27</li>
      <li>我是28</li>
      <li>我是29</li>
      <li>我是30</li>
    </ul>
  </div>
</template>
<script>
import MainSwiper from "./childcoms/MainSwiper";
import Recommend from "./childcoms/Recommend";
import Features from "./childcoms/Features";

import NavBar from "common/navbar/NavBar";

import HomeTabControl from "content/tabControl/TabControl";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  components: {
    NavBar,
    MainSwiper,
    Recommend,
    Features,
    HomeTabControl
  },

  data() {
    return {
      banners: [],
      recommends: []
    };
  },

  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  }
};
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
  box-shadow: 0px -1px 1px rgba(150, 150, 150, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
#home {
  padding-top: 42px;
}
.tab-control {
  position: sticky;
  top: 42px;
}
</style>
