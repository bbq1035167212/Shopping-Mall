<template>
  <div>
    <TabBar>
      <TabBarItem>
        <img slot="icon" src="" alt="" />
        <div slot="text">首页</div>
      </TabBarItem>
      <TabBarItem>
        <img slot="icon" src="" alt="" />
        <div slot="text">分类</div>
      </TabBarItem>
      <TabBarItem>
        <img slot="icon" src="" alt="" />
        <div slot="text">购物车</div>
      </TabBarItem>
      <TabBarItem>
        <img slot="icon" src="" alt="" />
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
