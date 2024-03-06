<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  price: {
    type: Number
  }
})
</script>
<template>
  <div
    class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 cursor-pointer hover:shadow-lg mt-4"
  >
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col w-full">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }} czk</b>
        <img
          @click="$emit('remove-from-cart')"
          src="/close.svg"
          alt="close"
          class="opacity-40 cursor-pointer transition hover:opacity-100"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
