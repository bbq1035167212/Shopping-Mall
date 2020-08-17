<template>
  <div>
    <NavBar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </NavBar>
  </div>
</template>
<script>
import NavBar from "common/navbar/NavBar";

import { getHomeMultidata } from "network/home";

export default {
  components: {
    NavBar
  },

  created() {
    getHomeMultidata().then(res=>{
      console.log(res);
    })
  }
};
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
  box-shadow: 0px -1px 1px rgba(150, 150, 150, 0.8);
}
</style>
