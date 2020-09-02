<template>
  <div class="goods-item" @click="goToDetail">
    <img v-lazy="showImage" alt="" @load="updateLength" />
    <div class="goods-item-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      iid: 0
    };
  },

  computed: {
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    }
  },

  methods: {
    updateLength() {
      this.$bus.$emit("updateLength");
    },

    goToDetail() {
      var id = this.goodsItem.iid || this.goodsItem.item_id;
      //防止重复点击一个商品
      if (this.iid != id) {
        this.iid = id;
        this.$router.push("/detail/" + id);
      }
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
}

.goods-item-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-item-info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.goods-item-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-item-info .collect {
  position: relative;
}

.goods-item-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
