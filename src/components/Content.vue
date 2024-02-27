<script setup lang="ts">
import { onMounted, provide, reactive, ref, watch } from 'vue'

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

async function fetchFavorites() {
  try {
    const data = await fetch(`${base_url}/favorites`).then((res) => res.json())
    if (data.error) throw new Error(data.message)
    products.value = products.value.map((product) => {
      const favorite = data.find((favorite: Product) => favorite.productId === product.id)

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

async function postFavorites(productId: Number) {
  try {
    const rawResponse = await fetch(`${base_url}/favorites`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    })

    const content = await rawResponse.json()

    if (content.error) throw new Error(content.message)
  } catch (error) {
    console.log(error)
  }
}

async function fetchFavoritesByProductId(productId: Number) {
  try {
    const data = await fetch(`${base_url}/favorites?productId=${productId.toString()}`).then(
      (res) => res.json()
    )
    if (data.error) throw new Error(data.message)

    return data[0].id
  } catch (error) {
    console.log(error)
  }
}

async function deleteFavorite(productId: Number) {
  try {
    const id = await fetchFavoritesByProductId(productId)

    const rawResponse = await fetch(`${base_url}/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: null
    })

    const content = await rawResponse.json()
    console.log(content)
    if (content.error) throw new Error(content.message)
  } catch (error) {
    console.log(error)
  }
}

async function addToFavorites(product: Product) {
  product.isFavorite && postFavorites(product.productId)
  !product.isFavorite && deleteFavorite(product.productId)

  products.value = products.value.map((item) =>
    item.id === product.productId
      ? { ...item, isFavorite: product.isFavorite, productId: product.productId }
      : item
  )
}

onMounted(async function () {
  await fetchProducts()
  await fetchFavorites()
})

watch(filters, fetchProducts)

provide('addToFavorites', addToFavorites)
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
