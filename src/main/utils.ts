import si from 'systeminformation';
import fs from 'fs'
import path from "node:path";
import {IpcMainInvokeEvent} from 'electron';

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
        name: process.platform === 'win32' ? item.mount + '\\' : item.mount,
        type: 0,
        fullPath: process.platform === 'win32' ? item.mount + '\\' : item.mount
      }
    });
    return {
      code: 0,
      data: data,
      message: '获取磁盘信息成功'
    }
  } catch (error) {
    return {
      code: 500,
      data: [],
      message: error
    };
  }
}


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
    return {
      code: 0,
      data: files,
      message: '获取目录内容成功'
    }
  } catch (error) {
    return {
      code: 500,
      data: [],
      message: error
    };
  }
}


// const getDrives = (): string[] => {
//   if (process.platform === 'win32') {
//     // Windows: 通过 `wmic` 获取所有磁盘
//     try {
//       const output = execSync('wmic logicaldisk get caption', { encoding: 'utf-8' });
//       return output
//         .split('\n') // 按行拆分
//         .map(line => line.trim()) // 去掉空格
//         .filter(line => /^[A-Z]:$/.test(line)) // 只保留 "C:" 这种格式
//         .map(drive => path.parse(drive).root); // 直接获取 `C:\`
//     } catch (error) {
//       console.error('获取磁盘驱动器失败:', error);
//       return [];
//     }
//   } else {
//     // Linux/macOS: 获取挂载点
//     const mountDirs = ['/mnt', '/Volumes'];
//     return mountDirs.flatMap(dir =>
//       fs.existsSync(dir) ? fs.readdirSync(dir).map(sub => path.join(dir, sub)) : []
//     );
//   }
// };
