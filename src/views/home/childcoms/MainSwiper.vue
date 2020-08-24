<template>
  <div>
    <Swiper>
      <SwiperItem v-for="(item, index) of banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imgLoad" />
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "common/swiper";
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      imgLoadState: false
    };
  },
  methods: {
    imgLoad() {
      if (!this.imgLoadState) {
        this.$emit("swiperImgLoad");
        this.imgLoadState = true;
      }
    }
  }
};
</script>

<style scoped></style>
