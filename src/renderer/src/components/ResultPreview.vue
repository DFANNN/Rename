<template>
  <div class="result-preview-container">
    <div class="title">修改结果预览</div>
    <el-table :data="tableData" :height="publicStore.tableHeight" :header-cell-style="headerCellStyle"
              class="table-box">
      <el-table-column type="index" width="60" label="序号" align="center"/>
      <el-table-column prop="date" label="原文件名"/>
      <el-table-column prop="name" label="新文件名"/>
      <el-table-column prop="address" label="状态" width="100">
        <template #default>
          <CommonStatus status="failure">成功</CommonStatus>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import CommonStatus from "@renderer/components/CommonStatus.vue";

const publicStore = usePublicStore();

const headerCellStyle = {
  backgroundColor: "#F9FAFB",
  color: "#4B5563"
};

const tableData = [
  {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }, {
    date: "白月梵星",
    name: "白月梵星 S01E01.MP4",
    address: "No. "
  }
];


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

  .el-table {
    color: #000;

    &:last-child {
      border-bottom: none;
    }
  }


}

</style>
