import React from 'react'
import { pokeAPI } from '../services/axios'
import { PokemonURL } from '../util/types'
import PokeLink from './PokeLink'

const getGeneration = async (gen: number): Promise<PokemonURL> => {
  const { data } = await pokeAPI.get(`pokemon?limit=${gen}`)
  return data
}

const Page = async () => {
  const gen1 = await getGeneration(151)
  return (
    <div>
      <h1 className="text-4xl">Generation 1</h1>
      <div className="flex flex-wrap align-center justify-center">
        {gen1.results.map(pokemon => (
          <PokeLink key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </div>
  )
}

export default Page
