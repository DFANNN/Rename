<template xmlns="">
  <div class="a-container">
    <div class="left-box">
      <div class="title1">文件选择</div>
      <UploadFile/>
      <div class="title2">替换规则</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        label-position="top"
        class="demo-ruleForm"
      >
        <el-form-item label="查找文本" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="替换为" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <CommonButton style="width: 100%">预览修改结果</CommonButton>
        </el-form-item>
      </el-form>
    </div>
    <ResultPreview/>
  </div>
</template>

<script setup lang="ts">
import ResultPreview from "@renderer/components/ResultPreview.vue";
import UploadFile from '@renderer/components/UploadFile.vue'
import type {FormInstance} from 'element-plus'

const ruleFormRef = ref<FormInstance>()


const ruleForm = ref({
  pass: '',
  checkPass: '',
  age: '',
})

</script>

<style scoped lang="less">
.a-container {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  .left-box {
    padding: 1.5rem;
    width: 100%;
    height: 100%;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;

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
  }
}
</style>
