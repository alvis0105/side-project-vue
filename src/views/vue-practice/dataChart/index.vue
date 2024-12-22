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
    <div class="grid grid-cols-2 gap-5">
      <div v-for="(chart, index) in charts" :key="index">
        <span class="font-bold">{{ chart.label }}</span>
        <component
          :is="chart.component"
          :startDate="startDate"
          :endDate="endDate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import dayjs from 'dayjs'
import FormAlert from '@/components/BaseFormAlert.vue'

// 匯入各圖表組件
import LineChart from './components/lineChart.vue'
import BarChart from './components/barChart.vue'
import PieChart from './components/pieChart.vue'
import RadarChart from './components/radarChart.vue'
import ScatterChart from './components/scatterChart.vue'

// 日期範圍
const startDate = ref(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))
const endDate = ref(dayjs().format('YYYY-MM-DD'))

// 錯誤訊息
const errorMessage = ref('')
const previousStartDate = ref(startDate.value)
const previousEndDate = ref(endDate.value)

// 定義圖表資料
const charts = [
  { label: '折線圖', component: LineChart },
  { label: '柱狀圖', component: BarChart },
  { label: '圓餅圖', component: PieChart },
  { label: '雷達圖', component: RadarChart },
  { label: '散點圖', component: ScatterChart },
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
