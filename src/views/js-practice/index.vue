<template>
  <div>
    <!-- 功能 1:資料篩選 -->
    <section class="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
      <div class="font-semibold text-font28">
        {{ $t('menu.jsPractice.function1') }}
      </div>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.method') }}
        <span class="text-orange-600">_.filter</span>
      </p>
      <div>
        <p class="font-semibold">
          {{ $t('menu.jsPractice.output') }}
        </p>
        <table class="w-full text-left border border-collapse border-gray-400 table-auto">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 border border-gray-400">
                ID
              </th>
              <th class="px-4 py-2 border border-gray-400">
                {{ $t('menu.jsPractice.itemName') }}
              </th>
              <th class="px-4 py-2 border border-gray-400">
                {{ $t('menu.jsPractice.price') }}
              </th>
              <th class="px-4 py-2 border border-gray-400">
                {{ $t('menu.jsPractice.type') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in currentProducts"
              :key="product.id"
            >
              <td class="px-4 py-2 border border-gray-400">
                {{ product.id }}
              </td>
              <td class="px-4 py-2 border border-gray-400">
                {{ product.name }}
              </td>
              <td class="px-4 py-2 border border-gray-400">
                {{ product.price }}
              </td>
              <td class="px-4 py-2 border border-gray-400">
                {{ product.category }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4">
        <button
          class="px-4 py-2 mt-4 text-white bg-orange-400 rounded shadow hover:bg-orange-700"
          @click="filterCategory('3C')"
        >
          {{ $t('menu.jsPractice.function1Button1') }}
        </button>
        <button
          class="px-4 py-2 mt-4 ml-2 text-white bg-orange-600 rounded shadow hover:bg-orange-900"
          @click="filterCategory('工具')"
        >
          {{ $t('menu.jsPractice.function1Button2') }}
        </button>
        <button
          class="px-4 py-2 mt-4 ml-2 text-white bg-gray-500 rounded shadow hover:bg-gray-600"
          @click="resetProducts"
        >
          {{ $t('menu.jsPractice.resetButton') }}
        </button>
      </div>
    </section>

    <!-- 功能 2: 防抖動範例 -->
    <section class="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
      <div class="font-semibold text-font28">
        {{ $t('menu.jsPractice.function2') }}
      </div>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.method') }}
        <span class="text-blue-500">_.debounce</span>
      </p>
      <p class="font-semibold">
        {{ $t('menu.jsPractice.output') }}
      </p>
      <div class="p-2 mb-4 bg-gray-100 rounded">
        <p>{{ debouncedMessage.length ? debouncedMessage : $t('menu.jsPractice.function2Text1') }}</p>
        <p>{{ $t('menu.jsPractice.count') }} {{ debouncedCount }}</p>
      </div>
      <div class="p-2 mb-4 bg-gray-100 rounded">
        <p>{{ $t('menu.jsPractice.function2Text2') }}</p>
        <p>{{ $t('menu.jsPractice.count') }} {{ clickCount }}</p>
      </div>
      <button
        class="px-4 py-2 text-white bg-red-500 rounded shadow hover:bg-red-600"
        @click="debouncedTrigger"
      >
        {{ $t('menu.jsPractice.function2Button1') }}
      </button>
      <button
        class="px-4 py-2 ml-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
        @click="multipleTrigger"
      >
        {{ $t('menu.jsPractice.function2Button2') }}
      </button>
    </section>

    <!-- 功能 3:移除重複值 -->
    <section class="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
      <div class="font-semibold text-font28">
        {{ $t('menu.jsPractice.function3') }}
      </div>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.method') }} <span class="text-purple-600">_.uniq</span>
      </p>
      <p class="font-semibold">
        {{ $t('menu.jsPractice.output') }}
      </p>
      <div class="p-2 mb-4 bg-gray-100 rounded">
        {{ duplicatesOutput.join(', ') }}
      </div>
      <button
        class="px-4 py-2 text-white bg-purple-500 rounded shadow hover:bg-purple-600"
        @click="removeDuplicates"
      >
        {{ $t('menu.jsPractice.function3Button1') }}
      </button>
      <button
        class="px-4 py-2 ml-2 text-white bg-gray-500 rounded shadow hover:bg-gray-600"
        @click="resetDuplicates"
      >
        {{ $t('menu.jsPractice.resetButton') }}
      </button>
    </section>

    <!-- 功能 4:恢復預設設置 -->
    <section class="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
      <div class="font-semibold text-font28">
        {{ $t('menu.jsPractice.function4') }}
      </div>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.method') }} <span class="text-green-600">_.cloneDeep</span>
      </p>

      <!-- 顯示原始設置 -->
      <p class="font-semibold">
        {{ $t('menu.jsPractice.default') }} {{ currentSettings.themeColor }}
      </p>
      <div
        :style="{ backgroundColor: currentSettings.themeColor }"
        class="w-[100px] h-[50px] px-4 py-2 mb-4 bg-gray-100 rounded h-1/2 mt-4"
      />

      <!-- 按鈕控制顏色和設置 -->
      <button
        class="px-4 py-2 ml-2 text-white bg-green-500 rounded shadow hover:bg-green-700"
        @click="changeColor('light')"
      >
        {{ $t('menu.jsPractice.function4Button1') }}
      </button>
      <button
        class="px-4 py-2 ml-2 text-white bg-green-700 rounded shadow hover:bg-green-900"
        @click="changeColor('dark')"
      >
        {{ $t('menu.jsPractice.function4Button2') }}
      </button>
      <button
        class="px-4 py-2 ml-2 text-white bg-gray-500 rounded shadow hover:bg-gray-600"
        @click="resetSettings"
      >
        {{ $t('menu.jsPractice.resetButton') }}
      </button>
    </section>

    <!-- 功能 5:生成範圍 -->
    <section class="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
      <div class="font-semibold text-font28">
        {{ $t('menu.jsPractice.function5') }}
      </div>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.method') }} <span class="text-pink-600">_.range</span>
      </p>
      <div class="px-4 py-2 mb-4 bg-gray-100 rounded">
        {{ rangeOutput.length ? rangeOutput.join(', ') : $t('menu.jsPractice.function5Text1') }}
      </div>
      <button
        class="px-4 py-2 ml-2 text-white bg-pink-500 rounded shadow hover:bg-pink-600"
        @click="generateRange1To10"
      >
        {{ $t('menu.jsPractice.function5Button1') }}
      </button>
      <button
        class="px-4 py-2 ml-2 text-white bg-pink-500 rounded shadow hover:bg-pink-600"
        @click="generateRange5To8"
      >
        {{ $t('menu.jsPractice.function5Button2') }}
      </button>
    </section>

    <!-- 功能 6: 分組 -->
    <section class="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
      <div class="font-semibold text-font28">
        {{ $t('menu.jsPractice.function6') }}
      </div>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.method') }} <span class="text-yellow-600">_.chunk</span>
      </p>
      <p class="font-semibold">
        {{ $t('menu.jsPractice.default') }}
      </p>
      <div class="px-4 py-2 mb-4 bg-gray-100 rounded">
        {{ chunkInput.join(', ') }}
      </div>
      <button
        class="px-4 py-2 ml-2 text-white bg-yellow-500 rounded shadow hover:bg-yellow-600"
        @click="chunkArray3"
      >
        {{ $t('menu.jsPractice.function6Button1') }}
      </button>
      <button
        class="px-4 py-2 ml-2 text-white bg-yellow-500 rounded shadow hover:bg-yellow-600"
        @click="chunkArray6"
      >
        {{ $t('menu.jsPractice.function6Button2') }}
      </button>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.output') }}
      </p>
      <div v-if="formattedChunkOutput.length">
        <div
          v-for="(group, index) in formattedChunkOutput"
          :key="index"
          class="px-4 py-2 mb-4 bg-gray-100 rounded"
        >
          <span>{{ $t('menu.jsPractice.function6Text1') }}{{ index + 1 }}{{ $t('menu.jsPractice.function6Text2') }}</span>
          {{ group.join(', ') }}
        </div>
      </div>
      <div
        v-else
        class="px-4 py-2 mb-4 bg-gray-100 rounded"
      >
        {{ $t('menu.jsPractice.function6Text3') }}
      </div>
    </section>

    <!-- 功能 7:查找最大數值 -->
    <section class="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
      <div class="font-semibold text-font28">
        {{ $t('menu.jsPractice.function7') }}
      </div>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.method') }} <span class="text-teal-600">_.max, _.min</span>
      </p>
      <p class="font-semibold">
        {{ $t('menu.jsPractice.default') }}
      </p>
      <div class="px-4 py-2 mb-4 bg-gray-100 rounded">
        {{ maxMinInput.join(', ') }}
      </div>
      <button
        class="px-4 py-2 ml-2 text-white bg-teal-500 rounded shadow hover:bg-teal-600"
        @click="findMax"
      >
        {{ $t('menu.jsPractice.function7Button1') }}
      </button>
      <button
        class="px-4 py-2 ml-2 text-white bg-teal-500 rounded shadow hover:bg-teal-600"
        @click="findMin"
      >
        {{ $t('menu.jsPractice.function7Button2') }}
      </button>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.output') }}
      </p>
      <div class="px-4 py-2 mb-4 bg-gray-100 rounded">
        {{ maxMinOutput ? maxMinOutput : $t('menu.jsPractice.function7Text1') }}
      </div>
    </section>

    <!-- 功能 8:合併物件 -->
    <section class="p-4 mb-4 border border-gray-300 rounded bg-gray-50">
      <div class="font-semibold text-font28">
        {{ $t('menu.jsPractice.function8') }}
      </div>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.method') }} <span class="text-red-600">_.merge</span>
      </p>
      <p class="font-semibold">
        {{ $t('menu.jsPractice.default') }}
      </p>
      <!-- 顯示原始資料 -->
      <div class="px-4 py-2 mb-4 bg-gray-100 rounded">
        <div>{{ $t('menu.jsPractice.dataA') }}{{ $t('menu.jsPractice.name') }}{{ obj1.name }} {{ $t('menu.jsPractice.age') }}{{ obj1.age }}</div>
      </div>
      <div class="px-4 py-2 mb-4 bg-gray-100 rounded">
        <div>{{ $t('menu.jsPractice.dataB') }}{{ $t('menu.jsPractice.city') }}{{ obj2.city }} {{ $t('menu.jsPractice.job') }}{{ obj2.job }}</div>
      </div>
      <button
        class="px-4 py-2 ml-2 text-white bg-red-500 rounded shadow hover:bg-red-600"
        @click="mergeObjects"
      >
        {{ $t('menu.jsPractice.function8Button1') }}
      </button>
      <p class="mt-4 font-semibold">
        {{ $t('menu.jsPractice.output') }}
      </p>
      <!-- 顯示合併後結果 -->
      <div
        v-if="Object.keys(mergeResult).length"
        class="px-4 py-2 mb-4 bg-gray-100 rounded"
      >
        <div>{{ $t('menu.jsPractice.dataC') }}</div>
        <div>{{ $t('menu.jsPractice.name') }}{{ mergeResult.name }} {{ $t('menu.jsPractice.age') }}{{ mergeResult.age }} {{ $t('menu.jsPractice.city') }}{{ mergeResult.city }} {{ $t('menu.jsPractice.job') }}{{ mergeResult.job }}</div>
      </div>
      <div
        v-else
        class="px-4 py-2 mb-4 bg-gray-100 rounded"
      >
        {{ $t('menu.jsPractice.function8Text1') }}
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import _ from 'lodash'

const { t } = useI18n()

// 原始資料
const products = ref([
  { id: 1, name: "手機", price: 25000, category: "3C" },
  { id: 2, name: "筆記型電腦", price: 50000, category: "3C" },
  { id: 3, name: "平板", price: 15000, category: "3C" },
  { id: 4, name: "耳機", price: 3000, category: "3C" },
  { id: 5, name: "螺絲起子", price: 200, category: "工具" },
  { id: 6, name: "鐵鎚", price: 500, category: "工具" },
])
const currentProducts = ref([...products.value])
const duplicatesInput = ref([1, 2, 2, 3, 4, 4, 5])  // 初始有重複的資料
const duplicatesOutput = ref([1, 2, 2, 3, 4, 4, 5])  // 預設顯示有重複的數字
const rangeOutput = ref([])  // 用來顯示生成的範圍
const chunkInput = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])  // 預設的資料用來分組
const formattedChunkOutput = ref([])  // 用來顯示格式化的分組結果
const maxMinInput = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])  // 查找最大最小值的預設資料
const maxMinOutput = ref()  // 用來顯示最大最小值的結果
const obj1 = ref({ name: 'John', age: 30 }) // 合併前的資料1
const obj2 = ref({ city: 'New York', job: 'Engineer' }) // 合併前的資料2
const mergeResult = ref({}) // 用來顯示合併後的物件
const currentSettings = ref({})
const defaultSettings = ref({ themeColor: 'gray' })
const debouncedMessage = ref('') // 記錄防止連續點擊訊息
const isButtonDisabled = ref(false)// 記錄按鈕是否可用
const clickCount = ref(0) // 記錄連點次數
const debouncedCount = ref(0) // 記錄防止連點次數

