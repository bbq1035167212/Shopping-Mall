<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>

    <div class="content">
      <TabMenu :category="categoryList" @selectItem="selectItem" />

      <div class="content-shop">
        <HomeTabControl
          ref="tabControl1"
          @tabClick="tabClick"
          :titles="['流行', '新款', '精选']"
          class="tab-control imbibition"
          v-show="isShowTab"
        />
        <BetterScroll
          class="content-scroll"
          ref="cartBets"
          :probeType="3"
          @scroll="contentScroll"
        >
          <TabCategory :subcategories="subCategories" @loadImg="loadImg" />
          <HomeTabControl
            ref="tabControl"
            @tabClick="tabClick"
            :titles="['流行', '新款', '精选']"
            class="tab-control"
          />
          <TabContentDetail :goodsList="subCategoryDetail" />
        </BetterScroll>
      </div>

      <BackTop @click.native="backTop(200)" v-show="isShow" />
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

import HomeTabControl from "content/tabControl/TabControl";

import NavBar from "common/navbar/NavBar";
import BetterScroll from "common/scroll/BetterScroll";

import TabMenu from "./childcoms/TabMenu";
import TabCategory from "./childcoms/TabCategory";
import TabContentDetail from "./childcoms/TabContentDetail";

import BackTop from "content/backtop/BackTop";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/cagegory";

export default {
  data() {
    return {
      categoryList: [],
      categoryData: {
        subcategories: [],
        categoryDetail: {
          pop: [],
          new: [],
          sell: []
        }
      },
      currentIndex: 0,
      currentType: "pop",
      isShow: false,
      getOffsetTop: null,
      offsetTop: 0,
      isShowTab: false
    };
  },
  components: {
    NavBar,
    TabMenu,
    TabCategory,
    BetterScroll,
    HomeTabControl,
    TabContentDetail,
    BackTop
  },
  created() {
    this.getCategory();
  },
  mounted() {
    this.getOffsetTop = this.debounce(function() {
      this.offsetTop = this.$refs.tabControl.$el.offsetTop;
      this.$refs.cartBets.refresh();
    }, 10);
  },
  computed: {
    subCategories() {
      return this.categoryData.subcategories;
    },
    subCategoryDetail() {
      return this.categoryData.categoryDetail[this.currentType];
    }
  },
  methods: {
    loadImg() {
      this.getOffsetTop();
    },

    debounce(func, delay) {
      var timer = null;
      return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.call(this);
        }, delay);
      };
    },

    backTop(duration = 0) {
      this.$refs.cartBets.bscroll.scrollTo(0, 0, duration);
    },

    contentScroll(positon) {
      this.isShow = -1400 > positon.y;
      this.isShowTab = -this.offsetTop > positon.y;
    },

    getCategory() {
      getCategory().then(res => {
        this.categoryList = res.data.category.list;
        this.getSubcategories(0);
      });
    },

    getSubcategories(index) {
      const maitKey = this.categoryList[index].maitKey;
      getSubcategory(maitKey).then(res => {
        this.currentIndex = index;
        this.categoryData.subcategories = res.data.list;
        this.getCategoryDetail("pop");
        this.getCategoryDetail("new");
        this.getCategoryDetail("sell");
      });
    },
    getCategoryDetail(type) {
      var miniWallkey = this.categoryList[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryData.categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    selectItem(index) {
      this.backTop(0);
      this.getSubcategories(index);
      this.$refs.tabControl.currentIndex = 0;
      this.$refs.tabControl1.currentIndex = 0;
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
    }
  }
};
</script>
<style scoped>
.category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100% - 91px);
  overflow: hidden;
  display: flex;
}
.content-shop {
  flex: 1;
  position: relative;
}
.content-scroll {
  height: 100%;
}
.tab-control {
  background-color: #fff;
  z-index: 45;
}
.imbibition {
  position: absolute;
  z-index: 46;
  width: 100%;
}
</style>
