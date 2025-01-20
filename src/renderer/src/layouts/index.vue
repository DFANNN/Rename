<template>
  <div>
    <el-container class="common-layout">
      <el-aside class="aside">
        <AsideComponent/>
      </el-aside>
      <el-container class="common-container">
        <el-header class="header">Header</el-header>
        <el-main class="main">Main</el-main>
        <el-footer class="footer">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AsideComponent from '@renderer/layouts/aside.vue'
</script>

<style scoped lang="less">
.common-layout {
  height: 100vh;

  .aside {
    background-color: #d3dce6;
    width: 256px;
    padding: 0 1.5rem;
    height: 100%;
  }

  .common-container {
    .header {
      background-color: hotpink;
    }

    .main {
      background-color: blueviolet;
    }

    .footer {
      background-color: brown;
    }
  }
}


</style>
