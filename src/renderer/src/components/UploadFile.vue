<template>
  <div class="file-select-container">
    <div class="title">文件选择</div>
    <div class="file-select-box">
      <el-input v-model="input" placeholder="请选择文件夹路径" />
      <CommonButton class="button" @click="dialogVisible = true">浏览文件夹</CommonButton>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :draggable="true"
    >
      <template #header>
        <div>选择文件路径</div>
        <el-icon>
          <Close />
        </el-icon>
      </template>
      <div>This is a message</div>
      <template #footer>
        <div class="dialog-footer">
          <CommonButton @click="dialogVisible = false">取消</CommonButton>
          <CommonButton @click="dialogVisible = false">确定</CommonButton>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import CommonButton from "@renderer/components/CommonButton.vue";
import { Close } from "@element-plus/icons-vue";

const input = ref("");
const dialogVisible = ref(false);
</script>

<style scoped lang="less">
.file-select-container {
  .title {
    line-height: 1.5rem;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  .file-select-box {
    border: 2px dashed var(--border-color);
    border-radius: 8px;
    padding: 2rem 1.5rem;

    .button {
      width: 100%;
      margin-top: 1rem;
    }
  }
}
</style>
