// disk厂库的类型文件

// 磁盘/文件夹/文件列表
export interface IDiskOrFilesListItem {
  name: string
  // 0:磁盘；1:文件夹；2:文件
  type: number
  // 当前文件完整路径
  fullPath: string
}
