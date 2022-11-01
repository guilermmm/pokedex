export interface PokemonURL {
  results: {
    name: string
  }[]
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  abilities: {
    ability: {
      name: string
    }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
  past_types: {
    types: {
      type: {
        name: string
      }
    }[]
  }[]
  sprites: {
    front_default: string
    front_shiny: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  species: {
    name: string
  }
  moves: PokemonMoves[]
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
    }
  }[]
}

export interface PokemonMoves {
  move: {
    name: string
    url: string
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }[]

  machines: {
    machine: {
      url: string
    }
  }[]
}

export interface Move {
  name: string
  power: number
  accuracy: number
  damage_class: {
    name: string
    effect_chance: number
  }
  learned_by_pokemon: {
    name: string
  }[]
  type: {
    name: string
  }
  machines: {
    machine: {
      name: string
    }
  }[]
}

export interface Machine {
  item: {
    name: string
  }
  move: {
    name: string
  }
}

export interface Item {
  name: string
  cost: number
  sprites: {
    default: string
  }
  effect_entries: {
    effect: string
    short_effect: string
  }[]
}

export interface PokemonTypes {
  results: {
    name: string
  }[]
}

export const typeColor: Record<string, string> = {
  normal: 'bg-gray-300',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-blue-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-300',
  rock: 'bg-gray-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-red-200',
  dark: 'bg-gray-800',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-200',
}

export const excludedTypes = [
  'unknown',
  'shadow',
  'fairy',
  'unknown',
  'dark',
  'steel',
]
