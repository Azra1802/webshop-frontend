import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL , 
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getProducts = () => api.get('/products')


export const addProduct = (productData) => api.post('/products', productData)

export const deleteProduct = (productId) => api.delete(`/products/${productId}`)

export const getProductById = (id) => api.get(`/products/${id}`)


export default api
