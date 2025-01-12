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
    <!-- 顯示通知模態框 -->
    <BaseModal
      v-model="isModalOpen"
      :title="modalTitle"
      :detail="modalDetail"
      :cancel-text="cancelText"
      :confirm-text="confirmText"
      :have-cancel-btn="true"
      @close-modal="closeModal"
    >
      <template #confirmButton>
        <button
          class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          @click="closeModal"
        >
          確認
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import { stepForm } from "../../../config/stepForm"
import Step from "./components/step.vue"
import Schema from "async-validator"

const { t } = useI18n()

// 彈窗相關
const isModalOpen = ref(false)
const modalTitle = ref('提示')
const modalDetail = ref('')
const cancelText = ref('取消')
const confirmText = ref('確認')
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

    // 只有在最後一步檢查是否勾選了同意條款
    if (isLastStep.value && !form['terms']) {
      modalTitle.value = '錯誤'
      modalDetail.value = '請勾選同意條款'
      openModal(currentStep.value)
      return false
    }

    return true
  } catch (validationErrors) {
    errorMsg.value = []
    const errors = Array.isArray(validationErrors.errors)
      ? validationErrors.errors
      : [validationErrors]
    errorMsg.value = errors.map((err) => err.message)
    modalTitle.value = '驗證錯誤'
    modalDetail.value = `驗證失敗：${errorMsg.value.join(", ")}`
    openModal(currentStep.value)
    return false
  }
}

// 提交表單
const handleSubmit = async () => {
  if (!(await validateCurrentStep())) {
    return
  }

  // 提交成功時
  if (isLastStep.value) {
    modalTitle.value = '提交成功'
    modalDetail.value = '表單已成功提交！'
    openModal(isLastStep.value)
  } else {
    currentStep.value++
  }
}

// 返回上一步
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const openModal = (action) => {
  isModalOpen.value = true
}

// 關閉並重置狀態
const closeModal = () => {
  isModalOpen.value = false
  modalTitle.value = ''
  modalDetail.value = ''
}
</script>
