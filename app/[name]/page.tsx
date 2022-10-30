import Link from 'next/link'
import { pokeAPI } from '../../services/axios'
import { upperFirst } from '../../util/functions'
import { Pokemon, typeColor } from '../../util/types'
import MovesTables from './MovesTables'

const getPokemon = async (name: string): Promise<Pokemon> => {
  const { data } = await pokeAPI.get(`pokemon/${name}`)
  return data
}

interface Props {
  params: {
    name: string
  }
}

const Page = async ({ params }: Props) => {
  const pokemon = await getPokemon(params.name)
  const name = params.name.charAt(0).toUpperCase() + params.name.slice(1)
  const { moves, sprites, types } = pokemon
  return (
    <div className="flex flex-col items-center justify-center text-white ">
      <span className="bg-gray-900 p-2">
        <h1 className=" text-4xl  p-5 font-bold text-center">{name}</h1>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <div className=" w-56 h-56 ">
            <img
              src={sprites.other['official-artwork'].front_default}
              alt={name}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1 border-b-2">Pokédex data</h2>
            <table className="table-auto">
              <tbody>
                <tr>
                  <div className="text-end pr-4">National No.</div>
                  <td>{`#${pokemon.id.toString().padStart(3, '0')}`}</td>
                </tr>
                <tr>
                  <div className="text-end pr-4">Height</div>
                  <td>{`${pokemon.height / 10} m`}</td>
                </tr>
                <tr>
                  <div className="text-end pr-4">Weight</div>
                  <td>{`${pokemon.weight / 10} kg`}</td>
                </tr>
                <tr>
                  <div className="text-end pr-4">Types</div>
                  <td>
                    {types.map(type => (
                      <span
                        key={type.type.name}
                        className={
                          'mr-4 rounded-md px-1 ' + typeColor[type.type.name]
                        }
                      >
                        <Link href={`/types/${type.type.name}`}>
                          {upperFirst(type.type.name)}
                        </Link>
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <div className="text-end pr-4">Abilities</div>
                  <td>
                    {pokemon.abilities.map((ability: any) => (
                      <Link
                        href={`/abilities/${ability.ability.name}`}
                        key={ability.ability.name}
                        className="mr-2"
                      >
                        {ability.ability.name
                          .toString()
                          .charAt(0)
                          .toUpperCase() + ability.ability.name.slice(1)}
                      </Link>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1 border-b-2">Stats</h2>
            <table>
              <tbody>
                {pokemon.stats.map(stat => (
                  <tr key={stat.stat.name}>
                    <div className="text-end pr-4">
                      {upperFirst(stat.stat.name)}
                    </div>
                    <td>
                      <div>{stat.base_stat}</div>
                    </td>
                    <td>
                      <div className="pl-0">
                        <div
                          className="bg-gray-300 rounded-full w-20"
                          style={{ height: '15px', width: '10rem' }}
                        >
                          <div
                            className="bg-blue-500 rounded-full"
                            style={{
                              height: '15px',
                              width: `${stat.base_stat}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <MovesTables moves={moves} />
        </div>
      </span>
    </div>
  )
}

export default Page
