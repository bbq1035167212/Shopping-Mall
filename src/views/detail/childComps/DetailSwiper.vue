<template>
  <div>
    <Swiper>
      <SwiperItem class="item" v-for="(item, index) of image" :key="index">
        <img :src="item" />
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "common/swiper/index";
export default {
  props: {
    image: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.item {
  height: 320px;
}
</style>
