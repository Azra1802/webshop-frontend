import axios from 'axios'

// Osnovni axios instance sa baznim URL-om backend servera
const api = axios.create({
  baseURL: 'http://localhost:8000', // prilagodi ako treba
  headers: {
    'Content-Type': 'application/json',
  },
})

// Dobavljanje svih proizvoda
export const getProducts = () => api.get('/products')

// Dodavanje novog proizvoda
export const addProduct = (productData) => api.post('/products', productData)

// Brisanje proizvoda po ID-u
export const deleteProduct = (productId) => api.delete(`/products/${productId}`)

export const getProductById = (id) => api.get(`/products/${id}`)

// Možeš dodavati i druge funkcije za update, autentifikaciju itd.

export default api
