<template>
  <el-drawer v-model="publicStore.themeSettingDrawer" :size="350" :show-close="false" :close-on-press-escape="false">
    <template #title>
      <div class="drawer-title">系统设置</div>
    </template>
    <DividerLine>主题模式</DividerLine>
    <div class="theme-mode-box">
      <div class="common-mode-box" v-for="(mode,index) in themeModeInfoList" :key="index"
           @click="publicStore.themeMode = mode.value" :class="{ 'is-active': publicStore.themeMode === mode.value }">
        <el-icon class="common-icon">
          <Check v-if="publicStore.themeMode === mode.value" />
          <component :is="mode.icon" v-else />
        </el-icon>
        <div>{{ mode.title }}</div>
      </div>
    </div>
    <DividerLine>主题色</DividerLine>
    <div class="theme-color-box">
      <div v-for="(color,index) in publicStore.themeColorList"
           class="theme-color-item"
           :class="{'is-active': color === publicStore.themeColor}"
           :key="index"
           :style="{background: color}" @click="publicStore.toggleThemeColor(color)">
        <el-icon class="icon" v-show="publicStore.themeColor === color">
          <Check />
        </el-icon>
      </div>
      <el-color-picker v-model="publicStore.pickerColor" class="color-picker" @change="changeColor" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { Sunny, Moon, Monitor, Check } from "@element-plus/icons-vue";
import DividerLine from "@renderer/components/DividerLine.vue";

const publicStore = usePublicStore();

//  主题模式列表
const themeModeInfoList = [
  { title: "浅色", value: "light", icon: Sunny },
  { title: "深色", value: "dark", icon: Moon },
  { title: "设备", value: "device", icon: Monitor }
];


// 当色彩选择器发生改变时
const changeColor = (e) => {
  publicStore.toggleThemeColor(e);
};


</script>

<style scoped lang="less">
.drawer-title {
  font-size: 16px;
  text-align: center;
  color: var(--text-color);
}

.theme-mode-box {
  padding: 0.25rem;
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  font-size: 14px;

  .common-mode-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    text-align: center;
    line-height: 2.5rem;
    cursor: pointer;
    color: var(--text-color);

    .common-icon {
      margin-right: 0.5rem;
    }

    &:hover {
      background: var(--table-tr-hover-color);
    }
  }

  .common-mode-box.is-active {
    color: #ffffff;
    background: var(--theme-common-color);
  }
}

.theme-color-box {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  .theme-color-item {
    height: 38.33px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      color: #fff;
    }

  }

}


:deep(.el-divider__text) {
  background: var(--background-color);
  color: var(--text-info-color);
}

:deep(.el-color-picker__trigger) {
  width: 100%;
  height: 100%;
}


</style>
