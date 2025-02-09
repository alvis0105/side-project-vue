<template>
  <div>
    <div
      v-for="field in fields"
      :key="field.id"
      class="mb-4"
    >
      <div :class="field.type !== 'checkbox' ? '' : 'flex'">
        <span
          class="w-full"
          :for="field.id"
        >
          {{ $t(field.label) }}
        </span>
        <input
          v-if="field.type !== 'checkbox'"
          :id="field.id"
          :value="localForm[field.name]"
          :type="field.type"
          class="w-full px-2 py-1 mt-2 border rounded-lg"
          @input="updateField(field.name, $event.target.value)"
          @blur="validateField(field.name)"
        >
        <input
          v-else
          :id="field.id"
          :checked="localForm[field.name]"
          type="checkbox"
          @change="updateCheckbox(field.name, $event.target.checked)"
          @blur="validateField(field.name)"
        >
      </div>
      <FormAlert
        v-if="errors[field.name]"
        :key="`error-${field.id}`"
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
import { useI18n } from "vue-i18n"
import FormAlert from "@/components/BaseFormAlert.vue"

const { t } = useI18n()

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["updateField"])

// 本地表單副本
const localForm = reactive({ ...props.form })

// 錯誤訊息的響應式物件
const errors = reactive({})

// 監控 props.form 的變化，同步到 localForm
watch(
  () => props.form,
  (newForm) => {
    Object.assign(localForm, newForm)
  },
  { deep: true }
)

const updateField = (fieldName, value) => {
  localForm[fieldName] = value
  emit("updateField", { fieldName, value })
  validateField(fieldName)
}

const updateCheckbox = (fieldName, isChecked) => {
  localForm[fieldName] = isChecked
  emit("updateField", { fieldName, value: isChecked })
  validateField(fieldName)
}

const validateField = (fieldName) => {
  const form = localForm[fieldName]
  if (!form) {
    errors[fieldName] = t("common.requiredField")
    console.log('錯誤')
  } else {
    errors[fieldName] = ""
  }
}
</script>
