<template>
  <div id="tab-bar-item" @click="itemClick" >
    <div v-if="!isActive" class="item-icon"><slot name="icon" /></div>
    <div v-else class="item-active-icon"><slot name="icon-active" /></div>
    <div :style="isColor" class="item-text"><slot name="text" /></div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String
    },
    color: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {};
  },

  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    isColor() {
      return this.isActive ? { color: this.color }:{}
    }
  },

  methods: {
    itemClick() {
      if (this.$route.path != this.path) {
        this.$router.replace(this.path);
      }
    }
  }
};
</script>

<style scoped>
#tab-bar-item {
  flex: 1;
}
.item-icon img,
.item-active-icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}
.item-text {
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}
</style>
