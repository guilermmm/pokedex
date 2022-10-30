export const axios = require('axios')

export const pokeAPI = axios.create({ baseURL: 'https://pokeapi.co/api/v2' })
