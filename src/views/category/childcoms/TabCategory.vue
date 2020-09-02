<template>
  <div class="item-list">
    <div class="item" v-for="(item, index) in subcategories" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="" @load="imgLoad" />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subcategories: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit("loadImg");
    }
  }
};
</script>

<style scoped>
.item-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.item {
  width: 32.6%;
  text-align: center;
  font-size: 13px;
  margin-bottom: 10px;
}
.item img {
  width: 60%;
  margin-bottom: 10px;
}
</style>
