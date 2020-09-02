<template>
  <div class="bottom-bar">
    <div class="check-button">
      <carButton @click.native="selectAll" :checked="isSlectAll"></carButton>
      <span>全选</span>
    </div>
    <div class="price">总价格：￥{{ toalPrice }}</div>
    <div class="calulate">去计算:({{ checketLength }})</div>
  </div>
</template>

<script>
import carButton from "./cartButton";
import { mapState } from "vuex";
import { ALL_SELECT, BACK_SELECT } from "store/mutation-types";

export default {
  components: {
    carButton
  },
  computed: {
    ...mapState(["product"]),
    toalPrice() {
      return this.product
        .filter(item => {
          return item.checked;
        })
        .reduce((total, num) => {
          return (total += num.price * num.count);
        }, 0)
        .toFixed(2);
    },

    checketLength() {
      return this.product.filter(item => {
        return item.checked;
      }).length;
    },

    isSlectAll() {
      return this.product.length
        ? this.product.every(item => item.checked)
        : false;
    }
  },
  methods: {
    selectAll() {
      if (this.isSlectAll) {
        this.$store.commit(BACK_SELECT);
      } else {
        this.$store.commit(ALL_SELECT);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;

  font-size: 14px;
}
.check-button,
.bottom-bar {
  display: flex;
  padding-left: 4px;
  align-items: center;
}
.check-button {
  width: 80px;
}
.check-button span {
  margin-left: 5px;
}
.price {
  padding-right: 14px;
  flex: 1;
}
.calulate {
  background-color: red;
  color: white;
  float: right;
  width: 90px;
  text-align: center;
  line-height: 40px;
}
</style>
