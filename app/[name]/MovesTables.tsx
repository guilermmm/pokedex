import { axios, pokeAPI } from '../../services/axios'
import { asyncComponent, handleNumber, upperFirst } from '../../util/functions'
import { Item, Machine, Move, PokemonMoves } from '../../util/types'

interface Props {
  moves: PokemonMoves[]
}

const getMove = async (name: string): Promise<Move> => {
  const { data } = await pokeAPI.get(`move/${name}`)
  return data
}

const MovesTables = asyncComponent(async ({ moves }: Props) => {
  const levelUpMoves = moves
    .filter(
      move =>
        move.version_group_details[0].move_learn_method.name === 'level-up' &&
        move.version_group_details[0].version_group.name === 'red-blue',
    )
    .sort(
      (a, b) =>
        a.version_group_details[0].level_learned_at -
        b.version_group_details[0].level_learned_at,
    )

  const levelUpMovesData = (await Promise.all(
    levelUpMoves.map(move => getMove(move.move.name)),
  )) as Move[]

  const machineMoves = moves
    .filter(
      move =>
        move.version_group_details[0].move_learn_method.name === 'machine' &&
        move.version_group_details[0].version_group.name === 'red-blue',
    )
    .sort(
      (a, b) =>
        a.version_group_details[0].level_learned_at -
        b.version_group_details[0].level_learned_at,
    )

  const machineMovesData = (await Promise.all(
    machineMoves.map(move => getMove(move.move.name)),
  )) as Move[]

  return (
    <div className="flex flex-row space-x-40 p-4">
      <div>
        <h2 className="text-2xl font-bold mb-1 border-b-2">
          Moves learned from leveling up
        </h2>
        <div>
          <table>
            <thead className="text-center">
              <tr>
                <th>Level</th>
                <th>Move</th>
                <th>Type</th>
                <th>Category</th>
                <th>Power</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody className="text-center p-0">
              {levelUpMoves.map((move, i) => (
                <tr key={move.move.name} className="tab">
                  <td>{move.version_group_details[0].level_learned_at}</td>
                  <td>{upperFirst(move.move.name.toString())}</td>
                  <td>{upperFirst(levelUpMovesData[i].type.name)}</td>
                  <td>{upperFirst(levelUpMovesData[i].damage_class.name)}</td>
                  <td>{handleNumber(machineMovesData[i].power)}</td>
                  <td>{handleNumber(machineMovesData[i].accuracy)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-1 border-b-2">
          Moves learned from Machine
        </h2>
        <div>
          <table>
            <thead className="text-center">
              <tr>
                <th>Move</th>
                <th>Type</th>
                <th>Category</th>
                <th>Power</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody className="text-center p-0">
              {machineMoves.map((move, i) => (
                <tr key={move.move.name}>
                  <td>{upperFirst(machineMovesData[i].name)}</td>
                  <td>{upperFirst(machineMovesData[i].type.name)}</td>
                  <td>{upperFirst(machineMovesData[i].damage_class.name)}</td>
                  <td>{handleNumber(machineMovesData[i].power)}</td>
                  <td>{handleNumber(machineMovesData[i].accuracy)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
})

export default MovesTables
