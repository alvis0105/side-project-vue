<template>
  <div class="flex items-center justify-center">
    <div :class="spinnerType" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
  }
})

const spinnerType = computed(() => {
  switch (props.type) {
    case 'white':
      return 'spinner-white'
    case 'black':
      return 'spinner-black'
    default:
      return 'spinner-black'
  }
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

.spinner-black {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 0, 0, 0.5);
  border-top-color: rgb(77, 77, 77);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-white {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(74, 74, 74, 0.5);
  border-top-color: rgb(255, 255, 255);
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

</style>
