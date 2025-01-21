<template>
  <div>
    <el-container class="common-layout">
      <AsideComponent />
      <el-container class="common-container">
        <el-header class="header" height="85px">
          <HeaderComponent />
        </el-header>
        <el-main class="main">
          <router-view />
        </el-main>
        <el-footer class="footer">
          <FooterComponent />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AsideComponent from "@renderer/layouts/aside.vue";
import HeaderComponent from "@renderer/layouts/header.vue";
import FooterComponent from "@renderer/layouts/footer.vue";
</script>

<style scoped lang="less">
.common-layout {
  height: 100vh;


  .common-container {
    .header {
      border-bottom: 1px solid #E5E7EB;
    }

    .main {
      //background-color: blueviolet;

    }

    .footer {
      border-top: 1px solid #E5E7EB;
      //background-color: brown;
    }
  }
}


</style>
