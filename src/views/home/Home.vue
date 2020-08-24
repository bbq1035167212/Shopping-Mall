<template>
  <div id="home">
    <NavBar class="home-nav"> <div slot="center">购物街</div></NavBar>
    <HomeTabControl
      class="imbibition"
      @tabClick="tabClick"
      :titles="['流行', '新款', '精选']"
      v-show="isTabshow"
      ref="tabControl1"
    />

    <BetterScroll
      ref="better"
      class="content"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <MainSwiper @swiperImgLoad="swiperImgLoad" :banners="banners" />
      <Recommend :recommends="recommends" />
      <Features />
      <HomeTabControl
        ref="tabControl"
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
      />
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
      isShow: false,
      isTabshow: false,
      tabOffsetTop: 0,
      scrollY: 0
    };
  },

  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    var refresh = this.debounce(this.$refs.better.refresh, 10);
    this.$bus.$on("updateLength", () => {
      refresh();
    });
  },

  activated() {
    setTimeout(() => {
      this.$refs.better.bscroll.refresh();
      this.$refs.better.bscroll.scrollTo(0, this.scrollY);
    }, 30);
  },

  deactivated() {
    this.scrollY = this.$refs.better.bscroll.y;
  },

  methods: {
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop - 36;
    },

    debounce(func, time) {
      let timer = null;
      return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.call(this);
        }, time);
      };
    },

    //加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //判断是否隐藏返回顶部按钮
    contentScroll(option) {
      this.isShow = -1000 > option.y;
      this.isTabshow = this.tabOffsetTop < Math.abs(option.y);
    },
    //回到顶部
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },

    // 获取数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //记载数据
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
  top: 0px;
  left: 0;
  right: 0;
  z-index: 10;
}

.content {
  height: calc(100% - 49px);
  overflow: hidden;
}
.imbibition {
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>
