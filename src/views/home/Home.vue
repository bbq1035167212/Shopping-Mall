<template>
  <div id="home">
    <NavBar class="home-nav"> <div slot="center">购物街</div></NavBar>

    <BetterScroll
      ref="better"
      class="content"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <MainSwiper :banners="banners" />
      <Recommend :recommends="recommends" />
      <Features />
      <HomeTabControl @tabClick="tabClick" :titles="['流行', '新款', '精选']" />
      <GoodsList :goodsList="goodsList[currentType].list"> </GoodsList>
    </BetterScroll>

    <BackTop v-show="isShow" @click.native="backTop" />
  </div>
</template>
<script>
import { getHomeMultidata, getHomeGoods } from "network/home";
import MainSwiper from "./childcoms/MainSwiper";
import Recommend from "./childcoms/Recommend";
import Features from "./childcoms/Features";

import NavBar from "common/navbar/NavBar";
import BetterScroll from "common/scroll/BetterScroll";

import HomeTabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList";
import BackTop from "content/backtop/BackTop";

export default {
  components: {
    MainSwiper,
    Recommend,
    Features,
    NavBar,
    BetterScroll,
    HomeTabControl,
    GoodsList,
    BackTop
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
      currentType: "pop",
      isShow: false
    };
  },

  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  methods: {
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    contentScroll(option) {
      this.isShow = -1000 > option.y;
    },

    backTop() {
      this.$refs.better.bscroll.scrollTo(0, 0, 500);
    },

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
        this.$refs.better.bscroll.finishPullUp();
      });
    }
  }
};
</script>
<style scoped>
#home {
  padding-top: 42px;
  height: 100vh;
  overflow: hidden;
}
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

.content {
  height: calc(100% - 49px);
}
</style>
