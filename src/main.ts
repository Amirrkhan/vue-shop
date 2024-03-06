import './assets/main.css'

import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Home from './views/Home.vue'
import Favorites from './views/Favorites.vue'

const app = createApp(App)

const pinia = createPinia()

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(autoAnimatePlugin)

app.use(router)

app.use(pinia)

app.mount('#app')
