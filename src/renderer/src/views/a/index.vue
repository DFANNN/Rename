<template xmlns="">
  <div class="a-container">
    <div class="left-box">
      <div class="title1">文件选择</div>
      <UploadFile />
      <div class="title2">替换规则</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        label-position="top"
        class="demo-ruleForm"
      >
        <el-form-item label="查找文本" prop="pass">
          <el-input v-model="ruleForm.pass" autocomplete="off" />
        </el-form-item>
        <div class="line-box">
          <el-form-item label="起始集" prop="pass" class="line-item">
            <el-input-number v-model="ruleForm.checkPass" class="number-input" />
          </el-form-item>
          <el-form-item label="当前季" prop="pass" class="line-item">
            <el-input-number v-model="ruleForm.checkPass" class="number-input" />
          </el-form-item>
        </div>

        <el-form-item>
          <CommonButton style="width: 100%">预览修改结果</CommonButton>
        </el-form-item>
      </el-form>
    </div>
    <ResultPreview class="result-preview" />
  </div>
</template>

<script setup lang="ts">
import ResultPreview from "@renderer/components/ResultPreview.vue";
import UploadFile from "@renderer/components/UploadFile.vue";
import type { FormInstance } from "element-plus";

const ruleFormRef = ref<FormInstance>();


const ruleForm = ref({
  pass: "",
  checkPass: 1,
  age: 1
});

</script>

<style scoped lang="less">
.a-container {
  display: flex;
  height: 100%;
  width: 100%;

  .left-box {
    padding: 1.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    width: 38%;
    height: 100%;
    margin-right: 2%;
    min-width: 350px;
    background: #fff;

    .title1 {
      line-height: 1.5rem;
      color: #000;
      margin-bottom: 1rem;
    }

    .title2 {
      font-size: 14px;
      line-height: 1.25rem;
      color: #000;
      margin: 1rem 0;
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
}
</style>
