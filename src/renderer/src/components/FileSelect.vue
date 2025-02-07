<template>
  <div class="file-select-container">
    <div class="title">文件选择</div>
    <div class="file-select-box">
      <el-input v-model="input" placeholder="请选择文件夹路径"/>
      <CommonButton class="button" @click="dialogVisible = true">浏览文件夹</CommonButton>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :draggable="true"
    >
      <template #header>
        <div class="dialog-header">
          <div>选择文件路径</div>
          <el-icon>
            <Close/>
          </el-icon>
        </div>

      </template>
      <div class="dialog-body">
        <div class="current-path-box">
          <div>当前路径：</div>
          <div>本地磁盘c</div>
          <div>Users</div>
          <div>Document</div>
        </div>
        <div class="disk-path-box">
          <div>本地磁盘c</div>
          <div>本地磁盘d</div>
          <div>本地磁盘e</div>
        </div>
      </div>
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
import {Close} from "@element-plus/icons-vue";

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


  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    font-size: 16px;
    color: var(--text-color);
  }

  .dialog-body {
    padding: 0 1.5rem 1rem;

    .current-path-box {
      display: flex;
      color: var(--text-color);
      font-size: 14px;
      margin-bottom: 1rem;

    }

    .disk-path-box {
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: var(--text-color);
      border: 1px solid var(--border-color);
    }
  }

}

:deep(.el-dialog) {
  padding: 0;
  background-color: var(--background-color);
}
</style>