// 功能1: 篩選
const filterCategory = (category) => {
  currentProducts.value = _.filter(products.value, { category })
}

// 功能1: {{ $t('menu.jsPractice.resetButton') }}篩選
const resetProducts = () => {
  currentProducts.value = [...products.value]
}

// 功能2: 防止連續點擊
const debouncedTrigger = () => {
  if (isButtonDisabled.value) return // 如果按鈕已禁用，不再執行
  debouncedMessage.value = t('menu.jsPractice.function2Text3')
  isButtonDisabled.value = true // 禁用按鈕
  debouncedCount.value += 1 // 計數增加
  debouncedFunction() // 設定防止點擊的延遲
}

// 功能2: 防止連續點擊
const debouncedFunction = _.debounce(() => {
  debouncedMessage.value = ''  // 清空訊息
  isButtonDisabled.value = false  // 重新啟用按鈕
}, 5000)  // 3秒後可以再次觸發

// 功能2: 防止連續點擊對照組:可連續點擊
const multipleTrigger = () => {
  clickCount.value += 1 // 點擊次數遞增
}

// 功能3: 移除重複數字
const removeDuplicates = () => {
  duplicatesOutput.value = _.uniq(duplicatesInput.value)
}

const resetDuplicates = () => {
  duplicatesOutput.value = [...duplicatesInput.value]
}

