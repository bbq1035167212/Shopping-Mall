<template>
  <div class="wapper" ref="wapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      bscroll: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },

  methods: {
    initScroll() {
      //初始化better-scroll
      if (!this.$refs.wapper) {
        return false;
      }

      this.bscroll = new BScroll(this.$refs.wapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      this.bscroll.on("scroll", option => {
        this.$emit("scroll", option);
      });

      this.bscroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  }
};
</script>

<style scoped></style>
