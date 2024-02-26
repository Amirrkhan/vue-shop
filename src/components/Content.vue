<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

import CardList from './CardList.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

const base_url = import.meta.env.VITE_BASE_URL

const filters = reactive({
  sortSelectValue: '',
  searchInputValue: ''
})
const products = ref<Products | []>([])

const imgInput = {
  src: '/search.svg',
  alt: 'Search...',
  class: 'absolute top-3.5 left-4'
}

const optionsSortSelect = [
  {
    value: 'Name',
    sortValue: 'title'
  },
  {
    value: 'Price (cheap.)',
    sortValue: 'price'
  },
  {
    value: 'Price (expens.)',
    sortValue: '-price'
  }
]
defineProps({
  title: {
    type: String,
    default: ''
  }
})

async function fetchProducts() {
  try {
    let paramsString = ''

    if (filters.searchInputValue) {
      paramsString = paramsString + `title=*${filters.searchInputValue}&`
    }
    if (filters.sortSelectValue) {
      paramsString = paramsString + `sortBy=${filters.sortSelectValue}&`
    }

    const data = await fetch(`${base_url}/products?${paramsString}`).then((res) => res.json())
    if (data.error) throw new Error(data.message)
    products.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchProducts)

watch(filters, fetchProducts)
</script>

<template>
  <div class="p-10">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold">{{ title }}</h2>

      <div class="flex gap-4">
        <BaseSelect
          v-model="filters.sortSelectValue"
          :options="optionsSortSelect"
          select-placeholder-text="Sort by"
          class="py-2 px-3 border rounded-md outline-none"
        />
        <p></p>
        <div class="relative">
          <BaseInput
            v-model="filters.searchInputValue"
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
