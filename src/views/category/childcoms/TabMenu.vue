<template>
  <BetterScroll class="c" ref="besMenu" id="menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item, index) of category"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </BetterScroll>
</template>

<script>
import BetterScroll from "common/scroll/BetterScroll";

export default {
  props: {
    category: {
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
  },
  components: {
    BetterScroll
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    }
  }
};
</script>

<style scoped>
#menu {
  width: 100px;
  background-color: #eee;
}
.menu-list-item {
  padding: 14px 0px;
  font-size: 14px;
  text-align: center;
}
.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}

</style>
