import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5175', // Tu backend Express
})

export const apiGetDataComida = async (name) => {
 return await api.get(`/comidas/${name}`)
}

export const apiGetDataResto = async (name) => {
 return await api.get(`/comidas/resto/${name}`)
}

export const apiPostSendPedido = async (pedido) => {
 return await api.post(`/pedidos/`, pedido);
}

