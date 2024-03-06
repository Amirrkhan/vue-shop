<script setup lang="ts">
defineProps({
  imageUrl: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  price: {
    type: Number
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  isAdded: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-xl p-8 cursor-pointer transition duration-300 hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="isFavorite ? 'like-2.svg' : '/like-1.svg'"
      alt="add-to-favorites"
      class="absolute top-8 left-8 border border-slate-200 rounded-xl"
      @click="$emit('add-to-favorites')"
    />
    <img :src="imageUrl" alt="sneaker" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <span>{{ price }} czk</span>
      </div>

      <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="plus" @click="$emit('toggleAdd')" />
    </div>
  </div>
</template>

<style scoped></style>
