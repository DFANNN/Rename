<template>
  <div class="aside-container">
    <div class="logo-box">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <div class="logo-title">DFAN-Rename</div>
    </div>
    <div class="menu-box">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="false"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="2">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting/>
          </el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon>
            <setting/>
          </el-icon>
          <template #title>这是什么模式了</template>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon>
            <setting/>
          </el-icon>
          <template #title>那这个了</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="less">
.aside-container {
  .logo-box {
    display: flex;
    align-items: center;
    height: 85px;

    .logo {
      width: 48px;
      height: 48px;

      img {
        width: 100%;
      }
    }

    .logo-title {
      margin-left: 1rem;
      font-size: 20px;
    }
  }

  .menu-box {
    height: calc(100vh - 85px);
    background-color: hotpink;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
