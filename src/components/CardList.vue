<script lang="ts" setup>
import Card from './Card.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Lorem ipsum dolor sit amet."
      :price="1200"
      :is-added="false"
      :is-favorite="false"
    />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>

<style scoped></style>
