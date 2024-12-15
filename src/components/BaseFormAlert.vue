<template>
  <div class="form-alert">
    <slot>
      <!-- 預設插槽內容 -->
      <span>{{ props.message }}</span>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: false,
    default: ''
  },
})
</script>

<style scoped>
.form-alert {
  font-size: 14px;
  color: red;
}
</style>
