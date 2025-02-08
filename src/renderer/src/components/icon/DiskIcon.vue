<template>
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <path
      d="M960 736c0 41.27-33.4 74.66-74.67 74.66H138.67C97.4 810.66 64 777.27 64 736V586.67C64 545.4 97.4 512 138.67 512h746.67c41.26 0 74.66 33.4 74.66 74.67V736zM138.67 462.38c-13.84 0-35.31 4.29-47.95 9.54l150.05-225.19c12.17-18.37 40.08-33.39 62.02-33.39h417.7c22.19 0 49.86 14.79 62.26 33.39L932.8 471.92c-15.27-5.73-31.49-9.06-47.71-9.54H138.67z"
      class="icon-primary"
    ></path>
    <path
      d="M611.47 661.34c0 27.43 22.19 49.86 49.86 49.86 27.43 0 49.86-22.18 49.86-49.86 0-27.43-22.42-49.86-49.86-49.86-27.43 0.24-49.86 22.43-49.86 49.86z"
      class="icon-secondary"
    ></path>
    <path
      d="M760.81 661.34c0 27.43 22.19 49.86 49.86 49.86 27.43 0 49.86-22.18 49.86-49.86 0-27.43-22.42-49.86-49.86-49.86-27.44 0.24-49.86 22.43-49.86 49.86z"
      class="icon-accent"
    ></path>
  </svg>
</template>

<script setup>
defineOptions({
  name: "CustomIcon"
});
</script>

<style scoped>
.icon-primary {
  fill: currentColor;
}

.icon-secondary {
  fill: currentColor;
}

.icon-accent {
  fill: currentColor;
}
</style>
