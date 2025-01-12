<template>
  <el-config-provider :locale="currentLocale">
    <div class="p-6 mx-auto border border-gray-300 rounded-lg bg-gray-50">
      <!-- 日期選擇區域 -->
      <div class="flex gap-5 mb-6">
        <label class="flex items-center gap-2">
          <span class="font-semibold">{{ t('menu.dashboard.chart.startDate') }}:</span>
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
          <span class="font-semibold">{{ t('menu.dashboard.chart.endDate') }}:</span>
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
      <FormAlert
        v-if="errorMessage"
        :message="errorMessage"
      />

      <!-- 圖表區域 -->
      <div class="grid grid-cols-2 gap-8 pt-5">
        <div
          v-for="(chart, index) in charts"
          :key="index"
          class="flex flex-col items-center gap-4"
        >
          <!-- 圖表類型標籤 -->
          <span class="flex justify-center text-lg font-semibold text-gray-700">
            {{ chart.label }}
          </span>
          <!-- 圖表 -->
          <Chart
            :chart-type="chart.type"
            :start-date="startDate"
            :end-date="endDate"
            class="w-full h-96"
          />
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { getCurrentElementPlusLocale } from '@/plugins/i18n.js'
import dayjs from 'dayjs'
import FormAlert from '@/components/BaseFormAlert.vue'
import Chart from './components/chart.vue'

const { t } = useI18n()

// 日期範圍
const startDate = ref(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))
const endDate = ref(dayjs().format('YYYY-MM-DD'))

// 錯誤訊息
const errorMessage = ref('')
const previousStartDate = ref(startDate.value)
const previousEndDate = ref(endDate.value)

// 定義圖表類型
const charts = ref([
  { label: t('menu.dashboard.chart.line'), type: 'line' },
  { label: t('menu.dashboard.chart.bar'), type: 'bar' },
  { label: t('menu.dashboard.chart.pie'), type: 'pie' },
  { label: t('menu.dashboard.chart.radar'), type: 'radar' },
  { label: t('menu.dashboard.chart.scatter'), type: 'scatter' },
])

// 動態追蹤當前 Element Plus 語言
const currentLocale = computed(() => getCurrentElementPlusLocale())

// 監控日期範圍
watchEffect(() => {
  if (!startDate.value || !endDate.value) {
    errorMessage.value = t('menu.dashboard.chart.errorMsg')
    return
  }

  if (dayjs(startDate.value).isAfter(dayjs(endDate.value))) {
    errorMessage.value = t('menu.dashboard.chart.errorMsg')
    startDate.value = previousStartDate.value
    endDate.value = previousEndDate.value
  } else {
    errorMessage.value = ''
    previousStartDate.value = startDate.value
    previousEndDate.value = endDate.value
  }
})

// 監控語言切換，動態更新圖表標籤
watchEffect(() => {
  charts.value = [
    { label: t('menu.dashboard.chart.line'), type: 'line' },
    { label: t('menu.dashboard.chart.bar'), type: 'bar' },
    { label: t('menu.dashboard.chart.pie'), type: 'pie' },
    { label: t('menu.dashboard.chart.radar'), type: 'radar' },
    { label: t('menu.dashboard.chart.scatter'), type: 'scatter' },
  ]
})
</script>
