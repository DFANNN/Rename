<template xmlns="">
  <div class="tv-series-mode-container">
    <div class="left-box">
      <UploadFile />
      <div class="title">替换规则</div>
      <el-form
        ref="ruleFormRef"
        :model="diskStore.TVSeriesModeForm"
        label-position="top"
      >
        <el-form-item prop="name">
          <template #label>
            <div class="name-label-box" @click.stop>
              <div class="label-text">电视剧名称22</div>
              <TMDBSearch />
            </div>
          </template>
          <el-input v-model.trim="diskStore.TVSeriesModeForm.name" clearable autocomplete="off"
                    placeholder="请输入电视剧名称" for="kkjjhhnn" />
        </el-form-item>
        <div class="line-box">
          <el-form-item label="当前季" prop="season" class="line-item">
            <el-input-number v-model="diskStore.TVSeriesModeForm.season" class="number-input" />
          </el-form-item>
          <el-form-item label="起始集" prop="startEpisode" class="line-item">
            <el-input-number v-model="diskStore.TVSeriesModeForm.startEpisode" class="number-input" />
          </el-form-item>
        </div>
        <el-form-item>
          <CommonButton style="width: 100%" @click="diskStore.TVSeriesModePreviewHandler">预览修改结果
          </CommonButton>
        </el-form-item>
      </el-form>
    </div>
    <ResultPreview class="result-preview" />
  </div>
</template>

<script setup lang="ts">
import ResultPreview from "@renderer/components/ResultPreview.vue";
import UploadFile from "@renderer/components/FileSelect.vue";
import TMDBSearch from "@renderer/components/TMDBSearch.vue";
import type { FormInstance } from "element-plus";

const diskStore = useDiskStore();
const ruleFormRef = ref<FormInstance>();

</script>

<style scoped lang="less">
.tv-series-mode-container {
  display: flex;
  height: 100%;
  width: 100%;

  .left-box {
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    width: 38%;
    height: 100%;
    margin-right: 2%;
    min-width: 350px;
    background: var(--background-color);

    .title {
      line-height: 1.5rem;
      color: var(--text-color);
      margin: 1rem 0;
    }

    .name-label-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }


    .line-box {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .line-item {
        flex: 1;
        margin-left: 1rem;

        .number-input {
          width: 100%;
        }

        &:first-child {
          margin-left: 0;
        }
      }
    }

    .el-form-item {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .result-preview {
    width: 60%;
  }

  :deep(.el-form-item__label) {
    color: var(--text-info-color);
    width: 100%;
  }

  :deep(.el-input__wrapper) {
    background-color: var(--background-color);
    --el-input-border-color: var(--upload-border-color);
  }

  :deep(.el-input-number__decrease) {
    background-color: var(--background-color);
    border-color: var(--upload-border-color);
  }

  :deep(.el-input-number__increase) {
    background-color: var(--background-color);
    border-color: var(--upload-border-color);
  }

  .el-input {
    --el-input-focus-border-color: var(--theme-common-color);
  }

  :deep(.el-input__inner) {
    color: var(--text-color);
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--theme-common-color) inset;
  }

  :deep(.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--theme-common-color) inset;
  }

  :deep(.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--theme-common-color) inset;
  }

  :deep(.el-input-number__increase:hover, .el-input-number__increase:hover) {
    color: var(--theme-common-color);
  }

  :deep(.el-input-number__decrease:hover, .el-input-number__increase:hover) {
    color: var(--theme-common-color);
  }


  //:deep(.el-form-item__label) {
  //  pointer-events: none;
  //}
}


</style>
