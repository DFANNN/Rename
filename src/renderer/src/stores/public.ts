import {defineStore} from "pinia";

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
  const pickerColor = ref('')
  // 主题色数据
  const themeColorList = ["#000000", "#3a1725", "#7b3650", "#a02e4e", "#c04e5e"];

  // 当前导航菜单模式(是否折叠菜单,默认折叠)
  const themeMenuMode = ref(true);

  // 切换主题模式
  const toggleThemeMode = () => {
    const html = document.documentElement;
    html.className = themeMode.value;
  };

  // 切换主题颜色
  const toggleThemeColor = (color: string) => {
    if (themeColorList.includes(color)) pickerColor.value = ''
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
    toggleThemeColor(themeColor.value)
    if (!themeColorList.includes(themeColor.value)) pickerColor.value = themeColor.value
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
