<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from "content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style scoped>
@import "./assets/css/base.css";
</style>
