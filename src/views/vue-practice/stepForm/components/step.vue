<template>
  <div>
    <div
      v-for="field in props.fields"
      :key="field.name"
      class="mb-4"
    >
      <div :class="field.type !== 'checkbox' ? '' : 'flex'">
        <span
          class="w-full"
          :for="field.name"
        >
          {{ field.label }}
        </span>
        <input
          v-if="field.type !== 'checkbox'"
          :id="field.name"
          :value="localForm[field.name]"
          :type="field.type"
          class="w-full px-2 py-1 mt-2 border rounded-lg"
          @input="updateField(field.name, $event.target.value)"
          @blur="validateField(field.name)"
        >
        <input
          v-else
          :id="field.name"
          :checked="localForm[field.name]"
          type="checkbox"
          @change="updateCheckbox(field.name, $event.target.checked)"
          @blur="validateField(field.name)"
        >
      </div>
      <!-- 動態顯示錯誤訊息 -->
      <FormAlert
        v-if="errors[field.name]"
        class="mt-2 ms-2"
      >
        <template #default>
          <span>{{ errors[field.name] }}</span>
        </template>
      </FormAlert>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue"
import FormAlert from '@/components/BaseFormAlert.vue'

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  form: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["updateField"])

// 本地表單副本
const localForm = reactive({ ...props.form })

// 錯誤訊息的響應式物件
const errors = reactive({})

// 監控 props.form 的變化，同步到 localForm
watch(() => props.form, (newForm) => {
    Object.assign(localForm, newForm)
  },{ deep: true }
)

const updateField = (fieldName, value) => {
  localForm[fieldName] = value
  emit("updateField", { fieldName, value })
  validateField(fieldName)
}

const updateCheckbox = (fieldName, isChecked) => {
  localForm[fieldName] = isChecked
  emit("updateField", { fieldName, value: isChecked })
  validateField(fieldName) // 即時更新錯誤訊息
}

const validateField = (fieldName) => {
  const value = localForm[fieldName]
  if (value === null || value === undefined || value === '' || value === false) {
    errors[fieldName] = "此欄位為必填項" // 設定錯誤訊息
  } else {
    errors[fieldName] = "" // 清除錯誤訊息
  }
}
</script>
