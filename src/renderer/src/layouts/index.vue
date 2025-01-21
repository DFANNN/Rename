<template>
  <div ref="commonLayoutRef">
    <el-container class="common-layout">
      <AsideComponent/>
      <el-container class="common-container">
        <el-header class="header" height="85px">
          <HeaderComponent/>
        </el-header>
        <el-main class="main">
          <router-view/>
        </el-main>
        <el-footer class="footer">
          <FooterComponent/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AsideComponent from "@renderer/layouts/aside.vue";
import HeaderComponent from "@renderer/layouts/header.vue";
import FooterComponent from "@renderer/layouts/footer.vue";

const commonLayoutRef = ref<HTMLElement | null>();

const publicStore = usePublicStore();

// 防抖函数
const debounce = (func: Function, delay: number) => {
  let timer: any = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func()
    }, delay);
  };
};


// 动态更新表格高度
const updateTableHeight = () => {
  if (commonLayoutRef.value) {
    publicStore.appHeight = commonLayoutRef.value.offsetHeight; // 获取容器的当前高度
  }
};

const debounceUpdateTableHeight = debounce(updateTableHeight, 200);


// 监听窗口变换
window.addEventListener("resize", debounceUpdateTableHeight);


onMounted(() => {
  // 获取app的高度
  if (commonLayoutRef.value) {
    publicStore.appHeight = commonLayoutRef.value?.offsetHeight;
  }
});

// 在组件卸载前移除监听器
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateTableHeight);
});

</script>

<style scoped lang="less">
.common-layout {
  height: 100vh;

  .common-container {
    .header {
      border-bottom: 1px solid #E5E7EB;
    }

    .main {
      //background-color: #ccc;

    }

    .footer {
      border-top: 1px solid #E5E7EB;
      //background-color: brown;
    }
  }
}


</style>
