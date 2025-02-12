<template>
  <div class="file-select-container">
    <div class="title">文件选择</div>
    <div class="file-select-box">
      <el-input v-model="diskStore.currentSelectDirPath.fullPath" clearable placeholder="请选择或输入文件夹路径" />
      <CommonButton class="button" @click="showDialog">浏览文件夹</CommonButton>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :align-center="true"
      :draggable="true"
    >
      <template #header>
        <div class="dialog-header">
          <div>选择文件路径</div>
          <el-icon class="close-icon" @click="cancel">
            <Close />
          </el-icon>
        </div>

      </template>
      <div class="dialog-body">
        <div class="current-path-box">
          <div class="current-path">
            <el-tooltip
              :effect="publicStore.themeMode"
              content="返回根目录"
              placement="top-start"
              :show-after="200"
            >
              <el-icon class="current-path-home-icon" @click="returnRootDir">
                <FolderIcon />
              </el-icon>
            </el-tooltip>
            <div>
              当前路径：
            </div>
            <div class="path-box" v-for="(disk,index) in diskStore.currentFullPath" @click="goToPath(disk,index)">
              <span class="path-name">{{ disk.name }}</span>
              <span class="separator" v-if="(diskStore.currentFullPath.length - 1) !== index">
                {{ diskStore.systemType === "Windows" ? "\\" : index ? "/" : "" }}
              </span>
            </div>

          </div>
        </div>
        <div class="disk-path-box">
          <div class="disk-box" v-for="disk in diskStore.diskOrFilesList" @click="getDirList(disk)">
            <el-icon class="disk-icon">
              <DiskIcon v-if="disk.type === 0" />
              <FolderOpened v-if="disk.type === 1" />
              <Document v-if="disk.type === 2" />
            </el-icon>
            <div class="disk-name">{{ disk.name }}</div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <CommonButton @click="cancel">取消</CommonButton>
          <CommonButton @click="confirm">确定</CommonButton>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import CommonButton from "@renderer/components/CommonButton.vue";
import FolderIcon from "@renderer/components/icon/FolderIcon.vue";
import DiskIcon from "@renderer/components/icon/DiskIcon.vue";
import { Close, Document, FolderOpened } from "@element-plus/icons-vue";
import type { IDiskOrFilesListItem } from "@renderer/stores/diskType";

const publicStore = usePublicStore();
const diskStore = useDiskStore();

// 开关
const dialogVisible = ref(false);

// 打开文件选择对话框
const showDialog = () => {
  dialogVisible.value = true;
  getDiskList();
};

// 获取磁盘列表
const getDiskList = async () => {
  const res = await window.electron.ipcRenderer.invoke("diskList");
  if (res.code === 0) {
    diskStore.diskOrFilesList = res.data;
  } else {
    console.log("获取磁盘列表失败", res);
  }
};

// 返回根目录
const returnRootDir = () => {
  diskStore.currentFullPath = [];
  diskStore.diskOrFilesList = [];
  getDiskList();
};

// TODO:问题：点击磁盘列表中的文件夹，会自动跳转到该文件夹，但是当有滚动条时，跳转到下一个文件夹滚动条是不会回到最顶端
/**
 * 获取目录列表
 * @param disk 当前点击的目录
 * @param isPush 是否将当前目录添加到currentFullPath中
 */
const getDirList = async (disk: IDiskOrFilesListItem, isPush: boolean = true) => {
  // 如果当前是文件，则不进行操作
  if (disk.type === 2) return;
  if (isPush) diskStore.currentFullPath.push(disk);
  const res = await window.electron.ipcRenderer.invoke("dirList", disk.fullPath);
  if (res.code === 0) {
    diskStore.diskOrFilesList = res.data;
  } else {
    console.log("获取目录列表失败", res);
  }
};

// 页面header展示的当前路径的 跳转方法
const goToPath = (disk: IDiskOrFilesListItem, index: number) => {
  // 删除 currentFullPath 点击目录的 后面的元素
  diskStore.currentFullPath = diskStore.currentFullPath.slice(0, index + 1);
  getDirList(disk, false);
};

// 确定
const confirm = async () => {
  diskStore.currentSelectDirPath = diskStore.currentFullPath[diskStore.currentFullPath.length - 1];
  const res = await window.electron.ipcRenderer.invoke("dirList", diskStore.currentSelectDirPath.fullPath);
  if (res.code === 0) {
    diskStore.TVSeriesList = res.data;
    console.log("获取电视剧集成功", diskStore.TVSeriesList);
  } else {
    console.log("获取电视剧集失败", res);
  }
  cancel();
};
// 取消
const cancel = () => {
  dialogVisible.value = false;
  diskStore.currentFullPath = [];
  diskStore.diskOrFilesList = [];
};


</script>

<style scoped lang="less">
.file-select-container {
  .title {
    line-height: 1.5rem;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  .file-select-box {
    border: 2px dashed var(--border-color);
    border-radius: 8px;
    padding: 2rem 1.5rem;

    .button {
      width: 100%;
      margin-top: 1rem;
    }
  }


  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    font-size: 16px;
    color: var(--text-color);

    .close-icon {
      cursor: pointer;

      &:hover {
        color: var(--theme-common-color);
        filter: brightness(1.2);
      }
    }
  }

  .dialog-body {
    padding: 0 1.5rem 1rem;

    .current-path-box {
      display: flex;
      color: var(--text-color);
      font-size: 14px;
      margin-bottom: 1rem;

      .current-path {
        display: flex;
        align-items: center;

        .current-path-home-icon {
          font-size: 16px;
          margin-right: 0.25rem;
          color: var(--theme-common-color);
          cursor: pointer;

          &:hover {
            filter: brightness(1.2); /* 提高亮度，使颜色变浅 */
          }
        }

        .path-box {
          display: flex;
          align-items: center;

          .path-name {
            cursor: pointer;
            max-width: 10rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;


            &:hover {
              color: var(--theme-common-color);
              text-decoration: underline;
            }
          }

          .separator {
            margin: 0 0.25rem;
          }
        }


      }
    }

    .disk-path-box {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 0 1rem;
      grid-auto-rows: min-content; /* 自动调整行高 */
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: var(--text-color);
      border: 1px solid var(--border-color);
      height: 40vh;
      overflow-y: auto;
      cursor: pointer;

      .disk-box {
        display: flex;
        align-items: center;
        padding: 0.75rem 0.5rem;
        border-radius: 0.25rem;

        .disk-icon {
          margin-right: 0.5rem;
          font-size: 1rem;
          color: var(--menu-no-select-text-color);
        }

        .disk-name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }

        &:hover {
          background-color: var(--table-tr-hover-color);
        }
      }
    }
  }

  .dialog-footer {
    padding: 0.75rem 1.5rem;
    border-top: 1px solid var(--border-color);
  }
}

:deep(.el-dialog) {
  padding: 0;
  background-color: var(--background-color);
}

@media (max-width: 1350px) {
  :deep(.el-dialog) {
    width: 70vw;
  }
}

@media (min-width: 1351px) {
  :deep(.el-dialog) {
    width: 50vw;
  }
}

</style>