// 功能4: 修改顏色
const changeColor = (color) => {
  // 在修改顏色時，先對 defaultSettings 做深拷貝
  const updatedSettings = _.cloneDeep(defaultSettings.value)
  if (color === 'light') {
    updatedSettings.themeColor = 'lightgreen' // 淺色
  } else if (color === 'dark') {
    updatedSettings.themeColor = 'darkgreen' // 深色
  }
  // 更新當前設置
  currentSettings.value = updatedSettings
}

// 功能4: 恢復預設顏色
const resetSettings = () => {
  currentSettings.value = _.cloneDeep(defaultSettings.value)
}

// 功能5: 生成範圍1~10
const generateRange1To10 = () => {
  rangeOutput.value = _.range(1, 11)
}
// 功能5: 生成範圍5~8
const generateRange5To8 = () => {
  rangeOutput.value = _.range(5, 9)
}

// 功能6: 分塊
const chunkArray3 = () => {
  const chunked = _.chunk(chunkInput.value, 3)
  formattedChunkOutput.value = chunked
}

const chunkArray6 = () => {
  const chunked = _.chunk(chunkInput.value, 6)
  formattedChunkOutput.value = chunked
}

// 功能7: 查找最大數值
const findMax = () => {
  maxMinOutput.value = _.max(maxMinInput.value)
}

// 功能7: 查找最小數值
const findMin = () => {
  maxMinOutput.value = _.min(maxMinInput.value)
}

// 功能8: 合併物件
const mergeObjects = () => {
  mergeResult.value = _.merge({}, obj1.value, obj2.value)
}

onMounted(() => {
  currentSettings.value = _.cloneDeep(defaultSettings.value)
})
</script>
