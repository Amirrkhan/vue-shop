<script lang="ts" setup>
import { inject, type PropType } from 'vue'
import Card from './Card.vue'
defineProps({
  items: {
    type: Array as unknown as PropType<Products>
  },
  title: {
    type: String
  },
  isFavorites: {
    type: Boolean,
    default: false
  }
})
const { addToFavorites, onClickAddPlus } = inject('cart') as CartToInject
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">{{ title }}</h2>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      v-bind:key="item.id"
      @add-to-favorites="addToFavorites(item)"
      @toggle-add="onClickAddPlus(item)"
    />
  </div>
</template>
