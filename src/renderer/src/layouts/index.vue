<template>
  <div>
    <el-container class="common-layout">
      <AsideComponent/>
      <el-container class="common-container">
        <el-header class="header">Header</el-header>
        <el-main class="main">
          <router-view/>
        </el-main>
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
