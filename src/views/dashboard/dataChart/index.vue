<template>
  <el-config-provider :locale="currentLocale">
    <div>
      <!-- 日期選擇區域 -->
      <div class="flex gap-5 px-3 mt-5 mb-5">
        <label class="flex items-center gap-2">
          <span class="font-semibold">{{ t('menu.dashboard.chart.startDate') }}：</span>
          <el-date-picker
            v-model="startDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="Select Start Date"
            :clearable="false"
            class="p-1"
          />
        </label>
        <label class="flex items-center gap-2">
          <span class="font-semibold">{{ t('menu.dashboard.chart.endDate') }}：</span>
          <el-date-picker
            v-model="endDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="Select End Date"
            :clearable="false"
            class="p-1"
          />
        </label>
      </div>
      <!-- 錯誤訊息 -->
      <FormAlert v-if="errorMessage" :message="errorMessage" />

      <!-- 圖表區域 -->
      <div class="grid grid-cols-2 gap-5 pt-5">
        <div v-for="(chart, index) in charts" :key="index">
          <div class="text-xl font-bold text-center">{{ t(chart.label) }}</div>
          <component
            :is="chart.component"
            :startDate="startDate"
            :endDate="endDate"
          />
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import FormAlert from '@/components/BaseFormAlert.vue'
import { getCurrentElementPlusLocale } from '@/plugins/i18n.js'

// Element Plus 當前語言
const currentLocale = computed(() => getCurrentElementPlusLocale())

// 匯入各圖表組件
import LineChart from './components/lineChart.vue'
import BarChart from './components/barChart.vue'
import PieChart from './components/pieChart.vue'
import RadarChart from './components/radarChart.vue'
import ScatterChart from './components/scatterChart.vue'

const { t } = useI18n() // 使用 i18n

// 日期範圍
const startDate = ref(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))
const endDate = ref(dayjs().format('YYYY-MM-DD'))

// 錯誤訊息
const errorMessage = ref('')
const previousStartDate = ref(startDate.value)
const previousEndDate = ref(endDate.value)

// 定義圖表資料
const charts = [
  { label: 'menu.dashboard.chart.line', component: LineChart },
  { label: 'menu.dashboard.chart.bar', component: BarChart },
  { label: 'menu.dashboard.chart.pie', component: PieChart },
  { label: 'menu.dashboard.chart.radar', component: RadarChart },
  { label: 'menu.dashboard.chart.scatter', component: ScatterChart },
]

// 監控日期範圍
watchEffect(() => {
  // 確保日期範圍有效
  if (!startDate.value || !endDate.value) {
    errorMessage.value = t('menu.dashboard.chart.errorDateMessage')
    return
  }

  // 確保開始日期不晚於結束日期
  if (dayjs(startDate.value).isAfter(dayjs(endDate.value))) {
    errorMessage.value = t('menu.dashboard.chart.errorDateMessage')
    startDate.value = previousStartDate.value
    endDate.value = previousEndDate.value
  } else {
    errorMessage.value = ''
    previousStartDate.value = startDate.value
    previousEndDate.value = endDate.value
  }
})
</script>
