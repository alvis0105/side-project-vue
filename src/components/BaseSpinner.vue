<template>
  <div class="flex items-center justify-center">
    <div class="spinner" />
    <div :class="typeFilter">登入中 請稍候...</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

const typeFilter = computed(() => {
  if (props.type === 'vertical') {
    return 'vertical-text'
  }
  return 'horizontal-text'
})
</script>

<style>
.overlay-translucent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9); /* 透明度為 50% 的白色背景 */
  z-index: 1000; /* 確保覆蓋層位於最上面 */
}

.overlay-white {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1); /* 透明度為 50% 的白色背景 */
  z-index: 1000; /* 確保覆蓋層位於最上面 */
}

.spinner {
  width: 30px;
  height: 30px;
  border: 4px solid rgba(0, 0, 0, 0.5);
  border-top-color: rgb(77, 77, 77);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.vertical-text {
  color: #000000;
  font-size: 18px;
  margin-top: 10px;
}

.horizontal-text {
  color: #000000;
  font-size: 18px;
  margin-left: 10px;
}
</style>
