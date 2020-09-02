<template>
  <div>
    <GoodsList :goodsList="goodsList" />
  </div>
</template>

<script>
import GoodsList from "content/goods/GoodsList";
export default {
  components: {
    GoodsList
  },
  props: {
    goodsList: {
      type: Array
    }
  }
};
</script>

<style scoped></style>
