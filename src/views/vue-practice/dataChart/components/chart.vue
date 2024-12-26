<template>
  <div ref="chartRef" class="w-full h-96"></div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
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

    // 設置 passive 事件監聽器
    chartInstance.value.getZr().handler.setMouseEventListener = function (
      type,
      handler
    ) {
      this.dom.addEventListener(type, handler, { passive: true })
    }
  }
}

// 更新圖表配置
const updateChart = (data) => {
  if (!chartInstance.value) return
  const baseOption = {
    title: { text: '', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map(item => item.date) },
    yAxis: { type: 'value' },
    series: [{ data: data.map(item => item.value) }],
  }

  // 根據圖表類型設置配置
  switch (props.chartType) {
    case 'bar':
      baseOption.title.text = '柱狀圖'
      baseOption.series[0].type = 'bar'
      break
    case 'line':
      baseOption.title.text = '折線圖'
      baseOption.series[0].type = 'line'
      baseOption.series[0].smooth = true
      break
    case 'pie':
      baseOption.title.text = '圓餅圖'
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
      baseOption.title.text = '雷達圖'
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
      baseOption.title.text = '散點圖'
      baseOption.series[0].type = 'scatter'
      break
    default:
      console.error('未知圖表類型')
      return
  }

  chartInstance.value.setOption(baseOption)
}

// 自動監測數據變化並更新圖表
watchEffect(() => {
  if (!props.startDate || !props.endDate) return
  const data = generateData()
  updateChart(data)
})

// 在掛載時初始化圖表
onMounted(() => {
  initChart()
  updateChart(generateData())
})

// 卸載時清理圖表
onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose()
    chartInstance.value = null
  }
})
</script>
