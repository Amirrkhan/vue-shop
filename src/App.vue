<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

import { useProductsStore } from './stores/products.d'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const base_url = import.meta.env.VITE_BASE_URL

const { cartItems, getProducts } = useProductsStore()

const drawerIsOpen = ref(false)

const totalPrice = computed(function () {
  return cartItems.value?.reduce((acc: number, curr: Product) => acc + curr.price, 0)
})
function toggleDrawer() {
  drawerIsOpen.value = !drawerIsOpen.value
}

function addToCart(product: Product) {
  product.isAdded = true

  getProducts.value = getProducts.value.map((item: Product) => ({
    ...item,
    isAdded: product.id === item.id ? true : item.isAdded
  }))

  cartItems.value = getProducts.value.filter((item: Product) => item.isAdded === true)
}

function removeFromCart(product: Product) {
  product.isAdded = false
  cartItems.value.splice(cartItems.value.indexOf(product), 1)
  getProducts.value = getProducts.value.map((item: Product) => ({
    ...item,
    isAdded: product.id === item.id ? false : item.isAdded
  }))
}
const onClickAddPlus = (item: Product) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
async function addToFavorites(product: Product) {
  try {
    if (!product.isFavorite) {
      const obj = { product_id: product.id, product }

      product.isFavorite = true
      const data = await fetch(`${base_url}/favorites`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...obj })
      }).then((res) => res.json())

      product.favoriteId = data.id
    } else {
      product.isFavorite = false

      await fetch(`${base_url}/favorites/${product.favoriteId || product.product_id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: null
      })
    }
  } catch (error) {
    console.log(error)
  }
}
watch(
  function () {
    return cartItems.value
  },
  function () {
    // Actualize products when order created
    if (cartItems.value.length < 1) {
      getProducts.value = getProducts.value.map((item: Product) => ({
        ...item,
        isAdded: false
      }))
    }
  },
  { deep: true }
)

provide('cart', { addToFavorites, onClickAddPlus, removeFromCart })
</script>

<template>
  <Drawer v-if="drawerIsOpen" :total-price="totalPrice" @toggle-drawer="toggleDrawer" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10">
    <Header :total-price="totalPrice" v-on:toggle-drawer="toggleDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
