<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="flex flex-col items-center text-center">
    <img width="80" height="80" :src="imageUrl" alt="infoImage" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ description }}</p>
  </div>
</template>

<style scoped></style>
