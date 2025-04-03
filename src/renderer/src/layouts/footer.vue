<template>
  <div class="footer-container">
    <div class="result-box">
      <div class="margin-right">
        已选择文件：{{ diskStore.selectedFilesNum }} 个
      </div>
      <div class="margin-right">成功：{{ diskStore.successNum }} 个</div>
      <div class="margin-right">失败：{{ diskStore.failNum }} 个</div>
    </div>
    <div>
      <CommonButton class="margin-right" @click="diskStore.resetData"
        >重置数据</CommonButton
      >
      <CommonButton @click="diskStore.renameHandler">执行修改</CommonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonButton from "@renderer/components/CommonButton.vue";

const diskStore = useDiskStore();

// const percentage = ref(20);
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
    color: var(--text-info-color);

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
