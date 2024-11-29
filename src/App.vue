<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <router-view />
  </transition>
</template>

<script setup>
import config from '@/config'
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
