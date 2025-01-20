<template>
  <div class="aside-container">
    <div class="logo-box">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <div class="logo-title-box" :class="{'collapsed': collapse}">
        <div class="name">DFAN</div>
        <div class="name">Rename</div>
      </div>
    </div>
    <div class="menu-box">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="collapse"
        router
      >

        <el-menu-item :index="menu.path" v-for="menu in menus">
          <el-icon>
            <component :is="menuIcons[menu.meta?.icon as any]"/>
          </el-icon>
          <template #title>{{ menu.meta?.title }}</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="expand-box">
      <el-icon>
        <Expand @click="collapse = !collapse"/>
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Tools,
  Management,
  Platform,
  Expand
} from '@element-plus/icons-vue'
import {RouteRecordRaw} from 'vue-router'


const router = useRouter()

const menus = ref<RouteRecordRaw[]>([])

const collapse = ref(false)

const menuIcons = {
  Tools,
  Management,
  Platform
}


const getMenus = () => {
  menus.value = router.getRoutes().filter((item) => item.path === '/layouts')[0].children
}

onMounted(() => {
    getMenus()
  }
)


</script>

<style scoped lang="less">
.aside-container {
  padding: 0 0.5rem;

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
      transition: opacity 0.3s ease, transform 0.3s ease;

      &.collapsed {
        opacity: 0;
        transform: translateX(-20px);
      }

      .name {
        margin-left: 1rem;
      }
    }


  }

  .menu-box {
    height: calc(100vh - 85px - 30px);
  }

  .expand-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  height: 100%;
  border: none;
}

.el-menu-vertical-demo.el-menu--collapse {
  height: 100%;
  border: none;
}

.el-menu-item {
  //font-size: 16px;
  border-radius: 4px;
  color: #374151;
  //height: 48px;
  //line-height: 48px;

}

.el-menu-item:hover {
  color: #ffffff;
  background: #000000;
}

.el-menu-item.is-active {
  color: #ffffff;
  background: #000000;
}

.el-icon {
  //font-size: 20px;
}
</style>
