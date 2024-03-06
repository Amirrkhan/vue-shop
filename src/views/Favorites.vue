<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useProductsStore } from '../stores/products.d'
import CardList from '../components/CardList.vue'

const base_url = import.meta.env.VITE_BASE_URL

const favorites = ref<Products | Product[]>([])

const { cartItems } = useProductsStore()

defineProps({
  id: Number,
  name: String
})

function updateFavoritesOnChangeCart(array1: Array<any>, array2: Array<any>) {
  intersect(array1, array2)
}

function intersect(array1: Array<any>, array2: Array<any>) {
  array1.map(function (itemArr1) {
    const resultOfFilter = array2.filter((itemArr2) => itemArr1.id === itemArr2.id)

    itemArr1.isAdded = resultOfFilter.length > 0 ? resultOfFilter[0].isAdded : false
    return itemArr1
  })
}

async function fetchFavorites() {
  try {
    const data = await fetch(`${base_url}/favorites`).then((res) => res.json())

    favorites.value = data.map((obj: Favorite) => ({
      ...obj.product,
      product_id: obj.id
    }))

    if (cartItems.value?.length > 0) {
      updateFavoritesOnChangeCart(favorites.value, cartItems.value)
    }

    if (data.error) throw new Error(data.message)
  } catch (error) {
    console.log(error)
  }
}

watch(
  function () {
    return cartItems.value
  },
  function () {
    if (cartItems.value.length < 1) {
      favorites.value = favorites.value.map((item: Product) => ({
        ...item,
        isAdded: false
      }))
    }
    updateFavoritesOnChangeCart(favorites.value, cartItems.value)
  },
  { deep: true }
)

onMounted(function () {
  fetchFavorites()
})
</script>
<template>
  <CardList title="Favorites" :items="favorites" />
</template>
