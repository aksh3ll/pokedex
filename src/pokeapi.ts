import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cache: Cache) {
    this.cache = cache;
  }

  async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
    const url: string = pageURL || `${PokeAPI.baseURL}/location-area`;
    if (this.cache.get<ShallowLocations>(url)) {
      return this.cache.get<ShallowLocations>(url)!;
    }
    const response = await fetch(url);
    return await response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url: string = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const response = await fetch(url);
    return await response.json();
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url: string = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const response = await fetch(url);
    return await response.json();
  }
}

export type Pokemon = {
  abilities: {
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }[]
  base_experience: number
  cries: {
    latest: string
    legacy: string
  }
  forms: {
    name: string
    url: string
  }[]
  game_indices: {
    game_index: number
    version: {
      name: string
      url: string
    }
  }[]
  height: number
  held_items: {
    item: {
      name: string
      url: string
    }
    version_details: {
      rarity: number
      version: {
        name: string
        url: string
      }
    }[]
  }[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: {
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
      order?: number
      version_group: {
        name: string
        url: string
      }
    }[]
  }[]
  name: string
  order: number
  past_abilities: {
    abilities: {
      ability: any
      is_hidden: boolean
      slot: number
    }[]
    generation: {
      name: string
      url: string
    }
  }[]
  past_stats: {
    generation: {
      name: string
      url: string
    }
    stats: {
      base_stat: number
      effort: number
      stat: {
        name: string
        url: string
      }
    }[]
  }[]
  past_types: {
    generation: {
      name: string
      url: string
    }
    types: {
      slot: number
      type: {
        name: string
        url: string
      }
    }[]
  }[]
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
    other: any // Other
    versions: any // Versions
  }
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  weight: number
}

export type ShallowLocations = {
    count: number,
    next: string | null,
    previous: string | null,
    results: {
        name: string
        url: string
    }[]
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    }
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: {
          name: string;
          url: string;
        }[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
