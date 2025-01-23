<template>
  <el-drawer v-model="publicStore.themeSettingDrawer" :size="300" :show-close="false" :close-on-press-escape="false">
    <template #title>
      <div class="drawer-title">系统设置</div>
    </template>
    <el-divider content-position="center">显示模式</el-divider>
    <div class="mode-box">
      <div class="default-box" :class="{ 'light-active': isLightMode }" @click="setThemeMode('light')">
        <el-icon class="default-icon">
          <Sunny/>
        </el-icon>
        <div class="default-name">浅色</div>
      </div>
      <div class="default-box" :class="{ 'light-active': isDarkMode }" @click="setThemeMode('dark')">
        <el-icon class="default-icon">
          <Moon/>
        </el-icon>
        <div class="default-name">深色</div>
      </div>
    </div>
    <el-divider content-position="center">主题色</el-divider>
    <div class="theme-color-box">
      <div class="theme-color-item" :style="{background: color}" v-for="(color,index) in publicStore.themeColorList"
           :key="index"></div>
      <el-color-picker v-model="color1" class="color-picker"/>
    </div>
    <el-divider content-position="center">导航菜单</el-divider>
    <div class="mode-box">
      <div class="default-box" :class="{ 'light-active': isThemeMenuMode }" @click="setThemeMenuMode(true)">
        <el-icon class="default-icon">
          <Fold/>
        </el-icon>
        <div class="default-name">折叠</div>
      </div>
      <div class="default-box" :class="{ 'light-active': !isThemeMenuMode }" @click="setThemeMenuMode(false)">
        <el-icon class="default-icon">
          <Expand/>
        </el-icon>
        <div class="default-name">展开</div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import {Sunny, Moon, Fold, Expand} from "@element-plus/icons-vue";

const publicStore = usePublicStore();


// 浅色模式
const isLightMode = computed(() => publicStore.themeMode === "light");
const isDarkMode = computed(() => publicStore.themeMode === "dark");
const isThemeMenuMode = computed(() => publicStore.themeMenuMode);

const color1 = ref("");

// 设置主题模式
const setThemeMode = (mode: string) => {
  publicStore.themeMode = mode;
};

// 设置主题菜单模式
const setThemeMenuMode = (mode: boolean) => {
  publicStore.themeMenuMode = mode;
};

</script>

<style scoped lang="less">


.drawer-title {
  font-size: 16px;
  text-align: center;
  color: var(--text-color);
}

.mode-box {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: #F3F4F6;
  gap: 0.5rem;

  .default-box {
    flex: 1;
    border-radius: 0.25rem;
    padding: 0.5rem 0;
    background: #F3F4F6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #6B7280;
    cursor: pointer;

    .default-icon {
      font-size: 20px;
    }

    .default-name {
      font-size: 14px;
      margin-top: 0.5rem;
    }
  }

  .default-box.light-active {
    background: #fff;
    color: #000;

    .default-icon {
      color: #EAB308;
    }
  }
}

.theme-color-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  .theme-color-item {
    height: 50px;
    border-radius: 0.25rem;
    cursor: pointer;
  }

}

:deep(.el-color-picker__trigger) {
  width: 100%;
  height: 100%;
}
</style>
