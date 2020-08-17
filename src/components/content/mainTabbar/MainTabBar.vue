<template>
  <div>
    <TabBar>
      <TabBarItem path="/home">
        <img slot="icon" src="~assets/img/tabbar/home.svg" alt="" />
        <img
          slot="icon-active"
          src="~assets/img/tabbar/home-active.svg"
          alt=""
        />
        <div slot="text">首页</div>
      </TabBarItem>

      <TabBarItem path="/category">
        <img slot="icon" src="~assets/img/tabbar/category.svg" alt="" />
        <img
          slot="icon-active"
          src="~assets/img/tabbar/category-active.svg"
          alt=""
        />
        <div slot="text">分类</div>
      </TabBarItem>

      <TabBarItem path="/shopcart">
        <img slot="icon" src="~assets/img/tabbar/cart.svg" alt="" />
        <img
          slot="icon-active"
          src="~assets/img/tabbar/cart-active.svg"
          alt=""
        />
        <div slot="text">购物车</div>
      </TabBarItem>

      <TabBarItem path="/profile">
        <img slot="icon" src="~assets/img/tabbar/profile.svg" alt="" />
        <img
          slot="icon-active"
          src="~assets/img/tabbar/profile-active.svg"
          alt=""
        />
        <div slot="text">我的</div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from "common/tabbar/TabBar.vue";
import TabBarItem from "common/tabbar/TabBarItem.vue";

export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped></style>
