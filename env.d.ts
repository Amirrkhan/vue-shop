/// <reference types="vite/client" />
interface Image {
  src: string
  alt: string
  class: string
}

interface Label {}

interface Product {
  id: number
  title: string
  price: number
  imageUrl: string
}

interface Option {
  value: string
  uniEl: string
}

type Options = Option[]
type Products = Product[]
