<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0, 0.6);
  color: white;
  padding: 15px 25px;
}
</style>
