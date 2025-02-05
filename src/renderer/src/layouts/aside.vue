<template>
  <div class="aside-container" :class="{'collapse':collapse}">
    <div class="logo-box">
      <div class="logo">
        <img src="../assets/logo1.jpg" alt="logo">
      </div>
    </div>
    <div class="menu-box">
      <div :class="{'icon-box':true,'is-active':defaultActive === menu.path}" v-for="(menu,index) in menus"
           :key="index" @click="router.push(menu.path)">
        <el-tooltip
          :effect="publicStore.themeMode"
          :content="menu.meta?.title as string"
          placement="right"
          :offset="30"
          :show-after="200"
        >
          <el-icon>
            <component :is="menuIcons[menu.meta?.icon as any]" />
          </el-icon>
        </el-tooltip>
      </div>
    </div>

    <div class="function-box">
      <div class="setting-box">
        <el-icon class="icon" @click="publicStore.themeSettingDrawer = true">
          <Setting />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  VideoCamera,
  DocumentCopy,
  DocumentRemove,
  Setting
} from "@element-plus/icons-vue";
import { RouteRecordRaw } from "vue-router";


const router = useRouter();
const route = useRoute();
const publicStore = usePublicStore();

// 折叠
const collapse = ref(true);

// 菜单
const menus = ref<RouteRecordRaw[]>([]);

// 菜单icon
const menuIcons = {
  VideoCamera,
  DocumentCopy,
  DocumentRemove
};

// 页面加载时默认激活菜单的 index
const defaultActive = computed(() => route.path);


// 获取菜单
const getMenus = () => {
  menus.value = router.getRoutes().filter((item) => item.meta.isMenu);
};

onMounted(() => {
    getMenus();
  }
);


</script>

<style scoped lang="less">
.aside-container {
  padding: 0 0.5rem;
  transition: all 0.3s ease;
  border-right: 1px solid var(--border-color);

  &.collapse {
    padding: 0;

    .el-menu-item {
      border-radius: 0;
    }
  }

  .logo-box {
    display: flex;
    align-items: center;
    height: 85px;

    .logo {
      width: 64px;
      height: 64px;

      img {
        width: 100%;
      }
    }

    .logo-title-box {
      flex: 1;
      font-size: 20px;

      .name {
        margin-left: 1rem;
      }
    }


  }

  .menu-box {
    height: calc(100vh - 85px - 59px);
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon-box {
      font-size: 18px;
      cursor: pointer;
      display: flex;
      padding: 12px 16px;
      border-radius: 4px;
      color: var(--menu-no-select-text-color);
    }

    .icon-box.is-active {
      background: var(--theme-common-color);
      color: var(--menu-select-text-color)
    }
  }

  .function-box {
    .setting-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 59px;
      font-size: 20px;

      .icon {
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--menu-no-select-text-color);

        &:hover {
          font-size: 28px;
        }
      }
    }

  }
}
</style>
