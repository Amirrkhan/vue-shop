/// <reference types="vite/client" />
type Image = {
  src: string
  alt: string
  class: string
}

type Product = {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  isAdded: boolean
  favoriteId: number
  product_id: number
}

type Favorite = {
  product_id: number
  id: number
  product: Product
}

type Option = {
  value: string
  sortValue: string
}

interface CartToInject {
  addToFavorites: function
  onClickAddPlus: function
  removeFromCart: function
}

interface Options extends Array<Option> {}
interface Products extends Array<Product> {
  value: Array
}
