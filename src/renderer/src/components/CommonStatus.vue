<template>
  <span class="tag-box"
        :class="{'success-status': status === 'success', 'failure-status': status !== 'success'}">
    <el-icon class="icon">
      <SuccessFilled v-if="status === 'success'"/>
      <CircleCloseFilled v-else/>
    </el-icon>
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import {SuccessFilled, CircleCloseFilled} from "@element-plus/icons-vue";

defineProps({
  status: {
    type: String,
    default: 'success'
  }
})

</script>

<style scoped lang="less">
.tag-box {
  padding: 0 0.5rem;
  font-size: 12px;
  line-height: 1.8;
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;

  .icon {
    margin-right: 0.25rem;
    font-size: 12px;
    vertical-align: middle;
  }
}

.success-status {
  background: #DCFCE7;
  color: #166534;
}

.failure-status {
  background: #FEE2E2;
  color: #B91C1C;
}
</style>
