import { defineStore } from "pinia";

export const usePublicStore = defineStore("public", () => {
  // app dom 高度
  const appHeight = ref(0);

  // 修改结果预览表格的高度 用于滚动条触发高度
  const tableHeight = computed(() => {
    return appHeight.value - 84 - 60 - 40 - 48 - 16 - 30;
  });

  return {
    appHeight,
    tableHeight
  };
});
