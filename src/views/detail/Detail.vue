<template>
  <div id="detail">
    <DetailNavBar
      ref="detailNavBar"
      class="detail-nav"
      @currentIndex="getCurrentIndex"
    />
    <BetterScroll
      ref="detailScroll"
      class="detail-scroll"
      :probeType="3"
      @scroll="contentScroll"
    >
      <div class="error" v-if="isError">
        暂无数据请浏览其他商品
      </div>
      <template v-else>
        <DetailSwiper :image="topImages" />
        <DetailBaseInfo :goods="goods" />
        <DetailShopInfo :shop="shop" />
        <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
        <DetailParams ref="params" :paramInfo="goodsParam" />
        <DetailCommonInfo ref="common" :commentInfo="commonInfo" />
      </template>
      <GoodsList ref="recommend" :goodsList="recommends" />
    </BetterScroll>

    <DetailBottomBar @addToCart="addToCart" />
    <Toast :isShow="toastisShow" :message="message" />
    <BackTop v-show="isShow" @click.native="backTop" />
  </div>
</template>

<script>
import {
  getDetail,
  getRecommends,
  Goods,
  Shop,
  GoodParam
} from "network/detail";

import GoodsList from "content/goods/GoodsList";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailCommonInfo from "./childComps/DetailCommonInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParams from "./childComps/DetailParams";
import DetailBottomBar from "./childComps/DetailBottomBar";

import BetterScroll from "common/scroll/BetterScroll";
import Toast from "common/toast/Toast";

import BackTop from "content/backtop/BackTop";

export default {
  name: "detail",

  data() {
    return {
      iid: undefined,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commonInfo: {},
      recommends: [],
      offsetTopList: [],
      isShow: false,
      isError: false,
      //   scrollY: 0,
      getElOffsetTop: null,
      refresh: null,
      navBarIndex: 0,
      toastisShow: false,
      message: ""
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailCommonInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailBottomBar,
    BetterScroll,
    BackTop,
    GoodsList,
    Toast
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailData();
  },
  mounted() {
    this.refresh = this.debounce(this.$refs.detailScroll.refresh, 300);
    this.getElOffsetTop = this.debounce(() => {
      this.offsetTopList = [];
      this.offsetTopList.push(0);
      this.offsetTopList.push(this.$refs.params.$el.offsetTop);
      this.offsetTopList.push(this.$refs.common.$el.offsetTop);
      this.offsetTopList.push(this.$refs.recommend.$el.offsetTop);
      this.offsetTopList.push(Number.MAX_VALUE);
    }, 400);
  },

  beforeRouteUpdate(to, from, next) {
    this.iid = to.params.id;
    this.$refs.detailScroll.bscroll.scrollTo(0, 0, 0);
    this.getDetailData();
    next();
  },
  methods: {
    addToCart() {
      var product = {};

      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.desc = this.goods.desc;
      product.id = this.iid;
      this.$store.dispatch("addCart", product).then(res => {
        this.message = res;
        this.toastisShow = true;

        setTimeout(() => {
          this.message = "";
          this.toastisShow = false;
        }, 2000);
      });
    },

    getCurrentIndex(index) {
      this.$refs.detailScroll.bscroll.scrollTo(
        0,
        -this.offsetTopList[index],
        400
      );
    },

    backTop() {
      this.$refs.detailScroll.bscroll.scrollTo(0, 0, 400);
    },

    //获取滚动的距离
    contentScroll(option) {
      //   this.scrollY = ;
      var positionY = option.y;
      var length = this.offsetTopList.length;
      this.isShow = positionY < -1600;

      for (var i = 0; i < length - 1; i++) {
        if (
          i != this.navBarIndex &&
          positionY < -this.offsetTopList[i] &&
          positionY > -this.offsetTopList[i + 1]
        ) {
          this.navBarIndex = i;
          this.$refs.detailNavBar.currentIndex = i;
        }
        // if (
        //   i != this.navBarIndex &&
        //   ((i != this.navBarIndex &&
        //     i < length - 1 &&
        //     positionY < -this.offsetTopList[i] &&
        //     positionY >= -this.offsetTopList[i + 1]) ||
        //     (i == length - 1 && -this.offsetTopList[i] >= positionY))
        // ) {
        //   this.navBarIndex = i;
        //   this.$refs.detailNavBar.currentIndex = i;
        // }
      }
    },

    getDetailData() {
      getDetail(this.iid)
        .then(res => {
          this.isError = false;
          var data = res.result;
          this.topImages = data.itemInfo.topImages;
          this.goods = new Goods(
            data.itemInfo,
            data.columns,
            data.shopInfo.services
          );
          this.shop = new Shop(data.shopInfo);

          this.detailInfo = data.detailInfo;

          this.goodsParam = new GoodParam(
            data.itemParams.info,
            data.itemParams.rule
          );

          this.commonInfo = data.rate.list[0];
        })
        .catch(err => {
          this.topImages = [];
          this.goods = {};
          this.shop = {};
          this.detailInfo = {};
          this.goodsParam = {};
          this.commonInfo = {};
          this.isError = true;
        });

      getRecommends().then(res => {
        this.recommends = res.data.list;
      });
    },

    imageLoad() {
      this.refresh();
      this.getElOffsetTop();
    },

    debounce(func, dely) {
      var timer = null;
      return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this);
        }, dely);
      };
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 40;
  height: 100vh;
  overflow: hidden;
  background-color: white;
}
.detail-nav {
  z-index: 41;
  position: relative;
}
.detail-scroll {
  height: calc(100% - 91px);
  overflow: hidden;
  position: relative;
}
.error {
  font-size: 36px;
  text-align: center;
  height: 300px;
  padding: 60px 30px;
}
</style>
