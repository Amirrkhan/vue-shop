<script setup lang="ts"></script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="logo" class="w-10" />

      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Sneakers Shop</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-black">
        <img src="/cart.svg" alt="cart" />
        <b>1205 czk</b>
      </li>
      <li class="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-black">
        <img src="/heart.svg" alt="favorites" />
        <span>Favorites</span>
      </li>
      <li class="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-black">
        <img src="/profile.svg" alt="profile" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>
