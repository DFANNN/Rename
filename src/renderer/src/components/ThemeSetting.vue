<template>
  <el-drawer v-model="publicStore.themeSettingDrawer" :size="350" :show-close="false" :close-on-press-escape="false">
    <template #title>
      <div class="drawer-title">系统设置</div>
    </template>
    <DividerLine>主题模式</DividerLine>
    <div class="theme-mode-box">
      <div class="common-mode-box" v-for="(mode,index) in themeModeInfoList" :key="index"
           @click=" publicStore.themeMode = mode.value" :class="{ 'is-active': publicStore.themeMode === mode.value }">
        <el-icon class="common-icon">
          <Check v-if="publicStore.themeMode === mode.value"/>
          <component :is="mode.icon" v-else/>
        </el-icon>
        <div>{{ mode.title }}</div>
      </div>

    </div>
    <DividerLine>主题色</DividerLine>
    <div class="theme-color-box">
      <div class="theme-color-item" :style="{background: color}" v-for="(color,index) in publicStore.themeColorList"
           :key="index" @click="publicStore.toggleThemeColor(color)"></div>
      <el-color-picker v-model="color1" class="color-picker"/>
    </div>
    <DividerLine>导航菜单</DividerLine>
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
import {Sunny, Moon, Fold, Expand, Monitor, Check} from "@element-plus/icons-vue";
import DividerLine from "@renderer/components/DividerLine.vue";

const publicStore = usePublicStore();

//  主题模式列表
const themeModeInfoList = [
  {title: "浅色", value: "light", icon: Sunny},
  {title: "深色", value: "dark", icon: Moon},
  {title: "设备", value: "device", icon: Monitor},
]


const isThemeMenuMode = computed(() => publicStore.themeMenuMode);

const color1 = ref("");


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

.theme-mode-box {
  padding: 0.25rem;
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 9999px;

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
    color: var(--select-text-color);
    background: var(--theme-color-dark);
  }
}

.mode-box {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: var(--table-tr-hover-color);
  gap: 0.5rem;

  .default-box {
    flex: 1;
    border-radius: 0.25rem;
    padding: 0.5rem 0;
    background: var(--table-tr-hover-color);
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
    color: var(--button-background-color);

    .default-icon {
      color: var(--button-background-color);
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

:deep(.el-divider__text) {
  background: var(--background-color);
  color: var(--text-info-color);
}

:deep(.el-color-picker__trigger) {
  width: 100%;
  height: 100%;
}


</style>
