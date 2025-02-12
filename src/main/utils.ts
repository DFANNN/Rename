import si from "systeminformation";
import fs from "fs";
import path from "node:path";
import { IpcMainInvokeEvent } from "electron";


/**
 * 系统类型
 * process.platform的值 ：
 * win32（适用于 Windows 所有版本）
 * darwin（适用于 macOS (苹果)）
 * linux（适用于所有 Linux 发行版）
 */
export const systemType = () => {
  try {
    // 获取系统类型
    const type = process.platform;
    const typeMap = {
      win32: "Windows",
      darwin: "macOS",
      linux: "Linux"
    };
    return {
      code: 0,
      data: typeMap[type],
      message: "获取系统类型成功"
    };
  } catch (error) {
    return {
      code: 500,
      data: null,
      message: error
    };
  }
};

/**
 * 获取磁盘信息
 * process.platform的值 ：
 * win32（适用于 Windows 所有版本）
 * darwin（适用于 macOS (苹果)）
 * linux（适用于所有 Linux 发行版）
 */
export const diskList = async () => {
  try {
    const disks = await si.fsSize();
    const data = disks.map((item: any) => {
      return {
        name: item.mount,
        type: 0,
        fullPath: process.platform === "win32" ? item.mount + "\\" : item.mount
      };
    });
    return {
      code: 0,
      data: data,
      message: "获取磁盘信息成功"
    };
  } catch (error) {
    return {
      code: 500,
      data: [],
      message: error
    };
  }
};


/**
 * 获取目录列表
 * 该函数接收一个事件对象和一个目录路径作为参数，然后尝试打开并读取该目录下的所有文件和子目录信息
 * 它使用Node.js的文件系统模块(fs)的异步API来处理文件操作，并利用path模块来处理文件路径
 *
 * @param _event 事件对象，未在本函数中使用，但可能在将来用于事件处理
 * @param dirPath 目录路径，指定需要读取的目录位置
 * @returns 返回一个Promise对象，包含目录读取结果或错误信息
 */
export const dirList = async (_event: IpcMainInvokeEvent, dirPath: string) => {
  try {
    // 打开目录
    const dir = await fs.promises.opendir(dirPath);
    // 初始化文件数组，用于存储目录中的文件和子目录信息
    const files: { name: string; type: number, fullPath: string }[] = [];
    // 遍历目录中的每一项
    for await (const dirent of dir) {
      // 将文件或目录的信息添加到数组中
      files.push({
        name: dirent.name,
        // 如果是目录，类型标记为1，否则为2
        type: dirent.isDirectory() ? 1 : 2,
        // 使用path模块拼接完整的文件或目录路径
        fullPath: path.join(dirPath, dirent.name)
      });
    }
    // 使用自然排序，以保证文件或目录按名称进行排序
    files.sort((a, b) =>
      new Intl.Collator("zh-CN", { numeric: true, sensitivity: "base" }).compare(a.name, b.name)
    );

    return {
      code: 0,
      data: files,
      message: "获取目录内容成功"
    };
  } catch (error) {
    return {
      code: 500,
      data: [],
      message: error
    };
  }
};


interface IConfig {
  // 电视剧名称
  name: string;
  // 当前电视剧是第几季
  season: number;
  // 当前集数
  startEpisode: number;
}

interface IFiles {
  // 旧的剧集名称
  name: string;
  // 0:磁盘；1:文件夹；2:文件
  type: number;
  // 当前文件完整路径
  fullPath: string;
  // 新的剧集名字
  newName: string,
  // 新的剧集完整路径
  newFullPath: string,
}

/**
 * 电视剧模式预览
 * @param _event 事件对象，未在本函数中使用，但可能在将来用于事件处理
 * @param config 配置对象，(name:电视剧名称，season:当前电视剧是第几季,startEpisode:当前集数,isExpanded 是否需要修改扩展名)
 * @param files 要修改名称的文件列表（完整路径数组）
 */
export const TVSeriesModePreview = (_event: IpcMainInvokeEvent, config: IConfig, files: IFiles[]) => {
  try {
    const { name, season, startEpisode } = config;
    const newFiles = files.map((file: IFiles, index) => {
      const dir = path.dirname(file.fullPath);
      const ext = path.extname(file.fullPath); // 原始扩展名
      const episodeNumber = startEpisode + index; // 计算当前集数
      const newFileName = `${name} S${String(season).padStart(2, "0")}E${String(episodeNumber).padStart(2, "0")}${ext}`; // 新的文件名
      const newFilePath = path.join(dir, newFileName);
      return {
        ...file,
        // 新的剧集名字
        newName: newFileName,
        // 新的剧集完整路径
        newFullPath: newFilePath
      };
    });
    return { code: 0, data: newFiles, message: "重命名成功" };
  } catch (error) {
    return { code: 500, data: [], message: "重命名失败" };
  }
};

/**
 * 替换文本模式预览
 * @param _event 事件对象，未在本函数中使用，但可能在将来用于事件处理
 * @param config 配置对象，(oldText:旧文件名，newText:新文件名)
 * @param files 要修改名称的文件列表（完整路径数组）
 */
export const replaceTextModePreview = (_event: IpcMainInvokeEvent, config: {
  oldText: string,
  newText: string
}, files: IFiles[]) => {
  try {
    const { oldText, newText } = config;
    const newFiles = files.map((file: IFiles) => {
      if (file.name.includes(oldText)) {
        const dir = path.dirname(file.fullPath);
        const newFileName = file.name.replace(oldText, newText);
        const newFilePath = path.join(dir, newFileName);
        return {
          ...file,
          // 新的剧集名字
          newName: newFileName,
          // 新的剧集完整路径
          newFullPath: newFilePath
        };
      } else {
        return file;
      }
    });
    return { code: 0, data: newFiles, message: "重命名成功" };
  } catch (error) {
    return { code: 500, data: [], message: "重命名失败" };
  }


};


/**
 * 重命名文件
 */
export const renameFiles = async (_event: IpcMainInvokeEvent, files: IFiles[]) => {
  const results = await Promise.all(
    files.map(async (file: IFiles) => {
      try {
        // 执行文件重命名
        await fs.promises.rename(file.fullPath, file.newFullPath);
        // 返回成功结果
        return {
          name: file.newName,
          fullPath: file.newFullPath,
          newName: "",
          newFullPath: "",
          status: 1
        };
      } catch (error: any) {
        return {
          ...file,
          status: 0
        };
      }
    })
  );
  return {
    code: 0,
    data: results,
    message: "批量重命名操作完成"
  };
};

