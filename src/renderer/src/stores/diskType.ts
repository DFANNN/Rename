// disk厂库的类型文件

// 磁盘/文件夹/文件列表
export interface IDiskOrFilesListItem {
  name: string;
  // 0:磁盘；1:文件夹；2:文件
  type: number;
  // 当前文件完整路径
  fullPath: string;
}

// 用户选择文件夹下的电视剧文件
export interface ITVSeriesListItem extends IDiskOrFilesListItem {
  // 新的剧集名字
  newName: string,
  // 新的剧集完整路径
  newFullPath: string,
  // 0:修改失败；1:修改成功
  status?: number
}

// 电视剧模式表单
export interface ITVSeriesModeForm {
  // 电视剧名字
  name: string,
  // 季数
  season: number,
  // 开始集数
  startEpisode: number
}

// 替换文本模式表单
export interface IReplaceTextModeForm {
  // 原始文本
  oldText: string,
  // 替换文本
  newText: string
}

// 插入文本模式表单
export interface IInsertTextModeForm {
  // 插入文本
  insertText: string,
  // 插入位置
  insertPosition: number | undefined
}

