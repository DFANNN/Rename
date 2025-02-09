import {defineStore} from "pinia";
import {IDiskOrFilesListItem} from '@renderer/stores/diskType'


export const useDiskStore = defineStore('disk', () => {
  // 磁盘/文件夹/文件列表
  const diskOrFilesList = ref<IDiskOrFilesListItem[]>([])

  // 当前点击的所有文件
  const currentFullPath = ref<IDiskOrFilesListItem[]>([])

  return {
    diskOrFilesList,
    currentFullPath
  }
})
