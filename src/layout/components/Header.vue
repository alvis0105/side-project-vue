<template>
  <div class="h-auto">
    <header>
      <span class="text-font34">{{ $t(route.meta.i18nTitle || route.meta.title) }}</span>
    </header>
    <section
      v-if="route.name !== 'home'"
      class="pt-2"
    >
      <div class="mt-2 bg-black bg-opacity-5 border rounded-xl h-[100px] p-3 flex flex-col">
        <span class="font-bold text-black text-opacity-50 text-font20">
          {{ $t(route.meta.i18nDescriptionTitle || route.meta.descriptionTitle) }}
        </span>
        <span class="pt-2 font-bold text-black text-opacity-40">
          {{ route.meta.description || '目前尚無描述內容' }}
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
