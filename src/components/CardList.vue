<script lang="ts" setup>
import type { PropType } from 'vue'
import Card from './Card.vue'
defineProps({
  items: {
    type: Array as PropType<Products>,
    default() {
      return Array
    }
  }
})
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="false"
      :is-favorite="false"
      v-bind:key="item.id"
    />
  </div>
</template>

<style scoped></style>
