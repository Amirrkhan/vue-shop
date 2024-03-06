<script setup lang="ts">
import DrawerHead from './DrawerHead.vue'
import ShoppingCart from './ShoppingCart.vue'
import InfoBlock from './infoBlock.vue'
import { useProductsStore } from '../stores/products.d'
import { ref } from 'vue'

const base_url = import.meta.env.VITE_BASE_URL

const { cartItems } = useProductsStore()
const isOrderPosting = ref(false)
const orderId = ref(null)

const props = defineProps({
  totalPrice: {
    type: Number,
    default: 0
  }
})

defineEmits(['toggle-drawer'])

async function postOrder() {
  try {
    isOrderPosting.value = true
    const data = await fetch(`${base_url}/orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        products: cartItems.value.map((item: Product) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          imageUrl: item.imageUrl
        })),
        totalPrice: props.totalPrice
      })
    })
    const content = await data.json()

    cartItems.value = []
    orderId.value = content.id
    if (content.error) throw new Error(content.message)
  } catch (error) {
    console.log(error)
  } finally {
    isOrderPosting.value = false
  }
}
</script>

<template>
  <div
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    @click="$emit('toggle-drawer')"
  ></div>
  <div
    class="bg-white w-96 h-full fixed overflow-x-hidden overflow-y-scroll right-0 top-0 z-20 p-8"
  >
    <DrawerHead title="Shopping Cart" @toggle-drawer="$emit('toggle-drawer')" />

    <div class="mt-20" v-if="!totalPrice || orderId">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Cart is empty"
        description="At least one product must be added"
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Order has been created"
        :description="`Your order #${orderId} will be send to our courier service soon`"
        image-url="/order-success-icon.png"
      />
    </div>
    <div v-else>
      <ShoppingCart :cartItems="cartItems" />

      <div class="flex flex-col gap-4 my-7">
        <div class="flex gap-2">
          <span>Total: </span>
          <div class="flex-1 border-bottom border-dashed"></div>
          <b>{{ totalPrice }} czk</b>
        </div>
      </div>

      <button
        :disabled="isOrderPosting ? true : totalPrice === 0 ? true : false"
        class="bg-lime-500 w-full rounded-xl py-3 text-white cursor-pointer transition disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700"
        @click="postOrder"
      >
        Order {{ isOrderPosting ? 'Processing...' : '' }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
../stores/products.d.js
