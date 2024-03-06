import { defineStore } from 'pinia'

import { computed, ref } from 'vue'

const base_url = import.meta.env.VITE_BASE_URL
export const useProductsStore = defineStore('products', function () {
  const data = ref()
  const cartItems = ref<Products>([])

  const { initialized, loading } = useInitializeStore(async function () {
    const res = await fetch(`${base_url}/products`).then(function (res) {
      return res.json()
    })
    data.value = res
  })

  const getProducts = computed(function () {
    return data
  })

  return { getProducts, cartItems, initialized, loading }
})

function useInitializeStore(apiCall) {
  const initialized = ref(false)
  const loading = ref(false)
  ;(async function () {
    loading.value = true
    await apiCall()
    initialized.value = true
    loading.value = false
  })()

  return { initialized, loading }
}
