<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">
      {{ goods.title }}
    </div>

    <div class="info-price">
      <span class="n-price">
        {{ goods.newPrice }}
      </span>
      <span class="o-price">
        {{ goods.oldPrice }}
      </span>
      <span v-if="goods.discount" class="discount">
        {{ goods.discount }}
      </span>
    </div>

    <div class="other">
      <span v-for="(item, index) of goods.columns" :key="index">
        {{ item }}
      </span>
    </div>

    <div class="info-service">
      <span v-for="(item, index) of goods.services.length" :key="index">
        <template v-if="index < 3">
          <img :src="goods.services[index].icon" alt="" />
          <span>{{ goods.services[index].name }}</span>
        </template>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object
    }
  }
};
</script>

<style scoped>
.base-info {
  padding: 16px 8px 0px;
  font-size: 12px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  font-size: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.info-price {
  margin-top: 8px;
  margin-bottom: 4px;
}
.info-price .n-price {
  color: var(--color-tint);
  font-size: 16px;
}
.info-price .o-price {
  color: var(--color-text);
  font-size: 12px;
  margin-left: 6px;
  text-decoration: line-through;
}
.info-price .discount {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 5px;
  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -4px;
}
.other {
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
}

.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}
.info-service img {
  width: 10px;
  height: 10px;
  margin-right: 2px;
}
</style>
