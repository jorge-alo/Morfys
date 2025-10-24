import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Tu backend Express
})

export const apiGetDataComida = async (name) => {
 return await api.get(`/${name}`)
}

export const apiGetDataResto = async (name) => {
 return await api.get(`/resto/${name}`)
}
