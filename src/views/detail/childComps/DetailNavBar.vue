<template>
  <div class="detail-nav">
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~/assets/img/common/back.svg" alt="" />
      </div>
      <div class="title" slot="center">
        <div
          class="title-item"
          v-for="(item, index) of titles"
          :key="index"
          @click="itemClick(index)"
          :class="currentIndex === index ? 'active' : ''"
        >
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },

  methods: {
    backClick() {
      this.$router.back();
    },

    itemClick(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style scoped>
.detail-nav {
  background-color: white;
}
.back {
  text-align: center;
}
.back img {
  margin-top: 12px;
  height: 18px;
}
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.title-item.active {
  color: var(--color-high-text);
}
</style>
