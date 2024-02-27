/// <reference types="vite/client" />
interface Image {
  src: string
  alt: string
  class: string
}

interface Product {
  id: number
  productId: number
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  isAdded: boolean
}

interface Option {
  value: string
  sortValue: string
}

type Options = Option[]

type Products = Product[]
