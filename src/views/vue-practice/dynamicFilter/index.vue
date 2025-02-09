<template>
  <div class="max-w-3xl p-6 border border-gray-300 rounded-lg bg-gray-50">
    <!-- 商品篩選區 -->
    <h2 class="mb-4 text-xl font-semibold text-gray-800">
      {{ t('dynamicFilter.item') }}{{ t('dynamicFilter.filter') }}
    </h2>
    <div class="flex flex-col gap-2 mb-6">
      <!-- 提示框 -->
      <BaseAlert
        v-if="showAlert"
        :message="t('dynamicFilter.errorMsg')"
      />

      <!-- 篩選區 -->
      <div class="flex items-center gap-4">
        <label
          for="minPrice"
          class="text-gray-600"
        >
          {{ t('dynamicFilter.minimum') }}:
        </label>
        <input
          id="minPrice"
          v-model="minPrice"
          type="number"
          class="w-32 px-3 py-2 border border-gray-300 rounded"
          :placeholder="t('dynamicFilter.minimum')"
        >
        <label
          for="maxPrice"
          class="text-gray-600"
        >
          {{ t('dynamicFilter.maximum') }}:
        </label>
        <input
          id="maxPrice"
          v-model="maxPrice"
          type="number"
          class="w-32 px-3 py-2 border border-gray-300 rounded"
          :placeholder="t('dynamicFilter.maximum')"
        >
      </div>
    </div>

    <!-- 商品清單 -->
    <ul class="mb-6 space-y-2">
      <li
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="p-4 border-b border-gray-200"
      >
        {{ product.name }} - ${{ product.price }}
      </li>
    </ul>

    <!-- 商品統計 -->
    <div class="mt-4">
      <h3 class="text-lg font-semibold text-gray-700">{{ t('dynamicFilter.total') }}</h3>
      <p class="mt-2">
        <span class="font-semibold">{{ t('dynamicFilter.count') }}:</span>{{ totalCount }}
      </p>
      <p>
        <span class="font-semibold">{{ t('dynamicFilter.amount') }}:</span>${{ totalAmount }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import BaseAlert from '@/components/BaseFormAlert.vue'

const { t } = useI18n()

// 篩選條件
const minPrice = ref(100)
const maxPrice = ref(800)

// 原始商品資料
const baseProducts = ref([
  { id: 1, key: 'A', price: 500 },
  { id: 2, key: 'B', price: 200 },
  { id: 3, key: 'C', price: 800 },
])

// 本地化商品資料
const localizedProducts = computed(() =>
  baseProducts.value.map((product) => ({
    ...product,
    name: `${t('dynamicFilter.item')}${product.key}`,
  }))
)

// 是否顯示提示框
const showAlert = ref(false)

// 篩選後商品
const filteredProducts = computed(() =>
  localizedProducts.value.filter(
    (product) => product.price >= minPrice.value && product.price <= maxPrice.value
  )
)

// 商品總金額
const totalAmount = computed(() =>
  filteredProducts.value.reduce((sum, product) => sum + product.price, 0)
)

// 商品總數量
const totalCount = computed(() => filteredProducts.value.length)

// 監控篩選條件並顯示提示框
watchEffect(() => {
  if (minPrice.value > maxPrice.value) {
    showAlert.value = true // 顯示提示框
    minPrice.value = maxPrice.value // 強制修正為相同值
  } else {
    showAlert.value = false // 隱藏提示框
  }
})
</script>
