<template>
  <div class="detail">
    <DetailNavBar />
    <DetailSwiper :image="topImages" />
    <DetailBaseInfo :goods="goods" />
    <DetailShopInfo :shop="shop" />
  </div>
</template>

<script>
import { getDetail, Goods, Shop } from "network/detail";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";

export default {
  name: "detail",

  data() {
    return {
      iid: undefined,
      topImages: [],
      goods: {},
      shop: {}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  created() {
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      this.iid = this.$route.params.id;

      getDetail(this.iid).then(res => {
        var data = res.result;
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        this.shop = new Shop(data.shopInfo);
      });
    }
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 120;
  background-color: white;
}
</style>
