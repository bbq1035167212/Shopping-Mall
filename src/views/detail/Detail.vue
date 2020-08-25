<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" />
    <BetterScroll ref="detailScroll" class="detail-scroll">
      <div class="error" v-if="isError">
        暂无数据请浏览其他商品
      </div>
      <DetailSwiper :image="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <DetailParams :paramInfo="goodsParam" />
      <DetailCommonInfo :commentInfo="commonInfo" />
      <GoodsList :goodsList="recommends" />
    </BetterScroll>
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

import BetterScroll from "common/scroll/BetterScroll";

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
      refresh: null,
      isShow: false,
      isError: false
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
    BetterScroll,
    BackTop,
    GoodsList
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailData();
  },
  mounted() {
    this.refresh = this.debounce(this.$refs.detailScroll.refresh, 10);
  },

  beforeRouteUpdate(to, from, next) {
    this.iid = to.params.id;
    this.$refs.detailScroll.bscroll.scrollTo(0, 0, 0);
    this.getDetailData();
    next();
  },
  methods: {
    backTop() {},

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
  height: calc(100% - 42px);
  overflow: hidden;
}
.error {
  font-size: 36px;
  text-align: center;
  height: 300px;
  padding: 60px 30px;
}
</style>
