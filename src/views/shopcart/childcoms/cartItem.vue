<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton
        @click.native="checkedChange"
        :checked="product.checked"
      ></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">商品描述: {{ product.desc }}</div>
      <div class="item-delete">
        <span @click="deleteProduct">删除</span>
      </div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">
          <span @click="reduce">-</span>
          x{{ product.count }}
          <span @click="plus">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./cartButton";
import { COUNT_PLUS, COUNT_REDUCE, DELETE_PRUDUCT } from "store/mutation-types";
export default {
  props: {
    product: {
      type: Object
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkedChange() {
      //   console.log(this.product);
      this.product.checked = !this.product.checked;
    },
    reduce() {
      this.$store.commit(COUNT_REDUCE, this.product);
    },
    plus() {
      this.$store.commit(COUNT_PLUS, this.product);
    },
    deleteProduct() {
      this.$store.commit(DELETE_PRUDUCT, this.product.id);
    }
  }
};
</script>

<style scoped>
.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-img {
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 110px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
.item-count span {
  width: 28px;
  height: 18px;
  display: inline-block;
  border: 1px solid black;
  text-align: center;
  line-height: 18px;
  background-color: #eee;
}
.item-delete {
  margin: 10px 0px;
  overflow: hidden;
}
.item-delete span {
  font-size: 12px;
  float: right;
  color: white;
  background-color: red;
  padding: 2px 10px;
}
</style>
