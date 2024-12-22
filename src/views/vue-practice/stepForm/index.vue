<template>
  <div class="flex flex-col flex-1 mt-5 rounded-xl">
    <div class="w-[500px] p-5 border">
      <span class="mb-5 text-font32">{{ currentConfig.title }}</span>
      <form
        class="flex flex-col flex-1 w-full mt-5"
        @submit.prevent="handleSubmit"
      >
        <Step
          :form="form"
          :fields="currentConfig.fields"
          @update-field="updateForm"
        />
        <!-- 按鈕部分 -->
        <div class="flex items-center justify-between w-full mt-3">
          <!-- 上一步按鈕 -->
          <button
            v-if="currentStep !== 0"
            class="px-3 py-1 border rounded-lg hover:bg-active hover:opacity-100 hover:text-white"
            type="button"
            @click="prevStep"
          >
            上一步
          </button>
          <!-- 下一步/提交按鈕 -->
          <div class="ml-auto">
            <button
              type="submit"
              class="px-3 py-1 border rounded-lg hover:bg-active hover:opacity-100 hover:text-white"
            >
              {{ isLastStep ? "提交" : "下一步" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue"
import Step from "./components/step.vue"
import { stepForm } from "../../../config/stepForm"
import Schema from "async-validator"

// 當前步驟索引
const currentStep = ref(0)
// 錯誤訊息
const errorMsg = ref([])


// 表單數據
const form = reactive({})
stepForm.forEach((step) => {
  step.fields.forEach((field) => {
    if (field.type === "checkbox") {
      form[field.name] = false // checkbox 預設為 false
    } else {
      form[field.name] = "" // 其他類型預設為空字串
    }
  })
})

// 計算當前步驟的配置
const currentConfig = computed(() => stepForm[currentStep.value])

// 檢查是否為最後一步
const isLastStep = computed(() => currentStep.value === stepForm.length - 1)

// 更新表單數據
const updateForm = ({ fieldName, value }) => {
  form[fieldName] = value
}

const validateCurrentStep = async () => {
  const currentFields = currentConfig.value.fields
  const rules = {}
  const values = {}

  currentFields.forEach((field) => {
    // 初始化 rules 為外部配置的規則副本，避免重複添加
    rules[field.name] = [...(field.rules || [])]
    // 如果是 checkbox 類型，確認是否已添加 validator
    if (
      field.type === "checkbox" &&
      !rules[field.name].some((rule) => rule.validator)
    ) {
      rules[field.name].push({
        validator: (rule, value) =>
          value === true
            ? Promise.resolve()
            : Promise.reject(new Error(rule.message || "請同意條款")),
      })
    }
    // 提取欄位值
    values[field.name] = form[field.name]
  })

  const validator = new Schema(rules)

  try {
    await validator.validate(values)
    // 驗證成功時清空錯誤訊息
    errorMsg.value = []
    return true
  } catch (validationErrors) {
    // 清空錯誤訊息，重新收集
    errorMsg.value = []
    const errors = Array.isArray(validationErrors.errors)
      ? validationErrors.errors
      : [validationErrors]
    errorMsg.value = errors.map((err) => err.message)
    // 彈出錯誤訊息
    alert(`驗證失敗：${errorMsg.value.join(", ")}`)
    return false
  }
}


// 提交表單
const handleSubmit = async () => {
  if (!(await validateCurrentStep())) {
    return
  }

  if (!isLastStep.value) {
    currentStep.value++
  } else {
    alert("表單已提交！")
  }
}

// 返回上一步
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

