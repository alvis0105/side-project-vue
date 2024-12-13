<template>
  <div class="step-form">
    <h2>{{ currentConfig.title }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- 傳遞當前步驟的欄位配置與資料 -->
      <StepFormStep :fields="currentConfig.fields" :form="form" />

      <div class="form-actions">
        <button type="button" @click="prevStep" v-if="currentStep > 0">上一步</button>
        <button type="submit">{{ isLastStep ? "提交" : "下一步" }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue"
import StepFormStep from "./StepFormStep.vue"
import { stepFormConfig } from "../config/stepFormConfig"

// 當前步驟
const currentStep = reactive({ value: 0 })

// 表單數據
const form = reactive({})
stepFormConfig.forEach((step) => {
  step.fields.forEach((field) => {
    form[field.name] = field.defaultValue
  })
})

// 計算當前配置
const currentConfig = computed(() => stepFormConfig[currentStep.value])

// 是否為最後一步
const isLastStep = computed(() => currentStep.value === stepFormConfig.length - 1)

// 處理提交按鈕
const handleSubmit = () => {
  if (!isLastStep.value) {
    currentStep.value++
  } else {
    console.log("表單數據：", form)
    alert("表單完成！")
  }
}

// 處理返回按鈕
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
.step-form {
  max-width: 600px;
  margin: 0 auto;
}
.form-actions {
  display: flex;
  justify-content: space-between;
}
</style>
