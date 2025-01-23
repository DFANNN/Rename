<template>
  <div class="header-container">
    <div class="title">替换文本模式</div>
    <div class="info">在此模式下，您可以批量替换文件名中的指定文本</div>
  </div>
</template>

<script setup lang="ts">

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
