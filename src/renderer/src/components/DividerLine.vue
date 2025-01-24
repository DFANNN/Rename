<!-- 分割㢟 -->
<template>
  <div class="divider-box">
    <div class="divider-left"></div>
    <div class="divider-center">
      <slot></slot>
    </div>
    <div class="divider-right"></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.divider-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;

  .divider-left {
    flex: 1;
    height: 1px;
    background-color: var(--border-color);
  }

  .divider-right {
    flex: 1;
    height: 1px;
    background-color: var(--border-color);
  }

  .divider-center {
    flex: 1;
    font-size: 14px;
    text-align: center;
    margin: 0 0.5rem;
  }
}
</style>
