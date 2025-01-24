<template>
  <el-button>
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.el-button {
  background-color: var(--button-background-color);
  color: #fff;
  padding: 0.5rem 1.5rem;
  line-height: 1.5rem;
  height: 2.25rem;
  transition: background-color 0.3s ease;
  border: none;

  &:hover {
    background-color: #333333; /* 悬停时变为深灰色 */
  }
}
</style>
