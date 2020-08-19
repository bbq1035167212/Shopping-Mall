<template>
  <div class="tab-control">
    <div
      v-for="(item, index) of titles"
      :key="index"
      class="tab-control-item"
      @click="currentIndex = index"
    >
      <span :class="currentIndex === index ? 'active' : ''">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  }
};
</script>

<style scoped>
.tab-control {
  height: 36;
  line-height: 36px;
  display: flex;
  text-align: center;
  font-size: 13px;
  background-color: white;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span{
  padding: 5px;
}

.tab-control-item .active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
}
</style>
