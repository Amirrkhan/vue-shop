<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  selectPlaceholderText: {
    type: String,
    default: 'Select an option'
  },
  options: {
    type: Array,
    default() {
      return []
    }
  }
})
defineOptions({
  inheritAttrs: false
})
const model = defineModel()
function updateValue(e: Event) {
  model.value = (e.target as HTMLSelectElement).value
}
</script>
<template>
  <div>
    <select :value="modelValue" @input="updateValue" v-bind="$attrs">
      <option value="" disabled selected>{{ selectPlaceholderText }}</option>
      <option v-for="item in options" v-bind:key="item as string" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<style scoped></style>
