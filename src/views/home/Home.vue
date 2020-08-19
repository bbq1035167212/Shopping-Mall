<template>
  <div id="home">
    <NavBar class="home-nav"> <div slot="center">购物街</div></NavBar>
    <MainSwiper :banners="banners" />
    <Recommend :recommends="recommends" />
    <Features />
    <HomeTabControl @tabClick="tabClick" :titles="['流行', '新款', '精选']" />
    <GoodsList :goodsList="goodsList[currentType].list"> </GoodsList>
  </div>
</template>
<script>
import { getHomeMultidata, getHomeGoods } from "network/home";
import MainSwiper from "./childcoms/MainSwiper";
import Recommend from "./childcoms/Recommend";
import Features from "./childcoms/Features";

import NavBar from "common/navbar/NavBar";

import HomeTabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList";

export default {
  components: {
    MainSwiper,
    Recommend,
    Features,
    NavBar,
    HomeTabControl,
    GoodsList
  },

  data() {
    return {
      banners: [],
      recommends: [],
      goodsList: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop"
    };
  },

  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    // 获取数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    getHomeGoods(type) {
      const page = this.goodsList[type].page + 1;
      getHomeGoods(type, page).then(res => {
        const goodsList = res.data.list;
        this.goodsList[type].list.push(...goodsList);
        this.goodsList[type].page += 1;
      });
    }
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
</style>
