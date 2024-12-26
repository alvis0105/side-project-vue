<template>
  <div>
    <!-- 日期選擇區域 -->
    <div class="flex gap-5 mb-5">
      <label class="flex items-center gap-2">
        <span class="font-semibold">起始日期：</span>
        <input
          v-model="startDate"
          type="date"
          class="p-1 border border-gray-300 rounded"
        />
      </label>
      <label class="flex items-center gap-2">
        <span class="font-semibold">結束日期：</span>
        <input
          v-model="endDate"
          type="date"
          class="p-1 border border-gray-300 rounded"
        />
      </label>
    </div>

    <!-- 錯誤訊息 -->
    <FormAlert v-if="errorMessage" :message="errorMessage" />

    <!-- 圖表區域 -->
    <div class="grid grid-cols-2 gap-5 pt-5">
      <Chart
        v-for="(chart, index) in charts"
        :key="index"
        :chartType="chart.type"
        :startDate="startDate"
        :endDate="endDate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import dayjs from 'dayjs'
import FormAlert from '@/components/BaseFormAlert.vue'
import Chart from './components/chart.vue'

// 日期範圍
const startDate = ref(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))
const endDate = ref(dayjs().format('YYYY-MM-DD'))

// 錯誤訊息
const errorMessage = ref('')
const previousStartDate = ref(startDate.value)
const previousEndDate = ref(endDate.value)

// 定義圖表類型
const charts = [
  { label: '折線圖', type: 'line' },
  { label: '柱狀圖', type: 'bar' },
  { label: '圓餅圖', type: 'pie' },
  { label: '雷達圖', type: 'radar' },
  { label: '散點圖', type: 'scatter' },
]

// 監控日期範圍
watchEffect(() => {
  if (dayjs(startDate.value).isAfter(dayjs(endDate.value))) {
    errorMessage.value = '起始日期不能大於結束日期！'
    startDate.value = previousStartDate.value
    endDate.value = previousEndDate.value
  } else {
    errorMessage.value = ''
    previousStartDate.value = startDate.value
    previousEndDate.value = endDate.value
  }
})
</script>
