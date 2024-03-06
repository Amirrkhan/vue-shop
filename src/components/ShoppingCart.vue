<script setup lang="ts">
import { inject, type PropType } from 'vue'
import ShoppingCartItem from './ShoppingCartItem.vue'

defineProps({
  cartItems: Array as unknown as PropType<Products>
})

const { removeFromCart } = inject('cart') as CartToInject
</script>
<template>
  <div class="flex flex-col gap-2" v-auto-animate>
    <ShoppingCartItem
      v-for="cart in cartItems?.value"
      :title="cart.title"
      :price="cart.price"
      :image-url="cart.imageUrl"
      @remove-from-cart="removeFromCart(cart)"
      v-auto-animate
      :key="cart.id"
    />
  </div>
</template>

<style scoped></style>
