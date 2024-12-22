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

// 生成圖表數據
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
    chartInstance = echarts.init(chartRef.value)
  }
}

// 更新圖表
const updateChart = (data) => {
  if (!chartInstance) return
  const option = {
    title: { text: '折線圖', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map(item => item.date) },
    yAxis: { type: 'value' },
    series: [{ data: data.map(item => item.value), type: 'line', smooth: true }],
  }
  chartInstance.setOption(option)
}

// 使用 watchEffect 自動監測響應式數據變化
watchEffect(() => {
  if (props.startDate && props.endDate) {
    const data = generateData()
    updateChart(data)
  }
})

// 在掛載時初始化圖表
onMounted(() => {
  initChart()
  updateChart(generateData()) // 初始化圖表時加載數據
})

// 在卸載時清理圖表實例
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>
