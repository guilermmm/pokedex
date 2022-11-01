import axios from 'axios'
import { Pokemon } from '../util/types'

export const pokeAPI = axios.create({ baseURL: 'https://pokeapi.co/api/v2' })

export const getPokemon = async (name: string): Promise<Pokemon> => {
  const { data } = await pokeAPI.get<Pokemon>(`pokemon/${name}`)
  if (data.past_types.length) data.types = data.past_types[0].types
  return data
}
