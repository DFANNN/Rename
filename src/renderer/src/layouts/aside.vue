<template>
  <div class="aside-container" :class="{'collapse':collapse}">
    <div class="logo-box">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <!--   TODO:展示不要折叠功能  -->
      <!--      <div class="logo-title-box" v-if="!collapse">-->
      <!--        <div class="name">DFAN</div>-->
      <!--        <div class="name">Rename</div>-->
      <!--      </div>-->
    </div>
    <div class="menu-box">
      <el-menu
        :default-active="defaultActive"
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
    <!--   TODO:展示不要折叠功能  -->
    <!--    <div class="function-box">-->
    <!--      <el-icon class="expand-box">-->
    <!--        <Expand @click="collapse = !collapse"/>-->
    <!--      </el-icon>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import {
  Tools,
  Management,
  Platform,
  Expand
} from "@element-plus/icons-vue";
import {RouteRecordRaw} from "vue-router";


const router = useRouter();
const route = useRoute();

// 折叠
const collapse = ref(true);

// 菜单
const menus = ref<RouteRecordRaw[]>([]);

// 菜单icon
const menuIcons = {
  Tools,
  Management,
  Platform
};

// 页面加载时默认激活菜单的 index
const defaultActive = computed(() => route.path);


// 获取菜单
const getMenus = () => {
  console.log(router.getRoutes());
  menus.value = router.getRoutes().filter((item) => item.meta.isMenu);
  console.log(menus.value);
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
  border-right: 1px solid #E5E7EB;

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
    height: calc(100vh - 85px - 30px);
  }

  .function-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 18px;
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

</style>
