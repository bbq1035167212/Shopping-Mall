<template>
  <div class="goods-list">
    <GoodsItem
      v-for="(item, index) of goodsList"
      :key="index"
      :goodsItem="item"
    >
    </GoodsItem>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";

export default {
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsItem
  }
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
}
</style>
