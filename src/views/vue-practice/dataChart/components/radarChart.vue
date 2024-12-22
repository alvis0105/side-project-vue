<template>
  <div ref="chartRef" class="w-full h-96"></div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { generateChart } from '@/utils/chart.js'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

const props = defineProps({
  startDate: {
    type: String,
    required: true,
    default: '',
  },
  endDate: {
    type: String,
    required: true,
    default: '',
  },
})

const chartRef = ref(null)
let chartInstance = null

const generateData = () => {
  const days = dayjs(props.endDate).diff(dayjs(props.startDate), 'day') + 1
  return Array.from({ length: days }, (_, index) => ({
    date: dayjs(props.startDate).add(index, 'day').format('YYYY-MM-DD'),
    value: Math.floor(Math.random() * 100),
  }))
}

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
  }
}

const updateChart = (data) => {
  if (!chartInstance) return
  const option = {
    title: { text: '雷達圖', left: 'center' },
    tooltip: { trigger: 'item' },
    radar: {
      indicator: data.map(item => ({ name: item.date, max: 100 })),
    },
    series: [
      {
        type: 'radar',
        data: [{ value: data.map(item => item.value), name: '日期數據' }],
      },
    ],
  }
  chartInstance.setOption(option)
}

// 使用 watchEffect 監測 props 的變化並更新圖表
watchEffect(() => {
  if (!props.startDate || !props.endDate) return // 防止空值情況
  const data = generateData()
  updateChart(data)
})

onMounted(() => {
  initChart()
  const initialData = generateData()
  updateChart(initialData)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>
