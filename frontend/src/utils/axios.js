import axios from 'axios'

const BASE_URL = import.meta.env.MODE === "development" ?'http://localhost:5001/notes' : '/notes'
const api = axios.create({
          baseURL:"http://localhost:5001/notes",
})

export default api;