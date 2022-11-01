import Link from 'next/link'
import { pokeAPI } from '../../services/axios'
import { upperFirst } from '../../util/functions'
import { PokemonTypes } from '../../util/types'

const getTypes = async (): Promise<PokemonTypes> => {
  const { data } = await pokeAPI.get('type')
  return data
}

interface Props {
  children: React.ReactNode
}

const Page = async ({ children }: Props) => {
  const types = await getTypes()
  const excludedTypes = [
    'unknown',
    'shadow',
    'fairy',
    'unknown',
    'dark',
    'steel',
  ]
  return (
    <div className="flex flex-col items-center justify-center text-white ">
      <span className="bg-gray-900 p-2 rounded-md">
        <h1 className=" text-4xl  p-5 font-bold text-center">Pokemon Types</h1>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {types.results
            .filter(result => !excludedTypes.includes(result.name))
            .map(type => (
              <div key={type.name} className="flex flex-col items-center">
                <Link href={`/type/${type.name}`}>{upperFirst(type.name)}</Link>
              </div>
            ))}
        </div>
        <div>{children}</div>
      </span>
    </div>
  )
}

export default Page
