<template>
  <div class="result-preview-container">
    <div class="title">修改结果预览</div>
    <el-table :data="tableData" :height="publicStore.tableHeight" :header-cell-style="headerCellStyle"
              class="table-box">
      <el-table-column prop="date" label="原文件名"/>
      <el-table-column prop="name" label="新文件名"/>
      <el-table-column prop="address" label="状态">
        <template #default>
          <CommonStatus>成功</CommonStatus>
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
    date: "2016-05-032016-05-032016-05-032016-05-03",
    name: "2016-05-032016-05-032016-05-032016-05-03",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  }, {
    date: "2016-05-03",
    name: "Tom",
    address: "No. "
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. "
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. "
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. "
  }
];


</script>

<style scoped lang="less">
.result-preview-container {
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;

  .title {
    line-height: 1.5rem;
    color: #000;
    margin-bottom: 1rem;
  }

  .table-box {
    border-radius: 0.5rem;
    border: 1px solid #E5E7EB;
  }

  .el-table {
    color: #000;

    &:last-child {
      border-bottom: none;
    }
  }


}

</style>
