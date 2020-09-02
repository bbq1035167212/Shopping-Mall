<template>
  <div>
    <cartItem v-for="(item, index) in product" :key="index" :product="item" />
  </div>
</template>

<script>
import cartItem from "./cartItem";
import { mapState } from "vuex";

export default {
  components: {
    cartItem
  },
  computed: {
    ...mapState(["product"])
  }
};
</script>

<style scoped></style>
