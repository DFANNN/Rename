import { defineStore } from "pinia";

export const usePublicStore = defineStore("public", () => {
  // app dom 高度
  const appHeight = ref(0);

  // 修改结果预览表格的高度 用于滚动条触发高度
  const tableHeight = computed(() => {
    return appHeight.value - 84 - 60 - 40 - 48 - 16 - 30;
  });

  // --------------ThemeSetting 相关参数-----------------

  // ThemeSetting drawer开关
  const themeSettingDrawer = ref(false);

  // 当前的主题模式
  const themeMode = ref(localStorage.getItem("themeMode") || "light");
  // 当前主题色
  const themeColor = ref(localStorage.getItem("themeColor") || "#000");
  // 主题色数据
  const themeColorList = ["#000", "#3B82F6", "#22C55E", "#EF4444", "#EAB308", "#A855F7", "#EC4899"];

  // 当前导航菜单模式(是否折叠菜单,默认折叠)
  const themeMenuMode = ref(true);

  // 切换主题模式
  const toggleThemeMode = () => {
    const html = document.documentElement;
    html.className = themeMode.value;
  };

  // 切换主题颜色
  const toggleThemeColor = (color: string) => {
    themeColor.value = color;
    document.documentElement.style.setProperty("--button-background-color", themeColor.value);

  };


  // 监听主题模式变化,动态更新本地存储
  watchEffect(() => {
    localStorage.setItem("themeMode", themeMode.value);
    toggleThemeMode();
  });

  return {
    appHeight,
    tableHeight,
    themeSettingDrawer,
    themeMode,
    themeColorList,
    themeMenuMode,
    toggleThemeMode,
    toggleThemeColor
  };
});
