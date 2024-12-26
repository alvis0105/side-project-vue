<template>
  <div class="flex flex-col flex-1 mt-5 rounded-xl">
    <div class="w-[500px] p-5 border">
      <span class="mb-5 text-font32">{{ $t(currentConfig.title) }}</span>
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
            {{ $t('common.prevStep') }}
          </button>
          <!-- 下一步/提交按鈕 -->
          <div class="ml-auto">
            <button
              type="submit"
              class="px-3 py-1 border rounded-lg hover:bg-active hover:opacity-100 hover:text-white"
            >
              {{ isLastStep ? $t('common.submit') : $t('common.nextStep') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { stepForm } from "../../../config/stepForm"
import Step from "./components/step.vue"
import Schema from "async-validator"

const { t } = useI18n()

// 當前步驟索引
const currentStep = ref(0)
// 錯誤訊息
const errorMsg = ref([])

// 表單數據
const form = reactive({})
stepForm.forEach((step) => {
  step.fields.forEach((field) => {
    form[field.name] = field.type === "checkbox" ? false : ""
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
    rules[field.name] = [...(field.rules || [])].map((rule) => ({
      ...rule,
      message: t(rule.message),
    }))
    values[field.name] = form[field.name]
  })

  const validator = new Schema(rules)

  try {
    await validator.validate(values)
    errorMsg.value = []
    return true
  } catch (validationErrors) {
    errorMsg.value = []
    const errors = Array.isArray(validationErrors.errors)
      ? validationErrors.errors
      : [validationErrors]
    errorMsg.value = errors.map((err) => err.message)
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
    alert(t("common.formSubmitted"))
  }
}

// 返回上一步
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>
