import {defineStore} from "pinia";

interface IDiskOrFilesListItem {
  name: string
  // 0:磁盘；1:文件夹；2:文件
  type: number
  // 当前文件完整路径
  fullPath: string
}

export const useDiskStore = defineStore('disk', () => {
  // 磁盘/文件夹/文件列表
  const diskOrFilesList = ref<IDiskOrFilesListItem[]>([])

  // 当前完整路径
  const currentFullPath = ref('')

  return {
    diskOrFilesList,
    currentFullPath
  }
})
