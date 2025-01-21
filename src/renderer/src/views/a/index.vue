<template>
  <div class="a-container">
    <div class="left-box">左边</div>
    <ResultPreview />
  </div>
</template>

<script setup lang="ts">
import ResultPreview from "@renderer/components/ResultPreview.vue";
</script>

<style scoped lang="less">
.a-container {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  .left-box {
    background-color: hotpink;
  }
}
</style>
