<template>
  <div class="header-container">
    <div class="title">{{ route.meta.title }}</div>
    <div class="info">{{ route.meta.modeInfo }}</div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute();
</script>

<style scoped lang="less">
.header-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-size: 18px;
    line-height: 1.75rem;
    color: var(--text-color);
  }

  .info {
    font-size: 14px;
    line-height: 1.25rem;
    color: var(--text-info-color);
  }
}
</style>
