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
  const themeColor = ref(localStorage.getItem("themeColor") || "#000000");
  // 颜色选择器颜色
  const pickerColor = ref("");
  // 主题色数据
  const themeColorList = ["#000000", "#7EB6E6", "#91C499", "#E8A87C", "#F4B6C2", "#123456", "#121212", "#3A6B91", "#496B50", "#8C5A3E", "#865564"];

  // 当前导航菜单模式(是否折叠菜单,默认折叠)
  const themeMenuMode = ref(true);

  // 切换主题模式
  const toggleThemeMode = () => {
    const html = document.documentElement;

    // 跟随系统主题
    if (themeMode.value === "device") {
      // 获取当前是否是深色模式
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.className = isDarkMode ? "dark" : "light";
      return;
    }
    // 手动设置主题
    html.className = themeMode.value;

  };

  // 切换主题颜色
  const toggleThemeColor = (color: string) => {
    if (themeColorList.includes(color)) pickerColor.value = "";
    themeColor.value = color;
    document.documentElement.style.setProperty("--theme-common-color", color);

  };


  // 监听主题模式变化,动态更新本地存储
  watchEffect(() => {
    localStorage.setItem("themeMode", themeMode.value);
    toggleThemeMode();
  });
  // 监听主题颜色变化,动态更新本地存储
  watchEffect(() => {
    localStorage.setItem("themeColor", themeColor.value);
    toggleThemeColor(themeColor.value);
    if (!themeColorList.includes(themeColor.value)) pickerColor.value = themeColor.value;
  });

  // 当系统主题发生变化时，如果用户选择的是系统主题，则切换主题模式，跟系统主题保持一致
  onMounted(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", toggleThemeMode);
  });
  onUnmounted(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.removeEventListener("change", toggleThemeMode);
  });

  return {
    appHeight,
    tableHeight,
    themeSettingDrawer,
    themeMode,
    themeColorList,
    themeMenuMode,
    themeColor,
    pickerColor,
    toggleThemeMode,
    toggleThemeColor
  };
});
