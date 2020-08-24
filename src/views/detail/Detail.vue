<template>
  <div>
    <DetailNavBar />
    <DetailSwiper :image="topImages" />
  </div>
</template>

<script>
import { getDetail } from "network/detail";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

export default {
  name: "detail",

  data() {
    return {
      iid: undefined,
      topImages: [],
      goods: {}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper
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
        console.log(data);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
