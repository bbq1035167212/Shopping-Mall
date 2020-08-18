<template>
  <div class="recommend">
    <div
      v-for="(item, index) of recommends"
      :key="index"
      class="recommend-item"
    >
      <a href="">
        <img :src="item.image" :alt="item.title" />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {};
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0px 30px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
