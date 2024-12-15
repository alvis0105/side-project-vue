<template>
  <div>
    <h1>vue練習題的index</h1>
    <button @click="check">click</button>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const check = () => {
  console.log('route', route)
}
</script>

