import Link from 'next/link'
import { pokeAPI } from '../services/axios'
import { asyncComponent } from '../util/functions'
import { Pokemon } from '../util/types'

const getPokemon = async (name: string): Promise<Pokemon> => {
  const { data } = await pokeAPI.get(`pokemon/${name}`)
  return data
}

interface Props {
  name: string
}

const PokeLink = asyncComponent(async ({ name }: Props) => {
  const pokemon = await getPokemon(name)
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1)
  const { sprites } = pokemon

  return (
    <div className="scale-100 hover:scale-105 transition-transform duration-200 bg-gray-900 rounded w-44 m-4">
      <Link href={`/${pokemon.name}`}>
        <div className="flex flex-col items-center">
          <img src={sprites.front_default} alt={pokemonName} />
          <span className="text-white text-center">
            <div>{`#${pokemon.id.toString().padStart(3, '0')}`}</div>
            <div>{pokemonName}</div>
            <div>
              {pokemon.types.map(types => (
                <span
                  key={types.type.name}
                  className="inline-block px-3 py-2 text-sm font-semibold"
                >
                  {types.type.name.toString().charAt(0).toUpperCase() +
                    types.type.name.slice(1)}
                </span>
              ))}
            </div>
          </span>
        </div>
      </Link>
    </div>
  )
})

export default PokeLink
