<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  selectPlaceholderText: {
    type: String,
    default: 'Select'
  },
  options: {
    type: Array as PropType<Options>,
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
      <option v-for="(item, index) in options" v-bind:key="index" :value="item.sortValue">
        {{ item.value }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
