import {defineStore} from "pinia";
import {ElMessage} from "element-plus";
import router from "@renderer/routers";
import type {
  IDiskOrFilesListItem,
  ITVSeriesListItem,
  ITVSeriesModeForm,
  IReplaceTextModeForm,
  IInsertTextModeForm
} from "@renderer/stores/diskType";


export const useDiskStore = defineStore("disk", () => {
  // 当前系统类型
  const systemType = ref<string>("");

  // 磁盘/文件夹/文件列表
  const diskOrFilesList = ref<IDiskOrFilesListItem[]>([]);

  // 当前路径对象(存储当前路径位置)
  const currentFullPath = ref<IDiskOrFilesListItem[]>([]);

  // 当前用户选择的文件夹路径
  const currentSelectDirPath = ref<IDiskOrFilesListItem>({} as IDiskOrFilesListItem);

  // 当前用户选择的文件夹下的电视剧文件
  const TVSeriesList = ref<ITVSeriesListItem[]>([]);

  // 已选择文件数量
  const selectedFilesNum = computed(() => {
    return TVSeriesList.value.length;
  });
  // 修改成功的数量
  const successNum = computed(() => {
    return TVSeriesList.value.filter(item => item.status === 1).length;
  });
  // 修改失败的数量
  const failNum = computed(() => {
    return TVSeriesList.value.filter((item) => item.status === 0).length;
  });

  // 删除文件
  const deleteFiles = (name: string) => {
    TVSeriesList.value = TVSeriesList.value.filter(item => item.name !== name);
  };

  // 重置数据
  const resetData = () => {
    diskOrFilesList.value = [];
    currentFullPath.value = [];
    currentSelectDirPath.value = {} as IDiskOrFilesListItem;
    TVSeriesList.value = [];
    TVSeriesModeForm.value = {
      name: "",
      season: 1,
      startEpisode: 1
    };
    replaceTextModeForm.value = {
      oldText: "",
      newText: ""
    };
    insertTextModeForm.value = {
      insertPosition: undefined,
      insertText: ""
    };
  };

  // 重命名
  const renameHandler = async () => {
    // 是否可以继续执行
    let canProceed = true;

    if (router.currentRoute.value.name === "tvSeriesMode") {
      canProceed = await TVSeriesModePreviewHandler();
    } else if (router.currentRoute.value.name === "replaceTextMode") {
      canProceed = await replaceTextModePreviewHandler();
    } else if (router.currentRoute.value.name === "insertTextMode") {
      canProceed = await insertTextModePreviewHandler();
    }

    if (!canProceed) return;// 预览失败或条件不满足时，终止执行

    const files = JSON.parse(JSON.stringify(TVSeriesList.value));
    const res = await window.electron.ipcRenderer.invoke("renameFiles", files);
    if (res.code === 0) {
      TVSeriesList.value = res.data;
      ElMessage("修改成功");
    } else {
      console.log("重命名失败", res);
    }
  };

  // 获取当前系统类型
  const getSystemType = async () => {
    // 获取当前系统类型
    const res = await window.electron.ipcRenderer.invoke("systemType");
    if (res.code === 0) {
      systemType.value = res.data;
    }
  };

  onMounted(() => {
    void getSystemType();
  });

  // --------------电视剧模式------------------
  // 电视剧模式的表单
  const TVSeriesModeForm = ref<ITVSeriesModeForm>({
    name: "",
    season: 1,
    startEpisode: 1
  });

  // 电视剧模式预览
  const TVSeriesModePreviewHandler = async () => {
    if (!currentSelectDirPath.value.fullPath) {
      ElMessage("请选择或输入文件夹路径");
      return false;
    }
    if (!TVSeriesModeForm.value.name) {
      ElMessage("请输入电视剧名字");
      return false;
    }
    if (!TVSeriesList.value.length) {
      ElMessage("当前路径下没有文件");
      return false;
    }

    const config = JSON.parse(JSON.stringify(TVSeriesModeForm.value));
    const files = JSON.parse(JSON.stringify(TVSeriesList.value));
    const res = await window.electron.ipcRenderer.invoke("TVSeriesModePreview", config, files);
    if (res.code === 0) {
      TVSeriesList.value = res.data;
      return true;
    } else {
      console.log("预览失败", res);
      return true;
    }
  };

  // --------------替换文本模式------------------
  // 替换文本模式的表单
  const replaceTextModeForm = ref<IReplaceTextModeForm>({
    oldText: "",
    newText: ""
  });

  // 替换文本模式预览
  const replaceTextModePreviewHandler = async () => {
    if (!currentSelectDirPath.value.fullPath) {
      ElMessage("请选择或输入文件夹路径");
      return false;
    }
    const config = JSON.parse(JSON.stringify(replaceTextModeForm.value));
    const files = JSON.parse(JSON.stringify(TVSeriesList.value));
    const res = await window.electron.ipcRenderer.invoke("replaceTextModePreview", config, files);
    if (res.code === 0) {
      TVSeriesList.value = res.data;
      return true;
    } else {
      console.log("预览失败", res);
      return true;
    }
  };

  // --------------插入文本模式------------------
  // 插入文本模式的表单
  const insertTextModeForm = ref<IInsertTextModeForm>({
    insertPosition: undefined,
    insertText: ""
  });

  // 插入文本模式预览
  const insertTextModePreviewHandler = async () => {
    if (!currentSelectDirPath.value.fullPath) {
      ElMessage("请选择或输入文件夹路径");
      return false;
    }
    if (insertTextModeForm.value.insertPosition === undefined) {
      ElMessage("请选择插入位置");
      return false;
    }
    if (!insertTextModeForm.value.insertText) {
      ElMessage("请输入插入文本");
      return false;
    }
    if (!TVSeriesList.value.length) {
      ElMessage("当前路径下没有文件");
      return false;
    }
    const config = JSON.parse(JSON.stringify(insertTextModeForm.value));
    const files = JSON.parse(JSON.stringify(TVSeriesList.value));
    const res = await window.electron.ipcRenderer.invoke("insertTextModePreview", config, files);
    if (res.code === 0) {
      TVSeriesList.value = res.data;
      return true;
    } else {
      console.log("预览失败", res);
      return true;
    }
  };

  return {
    systemType,
    diskOrFilesList,
    currentFullPath,
    currentSelectDirPath,
    TVSeriesList,
    TVSeriesModeForm,
    replaceTextModeForm,
    insertTextModeForm,
    selectedFilesNum,
    successNum,
    failNum,
    deleteFiles,
    TVSeriesModePreviewHandler,
    replaceTextModePreviewHandler,
    insertTextModePreviewHandler,
    renameHandler,
    resetData
  };
});
