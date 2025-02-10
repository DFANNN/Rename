import { defineStore } from "pinia";
import { IDiskOrFilesListItem } from "@renderer/stores/diskType";


export const useDiskStore = defineStore("disk", () => {
  // 当前系统类型
  const systemType = ref<string>("");

  // 磁盘/文件夹/文件列表
  const diskOrFilesList = ref<IDiskOrFilesListItem[]>([]);

  // 当前点击的所有文件
  const currentFullPath = ref<IDiskOrFilesListItem[]>([]);

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

  return {
    systemType,
    diskOrFilesList,
    currentFullPath
  };
});
