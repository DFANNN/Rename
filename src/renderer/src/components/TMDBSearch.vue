<template>
  <div class="TMDB-search-container">
    <div class="name" @click="dialogVisible = true">TMDB搜索</div>
    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :align-center="true"
      :draggable="true"
    >
      <template #header>
        <div class="dialog-header">
          <div>选择文件路径</div>
          <el-icon class="close-icon" @click="cancel">
            <Close />
          </el-icon>
        </div>

      </template>
      <div class="dialog-body">

      </div>
      <template #footer>
        <div class="dialog-footer">
          <CommonButton @click="cancel">取消</CommonButton>
          <CommonButton @click="confirm">确定</CommonButton>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import DiskIcon from "@renderer/components/icon/DiskIcon.vue";
import FolderIcon from "@renderer/components/icon/FolderIcon.vue";
import CommonButton from "@renderer/components/CommonButton.vue";
import { Close, Document, FolderOpened } from "@element-plus/icons-vue";

const dialogVisible = ref(false);

const cancel = () => {
  dialogVisible.value = false;
};

const confirm = () => {
  dialogVisible.value = false;
};
</script>

<style scoped lang="less">
.TMDB-search-container {
  .name {
    color: var(--theme-common-color);
    cursor: pointer;
    text-decoration: underline;
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    font-size: 16px;
    color: var(--text-color);

    .close-icon {
      cursor: pointer;

      &:hover {
        color: var(--theme-common-color);
        filter: brightness(1.2);
      }
    }
  }

  .dialog-body {
    padding: 0 1.5rem 1rem;
  }

  .dialog-footer {
    padding: 0.75rem 1.5rem;
    border-top: 1px solid var(--border-color);
  }
}

:deep(.el-dialog) {
  padding: 0;
  background-color: var(--background-color);
}

@media (max-width: 1350px) {
  :deep(.el-dialog) {
    width: 70vw;
  }
}

@media (min-width: 1351px) {
  :deep(.el-dialog) {
    width: 50vw;
  }
}
</style>
