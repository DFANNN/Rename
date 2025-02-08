<template>
  <div class="file-select-container">
    <div class="title">文件选择</div>
    <div class="file-select-box">
      <el-input v-model="input" placeholder="请选择文件夹路径" />
      <CommonButton class="button" @click="dialogVisible = true">浏览文件夹</CommonButton>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      :draggable="true"
      width="70%"
    >
      <template #header>
        <div class="dialog-header">
          <div>选择文件路径</div>
          <el-icon class="close-icon">
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
              <el-icon class="current-path-home-icon">
                <FolderIcon />
              </el-icon>
            </el-tooltip>

            <div>
              当前路径：
            </div>
            <div>
              <span class="path-name">本地磁盘c</span>
              <span class="separator">/</span>
            </div>
            <div>
              <span class="path-name">Users</span>
              <span class="separator">/</span>
            </div>
            <div>
              <span class="path-name">Document</span>
              <span class="separator">/</span>
            </div>
          </div>
        </div>
        <div class="disk-path-box">
          <div class="disk-box" v-for="disk in diskList">
            <el-icon class="disk-icon">
              <DiskIcon />
            </el-icon>
            <div>{{ disk }}</div>
          </div>
          <div class="disk-box">
            <el-icon class="disk-icon">
              <FolderOpened />
            </el-icon>
            <div>文件夹</div>
          </div>
          <div class="disk-box">
            <el-icon class="disk-icon">
              <Document />
            </el-icon>
            <div>xxxx.html</div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <CommonButton @click="dialogVisible = false">取消</CommonButton>
          <CommonButton @click="dialogVisible = false">确定</CommonButton>
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

const publicStore = usePublicStore();

const input = ref("");
const dialogVisible = ref(false);

const diskList = ref(["本地磁盘C", "本地磁盘D", "本地磁盘E"]);
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

        .path-name {
          cursor: pointer;

          &:hover {
            color: var(--theme-common-color);
            text-decoration: underline;
          }
        }

        .separator {
          margin: 0 0.5rem;
        }
      }
    }

    .disk-path-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 2rem; /* 行间距（可选） */
      grid-auto-rows: min-content; /* 自动调整行高 */
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: var(--text-color);
      border: 1px solid var(--border-color);
      height: 300px;
      overflow-y: auto;

      .disk-box {
        display: flex;
        align-items: center;

        .disk-icon {
          margin-right: 0.5rem;
          font-size: 1rem;
          color: var(--menu-no-select-text-color);
        }
      }


    }
  }

  .dialog-footer {
    padding: 0.5rem 1.5rem;
    border-top: 1px solid var(--border-color);
  }
}

:deep(.el-dialog) {
  padding: 0;
  background-color: var(--background-color);
}
</style>
