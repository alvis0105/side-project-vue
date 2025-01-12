<template>
  <main>
    <div class="text-blue-500 cursor-pointer hover:text-blue-800 text-font22">
      {{ $t('message.welcome') }}
    </div>
    <div class="pt-5 mt-5 text-blue-900 text-font22">
      {{ $t('message.welcomeText') }}
    </div>
    <div class="mt-2">
      {{ route.meta.description }}
    </div>
  </main>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

