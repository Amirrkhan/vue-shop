<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'

import { useProductsStore } from '../stores/products.d'
import BaseInput from '../components/BaseInput.vue'
import BaseSelect from '../components/BaseSelect.vue'

import CardList from '../components/CardList.vue'

const base_url = import.meta.env.VITE_BASE_URL
const { getProducts } = useProductsStore()

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

const filters = reactive({
  sortSelectValue: '',
  searchInputValue: ''
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
    getProducts.value = data
  } catch (error) {
    console.log(error)
  }
}

async function fetchFavorites() {
  try {
    const data = await fetch(`${base_url}/favorites`).then((res) => res.json())

    if (data.error) throw new Error(data.message)
    getProducts.value = getProducts.value.map((product: Product) => {
      const favorite = data.find((favorite: any) => favorite.product_id === product.id)

      if (!favorite) {
        return product
      }
      return {
        ...product,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async function () {
  await fetchProducts()
  await fetchFavorites()
})

watch(filters, fetchProducts)
</script>

<template>
  <div class="flex justify-between items-center mb-8">
    <h2 class="text-3xl font-bold"></h2>

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
  <CardList title="All products" :items="getProducts" />
</template>
