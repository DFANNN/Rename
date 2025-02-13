<template xmlns="">
  <div class="tv-series-mode-container">
    <div class="left-box">
      <UploadFile />
      <div class="title">替换规则</div>
      <el-form
        :model="diskStore.insertTextModeForm"
        label-position="top"
      >
        <el-form-item label="插入规则" prop="insertPosition">
          <el-select v-model="diskStore.insertTextModeForm.insertPosition" placeholder="请选择插入规则">
            <el-option label="插入到开头" :value="0" />
            <el-option label="插入到结尾" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="插入文本" prop="insertText">
          <el-input v-model.trim="diskStore.insertTextModeForm.insertText" clearable autocomplete="off"
                    placeholder="请输入插入文本" />
        </el-form-item>
        <el-form-item>
          <CommonButton style="width: 100%" @click="diskStore.insertTextModePreviewHandler">预览修改结果
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

const diskStore = useDiskStore();

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

  :deep(.el-select__wrapper) {
    background-color: var(--background-color);
    box-shadow: 0 0 0 1px var(--upload-border-color)
  }

 
}


</style>
