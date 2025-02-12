<template>
  <div class="result-preview-container">
    <div class="title">修改结果预览</div>
    <el-table :data="diskStore.TVSeriesList" :height="publicStore.tableHeight" :highlight-current-row="false"
              empty-text="暂无文件"
              class="table-box">
      <el-table-column type="index" width="60" label="序号" align="center" />
      <el-table-column prop="name" label="原文件名" />
      <el-table-column prop="newName" label="新文件名" />
      <el-table-column prop="address" label="操作" align="center" width="60">
        <template #default="scope">
          <el-icon class="delete-icon" @click="diskStore.deleteFiles(scope.row.name)">
            <DeleteFilled />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { DeleteFilled } from "@element-plus/icons-vue";

const publicStore = usePublicStore();
const diskStore = useDiskStore();


</script>

<style scoped lang="less">
.result-preview-container {
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--background-color);

  .title {
    line-height: 1.5rem;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  .table-box {
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
  }

  .delete-icon {
    //color: #EF4444;
    color: var(--theme-common-color);
    cursor: pointer;
  }

  .el-table {
    color: var(--text-color);

    &:last-child {
      border-bottom: none;
    }
  }


}

:deep(.el-table th.el-table__cell) {
  background-color: var(--table-header-background-color);
  border-color: var(--border-color);
  color: var(--table-header-text-color);
}

:deep(.el-table tr) {
  background-color: var(--background-color);
}

:deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
  border-color: var(--border-color);
}

:deep(.el-table__inner-wrapper:before) {
  background-color: var(--border-color);
}

.el-table {
  --el-table-row-hover-bg-color: var(--table-tr-hover-color);
}

:deep(.el-table__empty-block) {
  background-color: var(--background-color);
}

</style>
