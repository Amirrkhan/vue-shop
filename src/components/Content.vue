<script setup lang="ts">
import { reactive } from 'vue'
import CardList from './CardList.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

const inputValues = reactive({
  select: '',
  input: ''
})

const img = {
  src: '/search.svg',
  alt: 'Search...',
  class: 'absolute top-3.5 left-4'
}

const options = ['Name', 'Price &uarr;', 'orange']

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="p-10">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold">{{ title }}</h2>
      {{ console.log(inputValues.select) }}
      <div class="flex gap-4">
        <BaseSelect
          v-model="inputValues.select"
          :options="options"
          class="py-2 px-3 border rounded-md outline-none"
        />
        <p></p>
        <div class="relative">
          <BaseInput
            v-model="inputValues.input"
            :img="img"
            type="text"
            placeholder="Search..."
            class="border rounded-md py-2 pl-11 pr-4 outline-none"
          />
        </div>
      </div>
    </div>
    <CardList />
  </div>
</template>

<style scoped></style>
