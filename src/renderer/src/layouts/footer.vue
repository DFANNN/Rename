<template>
  <div class="footer-container">
    <div class="result-box">
      <div class="margin-right">已选择文件：2 个</div>
      <div class="margin-right">成功：2 个</div>
      <div class="margin-right">失败：0 个</div>
      <div class="progress-name">进度：</div>
      <el-progress :percentage="percentage" color="#4B5563" class="progress"/>
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
    flex: 1;
    font-size: 14px;
    color: #4B5563;

    .progress-name {
      margin-left: 1rem;
    }

    .progress {
      flex: 1;
      margin-right: 1rem;
    }
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
