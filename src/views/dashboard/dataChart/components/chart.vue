<template>
  <div
    ref="chartRef"
    class="w-full h-96"
  />
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

// 定義傳入的 props
const props = defineProps({
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
  chartType: {
    type: String,
    required: true, // 必須傳入圖表類型（如 'bar', 'line', 'pie' 等）
  },
})

// 引用 DOM 和 ECharts 實例
const chartRef = ref(null)
const chartInstance = ref(null)
const chartData = ref([]) // 用於緩存數據

const { locale } = useI18n()

// 生成數據
const generateData = () => {
  const days = dayjs(props.endDate).diff(dayjs(props.startDate), 'day') + 1
  return Array.from({ length: days }, (_, index) => ({
    date: dayjs(props.startDate).add(index, 'day').format('YYYY-MM-DD'),
    value: Math.floor(Math.random() * 100),
  }))
}

// 初始化圖表
const initChart = () => {
  if (chartRef.value) {
    chartInstance.value = echarts.init(chartRef.value)
  }
}

// 更新圖表配置
const updateChart = () => {
  if (!chartInstance.value || chartData.value.length === 0) return

  const data = chartData.value
  const baseOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map(item => item.date) },
    yAxis: { type: 'value' },
    series: [{ data: data.map(item => item.value) }],
  }

  // 根據圖表類型設置配置
  switch (props.chartType) {
    case 'bar':
      baseOption.series[0].type = 'bar'
      break
    case 'line':
      baseOption.series[0].type = 'line'
      baseOption.series[0].smooth = true
      break
    case 'pie':
      baseOption.tooltip.trigger = 'item'
      baseOption.series = [
        {
          type: 'pie',
          radius: '50%',
          data: data.map(item => ({ value: item.value, name: item.date })),
        },
      ]
      break
    case 'radar':
      baseOption.tooltip.trigger = 'item'
      baseOption.radar = {
        indicator: data.map(item => ({ name: item.date, max: 100 })),
      }
      baseOption.series = [
        {
          type: 'radar',
          data: [{ value: data.map(item => item.value), name: '數據' }],
        },
      ]
      break
    case 'scatter':
      baseOption.series[0].type = 'scatter'
      break
    default:
      console.error('未知圖表類型')
      return
  }

  chartInstance.value.setOption(baseOption)
}

// 監控 props 的變化並更新數據
watch(
  () => [props.startDate, props.endDate],
  ([newStart, newEnd]) => {
    if (newStart && newEnd) {
      chartData.value = generateData() // 更新數據
      updateChart() // 更新圖表
    }
  },
  { immediate: true }
)

// 監控語言變更並更新圖表
watch(
  () => locale.value,
  () => {
    updateChart() // 語言變更時重新更新圖表
  }
)

// 初始化與清理邏輯
onMounted(() => {
  initChart()
  chartData.value = generateData()
  updateChart()
})

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose()
    chartInstance.value = null
  }
})
</script>
