<template>
  <div class="bottom-bar">
    <div class="bar-left bar-item">
      <div>
        <img src="~assets/img/detail/service.svg" alt="" />
        <div>客服</div>
      </div>
      <div>
        <img src="~assets/img/detail/shop.svg" alt="" />
        <div>店铺</div>
      </div>
      <div>
        <img src="~assets/img/detail/collection.svg" alt="" />
        <div>收藏</div>
      </div>
    </div>
    <div class="bar-right bar-item">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addToCart() {
      this.$emit("addToCart");
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  position: fixed;
  bottom: 0;
  left: 0px;
  right: 0px;
  display: flex;
  text-align: center;
  box-shadow: 0px -1px 1px rgba(240, 240, 240, 0.8);
  background-color: #fff;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.bar-left {
  font-size: 12px;
}
.bar-left img {
  width: 26px;
  padding-top: 2px;
}
.bar-right {
  line-height: 49px;
  color: #fff;
  font-size: 15px;
}
.bar-right .cart {
  background-color: red;
}
.bar-right .buy {
  background-color: orange;
}
</style>
