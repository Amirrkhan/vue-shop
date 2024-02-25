<script setup lang="ts">
import type { PropType } from 'vue'

defineOptions({
  inheritAttrs: false
})

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  img: {
    type: Object as PropType<Image>,
    default: null
  },
  labelClass: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const model = defineModel()

function updateValue(e: Event) {
  model.value = (e.target as HTMLInputElement).value
}
</script>

<template>
  <div>
    <label v-if="label" :class="label ? labelClass : null">{{ label }}</label>
    <img v-if="img" :src="img.src" :alt="img.alt" :class="img.class" />
    <input :value="modelValue" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<style scoped></style>
