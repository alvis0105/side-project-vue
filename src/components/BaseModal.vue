<template>
  <div
    v-show="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 min-w-[400px]">
      <!-- 標題區域 -->
      <h3 class="mb-4 text-lg font-semibold">
        <slot name="title">
          {{ props.title }}
        </slot>
      </h3>

      <!-- 詳細內容區域 -->
      <div class="mb-6 text-gray-700">
        <slot name="detail">
          {{ props.detail }}
        </slot>
      </div>

      <!-- 按鈕區域 -->
      <div class="flex justify-end gap-4">
        <button
          v-if="haveCancelBtn"
          class="px-4 py-2 text-gray-500 border border-gray-300 rounded hover:bg-gray-100"
          @click="closeModal"
        >
          <slot name="cancelButtonText">
            {{ props.cancelText }}
          </slot>
        </button>
        <slot name="confirmButton">
          <button
            class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            @click="confirm"
          >
            {{ props.confirmText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    require: true
  },
  title: {
    type: String,
    default: '操作確認'
  },
  detail: {
    type: String,
    default: '您確定要執行此操作嗎？'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '確認'
  },
  haveCancelBtn: {
    type: Boolean,
    default: true
  },
})

const isOpen = ref(false)

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
})

const emit = defineEmits(['closeModal', 'confirm'])

const closeModal = () => {
  emit('closeModal')
}

const confirm = () => {
  emit('confirm')
}
</script>
