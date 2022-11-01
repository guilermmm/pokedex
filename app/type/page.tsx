import Link from 'next/link'
import { pokeAPI } from '../../services/axios'
import { upperFirst } from '../../util/functions'
import { PokemonTypes } from '../../util/types'

const getTypes = async (): Promise<PokemonTypes> => {
  const { data } = await pokeAPI.get('type')
  return data
}

const Page = async () => {
  const types = await getTypes()
  return (
    <div className="flex p-6 justify-between">
      <div>
        <h2 className="text-xl font-bold">Type Chart</h2>
      </div>
      <div>
        <h2 className="text-xl font-bold">Info</h2>
      </div>
    </div>
  )
}

export default Page
