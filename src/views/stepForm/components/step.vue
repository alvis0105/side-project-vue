<template>
  <div>
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label :for="field.name">{{ field.label }}</label>
      <input
        v-if="field.type !== 'checkbox'"
        :type="field.type"
        v-model="form[field.name]"
        :id="field.name"
      />
      <input
        v-else
        type="checkbox"
        v-model="form[field.name]"
        :id="field.name"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  fields: {
    type: Array,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.form-field {
  margin-bottom: 16px;
}
</style>
