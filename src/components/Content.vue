<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import CardList from './CardList.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

const base_url = import.meta.env.VITE_BASE_URL

const states = reactive({
  selectValue: '',
  inputValue: ''
})
const products = ref<Products | []>([])

const imgInput = {
  src: '/search.svg',
  alt: 'Search...',
  class: 'absolute top-3.5 left-4'
}

const options = [
  {
    value: 'Name',
    uniEl: ''
  },
  {
    value: 'Price',
    uniEl: '2191'
  },
  {
    value: 'Price',
    uniEl: '2193'
  }
]

defineProps({
  title: {
    type: String,
    default: ''
  }
})

onMounted(async function () {
  const data = await fetch(`${base_url}/products`).then((res) => res.json())
  products.value = data
})
</script>

<template>
  <div class="p-10">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold">{{ title }}</h2>

      <div class="flex gap-4">
        <BaseSelect
          v-model="states.selectValue"
          :options="options"
          select-placeholder-text="Sort by"
          class="py-2 px-3 border rounded-md outline-none"
        />
        <p></p>
        <div class="relative">
          <BaseInput
            v-model="states.inputValue"
            :img="imgInput"
            type="text"
            placeholder="Search..."
            class="border rounded-md py-2 pl-11 pr-4 outline-none"
          />
        </div>
      </div>
    </div>
    <CardList :items="products" />
  </div>
</template>

<style scoped></style>
