<template>
  <div class="footer-container">
    <div class="result-box">
      <div class="margin-right">已选择文件：2 个</div>
      <div class="margin-right">成功：2 个</div>
      <div class="margin-right">失败：0 个</div>
      <div>进度：</div>
      <el-progress :percentage="percentage" color="#4B5563" style="width: 300px;" />
    </div>
    <div>
      <CommonButton class="margin-right">重置数据</CommonButton>
      <CommonButton>执行修改</CommonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonButton from "@renderer/components/CommonButton.vue";

const percentage = ref(20);
</script>

<style scoped lang="less">
.footer-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .result-box {
    display: flex;
    font-size: 14px;
    color: #4B5563;
  }

  .margin-right {
    margin-right: 1rem;
  }
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
</style>
