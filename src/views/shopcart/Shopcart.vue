<template>
  <div class="cart">
    <NavBar class="cart-title">
      <span slot="center"> 购物车 ({{ productLength }}) </span>
    </NavBar>
    <BetterScroll class="scroll" ref="scroll">
      <CartList />
    </BetterScroll>
    <BottomBar />
  </div>
</template>
<script>
import NavBar from "common/navbar/NavBar";
import BetterScroll from "common/scroll/BetterScroll";

import CartList from "./childcoms/cartList";
import CartItem from "./childcoms/cartItem";
import BottomBar from "./childcoms/bottomBar";

import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList,
    BetterScroll,
    BottomBar
  },
  computed: {
    ...mapGetters(["productLength"])
  },
  activated() {
    setTimeout(() => {
      this.$refs.scroll.bscroll.refresh();
    }, 20);
  }
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.scroll {
  height: calc(100% - 131px);
  overflow: hidden;
}
.cart-title {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
