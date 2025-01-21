<template>
  <el-upload
    class="upload-demo"
    drag
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
  >
    <el-icon class="el-icon--upload">
      <upload-filled/>
    </el-icon>
    <div class="el-upload__text">
      <div class="info">拖拽文件到此处，或点击选择文件</div>
      <CommonButton>选择文件</CommonButton>
    </div>

  </el-upload>
</template>

<script setup lang="ts">
import {UploadFilled} from '@element-plus/icons-vue'
import CommonButton from "@renderer/components/CommonButton.vue";
</script>

<style scoped lang="less">
:deep(.el-upload-dragger) {
  padding: 2rem 0;
}


.el-icon--upload {
  font-size: 36px;
  margin-bottom: 0;
}

.el-upload__text {
  .info {
    margin: 0.5rem 0;
  }
}
</style>
